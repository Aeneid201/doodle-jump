"use strict";

// DOM caching
const grid = document.querySelector(".grid");
const doodler = document.createElement("div");
let doodlerLeftSpace = 50;
let doodlerBottomSpace = 150;
let isGameOver = false;
let platformCount = 5;

// Create platforms
function createPlatforms() {
  for (let i = 0; i < platformCount; i++) {
    let platGap = 600 / platformCount;
    let newPlatBottom = 100 + i * platGap;
    let newPlatform = platform(newPlatBottom);
  }
}

function platform(newPlatBottom) {
  bottom = newPlatBottom;
  left = Math.random() * 315;
  visual = document.createElement("div");
  const visual = this.visual;
  visual.classList.add("platform");
  visual.style.left = left + "px";
  visual.style.bottom = this.bottom + "px";
  grid.appendChild(visual);

  return { bottom, left, visual };
}

function createDoodler() {
  grid.appendChild(doodler);
  doodler.classList.add("doodler");
  doodler.style.left = doodlerLeftSpace + "px";
  doodler.style.bottom = doodlerBottomSpace + "px";
}

function start() {
  if (!isGameOver) {
    createDoodler();
    createPlatforms();
  }
}

start();

// Create Doodler
