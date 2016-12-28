'use strict';

const _ = require('../../util');
const M = require('../../monad');

const createWorld = () => ({
    x: 0,
    y: 0,
    path: ''
});

const zip = xs => ys => {
    const result = [];
    let i = 0;
    while (i < xs.length) {
        result.push([xs[i], ys[i]]);
        i += 1;
    }
    return result;
};

const inc = x => x + 1;
const dec = x => x - 1;
const append = suffix => prefix => `${prefix}${suffix}`;

const moveUp = _.evolve({ y: dec, path: append('U') });
const moveDown = _.evolve({ y: inc, path: append('D') });
const moveLeft = _.evolve({ x: dec, path: append('L') });
const moveRight = _.evolve({ x: inc, path: append('R') });

const getNeighbors = (passcode, world) =>
    M.Identity(_.md5(passcode + world.path).slice(0, 4).split(''))
    .map(zip([
        moveUp(world),
        moveDown(world),
        moveLeft(world),
        moveRight(world)
    ]))
    .map(moves => moves.filter(([neighbor, c]) => 'bcdef'.indexOf(c) >= 0))
    .map(moves => moves.filter(([{ x, y }]) => (
        0 <= x && x <= 3 &&
        0 <= y && y <= 3
    )))
    .fold(moves => moves.map(([neighbor]) => neighbor));

// const hashWorld = ({ x, y }) => `${y},${x}`;
const hashWorld = ({ path }) => path;

const hasReachedGoal = ({ x, y }) => x === 3 && y === 3;

const search = (passcode, world) => {
    let queue = [world];
    let visited = {};

    while (queue.length) {
        const state = queue.shift();
        const key = hashWorld(state);

        if (!visited[key]) {
            if (hasReachedGoal(state)) {
                return state.path;
            }

            visited[key] = true;
            getNeighbors(passcode, state).forEach(neighbor => {
                queue.push(neighbor);
            });
        }
    }

    return false;
};

const solve = passcode => search(passcode, createWorld());

module.exports = solve;
