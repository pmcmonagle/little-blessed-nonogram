'use strict';

const Game     = require("./controllers/Game"),
	  View     = require("./controllers/View"),
	  Data     = require("./controllers/Data"),
	  Cursor   = require("./controllers/Cursor"),
	  Blessed  = require("blessed"),
	  screen   = Blessed.screen({ smartCSR: true }),
	  gameView = Blessed.box({
		  left:   '20%',
		  top:    7,
		  width:  '80%',
		  height: '70%',
		  padding: { left: 1 }
	  }),
	  topView = Blessed.Box({
		  left:   '20%',
		  top:    '0%',
		  width:  '100%',
		  height: 6,
		  padding: { left: 1 },
		  align: 'left',
		  valign: 'top'
	  }),
	  leftView = Blessed.Box({
		  left:   '0%',
		  top:    7,
		  width:  '20%',
		  height: '100%',
		  padding: { right: 1 },
		  align: 'right',
		  valign: 'top'
	  });

screen.append(leftView);
screen.append(topView);
screen.append(gameView);
screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

// Gameplay
let game   = new Game(),
	cursor = new Cursor();
screen.key(['up', 'w'], () => { cursor.up(); render(); });
screen.key(['down', 's'], () => { cursor.down(); render(); });
screen.key(['left', 'a'], () => { cursor.left(); render(); });
screen.key(['right', 'd'], () => { cursor.right(); render(); });
screen.key(['backspace'], () => { game.clear(); render(); });
screen.key(['space', 'enter'], () => { game.toggle(cursor.x, cursor.y); render(); });
// Difficulty
screen.key(['`'], () => { game.loadRandom(0); render(); });
screen.key(['1'], () => { game.loadRandom(1); render(); });
screen.key(['2'], () => { game.loadRandom(2); render(); });

// Start a random game.
game.loadRandom();
cursor.setPuzzle(game.currentPuzzle);
render();

function render () {
	topView.setContent(View.renderColHints(game, topView.height));
	leftView.setContent(View.renderRowHints(game));
	gameView.setContent(
		View.renderPuzzle(game, cursor) + "\n\n" +
		View.renderSuccess(game)
	);
	screen.render();
}
