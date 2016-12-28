'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 3 (p1): Squares with Three Sides', t => {
    t.equal(subject('5 10 25'), 0);
    t.end();
});
