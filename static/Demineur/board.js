function createGrid() {
  grid = [];
  score = 0;
  for (let i = 0; i < width / step; i++) {
    grid.push([]);
    for (let j = 0; j < (height - offset) / step; j++) {
      if (random() < proba) {
        grid[i].push([0, 0, 0]);
      } else {
        grid[i].push([-1, 0, 0]);
      }
    }
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j][0] == -1) {
        if (i - 1 >= 0 && j - 1 >= 0) {
          if (grid[i - 1][j - 1][0] != -1) {
            grid[i - 1][j - 1][0]++;
          }
        }
        if (i - 1 >= 0 && j >= 0) {
          if (grid[i - 1][j][0] != -1) {
            grid[i - 1][j][0]++;
          }
        }
        if (i - 1 >= 0 && j + 1 < (height - offset) / step) {
          if (grid[i - 1][j + 1][0] != -1) {
            grid[i - 1][j + 1][0]++;
          }
        }
        if (i >= 0 && j - 1 >= 0) {
          if (grid[i][j - 1][0] != -1) {
            grid[i][j - 1][0]++;
          }
        }
        if (i >= 0 && j + 1 < (height - offset) / step) {
          if (grid[i][j + 1][0] != -1) {
            grid[i][j + 1][0]++;
          }
        }
        if (i + 1 < width / step && j - 1 >= 0) {
          if (grid[i + 1][j - 1][0] != -1) {
            grid[i + 1][j - 1][0]++;
          }
        }
        if (i + 1 < width / step && j >= 0) {
          if (grid[i + 1][j][0] != -1) {
            grid[i + 1][j][0]++;
          }
        }
        if (i + 1 < width / step && j + 1 < (height - offset) / step) {
          if (grid[i + 1][j + 1][0] != -1) {
            grid[i + 1][j + 1][0]++;
          }
        }

      }
    }
  }
}

function check() {
  let c2 = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j][1] == 0 && grid[i][j][0] != -1) {
        c2++
      }
    }
  }
  if (c2 == 0) {
    script = 1;
  }
}


function expandFrom(i, j) {
  grid[i][j][1] = 1;
  score += 10;
  if (grid[i][j][0] != 0) {
    return
  } else {

    if (i - 1 >= 0 && j - 1 >= 0) {
      if (grid[i - 1][j - 1][1] == 0) {
        expandFrom(i - 1, j - 1);
      }
    }
    if (i - 1 >= 0 && j >= 0) {
      if (grid[i - 1][j][1] == 0) {
        expandFrom(i - 1, j);
      }
    }
    if (i - 1 >= 0 && j + 1 < (height - offset) / step) {
      if (grid[i - 1][j + 1][1] == 0) {
        expandFrom(i - 1, j + 1);
      }
    }
    if (i >= 0 && j - 1 >= 0) {
      if (grid[i][j - 1][1] == 0) {
        expandFrom(i, j - 1);
      }
    }
    if (i >= 0 && j + 1 < (height - offset) / step) {
      if (grid[i][j + 1][1] == 0) {
        expandFrom(i, j + 1);
      }
    }
    if (i + 1 < width / step && j - 1 >= 0) {
      if (grid[i + 1][j - 1][1] == 0) {
        expandFrom(i + 1, j - 1);
      }
    }
    if (i + 1 < width / step && j >= 0) {
      if (grid[i + 1][j][1] == 0) {
        expandFrom(i + 1, j);
      }
    }
    if (i + 1 < width / step && j + 1 < (height - offset) / step) {
      if (grid[i + 1][j + 1][1] == 0) {
        expandFrom(i + 1, j + 1);
      }
    }
  }
}