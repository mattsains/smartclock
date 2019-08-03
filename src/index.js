import CanvasRenderer from './renderer';
import UI from './ui';

let canvas;
if (typeof document === 'undefined') {
  const { createCanvas } = require('canvas'); // eslint-disable-line global-require
  canvas = createCanvas(480, 320);
} else {
  canvas = document.createElement('canvas');
  canvas.id = 'main';
  canvas.width = 480;
  canvas.height = 320;
  canvas.style.position = 'absolute';
  canvas.style.border = '2px solid #f00';
  canvas.style.backgroundColor = '#000000';
  document.body.appendChild(canvas);
}
const ctx = canvas.getContext('2d');

const updateDisplay = () => {
  if (typeof document === 'undefined') {
    const fs = require('fs'); // eslint-disable-line global-require
    const fb = fs.openSync('/dev/fb0', 'w');
    const buff = canvas.toBuffer('raw');
    fs.writeSync(fb, buff, 0, buff.byteLength, 0);
  }
};

new CanvasRenderer(ctx, updateDisplay).render(UI);
