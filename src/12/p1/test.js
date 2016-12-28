'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 12 (p1): Leonardo\'s Monorail', t => {
    t.equal(
        subject(`
            cpy 41 a
            inc a
            inc a
            dec a
            jnz a 2
            dec a
        `),
        42
    );
    t.end();
});
