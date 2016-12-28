'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 21 (p1): Scrambled Letters and Hash', t => {
    t.equal(
        subject('abcde', `swap position 4 with position 0
                          swap letter d with letter b
                          reverse positions 0 through 4
                          rotate left 1 step
                          move position 1 to position 4
                          move position 3 to position 0
                          rotate based on position of letter b
                          rotate based on position of letter d`),
        'decab'
    );
    t.equal(
        subject('abcdefgh', `rotate based on position of letter a
                             swap letter g with letter d
                             move position 1 to position 5
                             reverse positions 6 through 7
                             move position 5 to position 4
                             rotate based on position of letter b
                             reverse positions 6 through 7
                             swap letter h with letter f
                             swap letter e with letter c
                             reverse positions 0 through 7
                             swap position 6 with position 4
                             rotate based on position of letter e
                             move position 2 to position 7
                             swap position 6 with position 4
                             rotate based on position of letter e
                             reverse positions 2 through 3`),
        'dagecbhf'
    );
    t.end();
});
