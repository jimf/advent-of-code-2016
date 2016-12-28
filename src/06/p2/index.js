'use strict';

const _ = require('../../util');
const M = require('../../monad');

const transpose = xs => {
    const result = [];
    for (let i = 0; i < xs.length; i += 1) {
        for (let j = 0; j < xs[i].length; j += 1) {
            if (typeof result[j] === 'undefined') { result[j] = []; }
            result[j].push(xs[i][j]);
        }
    }
    return result;
};

const rotateRight = xs =>
    M.Identity(xs)
    .map(transpose)
    .fold(_.map(ys => ys.reverse()));

const solve = input =>
    M.Identity(input.trim().split('\n'))
    .map(_.map(line => line.trim().split('')))
    .map(rotateRight)
    .map(_.map(_.countBy(_.id)))
    .map(_.map(_.pairs))
    .map(_.map(_.sortBy(_.nth(1))))
    .map(_.map(xs => xs[0][0]))
    .fold(xs => xs.join(''));

module.exports = solve;
