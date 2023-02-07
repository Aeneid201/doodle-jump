"use strict";

// DOM caching
const grid = document.querySelector(".grid");
const doodler = document.createElement("div");
let doodlerLeftSpace;
let startPoint = 150;
let doodlerBottomSpace = startPoint;
let isGameOver = false;
let platformCount = 5;
let platforms = [];
let downTimerId, upTimerId, leftTimerId, rightTimerId;
let isJumping;
let isGoingLeft = false;
let isGoingRight = false;

// Create platforms
function createPlatforms() {
  for (let i = 0; i < platformCount; i++) {
    let platGap = 600 / platformCount;
    let newPlatBottom = 100 + i * platGap;
    let newPlatform = createPlatform(newPlatBottom);
    platforms.push(newPlatform);
    console.log(platforms);
  }
}

// Create Platform
function createPlatform(newPlatBottom) {
  let bottom = newPlatBottom;
  let left = Math.random() * 315;
  let visual = document.createElement("div");
  visual.classList.add("platform");
  visual.style.left = left + "px";
  visual.style.bottom = bottom + "px";
  grid.appendChild(visual);

  return { bottom, left, visual };
}

// Move platform
function movePlatforms() {
  if (doodlerBottomSpace > 200) {
    platforms.forEach((platform) => {
      platform.bottom -= 4;
      let visual = platform.visual;
      visual.style.bottom = platform.bottom + "px";

      if (platform.bottom < 10) {
        let firstPlatform = platforms[0].visual;
        firstPlatform.classList.remove("platform");
        platforms.shift();
        let newPlatform = createPlatform(600);
        platforms.push(newPlatform);
      }
    });
  }
}

// Interval move platforms
setInterval(movePlatforms, 30);

// Create Doodler
function createDoodler() {
  grid.appendChild(doodler);
  doodler.classList.add("doodler");
  doodlerLeftSpace = platforms[0].left;
  doodler.style.left = doodlerLeftSpace + "px";
  doodler.style.bottom = doodlerBottomSpace + "px";
}

function control(e) {
  if (e.key === "ArrowLeft") {
    // move left
    if (isGoingLeft) return;
    moveLeft();
  } else if (e.key === "ArrowRight") {
    // move right
    if (isGoingRight) return;
    moveRight();
  } else if (e.key === "ArrowUp") {
    moveStraight();
  }
}

function moveStraight() {
  isGoingLeft = false;
  isGoingRight = false;
  clearInterval(rightTimerId);
  clearInterval(leftTimerId);
}

function moveLeft() {
  if (isGoingRight) {
    clearInterval(rightTimerId);
    isGoingRight = false;
  }
  isGoingLeft = true;

  leftTimerId = setInterval(() => {
    if (doodlerLeftSpace >= 0) {
      doodlerLeftSpace -= 5;
      doodler.style.left = doodlerLeftSpace + "px";
    } else {
      moveRight();
    }
  }, 30);
}

function moveRight() {
  if (isGoingLeft) {
    clearInterval(leftTimerId);
    isGoingLeft = false;
  }

  isGoingRight = true;
  rightTimerId = setInterval(() => {
    if (doodlerLeftSpace <= 340) {
      doodlerLeftSpace += 5;
      doodler.style.left = doodlerLeftSpace + "px";
    }
  }, 30);
}

// Jump function
function jump() {
  clearInterval(downTimerId);
  isJumping = true;
  upTimerId = setInterval(function () {
    doodlerBottomSpace += 20;
    doodler.style.bottom = doodlerBottomSpace + "px";
    if (doodlerBottomSpace > startPoint + 200) {
      fall();
    }
  }, 30);
}

function fall() {
  clearInterval(upTimerId);
  isJumping = false;
  downTimerId = setInterval(function () {
    doodlerBottomSpace -= 5;
    doodler.style.bottom = doodlerBottomSpace + "px";
    if (doodlerBottomSpace < 20) {
      jump();
    }

    platforms.forEach((platform) => {
      if (
        doodlerBottomSpace >= platform.bottom &&
        doodlerBottomSpace <= platform.bottom + 15 &&
        doodlerLeftSpace + 60 >= platform.left &&
        doodlerLeftSpace <= platform.left + 85 &&
        !isJumping
      ) {
        startPoint = doodlerBottomSpace;
        jump();
        //some
      }
    });
  }, 30);
}

function gameOver() {
  isGameOver = true;
  clearInterval(upTimerId);
  clearInterval(rightTimerId);
  clearInterval(leftTimerId);
  clearInterval(downTimerId);
}

function start() {
  if (!isGameOver) {
    createPlatforms();
    createDoodler();
    jump();
    document.addEventListener("keyup", control);
  }
}

start();

// Create Doodler
