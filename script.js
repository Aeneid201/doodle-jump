"use strict";

// DOM caching
const grid = document.querySelector(".grid");
const doodler = document.createElement("div");
let doodlerLeftSpace = 50;
let doodlerBottomSpace = 210;
let isGameOver = false;
let platformCount = 5;
let platforms = [];
let downTimerId, upTimerId;

// Create platforms
function createPlatforms() {
  for (let i = 0; i < platformCount; i++) {
    let platGap = 600 / platformCount;
    let newPlatBottom = 100 + i * platGap;
    let newPlatform = platform(newPlatBottom);
    platforms.push(newPlatform);
    console.log(platforms);
  }
}

// Create Platform
function platform(newPlatBottom) {
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
    });
  }
}

// Interval move platforms
setInterval(movePlatforms, 30);

// Create Doodler
function createDoodler() {
  grid.appendChild(doodler);
  doodler.classList.add("doodler");
  doodler.style.left = doodlerLeftSpace + "px";
  doodler.style.bottom = doodlerBottomSpace + "px";
}

// Jump function
function jump() {
  clearInterval(downTimerId);
  upTimerId = setInterval(function () {
    doodlerBottomSpace += 20;
    doodler.style.bottom = doodlerBottomSpace + "px";
    if (doodlerBottomSpace > 450) {
      fall();
    }
  }, 30);
}

function fall() {
  clearInterval(upTimerId);
  downTimerId = setInterval(function () {
    doodlerBottomSpace -= 5;
    doodler.style.bottom = doodlerBottomSpace + "px";
    if (doodlerBottomSpace < 20) {
      jump();
    }
  }, 30);
}

function start() {
  if (!isGameOver) {
    createDoodler();
    createPlatforms();
    jump();
  }
}

start();

// Create Doodler
