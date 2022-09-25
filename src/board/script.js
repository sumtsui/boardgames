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

function makeTile(left, top, isPlayArea, isObstacle, isStartTile) {
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
  if (isObstacle) {
    tile.style.backgroundColor = "red";
  }
  tile.innerText = tileCount;
  tileCount++;
  wrapper.appendChild(tile);
}

const obstacles = {};

function setObstacle(start) {
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

  obstacles[start] = start;
  obstacles[right] = right;
  obstacles[down] = down;
  obstacles[diagonal] = diagonal;
}

// setObstacle(10)
// setObstacle(201)

const NOT_IN_PLAY_SURFACES = [0, 2, 6, 8];

function setAllObstactles() {
  const OBSTACLE_TOTAL = 20;
  const ATTEMPT_TOTAL = 50;
  let obstacleCount = 0;
  let attempt = 0;

  while (obstacleCount < OBSTACLE_TOTAL && attempt < ATTEMPT_TOTAL) {
    attempt++;
    const random = Math.ceil(225 * Math.random());
    const randomStart = cubeMap[random];
    const FORBIDDEN_PLACES = {
      5: {
        col: 4,
      },
      7: {
        row: 4,
      },
    };
    if (
      NOT_IN_PLAY_SURFACES.includes(randomStart.surface) ||
      FORBIDDEN_PLACES[randomStart.surface]?.row === randomStart.row ||
      FORBIDDEN_PLACES[randomStart.surface]?.col === randomStart.col
    ) {
      console.log("OBESTACLE_BAD_START_POINT");
      continue;
    }
    try {
      setObstacle(random);
      obstacleCount++;
    } catch (err) {
      console.log(err);
    }
  }

  return obstacleCount;
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
    const isObstacle = obstacles[tileCount];
    const isPlayerStart = PLAYER_START_TILES.includes(tileCount);
    makeTile(left, top, isPlayArea, isObstacle, isPlayerStart);
  }
}

renderCube();
