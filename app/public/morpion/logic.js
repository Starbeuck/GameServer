// -------------------------- PLAY FUNCTION ------------------------------------
let play = function(game, action) {
  posePion(action.x, action.y, action.currentPlayer, game.grid);
  return game;
}

module.exports = {play, movePossible, gridFreeSpotLeft, won};

// -------------------------- ACTIONS FUNCTIONS --------------------------------

function movePossible(grid, action) {
  let caseOccupee = (grid[action.y][action.x] != 0);
  let caseExistante = (grid[action.y][action.x] != undefined);
  return ((!caseOccupee) && (caseExistante));
}


function gridFreeSpotLeft(grid) {
    var nbFreeSpot = 0;
    for(var x=0 ; x<3 ; x++) {
        for(var y=0 ; y<3 ; y++) {
            if(grid[x][y] === 0) {
                nbFreeSpot++;
            }
        }
    }
    return nbFreeSpot;
}

function posePion(xMouse, yMouse, currentPlayer, grid) {
  if (grid[yMouse][xMouse] === 0) {
    grid[yMouse][xMouse] = currentPlayer;
  }

}
// -------------------------- RULE WINNING FUNCTIONS ---------------------------

function won(grid, currentPlayer) {
  return (alignVert(grid, currentPlayer) || alignHorizon(grid, currentPlayer) || alignDiagDesc(grid, currentPlayer) || alignDiagMont(grid, currentPlayer));
}

function alignHorizon(grid, currentPlayer) {
  let colCour = 0;
  let lignCour = 0;
  let counter = 0;
  let found = false;
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
  let colCour = 0;
  let lignCour = 0;
  let counter = 0;
  let found = false;
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
  let colCour = 0;
  let lignCour = 0;
  let counter = 0;
  let found = false;
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
  let colCour = 0;
  let lignCour = 2;
  let counter = 0;
  let found = false;
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
