// Start Button
var start = document.querySelector(".start");

var head = document.querySelector(".tim");
var container = document.querySelector(".container");

function timer1(calc) {
    var timer = document.createElement("span");
    timer.innerHTML = `${calc}`;
    timer.classList.add("time");
    if (head.children.length === 0) head.appendChild(timer);
    else {
        document.querySelector(".time").remove();
        head.appendChild(timer);
    }
}

function flipcheck() {
    let arr = myBox.filter((element) => element.classList.contains("flip"));
    if (arr.length === myBox.length) {
        console.log("Done");
    } else {
        arr.forEach((element) => element.classList.remove("flip"));

        var st = document.createElement("div");
        st.classList.add("start");
        var sp = document.createElement("span");
        sp.innerText = "Try Again";
        st.appendChild(sp);
        document.body.insertBefore(st, container);
        tries = 1;
        wrongTries.innerText = `0`;
        st.onclick = open;
    }
}
// Start Timer
function time() {
    var today = new Date();
    today.setSeconds(today.getSeconds() + 32);
    var x = setInterval(function () {
        var before = new Date();
        var calc = Math.floor((today - before) / 1000);

        timer1(calc);

        if (calc <= 0) {
            flipcheck();
            clearInterval(x);
        }
    }, 1000);
}
function open() {
    // Window Prompt To Get Your Name
    let name = prompt("What's Your Name");

    if (name == "") document.querySelector(".name").innerText = "Unknown";
    else document.querySelector(".name").innerText = `${name}`;

    document.querySelector(".start").remove();

    time();
}

start.onclick = open;

// Count Flip Cards
var flipCounter = 0;

//
var myBox = Array.from(document.querySelectorAll(".box"));

var boxLength = myBox.length;

function shuffle() {
    return Math.floor(Math.random() * boxLength);
}

for (let i = 0; i < myBox.length; i++) {
    myBox[i].style.order = `${shuffle()}`;
}

// Array Of Image Sources
var image = Array.from(document.querySelectorAll("img"));
// Array OF Image Sources To Compare Between
var imageSource = [""];
// Variable WrongTries
var wrongTries = document.getElementById("wrongTries");
var tries = 1;

function imagecheck() {
    if (imageSource[1] === imageSource[0]) {
        return true;
    } else {
        wrongTries.innerText = `${tries}`;
        tries++;
        return false;
    }
}

function check(i, j) {
    if (imagecheck() == true) {
        return;
    } else {
        setTimeout(function () {
            myBox[i].classList.remove("flip");
            myBox[j].classList.remove("flip");
        }, 800);
    }
}

var arrayOfBoxes = [];

for (let j = 0; j < myBox.length; j++) {
    myBox[j].onclick = function () {
        if (this.classList.contains("flip")) {
            return false;
        } else {
            this.classList.add("flip");
        }

        imageSource[flipCounter] = image[j].getAttribute("src");

        arrayOfBoxes[flipCounter] = j;

        flipCounter++;

        let count = myBox.filter((flipped) =>
            flipped.classList.contains("flip"),
        );

        if (flipCounter == 2) {
            check(arrayOfBoxes[flipCounter - 1], arrayOfBoxes[flipCounter - 2]);
            flipCounter = 0;
        }
    };
}
