'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 19 (p2): An Elephant Named Joseph', t => {
    t.equal(subject(5), 2);
    t.end();
});
