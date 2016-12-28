'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 16 (p1): Dragon Checksum', t => {
    t.equal(subject(20, '10000'), '01100');
    t.end();
});
