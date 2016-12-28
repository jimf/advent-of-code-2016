'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 20 (p1): Firewall Rules', t => {
    t.equal(
        subject(0, 9, `5-8
                       0-2
                       4-7`),
        3
    );
    t.end();
});
