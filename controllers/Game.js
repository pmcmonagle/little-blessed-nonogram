'use strict';

const Data = require("./Data");

class Game {
	constructor () {
		this.currentPuzzle;
		this.currentSolution;
		this.rowHints;
		this.colHints;
	}

	loadRandom (d) {
		if (d === undefined) d = 1;
		this.currentPuzzle = Data.loadRandomFromDifficulty(d);
		this.currentSolution = this.copy(this.currentPuzzle);
		this.clear();
	}

	clear () {
		this.currentSolution.forEach((row, y) => row.forEach((col, x) => {
			this.currentSolution[y][x] = false;
		}));
	}

	copy (source) {
		let result = [];
		source.forEach(row => {
			let r = [];
			row.forEach(col => {
				r.push(false);
			});
			result.push(r);
		});

		return result;
	}

	toggle (x, y) {
		this.currentSolution[y][x] = !this.currentSolution[y][x];
	}

	getRowValues (grid) {
		let width  = grid[0].length,
			height = grid.length,
			result = [];
		for (let y = 0; y < height; y++) {
			let values = [],
				count  = 0;
			for (let x = 0; x < width; x++) {
				let val = grid[y][x];
				if (count === 0 && !val)
					continue;
				if (!val) {
					values.push(count);
					count = 0;
				} else if (x === width - 1) {
					values.push(count+1);
				} else count++;
			}
			if (values.length === 0)
				values = [0];
			result.push(values);
		}

		return result;
	}

	getColValues (grid) {
		let width  = grid[0].length,
			height = grid.length,
			result = [];
		for (let x = 0; x < width; x++) {
			let values = [],
				count  = 0;
			for (let y = 0; y < height; y++) {
				let val = grid[y][x];
				if (count === 0 && !val)
					continue;
				if (!val) {
					values.push(count);
					count = 0;
				} else if (y === height - 1) {
					values.push(count+1);
				} else count++;
			}
			if (values.length === 0)
				values = [0];
			result.push(values);
		}

		return result;
	}
}

Game.DEBUG_DATA = [
	[false, true, true, false],
	[true, false, false, true],
	[true, true, true, true],
	[false, true, true, false]
];

module.exports = Game;
