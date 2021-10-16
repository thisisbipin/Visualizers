/*  
    ===========================
    Designed by: Bipin Jadav
    Github: thisisbipin
    ===========================

    This is a simple visualization of Breadth First Search Algorithm
*/


let box_size = 30;
let box = document.getElementById('box-ID');
let GLOBALS = {
    DEBUG_MODE: false,
    START: 1001,
    END: 1001,
    START_SELECTED: false,
    END_SELECTED: false,
    mode: '',
    isrunning: false,
    algo_speed: 100,
}

// This function creates a Cell on i(th) row and j(th) col
function create_cell(i, j) {
    let new_cell_box = document.createElement('div');
    new_cell_box.classList.add('cell');
    let new_cell = document.createElement('div');
    new_cell.id = 1000 * i + j;

    if (GLOBALS.DEBUG_MODE == true)         // Shows the cell ID inside the cell
        new_cell.textContent = new_cell.id;

    new_cell.classList.add('default-color-cell');
    new_cell_box.appendChild(new_cell);
    new_cell_box.setAttribute('onclick', `  console.log(${i},${j}); cell_selector(${new_cell.id}); `);
    box.appendChild(new_cell_box);
}

// This function selects the cell and marks it Visited, Active or unvisited etc.
function cell_selector(id) {
    if (GLOBALS.isrunning == true)
        return;
    if (GLOBALS.mode == 'START') {
        if (GLOBALS.START_SELECTED == true) {
            alert('Start is already selected');
            return;
        }
        GLOBALS.START = id;
        GLOBALS.START_SELECTED = true;
        start_cell(GLOBALS.START);
        GLOBALS.mode = '';

    } else if (GLOBALS.mode == 'END') {
        if (GLOBALS.END_SELECTED == true) {
            alert('End is already selected');
            return;
        }

        GLOBALS.END = id;
        GLOBALS.END_SELECTED = true;
        target_cell(GLOBALS.END);
        GLOBALS.mode = '';
    } else if (GLOBALS.mode == 'DISABLE') {
        disable_cell(id);
    }
}


function disable_cell(id) {
    let cell = document.getElementById(id);
    cell.className = 'color-cell disable';
    if (cell == undefined)
        throw new Error("Cell Not Found!!");
}
// This funtion  marks current cell to inactive or visited
function inactive_cell(id) {
    let cell = document.getElementById(id);
    cell.className = 'color-cell-visited';
    if (cell == undefined)
        throw new Error("Cell Not Found!!");
}

// This function marks cell as active
function active_cell(id) {
    let cell = document.getElementById(id);
    cell.className = 'color-cell active';
    if (cell == undefined)
        throw new Error("Cell Not Found!!");
}

// This function marks the End cell or the cell to find.
function target_cell(id) {
    let cell = document.getElementById(id);
    cell.className = 'color-cell target';
    if (cell == undefined)
        throw new Error("Cell Not Found!!");
}

// This function marks the Start cell or the cell to find.
function start_cell(id) {
    let cell = document.getElementById(id);
    cell.className = 'color-cell start';
    if (cell == undefined)
        throw new Error("Cell Not Found!!");
}

// Resets the page
function reset() {
    if (GLOBALS.isrunning == false) {
        for (let i = 1; i < m; i++)
            for (let j = 1; j < n; j++) {
                let cell = document.getElementById(i * 1000 + j);
                cell.className = 'default-color-cell';
            }
        GLOBALS.START_SELECTED = false;
        GLOBALS.END_SELECTED = false;
    }
    else
        alert('Algorithm is running! Please Wait! If you want to halt the process please Refresh the page.');
}

//returns a list of all adjacent cell IDs for the current cell
function getadjacent_ids(id) {
    let res = [];
    if ((id - 1) % 1000 > 0)
        if (document.getElementById(id - 1).classList.contains('disable') == false)
            res.push(id - 1);
    if ((id / 1000 - 1) > 1)
        if (document.getElementById(id - 1000).classList.contains('disable') == false)
            res.push(id - 1000);
    if ((id + 1) % 1000 < n)
        if (document.getElementById(id + 1).classList.contains('disable') == false)
            res.push(id + 1);
    if (id / 1000 + 1 < m)
        if (document.getElementById(id + 1000).classList.contains('disable') == false)
            res.push(id + 1000);

    return res;
}

// Synchronous function to wait
// https://stackoverflow.com/questions/6921895/synchronous-delay-in-code-execution
function wait(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //   console.log("Done waiting");
            resolve(ms)
        }, ms)
    })
}

// Starts The algorithm
async function start() {
    if (GLOBALS.START_SELECTED == false) {
        alert('Select Starting cell!');
        return;
    }
    if (GLOBALS.END_SELECTED == false) {
        alert('Select End Cell!');
        return;
    }
    visited = []
    GLOBALS.isrunning = true;
    let x = await dfs(GLOBALS.START, GLOBALS.END);
    GLOBALS.isrunning = false;
    GLOBALS.START_SELECTED = false;
    GLOBALS.END_SELECTED = false;
}


// Update the current slider value (each time you drag the slider handle)
document.getElementById("myRange").oninput = function () {
    if (GLOBALS.DEBUG_MODE == true)
        console.log('Speed Changed to:', GLOBALS.algo_speed);
    GLOBALS.algo_speed = 2010 - this.value
};

// Automatically refresh the page on resize
window.onresize = () => {
    if (window.innerWidth > 840)
        window.location = window.location.href;
}

/* -------------------- Script starts here ---------------------------*/

let m = (window.innerHeight - 40) / (box_size + 2) - 1;     // number of rows
let n = (window.innerWidth - 40) / (box_size + 2);          // number of coloumns
if (GLOBALS.DEBUG_MODE == true)
    console.log(m, n);


for (let i = 1; i < m; i++)
    for (let j = 1; j < n; j++)
        create_cell(i, j);

let visited = [];
let cells_visited = 0;
let rec = 0;
let queue = new Queue();
let isfound = false;
// Standard DFS algorithm
async function dfs(id, idtofind) {
    if (rec > 1000) {
        return;
    }
    rec++;
    visited.push(id);
    if (id == idtofind) {
        isfound = true;
        return;
    }
    for (let adj of getadjacent_ids(id))
        if (visited.findIndex(ele => ele == adj) == -1 && isfound == false) {
            if (GLOBALS.DEBUG_MODE == true)
                console.log('Visited:', adj);
            active_cell(adj);
            await wait(GLOBALS.algo_speed);
            inactive_cell(adj);
            await dfs(adj, idtofind);
        }
}