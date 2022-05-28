import { Queue } from "./queue.js";
import { wait } from "./helper.js";
// standard BFS from here
let queue = new Queue();
let visited = [],
    solvingSpeed = 1;
let cells_visited = 0; // just to debug
export async function BFS(grid, id, idtofind) {
    idtofind = grid.length - 1 + "-" + (grid[0].length - 1);
    queue.clear();
    visited = [];

    let prev = {};

    visited.push(id);
    queue.push(id);
    while (!queue.isEmpty()) {
        let parent = queue.pop();
        let x = [
            parseInt(parent.split("-")[0]),
            parseInt(parent.split("-")[1]),
        ];
        // grid[x[0]][x[1]].green();
        let adj = grid[x[0]][x[1]].getNeighbors(grid, true);

        for (let j = 0; j < adj.length; j++) {
            if (
                visited.findIndex((ele) => ele == adj[j].i + "-" + adj[j].j) ==
                -1
            ) {
                visited.push(adj[j].i + "-" + adj[j].j);

                adj[j].white();

                await wait(solvingSpeed);
                if (idtofind == adj[j].i + "-" + adj[j].j) {
                    console.log("Found It!");
                    prev[idtofind] = parent;
                    let path = [];
                    let e = idtofind;
                    for (let at = e; at != undefined; at = prev[at]) {
                        path.push(at);
                    }
                    path.reverse();
                    for (let i = 0; i < path.length; i++) {
                        let x = [
                            parseInt(path[i].split("-")[0]),
                            parseInt(path[i].split("-")[1]),
                        ];
                        await wait(solvingSpeed);
                        grid[x[0]][x[1]].purple();
                    }
                    return;
                }
                queue.push(adj[j].i + "-" + adj[j].j);
                prev[adj[j].i + "-" + adj[j].j] = parent;
                cells_visited++;
            }
        }
    }
}
export function setSolvingSpeedBFS(ms) {
    if (ms == "reset") solvingSpeed = 100;
    else solvingSpeed = ms;
}
