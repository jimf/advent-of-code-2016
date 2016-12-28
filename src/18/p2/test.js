'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 18 (p2): Like a Rogue', t => {
    t.equal(subject(3, '..^^.'), 6);
    t.equal(subject(10, '.^^.^.^^^^'), 38);
    t.end();
});
