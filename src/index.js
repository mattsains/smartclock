import React from "react";
import CustomRenderer from "./renderer";
import Rectangle from './components/rectangle';

let canvas;
if (typeof document === 'undefined') {
  const { createCanvas } = require('canvas');
  canvas = createCanvas(480, 320);
} else {
  canvas = document.createElement('canvas');
  canvas.id = 'main';
  canvas.width = 480;
  canvas.height = 320;
  canvas.style.position = 'absolute';
  canvas.style.border = '2px solid #f00';
  canvas.style.backgroundColor = '#000000'
  document.body.appendChild(canvas);
}
const ctx = canvas.getContext("2d");

//TODO: replace with useful component
const testElement = <Rectangle x='0' y='0' height='10' width='20' strokeStyle="green"></Rectangle>

const updateDisplay = () => {
  if (typeof document === 'undefined') {
    const fs = require("fs");
    const fb = fs.openSync("/dev/fb0", "w");
    const buff = canvas.toBuffer("raw");
    fs.writeSync(fb, buff, 0, buff.byteLength, 0);
  }
}

new CustomRenderer(ctx).render(testElement, updateDisplay);