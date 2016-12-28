'use strict';
/*jshint unused:false*/

const Identity = x => ({
    map: f => Identity(f(x)),
    fold: f => f(x)
});

const Just = x => ({
    x,
    map: f => Just(f(x)),
    fold: (f, g) => g(x)
});

const Nothing = () => ({
    map: f => Nothing(),
    fold: (f, g) => f()
});

const Maybe = {
    Just,
    Nothing,
    of: Just,
    fromNullable: val => (val === null || val === undefined) ? Nothing() : Just(val)
};

module.exports = {
    Identity,
    Maybe
};
