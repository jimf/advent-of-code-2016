'use strict';

const _ = require('../../util');

const generatePassword = doorId => {
    let pw = '????????'.split('');
    let i = 0;
    while (pw.indexOf('?') >= 0) {
        let hash = _.md5(`${doorId}${i}`);
        let idx = Number(hash[5]);
        if (hash.startsWith('00000') && idx < 8 && pw[idx] === '?') {
            pw[idx] = hash[6];
        }
        i += 1;
    }
    return pw.join('');
};

const solve = input => generatePassword(input.trim());

module.exports = solve;
