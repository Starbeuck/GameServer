// -------------------------- PLAY FUNCTION -------------------------------------
var play = function(game, action) {
  posePion(action.x, action.y, action.currentPlayer, game.grid);
  return game;
}

module.exports = {play, movePossible, won};

// -------------------------- ACTIONS FUNCTIONS -------------------------------------

function movePossible(grid, action) {
  var caseOccupee = (grid[action.x][action.y] != 0);
  var caseExistante = (grid[action.x][action.y] != undefined);
  return ((!caseOccupee) && (caseExistante));
}

function posePion(xMouse, yMouse, currentPlayer, grid) {
  if (grid[yMouse][xMouse] === 0) {
    grid[yMouse][xMouse] = currentPlayer;
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
  return found;
}

function won(grid, currentPlayer) {
  return (alignVert(grid, currentPlayer) || alignHorizon(grid, currentPlayer) || alignDiagDesc(grid, currentPlayer) || alignDiagMont(grid, currentPlayer));
}
