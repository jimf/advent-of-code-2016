'use strict';

const Keypad = () => {
    let state;
    let code = '';

    var One = () => ({
        go: c => {
            switch (c) {
                case 'R': state = Two(); break;
                case 'D': state = Four(); break;
                case '\n': code += '1'; break;
            }
        }
    });

    var Two = () => ({
        go: c => {
            switch (c) {
                case 'R': state = Three(); break;
                case 'D': state = Five(); break;
                case 'L': state = One(); break;
                case '\n': code += '2'; break;
            }
        }
    });

    var Three = () => ({
        go: c => {
            switch (c) {
                case 'D': state = Six(); break;
                case 'L': state = Two(); break;
                case '\n': code += '3'; break;
            }
        }
    });

    var Four = () => ({
        go: c => {
            switch (c) {
                case 'U': state = One(); break;
                case 'R': state = Five(); break;
                case 'D': state = Seven(); break;
                case '\n': code += '4'; break;
            }
        }
    });

    var Five = () => ({
        go: c => {
            switch (c) {
                case 'U': state = Two(); break;
                case 'R': state = Six(); break;
                case 'D': state = Eight(); break;
                case 'L': state = Four(); break;
                case '\n': code += '5'; break;
            }
        }
    });

    var Six = () => ({
        go: c => {
            switch (c) {
                case 'U': state = Three(); break;
                case 'D': state = Nine(); break;
                case 'L': state = Five(); break;
                case '\n': code += '6'; break;
            }
        }
    });

    var Seven = () => ({
        go: c => {
            switch (c) {
                case 'U': state = Four(); break;
                case 'D': state = Eight(); break;
                case '\n': code += '7'; break;
            }
        }
    });

    var Eight = () => ({
        go: c => {
            switch (c) {
                case 'U': state = Five(); break;
                case 'R': state = Nine(); break;
                case 'L': state = Seven(); break;
                case '\n': code += '8'; break;
            }
        }
    });

    var Nine = () => ({
        go: c => {
            switch (c) {
                case 'U': state = Six(); break;
                case 'L': state = Eight(); break;
                case '\n': code += '9'; break;
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
