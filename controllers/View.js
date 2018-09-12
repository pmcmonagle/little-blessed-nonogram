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
	static renderColHints (game) {
		let result = "",
			values = game.getColValues(game.currentPuzzle),
			actual = game.getColValues(game.currentSolution),
			longest = values.reduce((acc, x) => Math.max(acc, x.length), 0),
			offset = 0;
		for (let j = 0; j < longest; j++) {
			for (let i = 0; i < values.length; i++) {
				if (values[i].length < longest - offset) {
					result += "  ";
					continue;
				}

				let n = j - (longest - values[i].length);
				if (values[i][n] === actual[i][n])
					result += `${colours.GREEN}${values[i][n]}${colours.NONE} `;
				else
					result += values[i][n].toString() + " ";
			}
			result += "\n";
			offset++;
		}

		return result;
	}
}

module.exports = View;
