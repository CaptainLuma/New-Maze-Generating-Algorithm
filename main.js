/*
Maze Generator Algorithm by CaptainLuma
Last Updated 1/12/2024
*/

// global variables (feel free to edit these values)
let mazeWidth = 10;
let mazeHeight = 10;
let algorithmIterations = mazeWidth * mazeHeight * 10; // how many iterations should be performed when running the algorithm
let animationFPS = 24; // frames per second
let drawArrow = false; // whether to show the direction of each node or not. Toggle with "a" key
let highlightOrigin = true; // wether to highlight the origin node or not. Toggle with "o" key
let hideText = false; // Toggle with "h" keyg
let animate = false; //  whether to animate the algorithm or not. Toggle with space bar

class Node {
    constructor(directionX = 0, directionY = 0) {
        this.direction = {x: directionX, y: directionY};
    }

    setDirection(x, y) {
        this.direction.x = x;
        this.direction.y = y;
    }
}

class Maze {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.map = this.newMap(); // the array of nodes defining the maze
        this.origin = {x: this.width - 1, y: this.height - 1}; // position of the origin point
        this.nextOrigin = {x: null, y: null}; // position of the next origin point. this is defined here to improve performance
        this.possibleDirections = [
            {x: -1, y: 0},
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1}
        ]; // an array containing the possible directions the origin can travel in
    }

    // returns a map of a valid maze
    newMap() {
        let map = [];
        for (let y = 0; y < this.height; y++) {
            map.push([]);
            for (let x = 0; x < this.width - 1; x++) {
                map[y].push(new Node(1, 0));
            }
            map[y].push(new Node(0, 1));
        }
        map[this.height - 1][this.width - 1].setDirection(0, 0);

        return map;
    }

    setOrigin(x, y) {
        this.origin.x = x;
        this.origin.y = y;
    }

    setNextOrigin(x, y) {
        this.nextOrigin.x = x;
        this.nextOrigin.y = y;
    }

    // performs one iteration of the algorithm
    iterate() {
        // select a random direction
        let direction = this.possibleDirections[getRandomInt(0, this.possibleDirections.length)];
        
        // check if out of bounds
        this.setNextOrigin(this.origin.x + direction.x, this.origin.y + direction.y);
        if (this.nextOrigin.x < 0 || this.nextOrigin.x >= mazeWidth || this.nextOrigin.y < 0 || this.nextOrigin.y >= mazeHeight) return;

        // set the origin nodes direction to this direction
        this.map[this.origin.y][this.origin.x].setDirection(direction.x, direction.y);

        // the node in this direction becomes the new origin node
        this.setOrigin(this.nextOrigin.x, this.nextOrigin.y);
        this.map[this.origin.y][this.origin.x].setDirection(0, 0);
    }
}

// create the maze
let maze = new Maze(mazeWidth, mazeHeight);
let view = new View();

view.drawMaze(maze, drawArrow, highlightOrigin, hideText);

// animation loop
function mainLoop() {
    maze.iterate();
    view.drawMaze(maze, drawArrow, highlightOrigin, hideText);
    if (animate) setTimeout(mainLoop, 1000 / animationFPS);
}

// event listeners
document.addEventListener("click", function(event) {
    let start = Date.now();
    for (let i = 0; i < algorithmIterations; i++) {
        maze.iterate();
    }
    let end = Date.now();
    console.log(`Performed ${algorithmIterations} iterations. Execution time: ${end - start} milliseconds`);

    view.drawMaze(maze, drawArrow, highlightOrigin, hideText);
});

document.addEventListener("keydown", function(event) {
    switch (event.key) {
        case " ":
            // toggle animation
            animate = !animate;
            setTimeout(mainLoop, 1000 / animationFPS);
            break;
        case "a":
            // toggle arrows
            drawArrow = !drawArrow;
            view.drawMaze(maze, drawArrow, highlightOrigin, hideText);
            break;
        case "i":
            // one iteration
            maze.iterate();
            view.drawMaze(maze, drawArrow, highlightOrigin, hideText);
            break;
        case "o":
            // toggle highlight origin
            highlightOrigin = !highlightOrigin;
            console.log(highlightOrigin);
            view.drawMaze(maze, drawArrow, highlightOrigin, hideText);
            break;
        case "h":
            hideText = !hideText;
            view.drawMaze(maze, drawArrow, highlightOrigin, hideText);
            break;
        default:
            break;
    }
});

document.getElementById('apply').addEventListener('click', updateMazeDimensions);

function updateMazeDimensions() {
    // validate
    try {
        mazeWidth = parseInt(document.getElementById('width').value);
        mazeHeight = parseInt(document.getElementById('height').value);

        if (mazeWidth < 1 || mazeHeight < 1) throw new error("values can't be 0 or negative");
    } catch {
        mazeWidth = 10;
        mazeHeight = 10;
    }
    
    algorithmIterations = mazeWidth * mazeHeight * 10;
    maze = new Maze(mazeWidth, mazeHeight);
}

// helpers
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min); // min inclusive, max exclusive
}