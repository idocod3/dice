"use strict";
const btnRoll = document.querySelector(".btn");
const img = document.querySelector("img");

const me = document.querySelector(".me");
const oponent = document.querySelector(".oponent");

const meLabel = me.querySelector(".me__score");
const oponentLabel = oponent.querySelector(".oponent__score");

const Player1Name = document.querySelector("#player__1--input");
const Player2Name = document.querySelector("#player__2--input");
const target = document.querySelector("#target");

const Player1 = document.querySelector(".player__1");
const Player2 = document.querySelector(".player__2");

const btnStart = document.querySelector(".submit");
const btnReset = document.querySelector(".reset");

const rules = document.querySelector(".rules");

let num = 1;
let finalScore;

let curRolling = "me";

const meScore = [];
const oponentScore = [];

// Starting game
btnStart.addEventListener("click", function () {
  if (Player1Name.value === "") {
    Player1Name.classList.add("err");
    return;
  } else {
    Player1Name.classList.remove("err");
  }

  if (Player2Name.value === "") {
    Player2Name.classList.add("err");
    return;
  } else {
    Player2Name.classList.remove("err");
  }

  if (target.value === "") {
    target.classList.add("err");
    return;
  } else {
    target.classList.remove("err");
  }

  finalScore = Math.abs(+target.value);

  Player1.textContent = Player1Name.value;
  Player2.textContent = Player2Name.value;

  Player1Name.value = Player2Name.value = "";
  this.parentElement.classList.add("hide");

  rules.querySelector(".lebel").textContent = `Max points ${finalScore}`;
  rules.classList.remove("hide");

  const btnGo = rules.querySelector(".btn__go");
  btnGo.addEventListener("click", function () {
    document.querySelector("section").classList.remove("hide");
    btnRoll.classList.remove("hide");
    rules.classList.add("hide");
  });
});

// Rolling
btnRoll.addEventListener("click", function () {
  num = Math.floor(Math.random() * 6) + 1;
  this.disabled = true;
  img.classList.add("animate");

  if (curRolling === "me") {
    oponent.classList.remove("active");
    me.classList.add("active");
  } else {
    me.classList.remove("active");
    oponent.classList.add("active");
  }
  setTimeout(function () {
    img.classList.remove("animate");
    img.src = `./img/dice-${num}-.png`;

    if (curRolling === "me") {
      meRolling(num);
      // switching
      if (num === 1) {
        curRolling = "oponent";
      }
    } else {
      oponnetRolling(num);

      // switching
      if (num === 1) {
        curRolling = "me";
      }
    }

    // Check Winner!
    if (meScore.reduce((a, b) => a + b, 0) >= finalScore) {
      btnRoll.textContent = `${Player1.textContent} Won 🏆`;
      btnRoll.disabled = true;
      return;
    }
    if (oponentScore.reduce((a, b) => a + b, 0) >= finalScore) {
      btnRoll.textContent = `${Player2.textContent} Won 🏆`;
      btnRoll.disabled = true;
      return;
    }

    btnRoll.disabled = false;
  }, 1000);
});

// Reset
btnReset.addEventListener("click", function () {
  setTimeout(() => location.reload(), 500);
});

const meRolling = function (num) {
  meScore.push(num);
  meLabel.textContent = meScore.reduce((a, b) => a + b, 0);
};

const oponnetRolling = function (num) {
  oponentScore.push(num);
  oponentLabel.textContent = oponentScore.reduce((a, b) => a + b, 0);
};
