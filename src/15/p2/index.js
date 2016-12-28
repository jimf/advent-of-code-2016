'use strict';

const _ = require('../../util');
const M = require('../../monad');

const INPUT_LINE = /^Disc #(\d+) has (\d+) positions; at time=0, it is at position (\d+)\.$/;

const parseInput = input =>
    M.Identity(input.trim().split('\n'))
    .map(_.map(line => line.trim().match(INPUT_LINE)))
    .map(matches => matches.filter(_.id))
    .fold(_.map(match => ({
        index: Number(match[1]) - 1,
        positions: Number(match[2]),
        initialPosition: Number(match[3])
    })));

const Machine = config => {
    let time;
    let state;
    let discs;

    var Start = () => ({
        tick() {
            state = Dropping();
            time += 1;
        }
    });

    var Disc = opts => ({
        tick() {
            if ((opts.initialPosition + time) % opts.positions === 0) {
                state = Dropping();
            } else {
                state = BouncedAway();
            }
            time += 1;
        }
    });

    var Dropping = () => {
        const NextDisc = discs.shift();
        if (NextDisc) {
            return NextDisc();
        }
        return Goal();
    };

    var BouncedAway = () => ({
        isDone: true
    });

    var Goal = () => ({
        isDone: true,
        isGoal: true
    });

    discs = config.reduce(
        (acc, discConfig) => {
            acc[discConfig.index] = Disc.bind(null, discConfig);
            return acc;
        },
        []
    );
    state = Start();

    return {
        run(startTime) {
            time = startTime;
            while (!state.isDone) { state.tick(); }
        },
        isGoal() {
            return Boolean(state.isGoal);
        }
    };
};

const solve = input => {
    const config = parseInput(input);
    config.push({
        index: config.length,
        positions: 11,
        initialPosition: 0
    });
    let time = 0;
    while (true) {
        const machine = Machine(config);
        machine.run(time);
        if (machine.isGoal()) {
            return time;
        }
        time += 1;
    }
};

module.exports = solve;
