let canvas;
if (typeof document === 'undefined') {
    const {createCanvas} = require('canvas');
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

const Time = require('./components/time');

const timeComponent = new Time(ctx, 100, 70, 480, 180);

setInterval(() => {
    ctx.clearRect(0, 0, 480, 320);
    timeComponent.update();
    if (typeof document === 'undefined') {
        const fs = require("fs");
        const fb = fs.openSync("/dev/fb0", "w");
        const buff = canvas.toBuffer("raw");
        fs.writeSync(fb, buff, 0, buff.byteLength, 0);
    }
}, 500);