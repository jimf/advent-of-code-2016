'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 17 (p2): Two Steps Forward', t => {
    t.equal(subject('ihgpwlah'), 370);
    t.equal(subject('kglvqrro'), 492);
    t.equal(subject('ulqzkmiv'), 830);
    t.end();
});
