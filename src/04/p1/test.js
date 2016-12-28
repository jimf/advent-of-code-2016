'use strict';

const
    test = require('tape'),
    subject = require('.');

test('Day 4 (p1): Security Through Obscurity', t => {
    t.equal(
        subject(`aaaaa-bbb-z-y-x-123[abxyz]
                 a-b-c-d-e-f-g-h-987[abcde]
                 not-a-real-room-404[oarel]
                 totally-real-room-200[decoy]`),
        1514
    );
    t.end();
});
