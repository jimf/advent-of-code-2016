'use strict';

const _ = require('../../util');

const generatePassword = doorId => {
    let pw = '';
    let i = 0;
    while (pw.length < 8) {
        let hash = _.md5(`${doorId}${i}`);
        if (hash.startsWith('00000')) { pw += hash[5]; }
        i += 1;
    }
    return pw;
};

const solve = input => generatePassword(input.trim());

module.exports = solve;
