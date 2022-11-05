/******/ (function () {
  // webpackBootstrap
  var __webpack_exports__ = {};
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly &&
        (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })),
        keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2
        ? ownKeys(Object(source), !0).forEach(function (key) {
            _defineProperty(target, key, source[key]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(
            target,
            Object.getOwnPropertyDescriptors(source)
          )
        : ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(
              target,
              key,
              Object.getOwnPropertyDescriptor(source, key)
            );
          });
    }
    return target;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  Array.prototype.map = function (callbackFn) {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
      /* call the callback function for every value of this array and       push the returned value into our resulting array
       */
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
    var _final =
      relativeEnd < 0
        ? Math.max(len + relativeEnd, 0)
        : Math.min(relativeEnd, len);
    for (; k < _final; k++) {
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
  log("start");
  var TILE_TOTAL = 225;
  var PLAYER_START_TILES = [38, 118, 188, 108];
  var OBSTACLE_TYPES = ["red", "blue", "yellow", "green", "purple"];
  var IN_PLAY_SURFACES = [1, 3, 4, 5, 7];
  function log() {
    var _console;
    if (window.console) (_console = console).log.apply(_console, arguments);
    else print.apply(void 0, arguments);
  }
  var Board = /*#__PURE__*/ (function () {
    function Board() {
      _classCallCheck(this, Board);
      _defineProperty(this, "cubeArrays", void 0);
      _defineProperty(this, "cubeMap", void 0);
      this.cubeArrays = this._getCubeArrays();
      this.cubeMap = this._getCubeMap(this.cubeArrays);
    }
    _createClass(Board, [
      {
        key: "_checkDirection",
        value: function _checkDirection(from, to) {
          var fromTile = this.cubeMap[from];
          var toTile = this.cubeMap[to];
          if (fromTile.surface === toTile.surface) return;
          if (fromTile.surface < toTile.surface) {
            return "up";
          } else {
            return "down";
          }
        },
      },
      {
        key: "generateObstacle",
        value: function generateObstacle(start) {
          function repeat(arr) {
            var lastPick = null;
            return function () {
              if (lastPick) return lastPick;
              var idx = Math.floor(Math.random() * arr.length);
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

          var leftOrRight = ["left", "right"];
          var upOrDown = ["up", "down"];
          var repeatLeftOrRight = repeat(leftOrRight);
          var repeatUpOrDown = repeat(upOrDown);
          var second = this.getAdjecentTile(start, repeatLeftOrRight());
          var third = this.getAdjecentTile(start, repeatUpOrDown());
          var forth;
          if (this.cubeMap[second].surface === this.cubeMap[start].surface) {
            forth = this.getAdjecentTile(second, repeatUpOrDown());
          } else if (
            this.cubeMap[third].surface === this.cubeMap[start].surface
          ) {
            forth = this.getAdjecentTile(third, repeatLeftOrRight());
          } else {
            throw "MISFORMED_OBSTACLE";
          }
          log("generateObstacle", [start, second, third, forth]);
          return [start, second, third, forth];
        },
      },
      {
        key: "setAllObstactles",
        value: function setAllObstactles() {
          var _this = this;
          var EDGES = {
            5: {
              col: 4,
            },
            7: {
              row: 4,
            },
          };
          var CORNERS = [70, 145, 140];
          var tiles = Array(TILE_TOTAL)
            .fill()
            .map(function (_, i) {
              return i + 1;
            })
            .filter(function (i) {
              var _EDGES$start$surface, _EDGES$start$surface2;
              var start = _this.cubeMap[i];
              if (
                !PLAYER_START_TILES.includes(i) &&
                IN_PLAY_SURFACES.includes(start.surface) &&
                !CORNERS.includes(i) &&
                ((_EDGES$start$surface = EDGES[start.surface]) === null ||
                _EDGES$start$surface === void 0
                  ? void 0
                  : _EDGES$start$surface.row) !== start.row &&
                ((_EDGES$start$surface2 = EDGES[start.surface]) === null ||
                _EDGES$start$surface2 === void 0
                  ? void 0
                  : _EDGES$start$surface2.col) !== start.col
              ) {
                return i;
              }
            });
          var obstaclePerSurfaceCount = {};
          var OBSTACLE_TOTAL = 12;
          var ATTEMPT_TOTAL = 300;
          var obstacleCount = 0;
          var attempt = 0;
          var curColorIdx = 0;
          while (obstacleCount < OBSTACLE_TOTAL && attempt < ATTEMPT_TOTAL) {
            attempt++;
            var idx = Math.floor(tiles.length * Math.random());
            var start = tiles[idx];
            try {
              (function () {
                var startCountOnSurface =
                  obstaclePerSurfaceCount[_this.cubeMap[start].surface];
                if (
                  startCountOnSurface >= Math.ceil(OBSTACLE_TOTAL / 5) ||
                  (_this.cubeMap[start].surface === 4 &&
                    startCountOnSurface === 2)
                ) {
                  throw (
                    "enough obstacle in surface " + _this.cubeMap[start].surface
                  );
                }
                var color = OBSTACLE_TYPES[curColorIdx % OBSTACLE_TYPES.length];
                var newObstacle = _this.generateObstacle(start);
                newObstacle.forEach(function (i) {
                  var _this$cubeMap$i;
                  if (
                    ((_this$cubeMap$i = _this.cubeMap[i]) !== null &&
                      _this$cubeMap$i !== void 0 &&
                      _this$cubeMap$i.obstacle) ||
                    PLAYER_START_TILES.includes(i)
                  ) {
                    throw "OBSTACLE_CREATE_FAIL";
                  }
                  if (
                    _this.cubeMap[_this.getAdjecentTile(i, "up")].obstacle ||
                    _this.cubeMap[_this.getAdjecentTile(i, "down")].obstacle ||
                    // this.cubeMap[this.getAdjecentTile(i, "left")].obstacle ||
                    _this.cubeMap[_this.getAdjecentTile(i, "right")].obstacle
                  ) {
                    throw "OBSTACLE_TOO_CROWDED";
                  }
                });
                // accept the obstacle
                newObstacle.forEach(function (i) {
                  _this.cubeMap[i].obstacle = color;
                });
                obstaclePerSurfaceCount[_this.cubeMap[start].surface] =
                  startCountOnSurface ? startCountOnSurface + 1 : 1;
                obstacleCount++;
                curColorIdx++;
              })();
            } catch (err) {
              log(err, start);
            }
          }
          log("obstaclePerSurfaceCount", obstaclePerSurfaceCount);
          return {
            obstacleCount: obstacleCount,
            attempt: attempt,
          };
        },
      },
      {
        key: "getAdjecentTile",
        value: function getAdjecentTile(tile, dir) {
          var dirs = ["up", "down", "left", "right"];
          if (!dirs.includes(dir)) throw "GET_ADJECEN_TILE_INCORRECT_DIR";
          var _this$cubeMap$tile = this.cubeMap[tile],
            surface = _this$cubeMap$tile.surface,
            row = _this$cubeMap$tile.row,
            col = _this$cubeMap$tile.col;
          var result;

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
              result = this.cubeArrays[surface][row - 1][col];
              break;
            case "down":
              result = this.cubeArrays[surface][row + 1][col];
              break;
            case "left":
              result = this.cubeArrays[surface][row][col - 1];
              break;
            case "right":
              result = this.cubeArrays[surface][row][col + 1];
              break;
            default:
              break;
          }
          return result;
        },
        // it is up to the caller to provide start and end that actually inline
      },
      {
        key: "getThingsInPath",
        value: function getThingsInPath(start, end) {
          var a = Number.isInteger(start) ? this.cubeMap[start] : start;
          var b = Number.isInteger(end) ? this.cubeMap[end] : end;
          if (!a || !b) return null;

          // cross surface check only look at 1 nearest tile
          // will not return accurate result if point2 is not the nearest cross surface tile
          // it is up to the caller to provide correct cross surface tile
          if (a.surface !== b.surface) {
            var obstacle = b.obstacle,
              player = b.player;
            if (obstacle)
              return {
                obstacle: obstacle,
              };
            if (player)
              return {
                player: player,
              };
          }
          if (a.col !== b.col && a.row !== b.row)
            throw "can only check vertically or horizontally.";

          // horizontal check
          if (a.col !== b.col) {
            if (a.col < b.col) {
              // check right
              for (var i = a.col + 1; i <= b.col; i++) {
                var _this$cubeMap$cubeArr =
                    this.cubeMap[cubeArrays[a.surface][a.row][i]],
                  _obstacle = _this$cubeMap$cubeArr.obstacle,
                  _player = _this$cubeMap$cubeArr.player;
                if (_obstacle)
                  return {
                    obstacle: _obstacle,
                    distance: i - a.col,
                  };
                if (_player)
                  return {
                    player: _player,
                    distance: i - a.col,
                  };
              }
            } else {
              // check left
              for (var _i = a.col - 1; _i >= b.col; _i--) {
                var _this$cubeMap$cubeArr2 =
                    this.cubeMap[cubeArrays[a.surface][a.row][_i]],
                  _obstacle2 = _this$cubeMap$cubeArr2.obstacle,
                  _player2 = _this$cubeMap$cubeArr2.player;
                if (_obstacle2)
                  return {
                    obstacle: _obstacle2,
                    distance: a.col - _i,
                  };
                if (_player2)
                  return {
                    player: _player2,
                    distance: a.col - _i,
                  };
              }
            }
          } else {
            // vertical check
            if (a.row < b.row) {
              // check down
              for (var _i2 = a.row + 1; _i2 <= b.row; _i2++) {
                var _this$cubeMap$cubeArr3 =
                    this.cubeMap[cubeArrays[a.surface][_i2][a.col]],
                  _obstacle3 = _this$cubeMap$cubeArr3.obstacle,
                  _player3 = _this$cubeMap$cubeArr3.player;
                if (_obstacle3)
                  return {
                    obstacle: _obstacle3,
                    distance: _i2 - a.row,
                  };
                if (_player3)
                  return {
                    player: _player3,
                    distance: _i2 - a.row,
                  };
              }
            } else {
              // check up
              for (var _i3 = a.row - 1; _i3 >= b.row; _i3--) {
                var _this$cubeMap$cubeArr4 =
                    this.cubeMap[cubeArrays[a.surface][_i3][a.col]],
                  _obstacle4 = _this$cubeMap$cubeArr4.obstacle,
                  _player4 = _this$cubeMap$cubeArr4.player;
                if (_obstacle4)
                  return {
                    obstacle: _obstacle4,
                    distance: a.row - _i3,
                  };
                if (_player4)
                  return {
                    player: _player4,
                    distance: a.row - _i3,
                  };
              }
            }
          }
          return null;
        },
      },
      {
        key: "_getCubeArrays",
        value: function _getCubeArrays() {
          var subsBy5 = [[]];
          var curSubArr = 0;
          var i = 1;
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
          var result = [[], [], []];
          curSubArr = 0;
          var round = 0;
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
        },
      },
      {
        key: "_getCubeMap",
        value: function _getCubeMap(_cubeArrays) {
          var result = {};
          var i = 0;
          while (i < _cubeArrays.length) {
            var surface = _cubeArrays[i];
            var j = 0;
            while (j < surface.length) {
              var row = surface[j];
              var k = 0;
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
        },
      },
    ]);
    return Board;
  })();
  var Player = /*#__PURE__*/ (function () {
    function Player(id, start, direction) {
      _classCallCheck(this, Player);
      _defineProperty(this, "id", void 0);
      _defineProperty(this, "current", void 0);
      _defineProperty(this, "collectedObstacles", []);
      _defineProperty(this, "goal", void 0);
      _defineProperty(this, "direction", void 0);
      this.id = id.toString();
      this.current = start;
      this.goal = PLAYER_START_TILES[Player.GOAL_MAP[id]];
      cubeMap[start].player = this.id;
      this.direction = direction;
    }
    _createClass(Player, [
      {
        key: "move",
        value: function move(next) {
          var result = {
            collideWithOtherPlayer: undefined,
            win: false,
          };
          var nextTile = cubeMap[next];
          if (!nextTile || !IN_PLAY_SURFACES.includes(nextTile.surface))
            throw "MOVE_FAIL_UNKNOWN_TILE";
          var currentTile = cubeMap[this.current];
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
              board.getAdjecentTile(
                this.current,
                this._getDirectionChange(next)
              ) !== next
            ) {
              log(
                board.getAdjecentTile(
                  this.current,
                  this._getDirectionChange(next)
                )
              );
              throw "MOVE_FAIL_INVALID_CROSS_SURFACE";
            }
          }
          // handle same surface long distance move obstacle check
          else {
            var thingInPath = board.getThingsInPath(this.current, next);
            if (
              thingInPath !== null &&
              thingInPath !== void 0 &&
              thingInPath.obstacle
            )
              throw "MOVE_FAIL_OBSTACLE_INBETWEEN";
            if (
              thingInPath !== null &&
              thingInPath !== void 0 &&
              thingInPath.player
            ) {
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
          // renderCube();
          return result;
        },
      },
      {
        key: "_getDirectionChange",
        value: function _getDirectionChange(next) {
          var surface = cubeMap[this.current].surface;
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
        },
      },
      {
        key: "getSurrounding",
        value: function getSurrounding() {
          // relative directions based on current player front facing direction
          var sur = this._getRawSurrounding(this.current);
          if (this.direction === "up") return sur;
          var dirMap = Player.DIRECTION_MAP[this.direction];
          var tempSur = _objectSpread({}, sur);
          for (var key in sur) {
            sur[key] = tempSur[dirMap[key]];
          }
          return sur;
        },
      },
      {
        key: "_getRawSurrounding",
        value: function _getRawSurrounding(position) {
          // absolute directions based on 2D cubeMap
          var result = {
            up: null,
            down: null,
            left: null,
            right: null,
          };
          var current = cubeMap[position];
          result.up = board.getThingsInPath(
            current,
            _objectSpread(
              _objectSpread({}, current),
              {},
              {
                row: 0,
              }
            )
          );
          result.down = board.getThingsInPath(
            current,
            _objectSpread(
              _objectSpread({}, current),
              {},
              {
                row: 4,
              }
            )
          );
          result.left = board.getThingsInPath(
            current,
            _objectSpread(
              _objectSpread({}, current),
              {},
              {
                col: 0,
              }
            )
          );
          result.right = board.getThingsInPath(
            current,
            _objectSpread(
              _objectSpread({}, current),
              {},
              {
                col: 4,
              }
            )
          );
          for (var key in result) {
            if (result[key] === null) {
              var _board$cubeMap$board$ =
                  board.cubeMap[board.getAdjecentTile(position, key)],
                obstacle = _board$cubeMap$board$.obstacle,
                player = _board$cubeMap$board$.player;
              if (obstacle)
                result[key] = {
                  obstacle: obstacle,
                  distance: 1,
                };
              if (player)
                result[key] = {
                  player: player,
                  distance: 1,
                };
            }
          }
          return result;
        },
      },
    ]);
    return Player;
  })(); // --------- game init ------------
  _defineProperty(Player, "GOAL_MAP", {
    0: 2,
    1: 3,
    2: 0,
    3: 1,
  });
  _defineProperty(Player, "DIRECTION_MAP", {
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
  });
  var board = new Board();
  var obCount = board.setAllObstactles();
  var cubeMap = board.cubeMap;
  var cubeArrays = board.cubeArrays;
  log("total obstacles", obCount);
  var DIRECTIONS = ["down", "left", "up", "right"];
  var players = PLAYER_START_TILES.map(function (t, i) {
    return new Player(i, t, DIRECTIONS[i]);
  });
  var p0 = players[0];
  var p1 = players[1];
  var p2 = players[2];
  var p3 = players[3];

  // ---------- JOYO integration ---------------
  log(p0.current);
  function When_JOYO_Read(value) {
    print(value);
  }
  /******/
})();
