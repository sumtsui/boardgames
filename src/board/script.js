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
const DIRECTIONS_PER_SURFACE = {
  1: { row: 1 },
  3: { col: 1 },
  5: { col: -1 },
  7: { row: -1 },
};
const DIRECTIONS = [
  { value: "down", degree: "180deg" },
  { value: "left", degree: "-90deg" },
  { value: "up", degree: "0deg" },
  { value: "right", degree: "90deg" },
];
let p1;
let p2;
let p3;
let p4;
let players;

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
        result[row[k]] = {
          surface: i,
          row: j,
          col: k,
          obstacle: null,
          player: null,
        };
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

function makeTile(left, top, isPlayArea, isStartTile, color, playerId) {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.style.width = CUBE_WIDTH + "px";
  tile.style.height = CUBE_WIDTH + "px";
  tile.style.left = left;
  tile.style.top = top;
  if (isPlayArea) {
    tile.style.border = "1.5px solid skyblue";
  }
  if (isStartTile) {
    tile.style.backgroundColor = "pink";
  }
  if (color) {
    tile.style.backgroundColor = color;
  }
  const num = document.createElement("div");
  num.innerText = tileCount;

  const wrap = document.createElement("div");
  wrap.className = "wrap";
  wrap.appendChild(num);
  if (Number.isInteger(playerId)) {
    const player = document.createElement("div");
    player.classList.add("player");
    player.style.transform = `rotate(${
      DIRECTIONS.find((d) => d.value === players[playerId].direction).degree
    })`;
    wrap.appendChild(player);
  }

  tile.appendChild(wrap);
  tileCount++;
  wrapper.appendChild(tile);
}

function getCrossSurfaceAdjecentTile(tile) {
  const { surface, row, col } = cubeMap[tile];
  let adjacent;
  if (surface === 1) {
    if (col === 4) {
      adjacent = cubeArrays[5][0][4 - row];
    } else if (col === 0) {
      adjacent = cubeArrays[3][0][row];
    }
  } else if (surface === 5) {
    if (row === 4) {
      adjacent = cubeArrays[7][col][row];
    } else if (row === 0) {
      adjacent = cubeArrays[1][4 - col][4];
    }
  } else if (surface === 7) {
    if (col === 4) {
      adjacent = cubeArrays[5][4][row];
    } else if (col === 0) {
      adjacent = cubeArrays[3][4][4 - row];
    }
  } else if (surface === 3) {
    if (row === 4) {
      adjacent = cubeArrays[7][4 - col][0];
    } else if (row === 0) {
      adjacent = cubeArrays[1][col][0];
    }
  }

  return adjacent;
}

// assume obstacle always has top left as starting point
function setObstacle(start, color) {
  const { surface, row, col } = cubeMap[start];
  let right, down, diagonal;
  if (surface === 1 && col === 4) {
    right = getCrossSurfaceAdjecentTile(start);
    down = start + 15;
    diagonal = right - 1;
  } else if (surface === 5 && row === 4) {
    right = start + 1;
    down = getCrossSurfaceAdjecentTile(start);
    diagonal = down + 15;
  } else if (surface === 7 && col === 4) {
    right = getCrossSurfaceAdjecentTile(start);
    down = start + 15;
    diagonal = right + 1;
  } else if (surface === 3 && row === 4) {
    right = start + 1;
    down = getCrossSurfaceAdjecentTile(start);
    diagonal = down - 15;
  } else {
    right = start + 1;
    down = start + 15;
    diagonal = start + 15 + 1;
  }

  if (
    cubeMap[start]?.obstacle ||
    cubeMap[start - 1]?.obstacle ||
    cubeMap[start - 15]?.obstacle ||
    cubeMap[right]?.obstacle ||
    cubeMap[right + 1]?.obstacle ||
    cubeMap[down]?.obstacle ||
    cubeMap[down + 15]?.obstacle ||
    cubeMap[diagonal]?.obstacle ||
    cubeMap[diagonal + 1]?.obstacle ||
    cubeMap[diagonal + 15]?.obstacle ||
    PLAYER_START_TILES.includes(right) ||
    PLAYER_START_TILES.includes(down) ||
    PLAYER_START_TILES.includes(diagonal)
  ) {
    throw "OBSTACLE_CREATE_FAIL";
  }

  cubeMap[start].obstacle = color;
  cubeMap[right].obstacle = color;
  cubeMap[down].obstacle = color;
  cubeMap[diagonal].obstacle = color;

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
  const OBSTACLE_TOTAL = 12;
  const ATTEMPT_TOTAL = 200;

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
      if (
        startCountOnSurface >= Math.ceil(OBSTACLE_TOTAL / 5) ||
        (cubeMap[start].surface === 4 && startCountOnSurface === 2)
      ) {
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
  wrapper.innerHTML = "";
  while (tileCount <= TILE_TOTAL) {
    const left = (tileCount % BOARD_WIDTH || BOARD_WIDTH) * CUBE_WIDTH + "px";
    const top = Math.ceil(tileCount / BOARD_WIDTH) * CUBE_WIDTH + "px";
    const isPlayArea =
      (tileCount % BOARD_WIDTH > 5 && tileCount % BOARD_WIDTH < 11) ||
      (tileCount > 75 && tileCount < 151);
    const obstacleColor = cubeMap[tileCount].obstacle;
    const isPlayerStart = PLAYER_START_TILES.includes(tileCount);
    const player = cubeMap[tileCount].player;
    makeTile(left, top, isPlayArea, isPlayerStart, obstacleColor, player);
  }
  tileCount = 1;
}

const GOAL_MAP = {
  0: 2,
  1: 3,
  2: 0,
  3: 1,
};

class Player {
  id;
  current;
  collectedObstacles = [];
  goal;
  direction;

  constructor(id, start, direction) {
    this.id = id;
    this.current = start;
    this.goal = PLAYER_START_TILES[GOAL_MAP[id]];
    cubeMap[start].player = id;
    this.direction = direction;
  }
  move(next) {
    const result = {
      collideWithOtherPlayer: undefined,
      win: false,
    };
    const nextTile = cubeMap[next];

    if (!nextTile || !IN_PLAY_SURFACES.includes(nextTile.surface))
      throw "MOVE_FAIL_UNKNOWN_TILE";

    const currentTile = cubeMap[this.current];

    if (next === this.current) throw "MOVE_FAIL_SAME_TILE";
    if (nextTile.obstacle) {
      throw "MOVE_FAIL_OBSTACLE";
    }
    // can only move vertically or horizontally
    if (
      currentTile.col !== nextTile.col &&
      currentTile.row !== nextTile.row &&
      currentTile.surface === nextTile.surface
    )
      throw "MOVE_FAIL_NOT_ALLOW";

    // handle crossing surface move
    if (currentTile.surface !== nextTile.surface) {
      if (
        currentTile.surface !== 4 &&
        nextTile.surface !== 4 &&
        next !== getCrossSurfaceAdjecentTile(this.current)
      ) {
        throw "MOVE_FAIL_INVALID_CROSS_SURFACE";
      } else if (
        (currentTile.surface === 4 || nextTile.surface === 4) &&
        Math.abs(next - this.current) !== 1 &&
        Math.abs(next - this.current) !== 15
      ) {
        throw "MOVE_FAIL_INVALID_CROSS_SURFACE";
      }
    }
    // handle same surface long distance move obstacle check
    else if (checkObstaclesInPath(this.current, next)) {
      throw "MOVE_FAIL_OBSTACLE_INBETWEEN";
    }

    if (Number.isInteger(nextTile.player)) {
      result.collideWithOtherPlayer = nextTile.player;
    }
    if (next === this.goal) {
      result.win = true;
    }
    this.direction = this._detectDirectionChange(next) || this.direction;
    this.current = next;
    nextTile.player = this.id;
    currentTile.player = undefined;
    renderCube();
    return result;
  }
  _detectDirectionChange(next) {
    const { surface } = cubeMap[this.current];

    if ((next - this.current) % 15 === 0) {
      if (next > this.current) return "down";
      else return "up";
    } else if (Math.abs(next - this.current) <= 4) {
      if (next > this.current) return "right";
      else return "left";
    } else {
      if (surface === 1) return "down";
      if (surface === 3) return "right";
      if (surface === 5) return "left";
      if (surface === 7) return "up";
    }
    throw "FAIL_DETACT_DIRECTION";
  }
  // move it to board class
  getSurrendingObstacles() {
    const result = {
      top: null,
      down: null,
      left: null,
      right: null,
    };
    const tile = cubeMap[this.current];

    // detact all tiles on same surface
    // row++, row--, col--, col++

    // detact 1 adjacent tile in cross surface if in the edge
    return result;
  }
}

// function getMoveDirection(point1, point2) {
//   const dirs = ['up', 'down', 'left', 'right']
//   const a = cubeMap[point1];
//   const b = cubeMap[point2];

//   if
// }

function checkObstaclesInPath(point1, point2) {
  const a = cubeMap[point1];
  const b = cubeMap[point2];

  // cross surface check only look at 1 nearest tile
  // will not return accurate result if point2 is not the nearest cross surface tile
  // it is up to the caller to provide correct cross surface tile
  if (a.surface !== b.surface) {
    return b.obstacle;
  }

  if (a.col !== b.col && a.row !== b.row)
    throw "can only check vertically or horizontally.";

  if (a.col !== b.col) {
    for (let i = Math.min(a.col, b.col); i <= Math.max(a.col, b.col); i++) {
      const { obstacle } = cubeMap[cubeArrays[a.surface][a.row][i]];
      if (obstacle) return obstacle;
    }
  } else {
    for (let i = Math.min(a.row, b.row); i <= Math.max(a.row, b.row); i++) {
      const { obstacle } = cubeMap[cubeArrays[a.surface][i][a.col]];
      if (obstacle) return obstacle;
    }
  }

  return null;
}

players = PLAYER_START_TILES.map(
  (t, i) => new Player(i, t, DIRECTIONS[i].value)
);

p1 = players[0];
p2 = players[1];
p3 = players[2];
p4 = players[3];

renderCube();
