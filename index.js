const r = require('raylib');

const screenWidth = 480;
const screenHeight = 320;
r.InitWindow(screenWidth, screenHeight, "raylib [core] example - basic window");
r.SetTargetFPS(60);

while (!r.WindowShouldClose()) {
    r.BeginDrawing();
    r.ClearBackground(r.RAYWHITE);
    r.DrawText("Placeholder", 190, 200, 20, r.LIGHTGRAY);
    r.EndDrawing();
}
r.CloseWindow();        // Close window and OpenGL context