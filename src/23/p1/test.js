'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 23 (p1): Safe Cracking', t => {
    t.equal(
        subject(null, `cpy 2 a
                       tgl a
                       tgl a
                       tgl a
                       cpy 1 a
                       dec a
                       dec a`),
        3
    );
    t.end();
});
