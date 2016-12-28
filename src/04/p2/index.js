'use strict';

var _ = require('../../util');
var M = require('../../monad');

const parseLine = line => {
    const match = line.trim().match(/^([a-z\-]+)-(\d+)\[([a-z]+)\]$/);
    if (!match) { throw new Error('Bad input'); }
    return match.slice(1);
};

const take = n => xs => xs.slice(0, n);

const isRealRoom = ([name, secId, checksum]) =>
    M.Identity(name.split('').filter(c => c !== '-'))
    .map(_.countBy(_.id))
    .map(_.pairs)
    .map(xs => {
        xs.sort((a, b) => {
            if (a[1] > b[1]) {
                return -1;
            } else if (a[1] < b[1]) {
                return 1;
            } else if (a[0] < b[0]) {
                return -1;
            } else if (a[0] > b[0]) {
                return 1;
            }
            return 0;
        });
        return xs;
    })
    .map(take(5))
    .map(_.map(_.nth(0)))
    .map(xs => xs.join(''))
    .fold(top5 => checksum === top5);

const cypherShiftChar = (c, delta) => {
    const min = 'a'.charCodeAt(0);
    return M.Identity(c.charCodeAt(0))
        .map(n => n - min)
        .map(n => n + delta)
        .map(n => n % 26)
        .map(n => n + min)
        .fold(String.fromCharCode);
};

const solve = input =>
    M.Identity(input.trim())
    .map(_.splitLines)
    .map(_.map(parseLine))
    .map(lines => lines.filter(isRealRoom))
    .map(_.map(([name, secId]) => {
        const decrypted = name.split('').map(c => {
            if (c === '-') { return ' '; }
            return cypherShiftChar(c, Number(secId));
        }).join('');
        return [decrypted, secId];
    }))
    .fold(lines => lines.filter(([decrypted]) => decrypted.includes('stor')));

module.exports = solve;
