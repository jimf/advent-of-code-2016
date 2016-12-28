'use strict';

const _ = require('../../util');
const M = require('../../monad');

const reverseString = s => s.split('').reverse().join('');

const isAbba = s => s.length === 4 && s[0] !== s[1] && s === reverseString(s);

const movingWindow = n => xs => {
    function go(acc, xs) {
        if (xs.length < n) { return acc; }
        acc.push(xs.slice(0, n));
        return go(acc, xs.slice(1));
    }
    return go([], xs);
};

const containsAbba = s => movingWindow(4)(s).some(isAbba);

const Ipv7Parser = () => {
    const hypernetSeqs = [];
    const nonHypernetSeqs = [];
    let seq = '';
    let state;

    var OutsideBrackets = () => ({
        read(c) {
            switch (c) {
                case '[':
                    state = InsideBrackets();
                    nonHypernetSeqs.push(seq);
                    seq = '';
                    break;

                case '\n':
                    nonHypernetSeqs.push(seq);
                    seq = '';
                    break;

                default:
                    seq += c;
            }
        }
    });

    var InsideBrackets = () => ({
        read(c) {
            switch (c) {
                case ']':
                    state = OutsideBrackets();
                    hypernetSeqs.push(seq);
                    seq = '';
                    break;

                case '\n':
                    hypernetSeqs.push(seq);
                    seq = '';
                    break;

                default:
                    seq += c;
            }
        }
    });

    state = OutsideBrackets();

    return {
        read: c => state.read(c),
        hypernetSeqs: () => hypernetSeqs.slice(0),
        nonHypernetSeqs: () => nonHypernetSeqs.slice(0)
    };
};

const parseIpv7 = s => {
    const parser = Ipv7Parser();
    s.trim().concat('\n').split('').forEach(parser.read);
    return {
        hypernetSeqs: parser.hypernetSeqs(),
        nonHypernetSeqs: parser.nonHypernetSeqs()
    };
};

const supportsTls = ip => {
    const { hypernetSeqs, nonHypernetSeqs } = parseIpv7(ip);
    return nonHypernetSeqs.some(containsAbba) && !hypernetSeqs.some(containsAbba);
};

/**
 * Divide and conquer. First split up each line into hypernet and non-hypernet
 * sequences. For each sequence, check to see if the sequence contains an ABBA
 * (using a "moving window" to check each 4-character sub-sequence) and act
 * accordingly.
 */
const solve = lines =>
    M.Identity(lines.trim().split('\n'))
    .map(_.map(line => Number(supportsTls(line))))
    .fold(_.sum);

module.exports = solve;
