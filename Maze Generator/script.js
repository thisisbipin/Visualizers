/*  
    ===========================
    Designed by: Bipin Jadav
    Github: thisisbipin
    ===========================

    This is a simple visualization of Breadth First Search Algorithm
*/

// Synchronous function to wait
// https://stackoverflow.com/questions/6921895/synchronous-delay-in-code-execution
function wait(ms) {
    return new Promise((res) => setTimeout(() => { res(ms) }, ms));
}

let G = {
    DEBUG_MODE: false,
    size: 36,
    rows: 0,
    cols: 0,
    speed: 10,
    isrunning: false,
    isMazeAvailable: false,
}
let grid = [];
let stack = [];
let current;
/* -------------------- Script starts here ---------------------------*/
$(() => start());

function start() {

    if (G.isrunning == true) {
        alert('Algorithm is Running! Please Wait');
        return;
    }
    // Re -initialize
    grid = [];
    stack = [];
    G.isMazeAvailable = false;
    $('#box-ID').empty();
    G.speed = 10;


    document.getElementById("myRange").oninput = function () {
        if (G.DEBUG_MODE == true)
            console.log('Speed Changed to:', G.speed);
        G.speed = 2010 - this.value
    };

    G.size = $('#sample-cell').outerWidth();
    let height = window.innerHeight - Math.ceil($('.header').outerHeight());
    $('#box-ID').height(height);
    let width = $('#box-ID').outerWidth() - 20;
    G.rows = Math.floor(height / G.size);
    G.cols = Math.floor(width / G.size);
    console.log(G.rows, G.cols);
    // return;
    for (let i = 0; i < G.rows; i++)
        for (let j = 0; j < G.cols; j++) {
            let x = new Cell(i, j);
            grid.push(x);
            // x.createCell(i + ' ' + j);
            x.createCell();
        }
    current = grid[grid.length - 1];
    // GenerateMaze();
}

async function GenerateMaze() {
    if (G.isrunning == true) {
        alert('Algorithm is Running! Please Wait');
        return;
    }
    if (G.isMazeAvailable == true) {
        alert('Maze is available! Consider Resetting');
        return;
    }

    G.isrunning = true;
    current.visited = true;
    current.highlight();
    // STEP 1
    stack.push(current);

    while (stack.length > 0) {
        current = stack.pop();
        let neighbors = current.getNeighbors();
        if (neighbors.length > 0) {

            stack.push(current);
            let chosen = neighbors[Math.floor((Math.random() * 10) % neighbors.length)];
            removeWalls(current, chosen);
            chosen.visited = true;
            chosen.highlight();
            current.highlight();
            stack.push(chosen);
            if (G.speed != undefined)
                await wait(G.speed);
        }
        console.log('Again!');
    }
    grid[0].special();
    grid[grid.length - 1].special();
    G.isrunning = false;
    G.isMazeAvailable = true;
}

function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true]; // top right bottom left
    this.visited = false;

    this.createCell = function (fun) {
        this.cellHandler = jQuery('<div>', { id: getIndex(i, j), class: 'cell top right bottom left' });
        this.cellHandler.html(fun).appendTo('#box-ID');
    }
    this.updateCell = function () {
        let classValue = 'cell ';
        if (this.walls[0] == true)
            classValue += 'top ';
        if (this.walls[1] == true)
            classValue += 'right ';
        if (this.walls[2] == true)
            classValue += 'bottom ';
        if (this.walls[3] == true)
            classValue += 'left ';
        this.cellHandler.attr('class', classValue);

    }

    this.getNeighbors = function () {
        let neighbors = [];

        let top = grid[getIndex(this.i - 1, this.j)];
        let right = grid[getIndex(this.i, this.j + 1)];
        let bottom = grid[getIndex(this.i + 1, this.j)];
        let left = grid[getIndex(this.i, this.j - 1)];

        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }

        return neighbors;
    };


    this.highlight = function () {
        this.cellHandler.addClass('highlight');
    };
    this.special = function () {
        this.cellHandler.removeClass('highlight');
        this.cellHandler.html('<>');
    }

}

function getIndex(i, j) {
    if (i < 0 || j < 0 || i > G.rows - 1 || j > G.cols - 1) {
        return -1;
    }
    return i * G.cols + j;
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
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}