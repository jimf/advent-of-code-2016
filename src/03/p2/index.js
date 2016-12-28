'use strict';

var _ = require('../../util');
var M = require('../../monad');

const testTriple = (x, y, z) => {
    return (x + y > z) && (y + z > x) && (x + z > y);
};

const toInt = x => parseInt(x, 10);

const parseLine = line => line.trim().split(/\s+/).map(toInt);

const collectColumns = rows =>
    rows.reduce((acc, row) => {
        acc[0].push(row[0]);
        acc[1].push(row[1]);
        acc[2].push(row[2]);
        return acc;
    }, [[], [], []]);

const splitEvery = n => xs => {
    const result = [];
    let i = 0;
    while (i < xs.length) {
        if (i % n === 0) { result.push([]); }
        result[result.length - 1].push(xs[i]);
        i += 1;
    }
    return result;
};

const solve = input =>
    M.Identity(input.trim())
    .map(_.splitLines)
    .map(_.map(parseLine))
    .map(collectColumns)
    .map(_.flatten)
    .map(splitEvery(3))
    .map(_.map(([x, y, z]) => Number(testTriple(x, y, z))))
    .map(_.flatten)
    .fold(_.sum);

module.exports = solve;
