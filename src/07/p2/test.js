'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 7 (p2): Internet Protocol Version 7', t => {
    t.equal(subject('aba[bab]xyz'), 1);
    t.equal(subject('xyx[xyx]xyx'), 0);
    t.equal(subject('aaa[kek]eke'), 1);
    t.equal(subject('zazbz[bzb]cdb'), 1);
    t.end();
});
