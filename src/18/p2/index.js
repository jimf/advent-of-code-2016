'use strict';

const M = require('../../monad');

const partition = (len, step, xs) => {
    const result = [];
    let i = 0;
    while (i <= xs.length - len) {
        const part = [];
        let j = i;
        while (j < i + len) {
            part.push(xs[j]);
            j += 1;
        }
        result.push(part);
        i += step;
    }
    return result;
};

const isTrap = triple =>
    '^^.|.^^|^..|..^'.indexOf(triple.join('')) >= 0;

const nextRow = row =>
    partition(3, 1, ['.'].concat(row).concat(['.']))
    .map(triple => isTrap(triple) ? '^' : '.');

const countSafeTiles = row => row.filter(c => c === '.').length;

const genSafeTileCount = (numRows, first) => {
    let count = 0;
    let i = 0;
    let row = first;
    do {
        count += countSafeTiles(row);
        row = nextRow(row);
        i += 1;
    } while (i < numRows);
    return count;
};

const solve = (numRows, input) =>
    M.Identity(input.trim().split(''))
    .fold(row => genSafeTileCount(numRows, row));

module.exports = solve;
