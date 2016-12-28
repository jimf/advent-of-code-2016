'use strict';

const testTriple = (x, y, z) => {
    return (x + y > z) && (y + z > x) && (x + z > y);
};

const id = x => x;

const solve = input => {
    return input.trim().split('\n').reduce((acc, line) => {
        const nums = line.split(/\s/).filter(id).map(n => parseInt(n, 10));
        if (nums.length !== 3) { throw new Error('bad input!'); }
        return testTriple.apply(null, nums) ? acc + 1 : acc;
    }, 0);
};

module.exports = solve;
