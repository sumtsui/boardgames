// up to 4 players
// player1, player2, player3, player4
// player1's start tile is player2's end tile, and vice vesa
// player3's start tile is player4's end tile, and vice vesa
//  

// determine borders
// n % 5 === 1, left border
// n % 5 === 0, right border

type Player = {
  start: number;
  goal: number;
  collected: number[];
  currentPosition: number;
}

const RED = []
const GREEN = []
const BLUE = []
const YELLOW = []
const PURPLE = []

const OBSTACLE_NUM_PER_SIDE = 3


function setObstacles() {

}