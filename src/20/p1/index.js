'use strict';

const _ = require('../../util');
const M = require('../../monad');

const parseBlacklist = input =>
    input.trim().split('\n')
    .map(line => line.trim().split('-').map(Number));

const searchMinAllowed = (min, max, blacklist) => {
    const blist = _.sortBy(_.nth(0))(blacklist);
    let i = 0;
    let guess = min;

    while (i < blist.length) {
        const [start, end] = blist[i];
        if (guess < start) {
            return guess;
        } else if (start <= guess && guess <= end) {
            guess = end + 1;
        }
        i += 1;
    }

    return false;
};

const solve = (min, max, input) =>
    M.Identity(parseBlacklist(input))
    .fold(blacklist => searchMinAllowed(min, max, blacklist));

module.exports = solve;
