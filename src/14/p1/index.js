'use strict';

const _ = require('../../util');
const M = require('../../monad');

const getFirstTriplet = s =>
    M.Maybe.fromNullable(s.match(/(.)\1{2}/g))
    .fold(
        _.K(false),
        ms => ms[0][0]
    );

const getQuints = s =>
    M.Maybe.fromNullable(s.match(/(.)\1{4}/g))
    .fold(
        _.K(false),
        ms => ms.map(m => m[0]).reduce(
            (acc, c) => Object.assign(acc, { [c]: true }),
            {}
        )
    );

const OneTimeKeys = salt => ({
    [Symbol.iterator]() {
        const triplets = [];
        const quints = [];
        let i = 0;

        const nextHash = () => {
            const hash = _.md5(salt + String(i));
            const triplet = getFirstTriplet(hash);
            const quint = getQuints(hash);
            if (triplet) {
                triplets.push({
                    index: i,
                    hash,
                    triplet
                });
            }
            if (quint) {
                quints.push({
                    index: i,
                    hash,
                    quint
                });
            }
            i += 1;
        };

        const nextUntil = f => {
            do {
                nextHash();
            } while (!f());
        };

        const genNextTriplet = () => {
            nextUntil(() => quints.length > 0);
            const tripletIdx = triplets[0].index;
            while (quints.length && quints[0].index <= tripletIdx) {
                quints.shift();
            }
        };

        return {
            next() {
                let value;
                while (!value) {
                    genNextTriplet();
                    const triplet = triplets.shift();
                    const maxIndex = triplet.index + 1000;
                    nextUntil(() => (
                        quints.length &&
                        quints[quints.length - 1].index > maxIndex
                    ));
                    let i = 0;
                    while (i < quints.length && quints[i].index <= maxIndex && !value) {
                        if (quints[i].quint[triplet.triplet]) {
                            value = {
                                index: triplet.index,
                                hash: triplet.hash
                            };
                        }
                        i += 1;
                    }
                }
                return { value, done: false };
            }
        };
    }
});

const take = (n, iterable) => ({
    [Symbol.iterator]() {
        const iterator = iterable[Symbol.iterator]();
        let i = 0;
        return {
            next() {
                i += 1;
                const { done, value } = iterator.next();
                if (done || i > n) {
                    return { done: true };
                }
                return { value };
            }
        };
    }
});

const solve = salt => {
    const keys = Array.from(take(64, OneTimeKeys(salt)));
    return keys[keys.length - 1].index;
};

module.exports = solve;
