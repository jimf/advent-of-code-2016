'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 14 (p1): One-Time Pad', t => {
    t.equal(subject('abc'), 22728);
    t.end();
});
