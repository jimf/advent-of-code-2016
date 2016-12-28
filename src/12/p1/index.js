'use strict';

const _ = require('../../util');
const M = require('../../monad');

const inc = x => x + 1;

const dec = x => x - 1;

const isRegister = x => ['a', 'b', 'c', 'd'].indexOf(x) >= 0;

const initState = () => ({
    _pointer: 0,
    a: null,
    b: null,
    c: 1,
    d: null
});

const cpyInst = (x, y) => state =>
    _.evolve({
        _pointer: inc,
        [y]: () => isRegister(x) ? state[x] : Number(x)
    })(state);

const incInst = x =>
    _.evolve({
        _pointer: inc,
        [x]: inc
    });

const decInst = x =>
    _.evolve({
        _pointer: inc,
        [x]: dec
    });

const jnzInst = (x, y) => state =>
    _.evolve({
        _pointer: p => {
            const val = Number(isRegister(x) ? state[x] : x);
            return val === 0 ? p + 1 : p +  Number(y);
        }
    })(state);

const CPY_INST = /^cpy ([abcd]|\d+) ([abcd])$/;
const INC_INST = /^inc ([abcd])$/;
const DEC_INST = /^dec ([abcd])$/;
const JNZ_INST = /^jnz ([abcd]|\d+) (-?\d+)$/;

const match = pattern => s => s.match(pattern);

const withMatch = (f, pattern) => s => f(...match(pattern)(s).slice(1));

const getCmd = _.cond([
    [match(CPY_INST), withMatch(cpyInst, CPY_INST)],
    [match(INC_INST), withMatch(incInst, INC_INST)],
    [match(DEC_INST), withMatch(decInst, DEC_INST)],
    [match(JNZ_INST), withMatch(jnzInst, JNZ_INST)],
    [() => true, inst => { throw new Error(`Invalid instruction "${inst}"`); }]
]);

const isNumber = x => !isNaN(x) && global.toString.call(x) === '[object Number]';
const isValidState = state => Object.keys(state)
    .map(k => state[k])
    .every(v => v === null || isNumber(v));

const evalInstructions = instructions => {
    let state = initState();
    while (instructions[state._pointer]) {
        const inst = instructions[state._pointer];
        const cmd = getCmd(inst);
        state = cmd(state);
        if (!isValidState(state)) {
            console.log(state);
            throw new Error('State invalid!');
        }
    }
    return state;
};

const solve = input =>
    M.Identity(input.trim().split('\n').map(s => s.trim()))
    .map(evalInstructions)
    .fold(state => state.a);

module.exports = solve;
