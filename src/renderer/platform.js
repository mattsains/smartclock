export default class Platform { }

export class Browser extends Platform {
  getImage(src) {
    return new Promise((resolve) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.src = src;
    });
  }

  createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'main';
    canvas.width = 480;
    canvas.height = 320;
    canvas.style.position = 'absolute';
    canvas.style.border = '2px solid #f00';
    canvas.style.backgroundColor = '#000000';
    document.body.appendChild(canvas);
    return canvas;
  }

  saveCanvas() { }
}

export class Node extends Platform {
  constructor() {
    super();
    this.canvasLib = require('canvas'); // eslint-disable-line global-require
  }

  getImage(src) {
    return this.canvasLib.loadImage(src);
  }

  createCanvas() {
    return this.canvasLib.createCanvas(480, 320);
  }

  saveCanvas(canvas) {
    const fs = require('fs'); // eslint-disable-line global-require
    const fb = fs.openSync('/dev/fb0', 'w');
    const buff = canvas.toBuffer('raw');
    fs.writeSync(fb, buff, 0, buff.byteLength, 0);
  }
}
