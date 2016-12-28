'use strict';

const _ = require('../../util');
const M = require('../../monad');

const STATE_INST = /^value (\d+) goes to bot (\d+)$/;
const RULE_INST = /^bot (\d+) gives low to (\w+) (\d+) and high to (\w+) (\d+)$/;

const matchStateInst = inst =>
    M.Maybe.fromNullable(inst.match(STATE_INST))
    .map(match => [Number(match[1]), match[2]])
    .fold(_.K(null), _.id);

const matchRuleInst = inst =>
    M.Maybe.fromNullable(inst.match(RULE_INST))
    .map(match => [
        `bot${match[1]}`,
        `${match[2]}${match[3]}`,
        `${match[4]}${match[5]}`
    ])
    .fold(_.K(null), _.id);

const removeNth = (n, xs) => xs.slice(0, n).concat(xs.slice(n + 1));

const createWorld = () => ({ log: [] });

const addValue = (value, target, world) =>
    _.assoc(target, _.append(value, world[target] || []), world);

const transferValue = (value, from, to, world) => {
    const newWorld = Object.assign({}, world);
    newWorld[from] = removeNth(newWorld[from].indexOf(value), newWorld[from]);
    newWorld[to] = (newWorld[to] || []).concat(value);
    return newWorld;
};

const hasBotWithNValues = (n, world) =>
    Object.keys(world)
    .some(key => key.startsWith('bot') && world[key].length >= n);

const initializeState = (instructions, world) =>
    instructions.reduce(
        (acc, [value, bot]) => addValue(value, `bot${bot}`, acc),
        world
    );

const log = (logItem, world) =>
    _.assoc('log', world.log.concat([logItem]), world);

const processRule = ([bot, lowTarget, highTarget], world) => {
    if (!world[bot] || world[bot].length < 2) { return world; }
    const high = Math.max.apply(null, world[bot]);
    const low = Math.min.apply(null, world[bot]);
    world = log({
        action: 'compare',
        bot,
        values: `${low} ${high}`
    }, world);
    return transferValue(high, bot, highTarget, transferValue(
        low, bot, lowTarget, world
    ));
};

const processRules = (rules, world) => {
    while (hasBotWithNValues(2, world)) {
        rules.forEach(rule => {
            world = processRule(rule, world);
        });
    }
    return world;
};

const solve = input => {
    const inputs = input.split('\n').map(s => s.trim());
    const states = inputs.map(matchStateInst).filter(_.id);
    const rules = inputs.map(matchRuleInst).filter(_.id);
    const world = processRules(rules, initializeState(states, createWorld()));
    return world.output0 * world.output1 * world.output2;
};

module.exports = solve;
