'use strict';

const
    test = require('tape'),
    subject = require('.');

test.skip('Day 11 (p1): Radioisotope Thermoelectric Generators', t => {
    t.equal(
        subject(`
            The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.
            The second floor contains a hydrogen generator.
            The third floor contains a lithium generator.
            The fourth floor contains nothing relevant.
        `),
        9
    );
    t.end();
});
