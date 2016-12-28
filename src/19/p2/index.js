'use strict';

class Node {
    constructor(id) {
        this.id = id;
    }

    del() {
        this.prev.next = this.next;
        this.next.prev = this.prev;
    }
}

const createDblLinkedList = n => {
    const list = {};
    for (let i = 0; i < n; i += 1) {
        list[i] = new Node(i);
    }
    for (let i = 0; i < n; i += 1) {
        list[i].prev = list[(i - 1) % n];
        list[i].next = list[(i + 1) % n];
    }
    return list;
};

const solve = n => {
    const list = createDblLinkedList(n);

    let start = list[0];
    let mid = list[Math.floor(n / 2)];

    let i = 0;
    while (i < n - 1) {
        mid.del();
        mid = ((n - i) % 2) === 0 ? mid.next : mid.next.next;
        start = start.next;
        i += 1;
    }

    return start.id + 1;
};

module.exports = solve;
