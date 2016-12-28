'use strict';

const M = require('../../monad');

const decompress = line => {
    function go(acc, line) {
        if (line.length === 0) { return acc; }
        const nextParen = line.indexOf('(');
        if (nextParen === -1) { return acc + line; }
        if (nextParen > 0) {
            return go(
                acc + line.slice(0, nextParen),
                line.slice(nextParen)
            );
        }

        const match = line.match(/^\((\d+)x(\d+)\)/);
        if (!match) { return go(acc + '(', line.slice(1)); }

        const capture = Number(match[1]);
        const repeats = Number(match[2]);
        const startAt = match[0].length;
        const part = line.slice(startAt, startAt + capture);
        return go(
            acc + part.repeat(repeats),
            line.slice(startAt + capture)
        );
    }

    return go('', line);
};

const solve = input =>
    M.Identity(input.trim())
    .map(decompress)
    .map(s => s.replace(/\s/g, ''))
    .fold(s => s.length);

module.exports = solve;
