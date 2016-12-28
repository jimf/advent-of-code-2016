'use strict';

const _ = require('../../util');
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

const fillRows = (numRows, rows) => {
    if (rows.length >= numRows) { return rows; }
    return fillRows(numRows, rows.concat([nextRow(rows[rows.length - 1])]));
};

const countSafeTiles = rows => _.flatten(rows).filter(c => c === '.').length;

const solve = (numRows, input) =>
    M.Identity(input.trim().split('\n'))
    .map(rows => rows.map(row => row.trim().split('')))
    .map(rows => fillRows(numRows, rows))
    .fold(countSafeTiles);

module.exports = solve;
