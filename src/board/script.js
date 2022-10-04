const wrapper = document.querySelector(".wrapper");
const CUBE_WIDTH = 60;
const BOARD_WIDTH = 15;
const TILE_TOTAL = 225;
const PLAYER_START_TILES = [38, 118, 188, 108];
const CORNERS = [70, 145, 140];
const EDGES = {
  5: {
    col: 4,
  },
  7: {
    row: 4,
  },
};
const OBSTACLE_TYPES = ["red", "blue", "yellow", "green", "purple"];
const IN_PLAY_SURFACES = [1, 3, 4, 5, 7];

function getCubeArrays() {
  const subsBy5 = [[]];
  let curSubArr = 0;

  let i = 1;
  while (i <= TILE_TOTAL) {
    if (curSubArr === 5) {
      subsBy5.push([i]);
      curSubArr = 1;
      i++;
    } else {
      subsBy5.slice(-1)[0].push(i);
      curSubArr++;
      i++;
    }
  }

  const result = [[], [], []];
  curSubArr = 0;
  let round = 0;
  i = 0;

  while (i < subsBy5.length) {
    if (curSubArr === 3) curSubArr = 0;

    if (result[curSubArr + round].length < 5) {
      result[curSubArr + round].push(subsBy5[i]);
    }

    if (
      result[curSubArr + round].length === 5 &&
      curSubArr === 2 &&
      i < subsBy5.length - 1
    ) {
      round += 3;
      result.push([], [], []);
    }

    curSubArr++;
    i++;
  }

  return result;
}

const cubeArrays = getCubeArrays();

function getCubeMap(_cubeArrays) {
  const result = {};
  let i = 0;
  while (i < _cubeArrays.length) {
    const surface = _cubeArrays[i];
    let j = 0;
    while (j < surface.length) {
      const row = surface[j];
      let k = 0;
      while (k < row.length) {
        result[row[k]] = { surface: i, row: j, col: k };
        k++;
      }
      j++;
    }
    i++;
  }

  return result;
}

const cubeMap = getCubeMap(cubeArrays);

let tileCount = 1;

function makeTile(left, top, isPlayArea, isStartTile, color) {
  const tile = document.createElement("div");
  tile.style.border = "1px dotted gray";
  tile.style.width = CUBE_WIDTH + "px";
  tile.style.height = CUBE_WIDTH + "px";
  tile.style.position = "absolute";
  tile.style.left = left;
  tile.style.top = top;
  if (isPlayArea) {
    tile.style.border = "1.5px solid skyblue";
  }
  if (isStartTile) {
    tile.style.backgroundColor = "white";
  }
  if (color) {
    tile.style.backgroundColor = color;
  }
  tile.innerText = tileCount;

  tileCount++;
  wrapper.appendChild(tile);
}

const obstacles = {};

function setObstacle(start, color) {
  // assume obstacle always has top left as starting point
  const CROSSS_SURFACE_MAP = {
    1: 5,
    5: 7,
    7: 5,
    3: 7,
  };
  const { surface, row, col } = cubeMap[start];
  let right, down, diagonal;
  if (surface === 1 && col === 4) {
    right = cubeArrays[CROSSS_SURFACE_MAP[surface]][0][4 - row];
    down = start + 15;
    diagonal = right - 1;
  } else if (surface === 5 && row === 4) {
    right = start + 1;
    down = cubeArrays[CROSSS_SURFACE_MAP[surface]][col][row];
    diagonal = down + 15;
  } else if (surface === 7 && col === 4) {
    right = cubeArrays[CROSSS_SURFACE_MAP[surface]][4][row];
    down = start + 15;
    diagonal = right + 1;
  } else if (surface === 3 && row === 4) {
    right = start + 1;
    down = cubeArrays[CROSSS_SURFACE_MAP[surface]][4 - col][0];
    diagonal = down - 15;
  } else {
    right = start + 1;
    down = start + 15;
    diagonal = start + 15 + 1;
  }

  if (
    obstacles[start] ||
    obstacles[start - 1] ||
    obstacles[right] ||
    obstacles[right + 1] ||
    obstacles[down] ||
    obstacles[down + 15] ||
    obstacles[diagonal] ||
    obstacles[diagonal + 1] ||
    PLAYER_START_TILES.includes(right) ||
    PLAYER_START_TILES.includes(down) ||
    PLAYER_START_TILES.includes(diagonal)
  ) {
    throw "OBSTACLE_CREATE_FAIL";
  }

  obstacles[start] = color;
  obstacles[right] = color;
  obstacles[down] = color;
  obstacles[diagonal] = color;

  return [start, right, down, diagonal];
}

function setAllObstactles() {
  const tiles = Array(TILE_TOTAL)
    .fill()
    .map((_, i) => i + 1)
    .filter((i) => {
      const start = cubeMap[i];
      if (
        !PLAYER_START_TILES.includes(i) &&
        IN_PLAY_SURFACES.includes(start.surface) &&
        !CORNERS.includes(i) &&
        EDGES[start.surface]?.row !== start.row &&
        EDGES[start.surface]?.col !== start.col
      ) {
        return i;
      }
    });
  const tilesMap = tiles.reduce(
    (accu, cur, idx) => ({ ...accu, [cur]: idx }),
    {}
  );
  const obstaclePerSurfaceCount = {};

  // console.log(tilesMap);

  const OBSTACLE_TOTAL = 15;
  const ATTEMPT_TOTAL = 100;

  let obstacleCount = 0;
  let attempt = 0;
  let curColorIdx = 0;

  while (obstacleCount < OBSTACLE_TOTAL && attempt < ATTEMPT_TOTAL) {
    attempt++;
    const idx = Math.floor(tiles.length * Math.random());
    const start = tiles[idx];

    try {
      const startCountOnSurface =
        obstaclePerSurfaceCount[cubeMap[start].surface];
      if (startCountOnSurface >= Math.ceil(OBSTACLE_TOTAL / 5)) {
        throw "enough obstacle in surface " + cubeMap[start].surface;
      }
      const color = OBSTACLE_TYPES[curColorIdx % OBSTACLE_TYPES.length];
      const newObstacle = setObstacle(start, color);
      newObstacle.forEach((i) => tiles.splice(tilesMap[i], 1));

      obstaclePerSurfaceCount[cubeMap[start].surface] = startCountOnSurface
        ? startCountOnSurface + 1
        : 1;
      obstacleCount++;
      curColorIdx++;
    } catch (err) {
      console.log(err, idx, start);
    }
  }

  console.log("obstaclePerSurfaceCount", obstaclePerSurfaceCount);

  return { obstacleCount, attempt };
}

const obCount = setAllObstactles();

console.log("obCount", obCount);

function renderCube() {
  while (tileCount <= TILE_TOTAL) {
    const left = (tileCount % BOARD_WIDTH || BOARD_WIDTH) * CUBE_WIDTH + "px";
    const top = Math.ceil(tileCount / BOARD_WIDTH) * CUBE_WIDTH + "px";
    const isPlayArea =
      (tileCount % BOARD_WIDTH > 5 && tileCount % BOARD_WIDTH < 11) ||
      (tileCount > 75 && tileCount < 151);
    const obstacleColor = obstacles[tileCount];
    const isPlayerStart = PLAYER_START_TILES.includes(tileCount);
    makeTile(left, top, isPlayArea, isPlayerStart, obstacleColor);
  }
}

renderCube();

// var path = {};
// function setPaths(start, end) {
//   // const start = PLAYER_START_TILES[0];
//   // const end = PLAYER_START_TILES[2];
//   let step = start;
//   let preDir = null;
//   while (step !== end) {
//     try {
//       const directions = _decideToMove(step, preDir);
//       let dir = directions[Math.floor(Math.random() * directions.length)];
//       console.log("step", step, directions, dir);
//       while (path[step + dir]) {
//         directions.splice(directions.indexOf(dir), 1);
//         if (directions.length === 0) throw "no place to go!";
//         else dir = directions[Math.floor(Math.random() * directions.length)];
//       }
//       path[step] = dir;
//       step += dir;
//       preDir = dir;
//     } catch (error) {
//       console.log(error);
//       break;
//     }
//   }

//   function _decideToMove(current, preDir) {
//     const directions = [-1, 15, -15, 1];
//     const tile = cubeMap[current];

//     const { surface, row, col } = tile;
//     if (surface === 1) {
//       if (row === 0) directions.splice(directions.indexOf(-15), 1);
//       if (col === 0)
//         directions.splice(directions.indexOf(-1), 1, 70 - row * 14);
//       if (col === 4) directions.splice(directions.indexOf(1), 1, 80 - row * 16);
//     }
//     if (surface === 3) {
//       if (row === 0)
//         directions.splice(directions.indexOf(-15), 1, -(70 - col * 14));
//       if (row === 4)
//         directions.splice(directions.indexOf(15), 1, 80 - col * 16);
//       if (col === 0) directions.splice(directions.indexOf(-1), 1);
//     }
//     if (surface === 5) {
//       if (row === 0)
//         directions.splice(directions.indexOf(-15), 1, -((col + 1) * 16));
//       if (row === 4)
//         directions.splice(directions.indexOf(15), 1, (col + 1) * 14);
//       if (col === 4) directions.splice(directions.indexOf(1), 1);
//     }
//     if (surface === 7) {
//       if (row === 4) directions.splice(directions.indexOf(15), 1);
//       if (col === 0)
//         directions.splice(directions.indexOf(-1), 1, -((row + 1) * 16));
//       if (col === 4)
//         directions.splice(directions.indexOf(1), 1, -((row + 1) * 14));
//     }

//     if (preDir && directions.includes(preDir)) {
//       directions.push(preDir, preDir, preDir);
//     }

//     // add more chance to reach to the goal
//     // if (surface === 1 && directions.includes(15)) {
//     //   directions.push(15, 15, 15);
//     // }
//     // if (surface === 3 && directions.includes(1)) {
//     //   directions.push(1, 1, 1);
//     // }
//     // if (surface === 5 && directions.includes(-1)) {
//     //   directions.push(-1, -1, -1);
//     // }
//     // if (surface === 7 && directions.includes(-15)) {
//     //   directions.push(-15, -15, -15);
//     // }

//     return directions;
//   }
// }

// setPaths(PLAYER_START_TILES[1], PLAYER_START_TILES[3]);
