'use strict';

const fs       = require("fs"),
	  bmp      = require("bmp-js"),
	  basePath = "puzzles/";

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
}

module.exports = Data;
