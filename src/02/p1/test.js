'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 2 (p1): Bathroom Security', t => {
    t.equal(subject('ULL\nRRDDD\nLURDL\nUUUUD'), '1985');
    t.end();
});
