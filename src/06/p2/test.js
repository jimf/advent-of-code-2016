'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 6 (p2): Signals and Noise', t => {
    t.equal(
        subject(`eedadn
                 drvtee
                 eandsr
                 raavrd
                 atevrs
                 tsrnev
                 sdttsa
                 rasrtv
                 nssdts
                 ntnada
                 svetve
                 tesnvt
                 vntsnd
                 vrdear
                 dvrsen
                 enarar`),
        'advent'
    );
    t.end();
});
