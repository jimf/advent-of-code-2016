'use strict';

const _ = require('../../util');
const M = require('../../monad');

const NODE_INFO = /^\/dev\/grid\/node-x(\d+)-y(\d+)\s+(\d+T)\s+(\d+T)\s+(\d+T)\s+(\d+%)$/;

const parseNode = line =>
    M.Identity(line.match(NODE_INFO))
    .fold(match => match && {
        x: Number(match[1]),
        y: Number(match[2]),
        size: match[3],
        used: match[4],
        avail: match[5],
        percentUsed: match[6]
    });

const isViablePair = (a, b) =>
    a.used !== '0T' &&
    !(a.x === b.x && a.y === b.y) &&
    parseInt(a.used) <= parseInt(b.avail);

const permuteWith = f => xs => {
    const result = [];
    for (let i = 0; i < xs.length; i += 1) {
        for (let j = 0; j < xs.length; j += 1) {
            if (f(xs[i], xs[j])) {
                result.push([xs[i], xs[j]]);
            }
        }
    }
    return result;
};

const parseInput = input =>
    input.trim().split('\n')
    .map(parseNode)
    .filter(_.id);

const solve = input =>
    M.Identity(parseInput(input))
    .map(permuteWith(isViablePair))
    .fold(pairs => pairs.length);

module.exports = solve;
