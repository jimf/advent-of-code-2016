'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 9 (p2): Explosives in Cyberspace', t => {
    t.equal(subject('(3x3)XYZ'), 'XYZXYZXYZ'.length);
    t.equal(subject('X(8x2)(3x3)ABCY'), 'XABCABCABCABCABCABCY'.length);
    t.equal(subject('(27x12)(20x12)(13x14)(7x10)(1x12)A'), 241920);
    t.equal(subject('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN'), 445);
    t.end();
});
