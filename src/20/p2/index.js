'use strict';

const _ = require('../../util');
const M = require('../../monad');

const parseBlacklist = input =>
    input.trim().split('\n')
    .map(line => line.trim().split('-').map(Number));

const mergeRanges = ranges => {
    function go(acc, rs) {
        if (rs.length === 0) { return acc; }
        const head = rs[0];
        const tail = rs.slice(1);
        if (acc.length === 0) { return go([head], tail); }
        const [start, end] = head;
        const [lastStart, lastEnd] = acc[acc.length - 1];

        if (start > lastEnd) {
            return go(acc.concat([head]), tail);
        } else if (start <= lastEnd && lastEnd < end) {
            return go(acc.slice(0, -1).concat([[lastStart, end]]), tail);
        } else {
            return go(acc, tail);
        }
    }

    return go([], ranges);
};

const numIpsAllowed = (min, max, blacklist) => {
    const blist = mergeRanges(_.sortBy(_.nth(0))(blacklist));
    let i = 0;
    let sum = blist[0][0] - min;

    while (i < blist.length - 1) {
        const [, end] = blist[i];
        const [nextStart] = blist[i + 1];
        if (end < nextStart) {
            sum += ((nextStart - end) - 1);
        }
        i += 1;
    }

    return sum + (max - blist[blist.length - 1][1]);
};

const solve = (min, max, input) =>
    M.Identity(parseBlacklist(input))
    .fold(blacklist => numIpsAllowed(min, max, blacklist));

module.exports = solve;
