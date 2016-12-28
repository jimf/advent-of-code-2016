'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 3 (p2): Squares with Three Sides', t => {
    t.equal(
        subject(`101 301 501
                 102 302 502
                 103 303 503
                 201 401 601
                 202 402 602
                 203 403 603`),
        6
    );
    t.end();
});
