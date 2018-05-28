

// -------------------------- PLAY FUNCTION -------------------------------------
var play = function(game, action) {
  console.log('on veut jouer a la game : '+game.toString());
  posePion(action.x, action.y, action.currentPlayer, game.grid);
  return game;
}

module.exports = play;

// -------------------------- ACTIONS FUNCTIONS -------------------------------------



function posePion(xMouse, yMouse, currentPlayer, grid) {
  console.log('je pose un pion pour le joueur '+currentPlayer+' a la case ('+xMouse+', '+yMouse+')');
  if (grid[yMouse][xMouse] === 0) {
    grid[yMouse][xMouse] = currentPlayer;
    if (currentPlayer === 1) {
      joueJoueur1 = true;
    } else {
      joueJoueur1 = false;
    }
  }

}
// -------------------------- RULE WINNING FUNCTIONS -------------------------------------
function alignHorizon(grid, currentPlayer) {
  var colCour = 0;
  var lignCour = 0;
  var counter = 0;
  var found = false;
  while (lignCour < grid.length && !found) {
    while (colCour < grid.length - 1 && !found) {
      if (grid[lignCour][colCour] === currentPlayer && grid[lignCour][colCour + 1] === currentPlayer) {
        counter++;
      }
      if (counter === grid.length - 1) {
        found = true;
      }
      colCour++;
    }
    colCour = 0;
    counter = 0;
    lignCour++;
  }
  return found;
}

function alignVert(grid, currentPlayer) {
  var colCour = 0;
  var lignCour = 0;
  var counter = 0;
  var found = false;
  while (colCour < grid.length && !found) {
    while (lignCour < grid.length - 1 && !found) {
      if (grid[lignCour][colCour] === currentPlayer && grid[lignCour + 1][colCour] === currentPlayer) {
        counter++;
      }
      if (counter === grid.length - 1) {
        found = true;
      }
      lignCour++;

    }
    lignCour = 0;
    counter = 0;
    colCour++;

  }
  return found;
}

function alignDiagDesc(grid, currentPlayer) {
  var colCour = 0;
  var lignCour = 0;
  var counter = 0;
  var found = false;
  while (colCour < grid.length - 1 && lignCour < grid.length - 1 && !found) {
    if (grid[lignCour][colCour] === currentPlayer && grid[lignCour + 1][colCour + 1] === currentPlayer) {
      counter++;
    }
    if (counter === grid.length - 1) {
      found = true;
    }
    lignCour++;
    colCour++;
  }
  return found;
}

function alignDiagMont(grid, currentPlayer) {
  var colCour = 0;
  var lignCour = 2;
  var counter = 0;
  var found = false;
  while (colCour < grid.length - 1 && lignCour > 0 && !found) {
    if (grid[lignCour][colCour] === currentPlayer && grid[lignCour - 1][colCour + 1] === currentPlayer) {
      counter++;
    }
    if (counter === grid.length - 1) {
      found = true;
    }
    lignCour--;
    colCour++;
  }
  return trouve;
}

function won(grid, currentPlayer) {
  return (alignVert(grid, currentPlayer) || alignHorizon(grid, currentPlayer) || alignDiagDesc(grid, currentPlayer) || alignDiagMont(grid, currentPlayer));
}