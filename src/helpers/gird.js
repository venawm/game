export const gridCells = (n) => {
  return n * 16;
};

export const isSpaceFree = (walls, x, y) => {
  const str = `${x},${y}`;
  console.log(walls);
  console.log(str);
  const isWallsPresent = walls.has(str);

  console.log("isWallsPresent", isWallsPresent);
  return !isWallsPresent;
};
