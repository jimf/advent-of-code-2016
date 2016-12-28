'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 2 (p2): Bathroom Security', t => {
    t.equal(subject('ULL\nRRDDD\nLURDL\nUUUUD'), '5DB3');
    t.end();
});
