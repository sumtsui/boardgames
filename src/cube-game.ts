declare function print(...args): void;
declare function renderCube(): void;
declare function clearAllLight(): void;
declare function bleSetLightAnimation(
  type: string,
  duration: number,
  color: number
): void;
declare function blePlayMusic(type: string): void;
declare function bleSetLight(type: string): void;

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
const OBSTACLE_TYPES = [
  { value: "red", color: "FF0000" },
  { value: "blue", color: "0000FF" },
  { value: "yellow", color: "FFFF00" },
  { value: "green", color: "008000" },
  { value: "purple", color: "800080" },
  { value: "orange", color: "FFA500" },
];
const IN_PLAY_SURFACES = [1, 3, 4, 5, 7];

function log(...val) {
  if (window.console) console.log(...val);
  else print(...val);
}

class Obstacle {
  value;
  color;
  id;
  collectedBy = null;
  constructor({ value, color, id }) {
    this.value = value;
    this.color = color;
    this.id = id;
  }
}

class Board {
  cubeArrays;
  cubeMap;
  obstacles;
  activePlayerTotal = 0;
  constructor() {
    this.cubeArrays = this._getCubeArrays();
    this.cubeMap = this._getCubeMap(this.cubeArrays);
    this.obstacles = this._setAllObstactles();
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
  _generateObstacle(start) {
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
  _setAllObstactles() {
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
      .fill(undefined)
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
    const ATTEMPT_TOTAL = 500;
    const result = [];

    let obstacleCount = 0;
    let attempt = 0;
    let curTypeIdx = 0;

    while (obstacleCount < OBSTACLE_TOTAL && attempt < ATTEMPT_TOTAL) {
      attempt++;
      const idx = Math.floor(tiles.length * Math.random());
      const start = tiles[idx];

      try {
        // for the first 10, do not use orange yet
        const currentType =
          obstacleCount < 10
            ? OBSTACLE_TYPES[curTypeIdx % 5]
            : OBSTACLE_TYPES[5];
        const newObstacle = this._generateObstacle(start);

        // validate the obstacle
        newObstacle.forEach((i) => {
          const tile = this.cubeMap[i];
          // no same color obstacle on same surface
          if (countPerSurface[tile.surface]?.includes(currentType.value)) {
            throw "OBSTACLE_COLOR_EXIST";
          }
          if (tile?.obstacle || PLAYER_START_TILES.includes(i)) {
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
          const tile = this.cubeMap[i];
          const ob = new Obstacle({
            ...currentType,
            id: start.toString(),
          });

          tile.obstacle = ob;
          result.push(ob);

          countPerSurface[tile.surface]
            ? countPerSurface[tile.surface].push(currentType.value)
            : (countPerSurface[tile.surface] = [currentType.value]);
        });

        // log(
        //   "Obstacle",
        //   JSON.stringify(newObstacle),
        //   currentType.value,
        //   curTypeIdx
        // );

        obstacleCount++;
        curTypeIdx++;
      } catch (err) {
        // log(err, start);
      }
    }

    log("countPerSurface", JSON.stringify(countPerSurface, null, 4));
    log("obstacleCount", obstacleCount, "attempt", attempt);

    return result;
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
  getCollectionByPlayerId(playerId) {
    return this.obstacles.reduce((accu, cur) => {
      if (cur.collectedBy === playerId && !accu.includes(cur.value))
        accu.push(cur.value);
      return accu;
    }, []);
  }
  handlePlayerMoved(moveResult, player) {
    const { prev, current } = moveResult;
    if (this.cubeMap[prev]) {
      this.cubeMap[prev].player = undefined;
    }
    this.cubeMap[current].player = player;
  }
  handleObstacleCollected(obstacleId, playId) {
    this.obstacles
      .filter((ob) => ob.id === obstacleId)
      .forEach((ob) => (ob.collectedBy = playId));
  }
  handleObstacleLost(tileNum, playerId) {
    const { obstacle } = this.cubeMap[tileNum];
    if (obstacle?.collectedBy !== playerId) {
      throw "OBSTACLE_LOST_FAIL";
    }
    this.obstacles
      .filter((ob) => ob.id === obstacle.id)
      .forEach((ob) => (ob.collectedBy = undefined));
  }
  handleCollectionTrading(tileNum, player1, player2) {
    const tile = this.cubeMap[tileNum];
    if (
      !tile ||
      !tile.obstacle ||
      (tile.obstacle.collectedBy !== player1.id &&
        tile.obstacle.collectedBy !== player2.id)
    )
      throw "TRADE_OBSTACLE_FAIL";

    const { obstacle } = tile;
    let tradedTo = null;
    if (obstacle.collectedBy === player1.id) {
      tradedTo = player2;
      this.handleObstacleCollected(obstacle.id, player2.id);
    } else {
      tradedTo = player1;
      this.handleObstacleCollected(obstacle.id, player1.id);
    }
    return { tradedTo };
  }
}

class Player {
  static ATTRIBUTES_BY_STARTING_SURFACE = {
    1: {
      dir: "down",
      goal: 188,
    },
    3: {
      dir: "right",
      goal: 118,
    },
    5: {
      dir: "left",
      goal: 108,
    },
    7: {
      dir: "up",
      goal: 38,
    },
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
  current = null;
  lastPassedByObstacles = {};
  goal;
  absoluteDirection;
  start;
  startDir;
  win;

  constructor(id) {
    this.id = id.toString();
    this.win = false;
  }
  _validateMove(current, next) {
    const currentTile = cubeMap[current];
    const nextTile = cubeMap[next];

    if (next === current) throw "MOVE_FAIL_SAME_TILE";

    if (
      currentTile.col !== nextTile.col &&
      currentTile.row !== nextTile.row &&
      currentTile.surface === nextTile.surface
    )
      // can only move vertically or horizontally
      throw "MOVE_FAIL_NOT_ALLOW";

    // handle crossing surface move
    if (currentTile.surface !== nextTile.surface) {
      if (
        board.getAdjecentTile(
          current,
          this._getCrossSurfaceMoveDirection(next)
        ) !== next
      ) {
        throw "MOVE_FAIL_INVALID_CROSS_SURFACE";
      }
    }
  }
  move(next: string) {
    const nextTile = cubeMap[next];

    if (!nextTile || !IN_PLAY_SURFACES.includes(nextTile.surface))
      throw "MOVE_FAIL_UNKNOWN_TILE";

    const result = {
      crashed: undefined,
      collected: false,
      win: false,
      prev: this.current,
      current: next,
      surrounding: undefined,
      shoot: undefined,
    };

    // handle player's first move
    try {
      if (!this.current) {
        this.current = next;
        this.start = next;
        cubeMap[next].player = this.id;
        this.goal =
          Player.ATTRIBUTES_BY_STARTING_SURFACE[cubeMap[next].surface].goal;
        this.absoluteDirection =
          Player.ATTRIBUTES_BY_STARTING_SURFACE[cubeMap[next].surface].dir;
        this.startDir =
          Player.ATTRIBUTES_BY_STARTING_SURFACE[cubeMap[next].surface].dir;
        result.collected = this._collectObstacles();
        result.surrounding = this.getSurrounding();
        board.activePlayerTotal++;
        return result;
      }
    } catch (error) {
      throw "FIRST_MOVE_FAILED";
    }

    // not validate move, reply on players to validate
    // this._validateMove(this.current, next);

    this.absoluteDirection = this._getDirectionChange(next);

    // check colliding with obstacles or players
    const thingInPath = board.getThingsInPath(this.current, next);
    if (thingInPath) {
      if (thingInPath.obstacle) {
        result.crashed = thingInPath.obstacle;
      } else if (thingInPath.player?.id !== this.id) {
        result.crashed = thingInPath.player;
      }
    } else if (nextTile.obstacle) {
      result.crashed = nextTile.obstacle;
    } else if (nextTile.player?.id !== this.id) {
      result.crashed = nextTile.player;
    }

    this.current = next;
    if (result.crashed) return result;

    result.shoot = this._shoot();
    result.collected = this._collectObstacles();
    log(
      "Passedby obstacles",
      JSON.stringify(this.lastPassedByObstacles, null, 4)
    );

    result.surrounding = this.getSurrounding();

    result.win = this._checkWin(next);

    return result;
  }
  _shoot() {
    const { up } = this.getSurrounding();
    if (up?.player) {
      return up.player;
    }
  }
  _checkWin(next) {
    if (next !== this.goal) return false;

    const playerTotalMap = {
      2: 5,
      3: 4,
      4: 3,
    };
    const collectionGoal = playerTotalMap[board.activePlayerTotal] || 4;

    return board.getCollectionByPlayerId(this.id).length >= collectionGoal;
  }
  /**
   * check surroundings for collected obstacles
   * pass by same obstacle's different side twice in 2 moves, count as collected that obstacle
   * the 2 moves need to be consecutive.
   */
  _collectObstacles() {
    let collected = false;
    const newLastPassedByObstacle = {};
    ["down", "left", "up", "right"].forEach((dir) => {
      const tileNum = board.getAdjecentTile(this.current, dir);
      const tile = cubeMap[tileNum];
      if (!tile || !tile.obstacle || tile.obstacle.collectedBy) return;
      if (board.getCollectionByPlayerId(this.id).includes(tile.obstacle.value))
        return; // can't collect same type of obstacles twice

      const passedByObstacleWithSameId =
        this.lastPassedByObstacles[tile.obstacle.id];

      // check if current passedby is a different side of an already passedby obstacle, if yes, it is collected by the player
      if (
        passedByObstacleWithSameId &&
        passedByObstacleWithSameId.tileNum !== tileNum
      ) {
        collected = true;
        board.handleObstacleCollected(tile.obstacle.id, this.id);
      } else {
        newLastPassedByObstacle[tile.obstacle.id] = {
          tileNum,
        };
      }
    });
    this.lastPassedByObstacles = newLastPassedByObstacle;

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
    return this.absoluteDirection;
  }
  getSurrounding(): { up?: any; down?: any; left?: any; right?: any } {
    if (!this.current) return {};
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

// class TaskRunner {
//   todo: Record<string, Function>;
//   default: Function;

//   constructor({
//     tasks,
//     defaultTask,
//   }: {
//     tasks: { name: string; task: Function }[];
//     defaultTask: Function;
//   }) {
//     this.todo = tasks.reduce((accu, cur) => {
//       accu[cur.name] = cur.task;
//       return accu;
//     }, {});
//     this.default = defaultTask;
//   }

//   run() {
//     for (const task in this.todo) {
//       this.todo[task]?.();
//       this.todo[task] = null;
//     }
//     this.default();
//   }
// }

// --------- game init ------------
const board = new Board();
const cubeMap = board.cubeMap;
const cubeArrays = board.cubeArrays;

// for browser testing, render after each move
function move(player: Player, num: string) {
  try {
    const result = player.move(num);
    board.handlePlayerMoved(result, player);
    renderCube();
    return result;
  } catch (error) {
    console.log(error);
  }
}
const players = new Array(4).map((_, idx) => new Player(idx));
const p0 = players[0];
const p1 = players[1];
const p2 = players[2];
const p3 = players[3];

// const game = new Game(players, board);

// ---------- JOYO integration ---------------
const JOYO_COLOR_ERROR = 0xff0000; // red
const JOYO_COLOR_WIN = 0xf9e716; // yellow
const JOYO_COLOR_CRASH = JOYO_COLOR_ERROR;
const JOYO_COLOR_OK = 0x03f0fc; // turquoise
const JOYO_COLOR_COLLECTED = JOYO_COLOR_OK;
const JOYO_COLOR_COLLECTION_LOST = 0xffffff; // white;
const JOYO_COLOR_UNKNOWN_OBJECT = 0xffffff; // white
const JOYO_COLOR_PLAYER = 0xee82ee; // pink
const JOYO_SOUND_START_GAME = "fhed";
const JOYO_SOUND_ERROR = "gswa";
const JOYO_SOUND_OK = "stat";
const JOYO_SOUND_SUCCESS = "nwit";
const JOYO_SOUND_COLLECT = "mat4";
const JOYO_SOUND_WIN = "gwin";
const JOYO_SOUND_CRASH = "sk04";
const JOYO_SOUND_LOSE_THING = "hatc";
const JOYO_SOUND_SHOOT = "tala";
const JOYO_COLOR_SHOOT = 0x5beb34;

clearAllLight();
bleSetLightAnimation("run", 5, JOYO_COLOR_WIN);
blePlayMusic(JOYO_SOUND_START_GAME);

const JOYO_PLAYERS_MAP = {
  1801: p0,
  1802: p1,
  1803: p2,
  1804: p3,
};
const JOYO_OBSTACLE_COLOR_MAP = OBSTACLE_TYPES;

let lastRead = null;
let joyoCurrentPlayer: Player | null = null;
let playerCrashedByOther: Player | null = null;
let playerCrashedToObstacle: Player | null = null;
let playerBeingShot: Player | null = null;

function When_JOYO_Read(read) {
  const value = joyoStickerNumberMapper(read);
  log("after", value);

  if (!value) return;

  // prevent accidentally read same value twice
  if (!lastRead) lastRead = value;
  else if (lastRead && lastRead === value) {
    return;
  } else lastRead = value;

  clearAllLight();

  if (playerCrashedByOther) {
    try {
      board.handleCollectionTrading(
        value,
        joyoCurrentPlayer,
        playerCrashedByOther
      );
      playerCrashedByOther = null;
      joyoLight(JOYO_COLOR_OK);
      blePlayMusic(JOYO_SOUND_SUCCESS);
    } catch (err) {
      log(err);
      joyoLight(JOYO_COLOR_ERROR);
      blePlayMusic(JOYO_SOUND_ERROR);
    }
  } else if (playerCrashedToObstacle) {
    try {
      board.handleObstacleLost(value, playerCrashedToObstacle.id);
      playerCrashedToObstacle = null;
      joyoLight(JOYO_COLOR_OK);
      blePlayMusic(JOYO_SOUND_LOSE_THING);
    } catch (err) {
      log(err);
      joyoLight(JOYO_COLOR_ERROR);
      blePlayMusic(JOYO_SOUND_ERROR);
    }
  } else if (playerBeingShot) {
    try {
      board.handleObstacleLost(value, playerBeingShot.id);
      playerBeingShot = null;
      joyoLight(JOYO_COLOR_OK);
      blePlayMusic(JOYO_SOUND_LOSE_THING);
    } catch (err) {
      log(err);
      joyoLight(JOYO_COLOR_ERROR);
      blePlayMusic(JOYO_SOUND_ERROR);
    }
  } else if (JOYO_PLAYERS_MAP[value]) {
    blePlayMusic(JOYO_SOUND_OK);
    joyoCurrentPlayer = JOYO_PLAYERS_MAP[value];
    joyoHandleShowSurrending(joyoCurrentPlayer.getSurrounding());
    log("player:", JSON.stringify(joyoCurrentPlayer, null, 4));
    log(
      "collections:",
      board.getCollectionByPlayerId(joyoCurrentPlayer.id).toString()
    );
  } else if (board.cubeMap[value]) {
    try {
      const result = joyoCurrentPlayer.move(value);
      board.handlePlayerMoved(result, joyoCurrentPlayer);

      log("result:", JSON.stringify(result, null, 4));
      log("cubeMap", JSON.stringify(board.cubeMap));

      if (result.win) {
        joyoLight(JOYO_COLOR_WIN);
        blePlayMusic(JOYO_SOUND_WIN);
        return;
      }

      if (result.crashed instanceof Obstacle) {
        bleSetLightAnimation("star", 10, JOYO_COLOR_CRASH);
        blePlayMusic(JOYO_SOUND_CRASH);
        if (board.getCollectionByPlayerId(joyoCurrentPlayer.id).length > 0) {
          playerCrashedToObstacle = joyoCurrentPlayer;
        } else {
          log("crashed to obstacle but player has nothing to lose");
        }
        return;
      }

      if (result.crashed instanceof Player) {
        bleSetLightAnimation("star", 6, JOYO_COLOR_CRASH);
        blePlayMusic(JOYO_SOUND_CRASH);
        if (
          board.getCollectionByPlayerId(joyoCurrentPlayer.id).length > 0 ||
          board.getCollectionByPlayerId(result.crashed.id).length > 0
        )
          playerCrashedByOther = result.crashed;

        return;
      }

      if (result.collected) {
        blePlayMusic(JOYO_SOUND_COLLECT);
        bleSetLightAnimation("run", 6, JOYO_COLOR_COLLECTED);
        return;
      }

      if (result.shoot instanceof Player) {
        print("shooooooot!!!");
        blePlayMusic(JOYO_SOUND_SHOOT);
        bleSetLightAnimation("star", 5, JOYO_COLOR_SHOOT);
        if (board.getCollectionByPlayerId(result.shoot.id).length > 0) {
          playerBeingShot = result.shoot;
        } else {
          log("shoot a player but the player has nothing to lose");
        }
        return;
      }

      joyoLight(JOYO_COLOR_OK);
      blePlayMusic(JOYO_SOUND_OK);
    } catch (e) {
      log("MOVE_FAILED", e);
      blePlayMusic(JOYO_SOUND_ERROR);
    }
  } else {
    log("NOT_RECOGNIZE_VALUE", value);
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
  const colors = [up, right, right, down, down, left, left, up].map(
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

function joyoStickerNumberMapper(read) {
  log("before", read);
  const SUBSET = 1800;
  // const SUBSET = 2500;
  const playerIndexs = Object.keys(JOYO_PLAYERS_MAP);

  const numMap = {
    5: 6, // mapping due to missing sticker
    1: playerIndexs[0],
    2: playerIndexs[1],
    3: playerIndexs[2],
    4: playerIndexs[3],
  };

  if (read > SUBSET && read <= SUBSET + 225) {
    const val = read - SUBSET;
    return numMap[val] ?? val;
  }

  return read;
}
