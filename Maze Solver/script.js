import { Cell } from "./modules/Cell.js";
import { GenerateMaze, setMazeGeneratingSpeed } from "./modules/MazeGen.js";
import { BFS, setSolvingSpeedBFS } from "./modules/BFS.js";
import { DFS, setSolvingSpeedDFS } from "./modules/DFS.js";
let GLOBALS = {
    width: 0,
    height: 0,
    isrunning: false,
    isMazeAvailable: false,
    isSolved: false,
    speed: 500,
};
let grid = [];
$(() => {
    GLOBALS.width = Math.floor($("#box-ID").innerWidth()) - 20; // -20 is because of css padding
    GLOBALS.height = window.innerHeight - Math.ceil($(".header").outerHeight());
    $("#box-ID").height(GLOBALS.height);

    reset();
    speedManager();
    //Mappings
    $("#maze-gen-btn").on("click", async () => {
        if (GLOBALS.isrunning == true) {
            alert("Algorithm is Running! Please Wait");
            return;
        }
        if (GLOBALS.isMazeAvailable == true) {
            alert("Maze is available! Consider Resetting");
            return;
        }
        GLOBALS.isrunning = true;
        GLOBALS.isMazeAvailable = true;
        await GenerateMaze(grid);
        GLOBALS.isrunning = false;
    });

    $("#skip-anim-btn").on("click", () => setMazeGeneratingSpeed(undefined));

    $(".solve-btn").on("click", async function () {
        if (GLOBALS.isrunning == true) {
            alert("Algorithm is Running! Please Wait");
            return;
        }
        if (GLOBALS.isSolved == true) {
            alert("Already Solved! Consider Resetting");
            return;
        }
        if (GLOBALS.isMazeAvailable == false) {
            alert("Please Generate a maze before solving!");
            return;
        }
        GLOBALS.isrunning = true;
        GLOBALS.isSolved = true;
        let whichAlgorithm = $(this)[0].id;
        switch (whichAlgorithm) {
            case "bfs":
                await BFS(grid, "0-0");
                break;
            case "dfs":
                await DFS(grid, "0-0");
                break;
        }
        GLOBALS.isrunning = false;
    });
    $("#reset-btn").on("click", () => reset());
    $(".progress").on("click", (e) => {
        let progresswidth = $(".progress").width();
        GLOBALS.speed =
            1000 - (1 - (progresswidth - e.offsetX) / progresswidth) * 1000;
        console.log(GLOBALS.speed);
        progresswidth = (1000 - GLOBALS.speed) / 10;
        $(".progress-bar").width(progresswidth + "%");
        speedManager();
    });
});

function speedManager() {
    setMazeGeneratingSpeed(GLOBALS.speed);
    setSolvingSpeedDFS(GLOBALS.speed);
    setSolvingSpeedBFS(GLOBALS.speed);
}
function reset() {
    if (GLOBALS.isrunning == true) {
        alert("Algorithm is Running! Please Wait");
        return;
    }
    grid = [];
    $("#box-ID").empty();
    let cellsize = $("#sample-cell").outerWidth();
    for (let i = 0; i < Math.floor(GLOBALS.height / cellsize); i++) {
        let sub_grid = [];
        let currRow = document.createElement("div");
        currRow.className = "sub-box";
        for (let j = 0; j < Math.floor(GLOBALS.width / cellsize); j++) {
            let x = new Cell(i, j);
            x.createCell(undefined, currRow);
            document.getElementById("box-ID").append(currRow);
            sub_grid.push(x);
        }
        grid.push(sub_grid);
    }
    GLOBALS.isMazeAvailable = false;
    GLOBALS.isSolved = false;
}
