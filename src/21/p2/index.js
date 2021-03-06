'use strict';

const _ = require('../../util');
const M = require('../../monad');

const shiftRight = xs => xs.slice(-1).concat(xs.slice(0, -1));
const shiftLeft = xs => xs.slice(1).concat(xs.slice(0, 1));

const shiftN = (f, n, xs) => {
    n = n % xs.length;
    if (n === 0) { return xs; }
    return shiftN(f, n - 1, f(xs));
};

const SWAP_POS_INST = /^swap position (\d+) with position (\d+)$/;
const SWAP_LTR_INST = /^swap letter (\w) with letter (\w)$/;
const ROTATE_STEPS_INST = /^rotate (left|right) (\d+) steps?$/;
const ROTATE_POS_INST = /^rotate based on position of letter (\w)$/;
const REV_POS_INST = /^reverse positions (\d+) through (\d+)$/;
const MOVE_POS_INST = /^move position (\d+) to position (\d+)$/;

const swapPosInst = (x, y) => cs => {
    const ds = cs.slice(0);
    const temp = ds[x];
    ds[x] = ds[y];
    ds[y] = temp;
    return ds;
};

const revSwapPosInst = swapPosInst;

const swapLtrInst = (x, y) => cs =>
    cs.map(c => {
        if (c === x) {
            return y;
        } else if (c === y) {
            return x;
        }
        return c;
    });

const revSwapLtrInst = swapLtrInst;

const rotateStepsInst = (direction, n) => cs =>
    shiftN((direction === 'left' ? shiftLeft : shiftRight), Number(n), cs);

const revRotateStepsInst = (direction, n) =>
    rotateStepsInst((direction === 'left' ? 'right' : 'left'), n);

const revRotatePosInst = x => cs =>
    M.Identity(cs.indexOf(x))
    .fold(idx => shiftN(
        shiftLeft,
        Math.floor(idx / 2) + (idx % 2 ===  1 || idx === 0 ? 1 : 5),
        cs
    ));

const revPosInst = (x, y) => cs =>
    cs.slice(0, Number(x))
    .concat(cs.slice(Number(x), Number(y) + 1).reverse())
    .concat(cs.slice(Number(y) + 1));

const revRevPosInst = revPosInst;

const movePosInst = (x, y) => cs => {
    const ds = cs.slice(0);
    const temp = ds[x];
    ds.splice(Number(x), 1);
    ds.splice(Number(y), 0, temp);
    return ds;
};

const revMovePosInst = (x, y) => movePosInst(y, x);

const match = pattern => s => s.match(pattern);

const withMatch = (f, pattern) => s => f(...match(pattern)(s).slice(1));

const getCmd = _.cond([
    [match(SWAP_POS_INST), withMatch(revSwapPosInst, SWAP_POS_INST)],
    [match(SWAP_LTR_INST), withMatch(revSwapLtrInst, SWAP_LTR_INST)],
    [match(ROTATE_STEPS_INST), withMatch(revRotateStepsInst, ROTATE_STEPS_INST)],
    [match(ROTATE_POS_INST), withMatch(revRotatePosInst, ROTATE_POS_INST)],
    [match(REV_POS_INST), withMatch(revRevPosInst, REV_POS_INST)],
    [match(MOVE_POS_INST), withMatch(revMovePosInst, MOVE_POS_INST)],
    [() => true, inst => { throw new Error(`Invalid instruction "${inst}"`); }]
]);

const interpret = (s, instructions) =>
    instructions.reduce((acc, inst) => getCmd(inst)(acc), s.split(''))
    .join('');

const solve = (s, input) =>
    M.Identity(input.trim().split('\n').map(s => s.trim()))
    .map(insts => insts.reverse())
    .fold(insts => interpret(s, insts));

module.exports = solve;
