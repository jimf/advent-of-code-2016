'use strict';

const _ = require('../../util');
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
    frontier.enqueue(start.concat([0]), 0);
    const cameFrom = { [pairToString(start)]: null };
    const costSoFar = { [pairToString(start)]: 0 };
    const seen = { [pairToString(start)]: 1 };

    while (!frontier.isEmpty(0)) {
        const current = frontier.dequeue();
        const [currentX, currentY, step] = current;
        seen[pairToString(current)] = 1;

        if (currentX === goal[0] && currentY === goal[1]) { break; }

        getNeighbors(currentX, currentY, favNum).forEach(next => {
            const newCost = costSoFar[pairToString(current)] + getCost(current, next);
            const nextKey = pairToString(next);

            if (!costSoFar[nextKey] || newCost < costSoFar[nextKey]) {
                costSoFar[nextKey] = newCost;
                const priority = newCost + heuristic(goal, next);
                frontier.enqueue(next.concat([step + 1]), priority);
                cameFrom[nextKey] = current;
            }
        });

        if (step >= 50) { break; }
    }

    return Object.keys(seen).length;
};

const solve = (favNum) =>
    M.Identity(search([1, 1], [-1, -1], favNum))
    .fold(_.id);

module.exports = solve;
