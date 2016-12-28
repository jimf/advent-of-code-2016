'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 7 (p1): Internet Protocol Version 7', t => {
    t.equal(subject('abba[mnop]qrst'), 1);
    t.equal(subject('abcd[bddb]xyyx'), 0);
    t.equal(subject('aaaa[qwer]tyui'), 0);
    t.equal(subject('ioxxoj[asdfgh]zxcvbn'), 1);
    t.end();
});
