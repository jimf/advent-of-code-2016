'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 13 (p1): A Maze of Twisty Little Cubicles', t => {
    t.equal(subject([7, 4], 10), 11);
    t.end();
});
