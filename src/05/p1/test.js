'use strict';

const
    test = require('tape'),
    subject = require('.');

// Skip. Very slow.
test.skip('Day 5 (p1): How About a Nice Game of Chess?', t => {
    t.equal(subject('abc'), '18f47a30');
    t.end();
});
