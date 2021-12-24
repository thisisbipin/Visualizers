import { wait } from "./helper.js";
let stack = [];
let current;
let MazeGenspeed = 100;

export async function GenerateMaze(grid) {
  current = grid[grid.length - 1][grid[0].length - 1];
  current.visited = true;

  // STEP 1
  stack.push(current);

  while (stack.length > 0) {
    current = stack.pop();
    let neighbors = current.getNeighbors(grid);
    if (neighbors.length > 0) {
      stack.push(current);
      let chosen =
        neighbors[Math.floor((Math.random() * 10) % neighbors.length)];
      removeWalls(current, chosen);
      chosen.visited = true;
      stack.push(chosen);
      if (MazeGenspeed != undefined) await wait(MazeGenspeed);
    }
  }
  grid[0][0].special("🦋", true);
  grid[grid.length - 1][grid[0].length - 1].special("🌸");
}

function removeWalls(a, b) {
  let x = a.j - b.j;
  if (x == 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x == -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }

  let y = a.i - b.i;
  if (y == 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y == -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
  a.updateCell();
  b.updateCell();
}
export function setMazeGeneratingSpeed(ms) {
  if (ms == "reset") MazeGenspeed = 100;
  else MazeGenspeed = ms;
}
