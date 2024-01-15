# New Maze Generating Algorithm

Check out this maze generating algorithm I came up with.

Visit <a href="https://captainluma.github.io/New-Maze-Generating-Algorithm/" target="_blank">this site</a> to try it out, or download the files and run "index.html"

The algorithm goes as follows:

1. Start with a grid of nodes. Each has a direction property that can point nowhere, or to one of its neighbors.
2. Initialize the grid to be any perfect maze, that being a maze with no loops or isolated areas. Each node should point to one neighboring node, with a single node, the origin node, pointing nowhere.
3. Repeat the following steps for as many iterations as you'd like:
   * Have the origin node, point to a random neighboring node.
	* That neigboring node becomes the new origin node.
	* have the new origin node point nowhere.

## License

MIT
