'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 17 (p1): Two Steps Forward', t => {
    t.equal(subject('ihgpwlah'), 'DDRRRD');
    t.equal(subject('kglvqrro'), 'DDUDRLRRUDRD');
    t.equal(subject('ulqzkmiv'), 'DRURDRUDDLLDLUURRDULRLDUUDDDRR');
    t.end();
});
