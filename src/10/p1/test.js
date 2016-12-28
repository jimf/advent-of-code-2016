'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 10 (p1): Balance Bots', t => {
    t.equal(
        subject(`
            value 5 goes to bot 2
            bot 2 gives low to bot 1 and high to bot 0
            value 3 goes to bot 1
            bot 1 gives low to output 1 and high to bot 0
            bot 0 gives low to output 2 and high to output 0
            value 2 goes to bot 2
        `, 2, 5),
        'bot2'
    );
    t.end();
});
