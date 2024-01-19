// This code controls the graphics content of the algorithm

class View {
    constructor() {
        /** @type {HTMLCanvasElement} */
        this.cnv = document.getElementById('canvas');
        this.ctx = this.cnv.getContext('2d');
        this.cnv.width = 1280;
        this.cnv.height = 720;
    }

    drawBackground() {
        this.ctx.fillStyle = "rgb(50, 50, 50)";
        this.ctx.fillRect(0, 0, this.cnv.width, this.cnv.height);
    }

    drawText() {
        this.ctx.fillStyle = "rgb(150, 150, 150)";
        this.ctx.font = "17px helvetica";
        this.ctx.fillText('Right click to generate maze', 10, 20);
        this.ctx.fillText('Space bar to toggle animation', 10, 40);
        this.ctx.fillText('"i" key to iterate once', 10, 60);
        this.ctx.fillText('"a" key to toggle arrows', 10, 80);
        this.ctx.fillText('"o" key to toggle highlight origin', 10, 100);
        this.ctx.fillText('"h" key to hide text', 10, 140);
    }

    drawMaze(maze, drawArrow = true, highlightOrigin = true, hideText = false, marginY = 50) {
        // calculate values
        let size = (this.cnv.height - marginY * 2) / maze.height;
        let marginX = Math.round((this.cnv.width - size * maze.width) / 2);
        size = Math.round(size);
        let lineWidth = Math.ceil(size / 15);
        let nodeRadius = lineWidth * 1.5;
        let arrowSize = lineWidth * 2;
        let arrowLengthMultiplier = 1;
        if (drawArrow) arrowLengthMultiplier = 0.8;

        if (mazeWidth/mazeHeight > this.cnv.width/this.cnv.height) {
            marginX = marginY;
            size = (this.cnv.width - marginX * 2) / maze.width;
            marginY = Math.round((this.cnv.height - size * maze.height) / 2);
            size = Math.round(size);
        }

        this.drawBackground();
        if (!hideText) this.drawText();

        this.ctx.fillStyle = "rgb(0, 200, 255)";
        this.ctx.strokeStyle = "rgb(0, 200, 255)";
        for (let y = 0; y < maze.height; y++) {
            for (let x = 0; x < maze.width; x++) {
                let node = maze.map[y][x];
                let xPos = x * size + marginX + size / 2;
                let yPos = y * size + marginY + size / 2;

                // draw node
                this.ctx.beginPath();
                this.ctx.arc(xPos, yPos, nodeRadius, 0, 2*Math.PI);
                this.ctx.fill();

                // draw arrow
                this.ctx.beginPath();
                this.ctx.lineWidth = lineWidth;
                this.ctx.moveTo(xPos, yPos);
                this.ctx.lineTo(xPos + node.direction.x * size * arrowLengthMultiplier, yPos + node.direction.y * size * arrowLengthMultiplier);
                this.ctx.stroke();

                if (drawArrow) {
                    let triangleX = xPos + node.direction.x * size * arrowLengthMultiplier * 1.1;
                    let triangleY = yPos + node.direction.y * size * arrowLengthMultiplier * 1.1;

                    this.ctx.beginPath();
                    this.ctx.moveTo(triangleX, triangleY);

                    triangleX = triangleX - node.direction.x * arrowSize;
                    triangleY = triangleY - node.direction.y * arrowSize;

                    if (node.direction.y == 0)  triangleY = triangleY - arrowSize;
                    else                        triangleX = triangleX - arrowSize;

                    this.ctx.lineTo(triangleX, triangleY);

                    if (node.direction.y == 0)  triangleY = triangleY + arrowSize * 2;
                    else                        triangleX = triangleX + arrowSize * 2;

                    this.ctx.lineTo(triangleX, triangleY);
                    this.ctx.fill();
                }
            }
        }

        if (!highlightOrigin) return;

        // colour origin point
        this.ctx.fillStyle = "rgb(255, 0, 0)";
        let xPos = maze.origin.x * size + marginX + size / 2;
        let yPos = maze.origin.y * size + marginY + size / 2;
        this.ctx.beginPath();
        this.ctx.arc(xPos, yPos, nodeRadius, 0, 2*Math.PI);
        this.ctx.fill();
    }
}