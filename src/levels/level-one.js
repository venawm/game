export const walls = new Set();

walls.add(`64,48`);

walls.add(`64,64`);
walls.add(`64,80`);
walls.add(`80,64`);
walls.add(`80,80`);

walls.add(`112,80`);
walls.add(`128,80`);
walls.add(`144,80`);
walls.add(`160,80`);
walls.add(`240,32`);
walls.add(`224,32`);

// stones
walls.add(`192,96`);
walls.add(`208,96`);
walls.add(`224,96`);

walls.add(`208,64`);
walls.add(`224,64`);

walls.add(`144,48`);
walls.add(`128,48`);

walls.add(`80,112`);

for (let x = 0; x <= 224; x += 16) {
  walls.add(`${x},16`);
}
// Bottom border
for (let x = 0; x <= 240; x += 16) {
  walls.add(`${x},112`);
}
// Left border
for (let y = 0; y <= 112; y += 16) {
  walls.add(`32,${y}`);
}
// Right border
for (let y = 0; y <= 144; y += 16) {
  walls.add(`256,${y}`);
}
