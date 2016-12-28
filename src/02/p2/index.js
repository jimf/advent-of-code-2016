'use strict';

const Keypad = () => {
    let state;
    let code = '';

    //     1
    //   2 3 4
    // 5 6 7 8 9
    //   A B C
    //     D

    var One = () => ({
        go: c => {
            switch (c) {
                case 'D': state = Three(); break;
                case '\n': code += '1'; break;
            }
        }
    });

    var Two = () => ({
        go: c => {
            switch (c) {
                case 'R': state = Three(); break;
                case 'D': state = Six(); break;
                case '\n': code += '2'; break;
            }
        }
    });

    var Three = () => ({
        go: c => {
            switch (c) {
                case 'U': state = One(); break;
                case 'R': state = Four(); break;
                case 'D': state = Seven(); break;
                case 'L': state = Two(); break;
                case '\n': code += '3'; break;
            }
        }
    });

    var Four = () => ({
        go: c => {
            switch (c) {
                case 'D': state = Eight(); break;
                case 'L': state = Three(); break;
                case '\n': code += '4'; break;
            }
        }
    });

    var Five = () => ({
        go: c => {
            switch (c) {
                case 'R': state = Six(); break;
                case '\n': code += '5'; break;
            }
        }
    });

    var Six = () => ({
        go: c => {
            switch (c) {
                case 'U': state = Two(); break;
                case 'R': state = Seven(); break;
                case 'D': state = A(); break;
                case 'L': state = Five(); break;
                case '\n': code += '6'; break;
            }
        }
    });

    var Seven = () => ({
        go: c => {
            switch (c) {
                case 'U': state = Three(); break;
                case 'R': state = Eight(); break;
                case 'D': state = B(); break;
                case 'L': state = Six(); break;
                case '\n': code += '7'; break;
            }
        }
    });

    var Eight = () => ({
        go: c => {
            switch (c) {
                case 'U': state = Four(); break;
                case 'R': state = Nine(); break;
                case 'D': state = C(); break;
                case 'L': state = Seven(); break;
                case '\n': code += '8'; break;
            }
        }
    });

    var Nine = () => ({
        go: c => {
            switch (c) {
                case 'L': state = Eight(); break;
                case '\n': code += '9'; break;
            }
        }
    });

    var A = () => ({
        go: c => {
            switch (c) {
                case 'U': state = Six(); break;
                case 'R': state = B(); break;
                case '\n': code += 'A'; break;
            }
        }
    });

    var B = () => ({
        go: c => {
            switch (c) {
                case 'U': state = Seven(); break;
                case 'R': state = C(); break;
                case 'D': state = D(); break;
                case 'L': state = A(); break;
                case '\n': code += 'B'; break;
            }
        }
    });

    var C = () => ({
        go: c => {
            switch (c) {
                case 'U': state = Eight(); break;
                case 'L': state = B(); break;
                case '\n': code += 'C'; break;
            }
        }
    });

    var D = () => ({
        go: c => {
            switch (c) {
                case 'U': state = B(); break;
                case '\n': code += 'D'; break;
            }
        }
    });

    state = Five();

    return {
        go: c => { state.go(c); },
        result: () => code
    };
};

const solve = input => {
    const keypad = Keypad();
    input.trim().concat('\n').split('').forEach(keypad.go);
    return keypad.result();
};

module.exports = solve;
