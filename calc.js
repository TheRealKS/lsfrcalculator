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
    //Calculate new bit
    for (var i = 0; i < repetitions; i++) {
        let zerobit = state[0];
        let currentxor = zerobit;
        usebits.forEach(element => {
            currentxor = xor(state[element], currentxor);
            console.log(currentxor);
        });
        //Display to the screen
        document.body.innerHTML += "The state: ";
        printState(state);
        //Update the register
        let pushedout = state.shift();
        console.log(state);
        state[7] = currentxor;
        //Display new state and output
        printNewStateAndOutput(state, pushedout);
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

function printState(state) {
    for (var i = 7; i >= 0; i--) {
        let text = state[i] + " ";
        document.body.innerHTML += text;
    }
    document.body.innerHTML += "<br>";
}

function printNewStateAndOutput(state, output) {
    document.body.innerHTML += "Is followed by: ";
    printState(state);
    let outputtxt = "And outputs: " + output;
    document.body.innerHTML += outputtxt;
    document.body.innerHTML += "<br><br>";
}