'use strict';

const colours = {
	NONE: "\u001B[0m",
	BLACK: "\u001B[107;90m",
	WHITE: "\u001B[47m",
	GREEN: "\u001B[32m"
}

function strForCell (value, x, y, cursor) {
	let character = x === cursor.x && y === cursor.y
			? "**"
			: "  ",
		colour = value
			? colours.WHITE
			: colours.BLACK;
	return `${colour}${character}${colours.NONE}`;
}

function identical(a, b) {
	let r = true;
	a.forEach((row, y) => {
		row.forEach((col, x) => {
			if (a[y][x] !== b[y][x])
				r = false;
		});
	});
	return r;
}

function pad (grid, len) {
	let result = [],
		longest = len || grid.reduce((acc, x) => Math.max(acc, x.length), 0);
	grid.forEach(row => {
		let r = row.slice();
		while (r.length < longest) { r.unshift(0); }
		result.push(r);
	});

	return result;
}

class View {
	static renderSuccess (game) {
		let result = "Status: ",
			status = identical(game.currentPuzzle, game.currentSolution)
				? `${colours.GREEN}Solved!${colours.NONE}`
				: "Unsolved";
		return result + status;
	}

	static renderPuzzle (game, cursor) {
		let result = "";
		game.currentSolution.forEach((row, y) => {
			let str = "";
			row.forEach((col, x) => {
				str += strForCell(game.currentSolution[y][x], x, y, cursor);
			});
			result += str + "\n";
		});

		return result;
	}

	static renderRowHints (game) {
		let result = "",
			values = game.getRowValues(game.currentPuzzle),
			actual = game.getRowValues(game.currentSolution);
		values.forEach((v, i) => {
			v.forEach((n, j) => {
				if (j > 0) result += " "
				if (n === actual[i][j])
					result += `${colours.GREEN}${n}${colours.NONE}`;
				else
					result += n.toString();
			});
			result += "\n";
		});
		return result;
	}

	static renderColHints (game, size) {
		let result = "",
			values = pad(game.getColValues(game.currentPuzzle), size),
			actual = pad(game.getColValues(game.currentSolution), size);
		for (let x = 0; x < values[0].length; x++) {
			for (let y = 0; y < values.length; y++) {
				if (values[y][x] === 0 && x < values[0].length - 1) {
					result += "  ";
					continue;
				}

				if (values[y][x] === actual[y][x])
					result += `${colours.GREEN}${values[y][x]}${colours.NONE} `;
				else
					result += values[y][x].toString() + " ";
			}
			result += "\n";
		}

		return result;
	}
}

module.exports = View;
