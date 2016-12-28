'use strict';

const M = require('../../monad');

const getDecompressedLength = line => {
    function go(acc, line) {
        if (line.length === 0) { return acc; }
        const nextParen = line.indexOf('(');
        if (nextParen === -1) { return acc + line.length; }
        if (nextParen > 0) {
            return go(
                acc + line.slice(0, nextParen).length,
                line.slice(nextParen)
            );
        }

        const match = line.match(/^\((\d+)x(\d+)\)/);
        if (!match) { return go(acc + 1, line.slice(1)); }

        const capture = Number(match[1]);
        const repeats = Number(match[2]);
        const startAt = match[0].length;
        const part = line.slice(startAt, startAt + capture);
        return go(
            acc + (getDecompressedLength(part) * repeats),
            line.slice(startAt + capture)
        );
    }

    return go(0, line);
};

const solve = input =>
    M.Identity(input.trim())
    .fold(getDecompressedLength);

module.exports = solve;
