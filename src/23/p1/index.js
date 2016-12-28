'use strict';

const _ = require('../../util');
const M = require('../../monad');

const inc = x => x + 1;
const dec = x => x - 1;

const isRegister = x => ['a', 'b', 'c', 'd'].indexOf(x) >= 0;

const initState = (initialA, instructions) => ({
    _pointer: 0,
    instructions,
    a: initialA,
    b: null,
    c: null,
    d: null
});

const toggleCmd = inst => {
    switch (inst.slice(0, 3)) {
        case 'inc': return inst.replace('inc', 'dec');
        case 'dec': return inst.replace('dec', 'inc');
        case 'cpy': return inst.replace('cpy', 'jnz');
        case 'jnz': return inst.replace('jnz', 'cpy');
        case 'tgl': return inst.replace('tgl', 'inc');

        default: return inst;
    }
};

const getRegister = (reg, state) => isRegister(reg) ? state[reg] : Number(reg);

const cpyInst = (x, y) => state =>
    _.evolve({
        _pointer: inc,
        [y]: () => getRegister(x, state)
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
            const val = getRegister(x, state);
            return val === 0 ? p + 1 : p + getRegister(y, state);
        }
    })(state);

const tglInst = x => state =>
    _.evolve({
        _pointer: inc,
        instructions: _.modifyNth(
            toggleCmd,
            state._pointer + getRegister(x, state)
        )
    })(state);

const CPY_INST = /^cpy ([abcd]|-?\d+) ([abcd])$/;
const INC_INST = /^inc ([abcd])$/;
const DEC_INST = /^dec ([abcd])$/;
const JNZ_INST = /^jnz ([abcd]|\d+) ([abcd]|-?\d+)$/;
const TGL_INST = /^tgl ([abcd]|\d+)$/;

const match = pattern => s => s.match(pattern);

const withMatch = (f, pattern) => s => f(...match(pattern)(s).slice(1));

const getCmd = _.cond([
    [match(CPY_INST), withMatch(cpyInst, CPY_INST)],
    [match(INC_INST), withMatch(incInst, INC_INST)],
    [match(DEC_INST), withMatch(decInst, DEC_INST)],
    [match(JNZ_INST), withMatch(jnzInst, JNZ_INST)],
    [match(TGL_INST), withMatch(tglInst, TGL_INST)],
    [() => true, inst => { throw new Error(`Invalid instruction "${inst}"`); }]
]);

const evalInstructions = state => {
    while (state.instructions[state._pointer]) {
        const cmd = getCmd(state.instructions[state._pointer]);
        state = cmd(state);
    }
    return state;
};

const solve = (initialA, input) =>
    M.Identity(input.trim().split('\n').map(s => s.trim()))
    .map(lines => initState(initialA, lines))
    .map(evalInstructions)
    .fold(state => state.a);

module.exports = solve;
