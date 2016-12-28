'use strict';

const _ = require('../../util');
const M = require('../../monad');

const dissoc = key => obj =>
    Object.keys(obj).reduce(
        (acc, k) => k === key ? acc : Object.assign(acc, { [k]: obj[k] }),
        {}
    );

const STATE_PATTERN = /((?:\w+\-compatible microchip)|(?:\w+ generator))/g;

const createWorld = () => ({
    elevator: 0,
    floors: []
});

const addFloor = (contents, world) =>
    _.assoc('floors', world.floors.concat([contents]), world);

const serializeContents = contents =>
    contents.reduce((acc, key) => Object.assign(acc, { [key]: 1 }), {});

const initializeState = floorStates =>
    floorStates.reduce(
        (world, floor) => addFloor(serializeContents(floor), world),
        createWorld()
    );

const isFloorEmpty = floor => Object.keys(floor).length === 0;

const hasReachedGoal = world =>
    world.floors.slice(0, -1).every(isFloorEmpty);

const moveContents = delta => (contents, world) => {
    world = contents.reduce(
        (acc, item) => (
            M.Identity(acc.floors[acc.elevator])
            .map(dissoc(item))
            .map(floor => _.modifyNth(_.K(floor), acc.elevator)(acc.floors))
            .fold(floors => _.assoc('floors', floors, acc))
        ),
        world
    );
    return contents.reduce(
        (acc, item) => (
            M.Identity(acc.floors[acc.elevator])
            .map(floor => _.assoc(item, 1, floor))
            .map(floor => _.modifyNth(_.K(floor), acc.elevator)(acc.floors))
            .fold(floors => _.assoc('floors', floors, acc))
        ),
        _.assoc('elevator', world.elevator + delta, world)
    );
};
const moveUp = moveContents(1);
const moveDown = moveContents(-1);

const permute = xs => {
    const result = [];
    for (let i = 0; i < xs.length; i += 1) {
        for (let j = i; j < xs.length; j += 1) {
            result.push([xs[i], xs[j]]);
        }
    }
    return result;
};

const getElement = s =>
    s.replace('-compatible microchip', '').replace(' generator', '');

const isSafePair = ([x, y]) =>
    (x.includes('microchip') && y.includes('microchip')) ||
    (x.includes('generator') && y.includes('generator')) ||
    (getElement(x) === getElement(y));

const find = f => xs => {
    let i = 0;
    while (i < xs.length) {
        if (f(xs[i])) { return xs[i]; }
        i += 1;
    }
    return;
};

const findMatchingPair = find(xs =>
    xs.length === 2 && getElement(xs[0]) === getElement(xs[1]));

const findTwoChips = find(xs =>
    xs.length === 2 && xs[0].includes('chip') && xs[1].includes('chip'));

const findTwoGenerators = find(xs =>
    xs.length === 2 && xs[0].includes('gen') && xs[1].includes('gen'));

const findChip = find(xs => xs.length === 1 && xs[0].includes('chip'));

const findGenerator = find(xs => xs.length === 1 && xs[0].includes('gen'));

const elevatorPermutations = xs => {
    const perms = permute(xs)
        .filter(([x, y]) => x !== y)
        .filter(isSafePair)
        .concat(xs.map(x => [x]));

    return [
        findMatchingPair(perms),
        findTwoChips(perms),
        findTwoGenerators(perms),
        findChip(perms),
        findGenerator(perms)
    ].filter(_.id);
};

const stringifyFloor = (floor, index) => {
    const items = _.sortBy(_.id)(Object.keys(floor)).map(key => (
        key
        .replace(' generator', 'G')
        .replace('-compatible microchip', 'M')
    ));
    return `F${index + 1}[${items.join('][') || 'empty'}]`;
};

const stringifyState = ({ elevator, floors }) =>
    floors.map(stringifyFloor).join('\n');

const areLowerFloorsEmpty = ({ elevator, floors }) =>
    floors.slice(0, elevator).every(isFloorEmpty);

const generateNeighbors = world => {
    const moves = elevatorPermutations(Object.keys(world.floors[world.elevator]));
    const singles = moves.filter(contents => contents.length === 1);
    const pairs = moves.filter(contents => contents.length === 2);
    const result = [];
    if (world.elevator < world.floors.length - 1) {
        (pairs.length ? pairs : singles).forEach(move => {
            result.push(moveUp(move, world));
        });
    }
    if (world.elevator > 0 && !areLowerFloorsEmpty(world)) {
        (singles.length ? singles : pairs).forEach(move => {
            result.push(moveDown(move, world));
        });
    }
    return result;
};

const swapElements = (fromElement, toElement, world) => {
    const newWorld = Object.assign({}, world);
    newWorld.floors = newWorld.floors.map(floor => (
        Object.keys(floor).reduce((acc, key) => {
            const value = floor[key];
            if (key.includes(fromElement)) {
                key = key.replace(fromElement, toElement);
            } else if (key.includes(toElement)) {
                key = key.replace(toElement, fromElement);
            }
            return Object.assign(acc, { [key]: value });
        }, {})
    ));
    return newWorld;
};

const getAllElements = world =>
    Object.keys(
        _.flatten(world.floors.map(Object.keys))
        .reduce(
            (acc, item) => Object.assign(acc, { [getElement(item)]: 1 }),
            {}
        )
    );

const generateEquivalentStates = (elements, world) =>
    permute(elements)
    .filter(([x, y]) => x !== y)
    .map(([el1, el2]) => swapElements(el1, el2, world));

const search = world => {
    const queue = [[0, world]];
    const elements = getAllElements(world);
    const visited = {};
    const markVisited = world => { visited[stringifyState(world)] = true; };
    const enqueue = degree => neighbor => { queue.push([degree + 1, neighbor]); };

    let maxFloor = 0;
    let maxItems = Object.keys(world.floors[maxFloor]).length;
    // let i = 0;


    while (queue.length) {
        const [degree, state] = queue.shift();
        const key = stringifyState(state);

        if (state.elevator > maxFloor) {
            maxFloor = state.elevator;
            maxItems = Object.keys(state.floors[maxFloor]).length;
        } else if (state.elevator === maxFloor && Object.keys(state.floors[maxFloor]).length > maxItems) {
            maxItems = Object.keys(state.floors[maxFloor]).length;
        }

        // i += 1;
        // if (i % 100000) {
        //     console.log(
        //         state.floors.map(f => Object.keys(f).length).join(' '),
        //         `max floor[${maxFloor + 1}] max items[${maxItems}] queue[${queue.length}]`
        //     );
        // }

        if (!visited[key]) {
            if (hasReachedGoal(state)) {
                return degree;
            } else {
                visited[key] = true;
                generateEquivalentStates(elements, world).forEach(markVisited);
                generateNeighbors(state)
                    .filter(neighbor => !visited[stringifyState(neighbor)])
                    .forEach(enqueue);
            }
        }
    }

    return false;
};

const solve = input =>
    M.Identity(input.trim().split('\n'))
    .map(_.map(line => line.match(STATE_PATTERN)))
    .map(_.map(line => line || []))
    .map(initializeState)
    .fold(search);

module.exports = solve;
