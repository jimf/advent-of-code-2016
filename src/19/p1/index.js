'use strict';

const M = require('../../monad');

const head = xs => xs[0];

const tail = xs => xs.slice(1);

const toBinary = n => n.toString(2);

const binToInt = b => parseInt(b, 2);

const solve = n =>
    M.Identity(toBinary(Number(n)))
    .map(b => tail(b) + head(b))
    .fold(binToInt);

module.exports = solve;
