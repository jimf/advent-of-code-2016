'use strict';

const test = require('tape');
const BinaryHeap = require('./binary_heap');

test('Binary Heap', t => {
    const subject = new BinaryHeap();
    const values = [17, 36, 4, 18, 42, 12];
    values.forEach(n => subject.push(n));
    t.equal(subject.length, values.length, 'has expected length after pushing');

    const actual = [];
    const expected = values.slice(0);
    expected.sort((x, y) => x - y);
    values.forEach(() => actual.push(subject.pop()));
    t.deepEqual(actual, expected, 'pops the smallest value');

    t.end();
});
