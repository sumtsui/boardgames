const CUBE_WIDTH = 60;
const BOARD_WIDTH = 15;
let tileCount = 1;
const wrapper = document.querySelector(".wrapper");
function makeTile(left, top, isPlayArea, isStartTile, color, playerId) {
  const tile = document.createElement("div");
  const DIRECTIONS = [
    { value: "down", degree: "180deg" },
    { value: "left", degree: "-90deg" },
    { value: "up", degree: "0deg" },
    { value: "right", degree: "90deg" },
  ];
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
