'use strict';

const fs       = require("fs"),
	  bmp      = require("bmp-js"),
	  basePath = "puzzles/",
	  folders  = ["3x3", "12x12", "20x15"];

class Data {
	static load (file) {
		let path = basePath + file,
			buffer = fs.readFileSync(path),
			bmpData = bmp.decode(buffer),
			result  = [[]];
		for (let n = 0; n < bmpData.data.length; n += 4) {
			if (result[result.length - 1].length >= bmpData.width)
				result.push([]);
			let row = result[result.length - 1],
				a = bmpData.data[n],
				b = bmpData.data[n + 1],
				g = bmpData.data[n + 2],
				r = bmpData.data[n + 3];
			row.push([a,b,g,r].some(n => n > 0));
		}

		return result;
	}

	static loadRandom (path) {
		function rand (arr) {
			return arr[Math.floor(Math.random() * arr.length)];
		}

		let paths = folders,
			midPath = path || rand(paths),
			file = rand(Data.files(basePath + midPath));
		return Data.load(midPath + "/" + file);
	}

	static loadRandomFromDifficulty (n) {
		let paths = folders,
			path  = paths[n] || paths[0];
		return Data.loadRandom(path);
	}

	static files (dir) {
		return fs.readdirSync(dir)
			.filter(s => s.substr(-4) === ".bmp");
	}
}

module.exports = Data;
