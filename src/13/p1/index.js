'use strict';

const M = require('../../monad');
const BinaryHeap = require('../../binary_heap');

const isWall = (x, y, z) =>
    M.Identity(x*x + 3*x + 2*x*y + y + y*y)
    .map(i => i + z)
    .map(i => i.toString(2))
    .map(s => s.split('').filter(c => c === '1'))
    .fold(cs => cs.length % 2 !== 0);

const heuristic = ([x1, y1], [x2, y2]) =>
    Math.abs(x1 - x2) + Math.abs(y1 - y2);

const PriorityQueue = () => {
    const heap = BinaryHeap(([priority]) => priority);
    return {
        isEmpty: () => heap.length === 0,
        enqueue: (item, priority) => { heap.push([priority, item]); },
        dequeue: () => heap.pop()[1]
    };
};

const getNeighbors = (x, y, z) =>
    [
        [x + 1, y],
        [x, y + 1],
        [x - 1, y],
        [x, y - 1]
    ]
    .filter(([x, y]) => x >= 0 && y >= 0)
    .filter(([x, y]) => !isWall(x, y, z));

const pairToString = ([x, y]) => `${x},${y}`;

const getCost = () => 1;

const search = (start, goal, favNum) => {
    const frontier = PriorityQueue();
    frontier.enqueue(start, 0);
    const cameFrom = { [pairToString(start)]: null };
    const costSoFar = { [pairToString(start)]: 0 };

    while (!frontier.isEmpty()) {
        const current = frontier.dequeue();

        if (current[0] === goal[0] && current[1] === goal[1]) { break; }

        getNeighbors(current[0], current[1], favNum).forEach(next => {
            const newCost = costSoFar[pairToString(current)] + getCost(current, next);
            const nextKey = pairToString(next);

            if (!costSoFar[nextKey] || newCost < costSoFar[nextKey]) {
                costSoFar[nextKey] = newCost;
                const priority = newCost + heuristic(goal, next);
                frontier.enqueue(next, priority);
                cameFrom[nextKey] = current;
            }
        });
    }

    return [cameFrom, costSoFar];
};

const getPathLength = (start, goal, paths) => {
    let hops = 1;
    let current = paths[pairToString(goal)];
    while (!(current[0] === start[0] && current[1] === start[1])) {
        current = paths[pairToString(current)];
        hops += 1;
    }
    return hops;
};

const solve = (goal, favNum) =>
    M.Identity(search([1, 1], goal, favNum))
    .map(([cameFrom]) => cameFrom)
    .fold(paths => getPathLength([1, 1], goal, paths));

module.exports = solve;
