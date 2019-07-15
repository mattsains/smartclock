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
    canvas.style.border = '1px solid';
    document.body.appendChild(canvas);
}
const ctx = canvas.getContext("2d");

const Time = require('./components/time');

// const updateInterval = 500;

const timeComponent = new Time(ctx, 0, 70, 480, 180);

setInterval(() => {
    ctx.clearRect(0, 0, 480, 320);
    timeComponent.update();
    if (typeof document === 'undefined') {
        const fs = require("fs");
        const fb = fs.openSync("/dev/fb0", "w"); // where /dev/fb1 is the path to your fb device
        const buff = canvas.toBuffer("raw");
        fs.writeSync(fb, buff, 0, buff.byteLength, 0);
    }
}, 500);