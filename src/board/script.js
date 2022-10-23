const CUBE_WIDTH = 60;
const BOARD_WIDTH = 15;
const TILE_TOTAL = 225;
const PLAYER_START_TILES = [38, 118, 188, 108];
const OBSTACLE_TYPES = ["red", "blue", "yellow", "green", "purple"];
const IN_PLAY_SURFACES = [1, 3, 4, 5, 7];
const DIRECTIONS = [
  { value: "down", degree: "180deg" },
  { value: "left", degree: "-90deg" },
  { value: "up", degree: "0deg" },
  { value: "right", degree: "90deg" },
];

class Board {
  cubeArrays;
  cubeMap;
  constructor() {
    this.cubeArrays = this._getCubeArrays();
    this.cubeMap = this._getCubeMap(this.cubeArrays);
  }
  /**
   ** assume obstacle always has top left as starting point
   **/
  setObstacle(start, color) {
    const { surface, row, col } = this.cubeMap[start];
    let right, down, diagonal;
    if (surface === 1 && col === 4) {
      right = this.getCrossSurfaceAdjecentTile(start);
      down = start + 15;
      diagonal = right - 1;
    } else if (surface === 5 && row === 4) {
      right = start + 1;
      down = this.getCrossSurfaceAdjecentTile(start);
      diagonal = down + 15;
    } else if (surface === 7 && col === 4) {
      right = this.getCrossSurfaceAdjecentTile(start);
      down = start + 15;
      diagonal = right + 1;
    } else if (surface === 3 && row === 4) {
      right = start + 1;
      down = this.getCrossSurfaceAdjecentTile(start);
      diagonal = down - 15;
    } else {
      right = start + 1;
      down = start + 15;
      diagonal = start + 15 + 1;
    }

    if (
      this.cubeMap[start]?.obstacle ||
      this.cubeMap[start - 1]?.obstacle ||
      this.cubeMap[start - 15]?.obstacle ||
      this.cubeMap[right]?.obstacle ||
      this.cubeMap[right + 1]?.obstacle ||
      this.cubeMap[down]?.obstacle ||
      this.cubeMap[down + 15]?.obstacle ||
      this.cubeMap[diagonal]?.obstacle ||
      this.cubeMap[diagonal + 1]?.obstacle ||
      this.cubeMap[diagonal + 15]?.obstacle ||
      PLAYER_START_TILES.includes(right) ||
      PLAYER_START_TILES.includes(down) ||
      PLAYER_START_TILES.includes(diagonal)
    ) {
      throw "OBSTACLE_CREATE_FAIL";
    }

    this.cubeMap[start].obstacle = color;
    this.cubeMap[right].obstacle = color;
    this.cubeMap[down].obstacle = color;
    this.cubeMap[diagonal].obstacle = color;

    return [start, right, down, diagonal];
  }
  setAllObstactles() {
    const EDGES = {
      5: {
        col: 4,
      },
      7: {
        row: 4,
      },
    };
    const CORNERS = [70, 145, 140];
    const tiles = Array(TILE_TOTAL)
      .fill()
      .map((_, i) => i + 1)
      .filter((i) => {
        const start = this.cubeMap[i];
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
          obstaclePerSurfaceCount[this.cubeMap[start].surface];
        if (
          startCountOnSurface >= Math.ceil(OBSTACLE_TOTAL / 5) ||
          (this.cubeMap[start].surface === 4 && startCountOnSurface === 2)
        ) {
          throw "enough obstacle in surface " + this.cubeMap[start].surface;
        }
        const color = OBSTACLE_TYPES[curColorIdx % OBSTACLE_TYPES.length];
        const newObstacle = this.setObstacle(start, color);
        newObstacle.forEach((i) => tiles.splice(tilesMap[i], 1));

        obstaclePerSurfaceCount[this.cubeMap[start].surface] =
          startCountOnSurface ? startCountOnSurface + 1 : 1;
        obstacleCount++;
        curColorIdx++;
      } catch (err) {
        console.log(err, idx, start);
      }
    }

    console.log("obstaclePerSurfaceCount", obstaclePerSurfaceCount);

    return { obstacleCount, attempt };
  }
  getCrossSurfaceAdjecentTile(tile) {
    const { surface, row, col } = this.cubeMap[tile];
    let adjacent;
    if (surface === 1) {
      if (col === 4) {
        adjacent = this.cubeArrays[5][0][4 - row];
      } else if (col === 0) {
        adjacent = this.cubeArrays[3][0][row];
      }
    } else if (surface === 5) {
      if (row === 4) {
        adjacent = this.cubeArrays[7][col][row];
      } else if (row === 0) {
        adjacent = this.cubeArrays[1][4 - col][4];
      }
    } else if (surface === 7) {
      if (col === 4) {
        adjacent = this.cubeArrays[5][4][row];
      } else if (col === 0) {
        adjacent = this.cubeArrays[3][4][4 - row];
      }
    } else if (surface === 3) {
      if (row === 4) {
        adjacent = this.cubeArrays[7][4 - col][0];
      } else if (row === 0) {
        adjacent = this.cubeArrays[1][col][0];
      }
    }

    return adjacent;
  }
  // it is up to the caller to provide start and end that actually inline
  getThingsInPath(start, end) {
    const a = Number.isInteger(start) ? this.cubeMap[start] : start;
    const b = Number.isInteger(end) ? this.cubeMap[end] : end;

    if (!a || !b) return null;

    // cross surface check only look at 1 nearest tile
    // will not return accurate result if point2 is not the nearest cross surface tile
    // it is up to the caller to provide correct cross surface tile
    if (a.surface !== b.surface) {
      const { obstacle, player } = b;
      if (obstacle) return { obstacle };
      if (player) return { player };
    }

    if (a.col !== b.col && a.row !== b.row)
      throw "can only check vertically or horizontally.";

    // horizontal check
    if (a.col !== b.col) {
      if (a.col < b.col) {
        // check right
        for (let i = a.col + 1; i <= b.col; i++) {
          const { obstacle, player } =
            this.cubeMap[cubeArrays[a.surface][a.row][i]];
          if (obstacle) return { obstacle, distance: i - a.col };
          if (player) return { player, distance: i - a.col };
        }
      } else {
        // check left
        for (let i = a.col - 1; i >= b.col; i--) {
          const { obstacle, player } =
            this.cubeMap[cubeArrays[a.surface][a.row][i]];
          if (obstacle) return { obstacle, distance: a.col - i };
          if (player) return { player, distance: a.col - i };
        }
      }
    } else {
      // vertical check
      if (a.row < b.row) {
        // check down
        for (let i = a.row + 1; i <= b.row; i++) {
          const { obstacle, player } =
            this.cubeMap[cubeArrays[a.surface][i][a.col]];
          if (obstacle) return { obstacle, distance: i - a.row };
          if (player) return { player, distance: i - a.row };
        }
      } else {
        // check up
        for (let i = a.row - 1; i >= b.row; i--) {
          const { obstacle, player } =
            this.cubeMap[cubeArrays[a.surface][i][a.col]];
          if (obstacle) return { obstacle, distance: a.row - i };
          if (player) return { player, distance: a.row - i };
        }
      }
    }

    return null;
  }
  _getCubeArrays() {
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
  _getCubeMap(_cubeArrays) {
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
}

const board = new Board();
const obCount = board.setAllObstactles();
const cubeMap = board.cubeMap;
const cubeArrays = board.cubeArrays;
console.log("obCount", obCount);

class Player {
  static GOAL_MAP = {
    0: 2,
    1: 3,
    2: 0,
    3: 1,
  };
  id;
  current;
  collectedObstacles = [];
  goal;
  direction;

  constructor(id, start, direction) {
    this.id = id.toString();
    this.current = start;
    this.goal = PLAYER_START_TILES[Player.GOAL_MAP[id]];
    cubeMap[start].player = this.id;
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
        next !== board.getCrossSurfaceAdjecentTile(this.current)
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
    else {
      const thingInPath = board.getThingsInPath(this.current, next);
      if (thingInPath?.obstacle) throw "MOVE_FAIL_OBSTACLE_INBETWEEN";
      if (thingInPath?.player) {
        // todo: handle crash into other player
        throw "MOVE_FAIL_PLAYER_INBETWEEN";
      }
    }

    if (nextTile.player) {
      result.collideWithOtherPlayer = nextTile.player;
    }
    if (next === this.goal) {
      result.win = true;
    }
    this.direction = this._getDirectionChange(next) || this.direction;
    this.current = next;
    nextTile.player = this.id;
    currentTile.player = undefined;
    renderCube();
    return result;
  }
  _getDirectionChange(next) {
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
  getSurrendingThings() {
    // absolute directions based on 2D cubeMap
    const result = {
      up: null,
      down: null,
      left: null,
      right: null,
    };
    const current = cubeMap[this.current];

    result.up =
      current.row === 0
        ? "edge"
        : board.getThingsInPath(current, { ...current, row: 0 });
    result.down =
      current.row === 4
        ? "edge"
        : board.getThingsInPath(current, { ...current, row: 4 });
    result.left =
      current.col === 0
        ? "edge"
        : board.getThingsInPath(current, { ...current, col: 0 });
    result.right =
      current.col === 4
        ? "edge"
        : board.getThingsInPath(current, { ...current, col: 4 });

    for (let key in result) {
      if (result[key] === "edge") {
        const crossSufaceTile = board.getCrossSurfaceAdjecentTile(this.current);
        if (crossSufaceTile) {
          const { obstacle, player } = cubeMap[crossSufaceTile];
          if (obstacle) result[key] = { obstacle, distance: 1 };
          if (player) result[key] = { player, distance: 1 };
        }
      }
    }

    return result;
  }
}

const players = PLAYER_START_TILES.map(
  (t, i) => new Player(i, t, DIRECTIONS[i].value)
);

const p0 = players[0];
const p1 = players[1];
const p2 = players[2];
const p3 = players[3];

let tileCount = 1;
const wrapper = document.querySelector(".wrapper");
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
  if (playerId) {
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
function renderCube() {
  wrapper.innerHTML = "";
  while (tileCount <= TILE_TOTAL) {
    const left = (tileCount % BOARD_WIDTH || BOARD_WIDTH) * CUBE_WIDTH + "px";
    const top = Math.ceil(tileCount / BOARD_WIDTH) * CUBE_WIDTH + "px";
    const isPlayArea =
      (tileCount % BOARD_WIDTH > 5 && tileCount % BOARD_WIDTH < 11) ||
      (tileCount > 75 && tileCount < 151);
    const obstacleColor = board.cubeMap[tileCount].obstacle;
    const isPlayerStart = PLAYER_START_TILES.includes(tileCount);
    const player = board.cubeMap[tileCount].player;
    makeTile(left, top, isPlayArea, isPlayerStart, obstacleColor, player);
  }
  tileCount = 1;
}

renderCube();
