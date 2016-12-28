'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 1 (p1): No time for a Taxicab', t => {
    t.equal(subject('R2, L3'), 5);
    t.equal(subject('R2, R2, R2'), 2);
    t.equal(subject('R5, L5, R5, R3'), 12);
    t.end();
});
