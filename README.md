# Advent of Code 2016

My [Advent of Code 2016][] solutions (in JavaScript).

## Usage

Actual code is dependency free. Generally in order to run a solution, open a
Node.js REPL, require the given solution, and feed the resulting function the
puzzle input (some puzzles take additional arguments):

```
$ node
> solve = require('./src/01/p1')
[Function: solve]
> .editor
// Entering editor mode (^D to finish, ^C to cancel)
solve(`
R4, R3, L3, L2, L1,... <snip>
`)

288
```

Running the tests: (NOTE: some tests are skipped, as they are quite slow)

    $ npm install

## Comment

With the exception of the standard Node.js [crypto](https://nodejs.org/api/crypto.html)
module for generating md5 hashes, I decided not to pull in any external
libraries for completing these puzzles. As such, I organically built out some
utility functions/classes in the `src/` root to reuse what I could. Most of the
code is written in a fairly "functional" style.

## License

MIT

[Advent of Code]: http://adventofcode.com/2016
