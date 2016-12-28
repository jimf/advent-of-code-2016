'use strict';

const _ = require('../../util');
const M = require('../../monad');

const createArray = (len, fill) => (new Array(len)).fill(fill);

const createMatrix = (w, h, fill) =>
    createArray(h, null).map(() => createArray(w, fill));

const shiftArrayRight = xs => xs.slice(-1).concat(xs.slice(0, -1));

const shiftArrayRightN = (n, xs) => {
    n = n % xs.length;
    if (n === 0) { return xs; }
    return shiftArrayRightN(n - 1, shiftArrayRight(xs));
};

const getRow = (i, matrix) => matrix[i];

const getCol = (i, matrix) => matrix.map(_.nth(i));

const project = (top, bottom) => {
    const result = [];
    for (let i = 0, len = bottom.length; i < len; i += 1) {
        result.push([]);
        for (let j = 0, len2 = bottom[i].length; j < len2; j += 1) {
            result[i].push(
                top[i] && top[i][j] !== undefined ? top[i][j] : bottom[i][j]
            );
        }
    }
    return result;
};

const projectRow = (idx, row, matrix) => _.modifyNth(_.K(row), idx)(matrix);

const projectCol = (idx, col, matrix) =>
    matrix.map((row, i) => _.modifyNth(_.K(col[i]), idx)(row));

const RECT_CMD = /^rect (\d+)x(\d+)$/;
const ROTATE_ROW_CMD = /^rotate row y=(\d+) by (\d+)$/;
const ROTATE_COL_CMD = /^rotate column x=(\d+) by (\d+)$/;

const rectCmd = (w, h) => matrix => project(createMatrix(w, h, true), matrix);

const rotateRowCmd = (idx, shifts) => matrix =>
    projectRow(idx, shiftArrayRightN(shifts, getRow(idx, matrix)), matrix);

const rotateColCmd = (idx, shifts) => matrix =>
    projectCol(idx, shiftArrayRightN(shifts, getCol(idx, matrix)), matrix);

const interpretCommand = (matrix, line) => {
    line = line.trim();
    let match;
    let cmd;

    match = line.match(RECT_CMD);
    if (match) {
        cmd = rectCmd.apply(null, match.slice(1).map(Number));
    }

    if (!cmd) {
        match = line.match(ROTATE_ROW_CMD);
        if (match) {
            cmd = rotateRowCmd.apply(null, match.slice(1).map(Number));
        }
    }

    if (!cmd) {
        match = line.match(ROTATE_COL_CMD);
        if (match) {
            cmd = rotateColCmd.apply(null, match.slice(1).map(Number));
        }
    }

    return cmd ? cmd(matrix) : matrix;
};

const solve = input =>
    M.Identity(input.trim().split('\n'))
    .map(cmds => cmds.reduce(interpretCommand, createMatrix(50, 6, false)))
    .map(_.flatten)
    .map(cells => cells.filter(_.id))
    .fold(litCells => litCells.length);

module.exports = solve;
