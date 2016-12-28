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

const solve = input =>
    M.Identity(input.trim())
    .map(_.splitLines)
    .map(_.map(parseLine))
    .map(_.map(line => isRealRoom(line) ? Number(line[1]) : 0))
    .fold(_.sum);

module.exports = solve;
