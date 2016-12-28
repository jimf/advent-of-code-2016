'use strict';

const parseInput = input => {
    const match = input.trim().match(/^([LR])(\d+)$/);
    if (!match) { throw new Error('Invalid input'); }
    return [match[1], parseInt(match[2])];
};

const Traveler = () => {
    const visited = { '0,0': true };
    let x = 0;
    let y = 0;
    let state;

    const checkVisitedTwice = move => n => {
        move(n);
        const coord = `${x},${y}`;
        if (visited[coord]) {
            state = VisitedTwice();
        } else {
            visited[coord] = true;
        }
    };

    var North = () => ({
        turn(d) {
            state = d == 'L' ? West() : East();
        },
        move: checkVisitedTwice(n => { y = y + n; })
    });

    var South = () => ({
        turn(d) {
            state = d == 'L' ? East() : West();
        },
        move: checkVisitedTwice(n => { y = y - n; })
    });

    var East = () => ({
        turn(d) {
            state = d == 'L' ? North() : South();
        },
        move: checkVisitedTwice(n => { x = x + n; })
    });

    var West = () => ({
        turn(d) {
            state = d == 'L' ? South() : North();
        },
        move: checkVisitedTwice(n => { x = x - n; })
    });

    var VisitedTwice = () => ({
        turn: () => {},
        move: () => {}
    });

    state = North();

    return {
        go(input) {
            const parsed = parseInput(input);
            state.turn(parsed[0]);
            (new Array(parsed[1])).fill(1).forEach(i => state.move(i));
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
