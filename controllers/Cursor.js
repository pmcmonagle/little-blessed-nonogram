'use strict';

class Cursor {
	constructor () {
		this.x = 0;
		this.y = 0;
		this.maxX = 0;
		this.maxY = 0;
	}

	setPuzzle (puzzle) {
		if (!puzzle.length || !puzzle[0].length)
			return;
		this.maxY = puzzle.length - 1;
		this.maxX = puzzle[0].length - 1;
	}

	left ()  { this.x = Math.max(0, this.x - 1); }
	right () { this.x = Math.min(this.maxX, this.x + 1); }
	up ()    { this.y = Math.max(0, this.y - 1); }
	down ()  { this.y = Math.min(this.maxY, this.y + 1); }
}

module.exports = Cursor;
