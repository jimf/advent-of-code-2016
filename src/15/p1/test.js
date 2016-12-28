'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 15 (p1): Timing is Everything', t => {
    t.equal(
        subject(`
            Disc #1 has 5 positions; at time=0, it is at position 4.
            Disc #2 has 2 positions; at time=0, it is at position 1.
        `),
        5
    );
    t.end();
});
