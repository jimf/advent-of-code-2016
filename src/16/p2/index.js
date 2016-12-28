'use strict';

const _ = require('../../util');
const M = require('../../monad');

const flipReverse = s => {
    let result = '';
    for (let i = s.length - 1; i >= 0; i -= 1) {
        result += s[i] === '0' ? '1' : '0';
    }
    return result;
};

const dragonCurve = s => `${s}0${flipReverse(s)}`;

const until = (pred, f) => x => {
    let result = x;
    while (!pred(result)) {
        result = f(result);
    }
    return result;
};

const length = s => s.length;

const gt = x => y => y > x;

const fillDisk = size => until(_.B(gt(size), length), dragonCurve);

const isOdd = x => x % 2 === 1;

const _checksum = input => {
    let result = '';
    let i = 0;
    while (input[i] && input[i + 1]) {
        result += input[i] === input[i + 1] ? '1' : '0';
        i += 2;
    }
    return result;
};

const checksum = until(_.B(isOdd, length), _checksum);

const solve = (size, input) =>
    M.Identity(fillDisk(size)(input))
    .map(s => s.slice(0, size))
    .fold(checksum);

module.exports = solve;
