const r = require('raylib');
const Time = require('./src/components/time');

const screenWidth = 480;
const screenHeight = 320
const updateInterval = 500;

r.InitWindow(screenWidth, screenHeight, "raylib [core] example - basic window");
r.SetTargetFPS(60);

const timeComponent = new Time(r, 0, 70, 480, 180);

let lastUpdateMillis = 0;

while (!r.WindowShouldClose()) {
    if (lastUpdateMillis + updateInterval < Date.now()) {
        timeComponent.update();
        lastUpdateMillis = Date.now();
    }

    r.BeginDrawing();
    r.ClearBackground(r.RAYWHITE);
    timeComponent.draw();
    r.EndDrawing();
}
r.CloseWindow();