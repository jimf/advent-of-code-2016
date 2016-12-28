'use strict';

const crypto = require('crypto');

const add = (x, y) => x + y;
const concat = (xs, ys) => xs.concat(ys);

// Combinators.
exports.B = (f, g) => x => f(g(x));
exports.I = x => x;
exports.K = x => _ => x; //jshint ignore:line

exports.append = (value, xs) => xs.slice(0).concat([value]);

exports.assoc = (key, value, obj) => Object.assign({}, obj, { [key]: value });

exports.cond = conds => x => {
    for (let i = 0; i < conds.length; i += 1) {
        const [test, f] = conds[i];
        if (test(x)) { return f(x); }
    }
};

// :: (a -> b) -> Array a -> Object
exports.countBy = f => xs =>
    xs.reduce((acc, x) => {
        const result = f(x);
        if (acc[result]) {
            acc[result] += 1;
        } else {
            acc[result] = 1;
        }
        return acc;
    }, {});

exports.evolve = spec => obj => {
    const result = Object.assign({}, obj);
    Object.keys(spec).forEach(key => {
        if (!(key in result)) { return; }
        if (typeof spec[key] === 'function') {
            result[key] = spec[key](result[key]);
        } else {
            result[key] = exports.evolve(spec[key])(result[key]);
        }
    });
    return result;
};

exports.flatten = xs => xs.reduce(concat, []);

// :: a -> a
exports.id = exports.I;

exports.compose = (...funcs) => funcs.reduce(exports.B, exports.I);

// :: forall Functor F => (a -> b) -> F a -> F b
exports.map = f => xs => xs.map(f);

// :: Regex -> String -> Array String
exports.match = pattern => s => {
    const result = s.match(pattern);
    return result ? result.slice(1) : [];
};

exports.md5 = str => crypto.createHash('md5').update(str).digest('hex');

exports.modifyNth = (f, n) => xs => {
    if (n >= xs.length) { return xs; }
    const ys = xs.slice(0);
    ys[n] = f(ys[n]);
    return ys;
};

// :: Number -> Array a -> a
exports.nth = idx => xs => xs[idx];

// :: Object -> Array [String, a]
exports.pairs = obj =>
    Object.keys(obj).reduce((acc, key) => {
        acc.push([key, obj[key]]);
        return acc;
    }, []);

exports.reverse = xs =>
    xs.reverse ? xs.reverse : xs.split('').reverse().join('');

// :: (a -> b) -> Array a -> Array a
exports.sortBy = f => xs => {
    const ys = xs.slice(0);
    ys.sort((a, b) => {
        const _a = f(a);
        const _b = f(b);
        if (_a < _b) {
            return -1;
        } else if (_a > _b) {
            return 1;
        } else {
            return 0;
        }
    });
    return ys;
};

// :: String -> Array String
exports.splitLines = s => s.split('\n');

// :: Array Number -> Number
exports.sum = xs => xs.reduce(add, 0);
