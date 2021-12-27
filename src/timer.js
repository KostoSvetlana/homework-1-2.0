import { sound } from "./howler.js";
loadScript("src/common.js", () => {
    loadScript("<https://cdn.jsdelivr.net/npm/luxon@1.25.0/build/global/luxon.min.js>", () => {
        console.log("timer.js ")
    })
})

// global setinterval timer
let countdownEnded = false;
let countdownIsRunning = false;
let counter = -1; // reset  must be counter = -1
let counterMillis = 99;

// counters
let intervalSeconds = false;
let intervalMillis = false;

// init
(() => {
    updateDisplay(1800, 0);
    document.getElementById('millis').innerHTML = "00";
})();
let input = document.getElementById("minutesInputField");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     document.getElementById("btnStart").click();
    }
  });



export function start(time = 1800) {
    
    let startTime = Date.now();
    let inputTime;

    let countdownDoneElement =
        document.getElementById("cd-done");
    countdownDoneElement.style.display = 'none';

    let countdownRunningElement =
        document.getElementById('cd-running');
    countdownRunningElement.style.display = 'inline-flex';

    if (!countdownIsRunning) {
        countdownIsRunning = true;
        inputTime =
            counter === -1
                ? document.getElementById('minutesInputField').value * 60 || time
                : counter
    } else {
        inputTime = document.getElementById('minutesInputField').value * 60 || time
    }

    clearInterval(intervalSeconds);
    intervalSeconds = setInterval(() => {
        let currentTime = Date.now() - startTime;

        if (inputTime < 1) {
            stop();
        } else {
            counter = inputTime - updateDisplay(inputTime, currentTime);
            updateMillis();
        }
    }, 1000);
}

export function pause() {
    clearInterval(intervalSeconds);
    clearInterval(intervalMillis);
    countdownIsRunning = false;
}

export function reset() {
    // clear existing intervals
    clearInterval(intervalSeconds);
    clearInterval(intervalMillis);
    

    let currentTimeInput = document.getElementById('minutesInputField').value * 60;
    counter = currentTimeInput || 1800;
    counterMillis = 0;
    updateDisplay(counter, 0);

    //defaultMinute = 30;
    //updateDisplay((document.getElementById('minutesInputField').value || defaultMinute) * 60, 0);
}


export function stop() {
    let countdownRunningElement = document.getElementById("cd-running");
    let countdownDoneElement = document.getElementById("cd-done");

    countdownRunningElement.style.display = 'none';
    countdownDoneElement.style.display = 'inline-flex';
    countdownDoneElement.innerHTML = 'countdown done';

    countdownEnded = true;
    clearInterval(intervalSeconds);
    clearInterval(intervalMillis);
}

export function updateDisplay(seconds, currentTime) {
    let timeIncrement = Math.floor(currentTime / 1000);
    updateTime(seconds - timeIncrement);
    return timeIncrement;
}

/**
 * @method - updatesecondsond
 * @summary - This updates the timer every seconds
 */

export function updateTime(seconds) {
    let countDivElement = document.getElementById("timer");

    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    if (remainingSeconds < 10) {
        remainingSeconds = '0' + remainingSeconds;
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    if (seconds > 0) {
        seconds = seconds - 1;
    } else {
        stop();
    }

    countDivElement.innerHTML = minutes + ":" + remainingSeconds + ":";
};

export function updateMillis() {
    let countMillsElement = document.getElementById('millis');
    let millis = 0;

    //  milliseconds from document.getElementById.value
    // check for value and let counter continue from that point on
    
    clearInterval(intervalMillis);
    intervalMillis = setInterval(() => {

        if (counterMillis < 0) {
            counterMillis = 99;
        } else {
            millis = counterMillis < 10 ? counterMillis + '0' : counterMillis;
        };

        countMillsElement.innerHTML = millis;
        counterMillis--;

    }, 10);

    if (countdownEnded) {
        stop();
    }
};