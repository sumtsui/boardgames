Array.prototype.map = function (callbackFn) {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    arr.push(callbackFn(this[i], i, this));
  }
  return arr;
};
Array.prototype.filter = function (callbackFn) {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    if (callbackFn.call(this, this[i], i, this)) {
      arr.push(this[i]);
    }
  }
  return arr;
};
Array.prototype.fill = function (value) {
  var O = Object(this);
  var len = parseInt(O.length, 10);
  var start = arguments[1];
  var relativeStart = parseInt(start, 10) || 0;
  var k =
    relativeStart < 0
      ? Math.max(len + relativeStart, 0)
      : Math.min(relativeStart, len);
  var end = arguments[2];
  var relativeEnd = end === undefined ? len : parseInt(end) || 0;
  var final =
    relativeEnd < 0
      ? Math.max(len + relativeEnd, 0)
      : Math.min(relativeEnd, len);

  for (; k < final; k++) {
    O[k] = value;
  }

  return O;
};
Array.prototype.includes = function (search, start) {
  "use strict";
  if (search instanceof RegExp) {
    throw TypeError("first argument must not be a RegExp");
  }
  if (start === undefined) {
    start = 0;
  }
  return this.indexOf(search, start) !== -1;
};
Array.prototype.forEach = function forEach(callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  var array = this;
  thisArg = thisArg || this;
  for (var i = 0, l = array.length; i !== l; ++i) {
    callback.call(thisArg, array[i], i, array);
  }
};

Number.isInteger =
  Number.isInteger ||
  function (value) {
    return (
      typeof value === "number" &&
      isFinite(value) &&
      Math.floor(value) === value
    );
  };

const TILE_TOTAL = 225;
const PLAYER_START_TILES = [38, 118, 188, 108];
const PLAYER_START_DIRECTIONS = ["down", "left", "up", "right"];
const OBSTACLE_TYPES = [
  { value: "red", color: "FF0000" },
  { value: "blue", color: "0000FF" },
  { value: "yellow", color: "FFFF00" },
  { value: "green", color: "008000" },
  { value: "purple", color: "800080" },
];
const IN_PLAY_SURFACES = [1, 3, 4, 5, 7];

function log(...val) {
  if (window.console) console.log(...val);
  else print(...val);
}

class Board {
  cubeArrays;
  cubeMap;
  constructor() {
    this.cubeArrays = this._getCubeArrays();
    this.cubeMap = this._getCubeMap(this.cubeArrays);
  }
  _checkDirection(from, to) {
    const fromTile = this.cubeMap[from];
    const toTile = this.cubeMap[to];
    if (fromTile.surface === toTile.surface) return;
    if (fromTile.surface < toTile.surface) {
      return "up";
    } else {
      return "down";
    }
  }
  generateObstacle(start) {
    function repeat(arr) {
      let lastPick = null;
      return () => {
        if (lastPick) return lastPick;
        const idx = Math.floor(Math.random() * arr.length);
        lastPick = arr[idx];
        return lastPick;
      };
    }

    // base on start, to generate the whole obstacle:
    // let start spawn the second from its left or right side, remember the side
    // let start spawn the third one from its up or down side, remember the side
    // if second is on same surface with start, let second repeat what start did
    // else let third repeat what start did
    // these can gurantee it is always a square obstacle

    const leftOrRight = ["left", "right"];
    const upOrDown = ["up", "down"];

    const repeatLeftOrRight = repeat(leftOrRight);
    const repeatUpOrDown = repeat(upOrDown);
    const second = this.getAdjecentTile(start, repeatLeftOrRight());
    const third = this.getAdjecentTile(start, repeatUpOrDown());

    let forth;
    if (this.cubeMap[second].surface === this.cubeMap[start].surface) {
      forth = this.getAdjecentTile(second, repeatUpOrDown());
    } else if (this.cubeMap[third].surface === this.cubeMap[start].surface) {
      forth = this.getAdjecentTile(third, repeatLeftOrRight());
    } else {
      throw "MISFORMED_OBSTACLE";
    }

    // log("generateObstacle", [start, second, third, forth]);

    return [start, second, third, forth];
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

    const countPerSurface = {};
    const OBSTACLE_TOTAL = 12;
    const ATTEMPT_TOTAL = 300;

    let obstacleCount = 0;
    let attempt = 0;
    let curTypeIdx = 0;

    while (obstacleCount < OBSTACLE_TOTAL && attempt < ATTEMPT_TOTAL) {
      attempt++;
      const idx = Math.floor(tiles.length * Math.random());
      const start = tiles[idx];

      try {
        const currentType = OBSTACLE_TYPES[curTypeIdx % OBSTACLE_TYPES.length];
        const newObstacle = this.generateObstacle(start);

        // validate the obstacle
        newObstacle.forEach((i) => {
          if (this.cubeMap[i]?.obstacle || PLAYER_START_TILES.includes(i)) {
            throw "OBSTACLE_CREATE_FAIL";
          }
          if (
            this.cubeMap[this.getAdjecentTile(i, "up")]?.obstacle ||
            this.cubeMap[this.getAdjecentTile(i, "down")]?.obstacle ||
            this.cubeMap[this.getAdjecentTile(i, "left")]?.obstacle ||
            this.cubeMap[this.getAdjecentTile(i, "right")]?.obstacle
          ) {
            throw "OBSTACLE_TOO_CROWDED";
          }
        });

        // accept the obstacle
        newObstacle.forEach((i) => {
          this.cubeMap[i].obstacle = { ...currentType, id: start.toString() };
        });

        log(
          "Obstacle",
          JSON.stringify(newObstacle),
          currentType.value,
          curTypeIdx
        );

        countPerSurface[this.cubeMap[start].surface]
          ? countPerSurface[this.cubeMap[start].surface].push(currentType.value)
          : (countPerSurface[this.cubeMap[start].surface] = []);
        obstacleCount++;
        curTypeIdx++;
      } catch (err) {
        log(err, start);
      }
    }

    log("countPerSurface", countPerSurface);

    return { obstacleCount, attempt };
  }
  getAdjecentTile(tileNum, dir) {
    const dirs = ["up", "down", "left", "right"];
    if (!dirs.includes(dir)) throw "GET_ADJECEN_TILE_INCORRECT_DIR";
    const tile = this.cubeMap[tileNum];
    if (!tile) return null;
    const { surface, row, col } = tile;
    let result;

    // handle cross surface cases
    if (surface === 1) {
      if (row === 4 && dir === "down") {
        result = this.cubeArrays[4][0][col];
      }
      if (col === 0 && dir === "left") {
        result = this.cubeArrays[3][0][row];
      }
      if (col === 4 && dir === "right") {
        result = this.cubeArrays[5][0][4 - row];
      }
    } else if (surface === 5) {
      if (row === 0 && dir === "up") {
        result = this.cubeArrays[1][4 - col][4];
      }
      if (row === 4 && dir === "down") {
        result = this.cubeArrays[7][col][row];
      }
      if (col === 0 && dir === "left") {
        result = this.cubeArrays[4][row][4];
      }
    } else if (surface === 7) {
      if (row === 0 && dir === "up") {
        result = this.cubeArrays[4][4][col];
      }
      if (col === 0 && dir === "left") {
        result = this.cubeArrays[3][4][4 - row];
      }
      if (col === 4 && dir === "right") {
        result = this.cubeArrays[5][4][row];
      }
    } else if (surface === 3) {
      if (row === 0 && dir === "up") {
        result = this.cubeArrays[1][col][0];
      }
      if (row === 4 && dir === "down") {
        result = this.cubeArrays[7][4 - col][0];
      }
      if (col === 4 && dir === "right") {
        result = this.cubeArrays[4][row][0];
      }
    } else if (surface === 4) {
      if (row === 0 && dir === "up") {
        result = this.cubeArrays[1][4][col];
      }
      if (row === 4 && dir === "down") {
        result = this.cubeArrays[7][0][col];
      }
      if (col === 0 && dir === "left") {
        result = this.cubeArrays[3][row][4];
      }
      if (col === 4 && dir === "right") {
        result = this.cubeArrays[5][row][0];
      }
    }

    if (result) return result;

    // handle same surface cases
    switch (dir) {
      case "up":
        result = this.cubeArrays[surface]?.[row - 1]?.[col];
        break;

      case "down":
        result = this.cubeArrays[surface]?.[row + 1]?.[col];
        break;

      case "left":
        result = this.cubeArrays[surface]?.[row]?.[col - 1];
        break;

      case "right":
        result = this.cubeArrays[surface]?.[row]?.[col + 1];
        break;

      default:
        break;
    }

    if (result) return result;
    return undefined;
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
      if (obstacle) return { obstacle, distance: 0 };
      if (player) return { player };
      return null;
    }

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

      // log("result", result);

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

class Player {
  static GOAL_MAP = {
    0: 2,
    1: 3,
    2: 0,
    3: 1,
  };
  static DIRECTION_MAP = {
    down: {
      up: "down",
      left: "right",
      right: "left",
      down: "up",
    },
    left: {
      up: "left",
      left: "down",
      right: "up",
      down: "right",
    },
    right: {
      up: "right",
      left: "up",
      right: "down",
      down: "left",
    },
  };
  id;
  current;
  passedByObstacles = {};
  goal;
  absoluteDirection;
  _backHome;

  constructor(id, start, absoluteDirection) {
    this.id = id.toString();
    this.current = start;
    this.goal = PLAYER_START_TILES[Player.GOAL_MAP[id]];
    cubeMap[start].player = this.id;
    this.absoluteDirection = absoluteDirection;
    this.win = false;
    this._backHome = () => {
      board.cubeMap[this.current].player = undefined;
      this.current = start;
      board.cubeMap[this.current].player = this.id;
      this.absoluteDirection = absoluteDirection;
    };
  }
  move(next, isGod) {
    if (isGod) {
      cubeMap[next].player = this.id;
      cubeMap[this.current].player = null;
      this.current = next;
      return;
    }

    const nextTile = cubeMap[next];

    if (!nextTile || !IN_PLAY_SURFACES.includes(nextTile.surface))
      throw "MOVE_FAIL_UNKNOWN_TILE";

    const currentTile = cubeMap[this.current];

    if (next === this.current) throw "MOVE_FAIL_SAME_TILE";

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
        board.getAdjecentTile(
          this.current,
          this._getCrossSurfaceMoveDirection(next)
        ) !== next
      ) {
        throw "MOVE_FAIL_INVALID_CROSS_SURFACE";
      }
    }

    const result = {
      collided: false,
      collected: false,
      win: false,
    };

    // handle colliding with obstacles or players
    const thingInPath = board.getThingsInPath(this.current, next);
    if (thingInPath) {
      this._backHome();
      result.collided = true;
      return result;
    }

    this.absoluteDirection =
      this._getDirectionChange(next) || this.absoluteDirection;
    this.current = next;
    nextTile.player = this.id;
    currentTile.player = undefined;

    result.collected = this._collectObstacles();
    log("Passedby obstacles", JSON.stringify(this.passedByObstacles, null, 4));

    if (next === this.goal) {
      if (
        Object.values(this.passedByObstacles).filter((ob) => ob.collected) >= 4
      ) {
        result.win = true;
      }
    }

    return result;
  }
  _collectObstacles() {
    let collected;
    ["down", "left", "up", "right"].forEach((dir) => {
      const tileNum = board.getAdjecentTile(this.current, dir);
      const tile = cubeMap[tileNum];
      // pass by same obstacle's different side twice, count as collected that obstacle
      if (tile?.obstacle?.id) {
        if (
          this.passedByObstacles[tile.obstacle.id] &&
          this.passedByObstacles[tile.obstacle.id].tileNum !== tileNum
        ) {
          this.passedByObstacles[tile.obstacle.id].collected = true;
          collected = true;
        } else {
          this.passedByObstacles[tile.obstacle.id] = {
            ...tile.obstacle,
            tileNum,
          };
        }
      }
    });

    return collected;
  }
  _getCrossSurfaceMoveDirection(next) {
    const curTile = cubeMap[this.current];
    const nextTile = cubeMap[next];
    if (curTile.surface === 1 && nextTile.surface === 3) return "left";
    if (curTile.surface === 1 && nextTile.surface === 5) return "right";
    if (curTile.surface === 3 && nextTile.surface === 1) return "up";
    if (curTile.surface === 3 && nextTile.surface === 7) return "down";
    if (curTile.surface === 5 && nextTile.surface === 1) return "up";
    if (curTile.surface === 5 && nextTile.surface === 7) return "down";
    if (curTile.surface === 7 && nextTile.surface === 3) return "left";
    if (curTile.surface === 7 && nextTile.surface === 5) return "right";
    if (curTile.surface === 4 || nextTile.surface === 4)
      return this._getDirectionChange(next);
    throw "UNKNOWN_MOVE_DIRECTION";
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
  getSurrounding() {
    // relative directions based on current player front facing absoluteDirection
    const sur = this._getAbsoluteSurrounding(this.current);
    if (this.absoluteDirection === "up") return sur;
    const dirMap = Player.DIRECTION_MAP[this.absoluteDirection];
    const tempSur = { ...sur };
    for (let key in sur) {
      sur[key] = tempSur[dirMap[key]];
    }
    return sur;
  }
  _getAbsoluteSurrounding(tileNum = this.current) {
    // absolute directions based on 2D cubeMap
    const result = {
      up: null,
      down: null,
      left: null,
      right: null,
    };
    const current = cubeMap[tileNum];

    // detect same surface
    result.up = board.getThingsInPath(current, { ...current, row: 0 });
    result.down = board.getThingsInPath(current, { ...current, row: 4 });
    result.left = board.getThingsInPath(current, { ...current, col: 0 });
    result.right = board.getThingsInPath(current, { ...current, col: 4 });
    // detect cross surface if any
    for (let direction in result) {
      if (
        result[direction] === null &&
        board.cubeMap[board.getAdjecentTile(tileNum, direction)]
      ) {
        const { obstacle, player } =
          board.cubeMap[board.getAdjecentTile(tileNum, direction)];
        if (obstacle) result[direction] = { obstacle, distance: 1 };
        if (player) result[direction] = { player, distance: 1 };
      }
    }

    return result;
  }
}

// --------- game init ------------
const board = new Board();
const obCount = board.setAllObstactles();
const cubeMap = board.cubeMap;
const cubeArrays = board.cubeArrays;
log("Obstacles count", JSON.stringify(obCount));
const players = PLAYER_START_TILES.map(
  (t, i) => new Player(i, t, PLAYER_START_DIRECTIONS[i])
);

const p0 = players[0];
const p1 = players[1];
const p2 = players[2];
const p3 = players[3];

function move(player, num) {
  try {
    player.move(num);
    renderCube();
  } catch (error) {
    console.log(error);
  }
}

// ---------- JOYO integration ---------------
// clearAllLight();
// bleSetLightAnimation("run", 5, 0x00ffff);
// blePlayMusic("fhed");
const JOYO_COLOR_ERROR = 0xfe0b36;
const JOYO_COLOR_WIN = 0xf9e716;
const JOYO_COLOR_COLLIDE = 0x162cf9;
const JOYO_COLOR_SUCCESS = 0x16f93d;
const JOYO_COLOR_COLLECTED = 0x16f93d;
const JOYO_COLOR_UNKNOWN_OBJECT = 0xffffff;
const JOYO_COLOR_PLAYER = 0x00ffff;
const JOYO_PLAYERS_MAP = {
  5980: p0,
  5970: p1,
  5960: p2,
  5950: p3,
};
const JOYO_OBSTACLE_COLOR_MAP = OBSTACLE_TYPES;

let joyoCurrentPlayer = null;
let joyoCurrentPlayerHasMoved = false;
let lastRead = null;

function When_JOYO_Read(value) {
  // handle reading air
  value = value - 2500;

  if (
    !Object.keys(JOYO_PLAYERS_MAP).includes(value.toString()) &&
    !board.cubeMap[value]
  ) {
    // log("VALUE_NOT_PLAYER_OR_MOVE", value);
    return;
  }

  // prevent accidentally read same value twice
  if (!lastRead) lastRead = value;
  else if (lastRead && lastRead === value) {
    // log("SAME_VALUE_READ_TWICE");
    return;
  } else lastRead = value;

  clearAllLight();

  // log(value);

  // error cases
  if (!joyoCurrentPlayer && !JOYO_PLAYERS_MAP[value]) {
    joyoLight(JOYO_COLOR_ERROR);
    // log("NO_PLAYER_OR_MOVE");
    return;
  }

  if (joyoCurrentPlayerHasMoved && !JOYO_PLAYERS_MAP[value]) {
    joyoLight(JOYO_COLOR_ERROR);
    // log("CURRENT_PLAYER_HAS_MOVED");
    return;
  }

  if (JOYO_PLAYERS_MAP[value]) {
    blePlayMusic("hred");
    joyoCurrentPlayerHasMoved = false;
    joyoCurrentPlayer = JOYO_PLAYERS_MAP[value];
    joyoLight(JOYO_COLOR_SUCCESS);
    joyoHandleShowSurrending(joyoCurrentPlayer.getSurrounding());
    log(
      "Current player",
      JOYO_PLAYERS_MAP[value].id,
      JOYO_PLAYERS_MAP[value].current
    );
  } else if (board.cubeMap[value]) {
    try {
      const result = joyoCurrentPlayer.move(value);
      joyoCurrentPlayerHasMoved = true;

      if (result.win) {
        joyoLight(JOYO_COLOR_WIN);
        blePlayMusic("gwin");
      } else if (result.collided) {
        joyoLight(JOYO_COLOR_COLLIDE);
      } else if (result.collected) {
        joyoLight(JOYO_COLOR_COLLECTED);
      } else {
        joyoLight(JOYO_COLOR_SUCCESS);
        blePlayMusic("chek");
      }

      joyoCurrentPlayer = null;
    } catch (e) {
      log("Error", e);
      blePlayMusic("olwh");
      joyoLight(JOYO_COLOR_ERROR);
    }
  } else {
    log("NOT_RECOGNIZE_VALUE", value);
    // blePlayMusic("olwh");
    // joyoLight(JOYO_COLOR_ERROR);
  }
}

function joyoLight(color) {
  log(color);
  bleSetLight(
    JSON.stringify({
      colors: new Array(12).fill(color),
      bright: 0.5,
    })
  );
}
function joyoHandleShowSurrending(surrending) {
  log(JSON.stringify(surrending, null, 4));
  const { left, down, up, right } = surrending;
  const colors = [right, right, down, down, left, left, up, up].map(
    joyoDisplayObjectColor
  );
  bleSetLight(
    JSON.stringify({
      colors,
      bright: 0.5,
    })
  );
}

function joyoDisplayObjectColor(object) {
  const { obstacle, player, distance } = object || {};
  if (distance > 1) return JOYO_COLOR_UNKNOWN_OBJECT;
  if (obstacle) {
    return "0x" + obstacle?.color;
  }
  if (player) {
    return JOYO_COLOR_PLAYER;
  }
  return null;
}
