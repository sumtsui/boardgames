const wrapper = document.querySelector(".wrapper");
const CUBE_WIDTH = 60;
const BOARD_WIDTH = 15;
const TILE_TOTAL = 225;
const PLAYER_START_TILES = [38, 118, 188, 108];

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

  // console.log('subsBy5', subsBy5)

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
  if (path[tileCount]) {
    const obj = {
      "-1": "<",
      15: "|",
      "-15": "^",
      1: ">",
    };
    tile.innerText = tileCount + "\n" + obj[path[tileCount]];
    tile.style.backgroundColor = "skyblue";
  }
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
    obstacles[right] ||
    obstacles[down] ||
    obstacles[diagonal] ||
    PLAYER_START_TILES.includes(start) ||
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
}

// setObstacle(10)
// setObstacle(201)

const NOT_IN_PLAY_SURFACES = [0, 2, 6, 8];

function setAllObstactles() {
  const OBSTACLE_TYPES = ["red", "blue", "yellow", "green", "purple"];
  const OBSTACLE_TOTAL = 15;
  const ATTEMPT_TOTAL = 50;
  const LOWER_EDGES = {
    5: {
      col: 4,
    },
    7: {
      row: 4,
    },
  };
  const BAD_STARTING_POINTS = [70, 145, 140];
  let obstacleCount = 0;
  let attempt = 0;
  let curColorIdx = 0;

  while (obstacleCount < OBSTACLE_TOTAL && attempt < ATTEMPT_TOTAL) {
    attempt++;
    const random = Math.ceil(225 * Math.random());
    const randomStart = cubeMap[random];

    if (
      NOT_IN_PLAY_SURFACES.includes(randomStart.surface) ||
      LOWER_EDGES[randomStart.surface]?.row === randomStart.row ||
      LOWER_EDGES[randomStart.surface]?.col === randomStart.col ||
      BAD_STARTING_POINTS.includes(random)
    ) {
      console.log("OBESTACLE_BAD_START_POINT");
      continue;
    }
    try {
      const color = OBSTACLE_TYPES[curColorIdx % OBSTACLE_TYPES.length];
      setObstacle(random, color);
      obstacleCount++;
      curColorIdx++;
    } catch (err) {
      console.log(err);
    }
  }

  return obstacleCount;
}

// const obCount = setAllObstactles();

// console.log("obCount", obCount);

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

var path = {};
function setPaths() {
  const start = PLAYER_START_TILES[0];
  const end = PLAYER_START_TILES[2];
  let step = start;
  while (step !== end) {
    try {
      const directions = _decideToMove(step);
      let dir = directions[Math.floor(Math.random() * directions.length)];
      while (path[step + dir]) {
        directions.splice(directions.indexOf(dir), 1);
        if (directions.length === 0) throw "no place to go!";
        else dir = directions[Math.floor(Math.random() * directions.length)];
      }
      path[step] = dir;
      step += dir;
    } catch (error) {
      console.log(error);
      break;
    }
  }

  function _decideToMove(current) {
    const directions = [-1, 15, -15, 1];
    const tile = cubeMap[current];

    const { surface, row, col } = tile;
    if (surface === 1) {
      if (row === 0) directions.splice(directions.indexOf(-15), 1);
      if (col === 0) directions.splice(directions.indexOf(-1), 1);
      if (col === 4) directions.splice(directions.indexOf(1), 1);
    }
    if (surface === 3) {
      if (row === 0) directions.splice(directions.indexOf(-15), 1);
      if (row === 4) directions.splice(directions.indexOf(15), 1);
      if (col === 0) directions.splice(directions.indexOf(-1), 1);
    }
    if (surface === 5) {
      if (row === 0) directions.splice(directions.indexOf(-15), 1);
      if (row === 4) directions.splice(directions.indexOf(15), 1);
      if (col === 4) directions.splice(directions.indexOf(1), 1);
    }
    if (surface === 7) {
      if (row === 4) directions.splice(directions.indexOf(15), 1);
      if (col === 0) directions.splice(directions.indexOf(-1), 1);
      if (col === 4) directions.splice(directions.indexOf(1), 1);
    }

    // if (directions.includes)

    return directions;
  }
}

setPaths();

renderCube();
