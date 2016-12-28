'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 19 (p1): An Elephant Named Joseph', t => {
    t.equal(subject(5), 3);
    t.end();
});
