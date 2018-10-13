window.onload = function () {
    document.getElementById("calculate").addEventListener("click", () => {
        let state = retrieveLSFRInitState();
        let usebits = retrieveUsedBits();
        let repetitions = document.getElementById("rep_input").value;
        calculateLSFR(state, usebits, repetitions);
    });
}

function retrieveLSFRInitState() {
    let elements = document.getElementsByClassName("lsfr_input");
    let state = [];
    for (var i = 0; i < elements.length; i++) {
        state.push(elements[i].value);
    }
    return state;
}

function retrieveUsedBits() {
    let used = [];
    for (var i = 0; i < 8; i++) {
        let checkbox = document.getElementById("bit_" + i);
        if (checkbox.checked) {
            used.push(i);
        }
    }
    return used;
}

function calculateLSFR(state, usebits, repetitions) {
    state.reverse();
    for (var i = 0; i < repetitions; i++) {
        let output = state[7];
        //only ever really two
        let inputxor = xor(state[usebits[0]-1], state[usebits[1]-1]);
        let previousxzero = reverseXor(inputxor, output);
        //Display to the screen
        document.body.innerHTML += "The state: ";
        printState(state);
        //Update the register
        state.reverse();
        state.shift();
        state[7] = previousxzero;
        state.reverse();
        //Display previous state
        document.body.innerHTML += "Was preceded by: ";
        printState(state);
        document.body.innerHTML += "<br><br>";
    }
}

function xor(bit1, bit2) {
    let plus = parseInt(bit1) + parseInt(bit2);
    if (plus === 0) {
        return 0;
    }
    if (plus === 1) {
        return 1;
    }
    if (plus === 2) {
        return 0;
    }
}

function reverseXor(bit, output) {
    bit = parseInt(bit);
    output = parseInt(output);
    if (bit === 1 && output === 1) {
        return 0;
    } else {
        return bit + output;
    }
}

function printState(state) {
    for (var i = 7; i >= 0; i--) {
        let text = state[i] + " ";
        document.body.innerHTML += text;
    }
    document.body.innerHTML += "<br>";
}