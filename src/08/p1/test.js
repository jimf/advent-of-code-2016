'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 8 (p1): Two-Factor Authentication', t => {
    t.equal(
        subject(`rect 3x2
                 rotate column x=1 by 1
                 rotate row y=0 by 4
                 rotate column x=1 by 1`),
        6
    );
    t.end();
});
