'use strict';

const parseInput = input => {
    const match = input.trim().match(/^([LR])(\d+)$/);
    if (!match) { throw new Error('Invalid input'); }
    return [match[1], parseInt(match[2])];
};

const Traveler = () => {
    let x = 0;
    let y = 0;
    let state;

    var North = () => ({
        turn(d) {
            state = d == 'L' ? West() : East();
        },
        move(n) { y = y + n; }
    });

    var South = () => ({
        turn(d) {
            state = d == 'L' ? East() : West();
        },
        move(n) { y = y - n; }
    });

    var East = () => ({
        turn(d) {
            state = d == 'L' ? North() : South();
        },
        move(n) { x = x + n; }
    });

    var West = () => ({
        turn(d) {
            state = d == 'L' ? South() : North();
        },
        move(n) { x = x - n; }
    });

    state = North();

    return {
        go(input) {
            const parsed = parseInput(input);
            state.turn(parsed[0]);
            state.move(parsed[1]);
        },
        delta: () => Math.abs(x) + Math.abs(y)
    };
};

const solve = input => {
    const traveler = Traveler();
    input.split(',').forEach(traveler.go);
    return traveler.delta();
};

module.exports = solve;
