export class Cell {
  /*
  Cell 
   - i
   - j
   - walls = [bool,bool,bool,bool] // top right bottom left
   - createCell() -> creates a div and appends to the Box-ID  
   - updateCell() -> UPDATES the class value and hence BORDERS
   - getNeighbors() -> returns the neighors
   - colorBlack() -> changes the color to black
   - whileSolvingVisited() -> changes the color to green
   - special(textContent) -> changes the text content
  */
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true]; // top right bottom left
    this.visited = false;
  }

  createCell = function (text, appends) {
    this.cellHandler = jQuery("<div>", {
      id: this.i + "_" + this.j,
      class: "cell top right bottom left",
    });
    this.cellHandler.html(text).appendTo(appends);
  };
  updateCell = function () {
    let classValue = "cell ";
    if (this.walls[0] == true) classValue += "top ";
    if (this.walls[1] == true) classValue += "right ";
    if (this.walls[2] == true) classValue += "bottom ";
    if (this.walls[3] == true) classValue += "left ";
    this.cellHandler.attr("class", classValue);
  };

  getNeighbors = function (grid, includingBorders = false) {
    let borders = this.cellHandler[0].className;
    let neighbors = [];

    let top = grid[this.i - 1] && grid[this.i - 1][this.j];
    let right = grid[this.i] && grid[this.i][this.j + 1];
    let bottom = grid[this.i + 1] && grid[this.i + 1][this.j];
    let left = grid[this.i] && grid[this.i][this.j - 1];

    if (
      (!includingBorders && top && !top.visited) ||
      (includingBorders && top && borders.match("top") == null)
    ) {
      neighbors.push(top);
    }
    if (
      (!includingBorders && right && !right.visited) ||
      (includingBorders && right && borders.match("right") == null)
    ) {
      neighbors.push(right);
    }
    if (
      (!includingBorders && bottom && !bottom.visited) ||
      (includingBorders && bottom && borders.match("bottom") == null)
    ) {
      neighbors.push(bottom);
    }
    if (
      (!includingBorders && left && !left.visited) ||
      (includingBorders && left && borders.match("left") == null)
    ) {
      neighbors.push(left);
    }

    return neighbors;
  };
  getNeighbors2 = function (realOnes) {
    let neighbors = [];

    let top = grid[getIndex(this.i - 1, this.j)];
    let right = grid[getIndex(this.i, this.j + 1)];
    let bottom = grid[getIndex(this.i + 1, this.j)];
    let left = grid[getIndex(this.i, this.j - 1)];

    if (
      (!realOnes && top && !top.visited) ||
      (realOnes && top && borders.match("top") == null)
    ) {
      neighbors.push(top);
    }
    if (
      (!realOnes && right && !right.visited) ||
      (realOnes && right && borders.match("right") == null)
    ) {
      neighbors.push(right);
    }
    if (
      (!realOnes && bottom && !bottom.visited) ||
      (realOnes && bottom && borders.match("bottom") == null)
    ) {
      neighbors.push(bottom);
    }
    if (
      (!realOnes && left && !left.visited) ||
      (realOnes && left && borders.match("left") == null)
    ) {
      neighbors.push(left);
    }

    return neighbors;
  };
  green = function () {
    this.cellHandler.css("background-color", "rgb(18, 185, 18)");
  };

  white = function () {
    this.cellHandler.css("background-color", "white");
  };

  green = function () {
    this.cellHandler.css("background-color", "green");
  };
  special = function (textContent, white = false) {
    if (white == true) this.cellHandler.css("background-color", "white");
    this.cellHandler.html(textContent);
  };
}
