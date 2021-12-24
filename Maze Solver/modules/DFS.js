import { wait } from "./helper.js";
let visited = [],
  solvingSpeed = 1;
let isfound = false;
// Standard DFS algorithm
export async function DFS(grid, id, idtofind) {
  idtofind = grid.length - 1 + "-" + (grid[0].length - 1);
  await dfshelper(grid, id, idtofind);
}

async function dfshelper(grid, id, idtofind) {
  visited.push(id);
  if (id == idtofind) {
    isfound = true;
    return;
  }
  let x = [parseInt(id.split("-")[0]), parseInt(id.split("-")[1])];
  for (let adj of grid[x[0]][x[1]].getNeighbors(grid, true))
    if (
      visited.findIndex((ele) => ele == adj.i + "-" + adj.j) == -1 &&
      isfound == false
    ) {
      adj.white();
      await wait(solvingSpeed);
      //   inactive_cell(adj);
      await dfshelper(grid, adj.i + "-" + adj.j, idtofind);
    }
  if (isfound == false) {
    grid[x[0]][x[1]].green();
    await wait(solvingSpeed);
  }
}

export function setSolvingSpeedDFS(ms) {
  if (ms == "reset") solvingSpeed = 100;
  else solvingSpeed = ms;
}
