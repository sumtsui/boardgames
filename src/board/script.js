const wrapper = document.querySelector('.wrapper')
const CUBE_WIDTH = 60
const BOARD_WIDTH = 15
const TILE_TOTAL = 225

function getCubeArrays() {
  const subsBy5 = [[]]
  let curSubArr = 0
  
  let i = 1
  while (i <= TILE_TOTAL) {
    if (curSubArr === 5) {
      subsBy5.push([i])
      curSubArr = 1
      i++
    } else {
      subsBy5.slice(-1)[0].push(i)
      curSubArr++
      i++
    }
  }

  // console.log('subsBy5', subsBy5)

  const result = [[], [], []]
  curSubArr = 0
  let round = 0
  i = 0

  while (i < subsBy5.length) {
    if (curSubArr === 3) curSubArr = 0

    if (result[curSubArr + round].length < 5) {
      result[curSubArr + round].push(subsBy5[i])
    }
    
    if (result[curSubArr + round].length === 5 && curSubArr === 2 && i < subsBy5.length - 1) {
      round+= 3
      result.push([], [], [])
    }
    
    curSubArr++
    i++
  }

  return result
}

const cubeArrays = getCubeArrays()
console.log(cubeArrays)

function getCubeMap(_cubeArrays) {
  const result = {}
  let i = 0
  while (i < _cubeArrays.length) {
    const surface = _cubeArrays[i]
    let j = 0
    while (j < surface.length) {
      const row = surface[j]
      let k = 0
      while (k < row.length) {
        result[row[k]] = {i,j,k}
        k++
      }
      j++
    }
    i++
  }

  return result
}

const cubeMap = getCubeMap(cubeArrays)

let tileCount = 1

function makeTile(left, top, isPlayArea, isObstacle) {
  const tile = document.createElement('div')
  tile.style.border = "1px dotted gray"
  tile.style.width = CUBE_WIDTH + 'px'
  tile.style.height = CUBE_WIDTH + 'px'
  tile.style.position = 'absolute'
  tile.style.left = left
  tile.style.top = top
  if (isPlayArea) {
    tile.style.border = "1.5px solid white"
  }
  if (isObstacle) {
    tile.style.backgroundColor = 'teal'
  }
  tile.innerText = tileCount
  tileCount++
  wrapper.appendChild(tile)
}

// const OUT_OF_BOUNDS_AREA = [0, 2, 6, 8]
const obstacles = {}

function setObstacle(start) {
  const right = start+1
  const down = start+15
  const diagonal = start+15+1

  obstacles[start] = start
  obstacles[right] = right
  obstacles[down] = down
  obstacles[diagonal] = diagonal
}

setObstacle(6)
setObstacle(96)
setObstacle(121)
setObstacle(10)

function renderCube() {
  while (tileCount <= TILE_TOTAL) {
    const left = (tileCount % BOARD_WIDTH || BOARD_WIDTH) * CUBE_WIDTH + 'px' 
    const top = Math.ceil(tileCount / BOARD_WIDTH) * CUBE_WIDTH + 'px' 
    const isPlayArea = (tileCount % BOARD_WIDTH) > 5 && (tileCount % BOARD_WIDTH) < 11 || (tileCount > 75 && tileCount < 151)
    const isObstacle = obstacles[tileCount]
    makeTile(left, top, isPlayArea, isObstacle)
  }
}

renderCube()