'use strict';

const _ = require('../../util');
const M = require('../../monad');

const flipBits = s =>
    s.split('').map(c => c === '0' ? '1' : '0').join('');

const dragonCurve = s => s.concat('0').concat(flipBits(_.reverse(s)));

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

const _checksum = input =>
    input.match(/.{2}/g)
    .map(pair => pair.split(''))
    .map(([x, y]) => x === y ? '1' : 0)
    .join('');

const checksum = until(_.B(isOdd, length), _checksum);

const solve = (size, input) =>
    M.Identity(fillDisk(size)(input))
    .map(s => s.slice(0, size))
    .fold(checksum);

module.exports = solve;
