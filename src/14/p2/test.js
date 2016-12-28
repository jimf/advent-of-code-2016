'use strict';

const
    test = require('tape'),
    subject = require('.');

// Skip. Slow.
test.skip('Day 14 (p2): One-Time Pad', t => {
    t.equal(subject('abc'), 22551);
    t.end();
});
