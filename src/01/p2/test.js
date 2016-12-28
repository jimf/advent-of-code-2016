'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 1 (p2): No time for a Taxicab', t => {
    t.equal(subject('R8, R4, R4, R8'), 4);
    t.end();
});
