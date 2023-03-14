"use strict";

// DOM
const grid = document.querySelector(".grid");
let platformNumber = 5;
let platforms = [];
let platformInterval = "";
let doodlerBottomSpace = 50;
let doodlerLeftSpace = 0;
let timerLeft, timerRight, timerUp, timerDown;
let doodler;
let isGameOver = false;
let movingRight = false;
let movingLeft = false;

// Create platforms
function createPlatforms() {
  let platformGap = 100;
  for (let i = 0; i < platformNumber; i++) {
    let platformBottom = 100 + platformGap * i;
    let newPlatform = Platform(platformBottom);
    platforms.push(newPlatform);
  }
}

// Platform
function Platform(bottom) {
  let visual = document.createElement("div");
  visual.classList.add("platform");
  grid.append(visual);
  visual.style.bottom = bottom + "px";
  let left = Math.random() * 315;
  visual.style.left = left + "px";

  return { bottom, visual, left };
}

// move platforms
platformInterval = setInterval(movePlatform, 30);

function movePlatform() {
  platforms.forEach((platform) => {
    platform.bottom -= 4;
    let visual = platform.visual;
    visual.style.bottom = platform.bottom + "px";

    if (platform.bottom < 10) {
      visual.classList.remove("platform");
      let firstPlatform = platforms[0].visual;
      firstPlatform.classList.remove("platform");
      platforms.shift();
      let newPlatform = Platform(600);
      platforms.push(newPlatform);
    }
  });
}

// create doodler
function createDoodler() {
  doodler = document.createElement("img");
  doodler.src = "images/doodler.png";
  doodler.classList.add("doodler");
  grid.append(doodler);
  doodler.style.bottom = doodlerBottomSpace + "px";
  doodlerLeftSpace = platforms[0].left;
  doodler.style.left = doodlerLeftSpace + "px";
}

// control doodler
function control(e) {
  let key = e.key;
  if (key === "ArrowLeft") {
    clearInterval(timerRight);
    timerLeft = setInterval(moveLeft, 30);
  } else if (key === "ArrowRight") {
    clearInterval(timerLeft);
    timerRight = setInterval(moveRight, 30);
  } else if (key === "ArrowUp") {
    clearInterval(timerRight);
    clearInterval(timerLeft);
  }
}

document.body.addEventListener("keyup", control);

// doodler intervals

// move functions
function moveLeft() {
  doodlerLeftSpace -= 4;
  doodler.style.left = doodlerLeftSpace + "px";
  if (doodlerLeftSpace <= 0) {
    clearInterval(timerLeft);
  }
}

function moveRight() {
  doodlerLeftSpace += 4;
  doodler.style.left = doodlerLeftSpace + "px";
  if (doodlerLeftSpace >= 315) {
    clearInterval(timerRight);
  }
}

// jump
function jump() {
  clearInterval(timerDown);
  timerUp = setInterval(function () {
    if (doodlerBottomSpace <= 400) {
      doodlerBottomSpace += 4;
      doodler.style.bottom = doodlerBottomSpace + "px";
    } else {
      fall();
    }
  }, 20);
}

// fall
function fall() {
  clearInterval(timerUp);
  timerDown = setInterval(function () {
    if (doodlerBottomSpace > 0) {
      doodlerBottomSpace -= 4;
      doodler.style.bottom = doodlerBottomSpace + "px";
      platforms.forEach((platform) => {
        if (
          platform.bottom <= doodlerBottomSpace &&
          platform.bottom + 15 >= doodlerBottomSpace &&
          platform.left <= doodlerLeftSpace &&
          platform.left + 85 >= doodlerLeftSpace
        ) {
          jump();
        }
      });
    } else {
      jump();
    }
  }, 20);
}

function gameOver() {
  isGameOver = true;
  platforms = [];
}

function start() {
  if (isGameOver === false) {
    createPlatforms();
    createDoodler();
    jump();
  }
}

start();
