'use strict';

const I = x => x;

function BinaryHeap(f = I) {
    const content = [];

    const moveUp = idx => {
        const val = content[idx];
        const score = f(val);
        while (idx > 0) {
            const parentIdx = Math.floor((idx + 1) / 2) - 1;
            const parent = content[parentIdx];
            if (score >= f(parent)) { break; }
            content[parentIdx] = val;
            content[idx] = parent;
            idx = parentIdx;
        }
    };

    const moveDown = idx => {
        const len = content.length;
        const val = content[idx];
        const score = f(val);

        while (true) {
            const child2Idx = (idx + 1) * 2;
            const child1Idx = child2Idx - 1;
            let child1Score;
            let temp;

            if (child1Idx < len) {
                const child1 = content[child1Idx];
                child1Score = f(child1);
                if (child1Score < score) {
                    temp = child1Idx;
                }
            }

            if (child2Idx < len) {
                const child2 = content[child2Idx];
                const child2Score = f(child2);
                if (child2Score < (temp === undefined ? score : child1Score)) {
                    temp = child2Idx;
                }
            }

            if (temp === undefined) { break; }

            content[idx] = content[temp];
            content[temp] = val;
            idx = temp;
        }
    };

    const obj = {
        push: x => {
            content.push(x);
            moveUp(content.length - 1);
            return content.length;
        },
        pop: () => {
            const result = content[0];
            const end = content.pop();
            if (content.length > 0) {
                content[0] = end;
                moveDown(0);
            }
            return result;
        },
        remove: x => {
            for (let i = 0, len = content.length; i < len; i += 1) {
                if (content[i] !== x) { continue; }
                const end = content.pop();
                if (i === len - 1) { break; }
                content[i] = end;
                moveUp(i);
                moveDown(i);
            }
            return content.length;
        }
    };

    Object.defineProperty(obj, 'length', {
        get: () => content.length
    });

    return obj;
}

module.exports = BinaryHeap;
