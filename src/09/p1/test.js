'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 9 (p1): Explosives in Cyberspace', t => {
    t.equal(subject('ADVENT'), 'ADVENT'.length);
    t.equal(subject('A(1x5)BC'), 'ABBBBBC'.length);
    t.equal(subject('(3x3)XYZ'), 'XYZXYZXYZ'.length);
    t.equal(subject('A(2x2)BCD(2x2)EFG'), 'ABCBCDEFEFG'.length);
    t.equal(subject('(6x1)(1x3)A'), '(1x3)A'.length);
    t.equal(subject('X(8x2)(3x3)ABCY'), 'X(3x3)ABC(3x3)ABCY'.length);
    t.end();
});
