// Some Api of JOYO:
// sleepFn(ms: number), preset sleep function
// print(arguments), due to the code run in the sandbox, "console.log" is instead by "print"
// 1. blePlayMusic(audio: string), (params: tend | tala | stat | poff | pbgn | olwh | mov1 | mov2 |mov3 | mov4 | mov5 | mat1 |mat2 | mat3 | mat4 | mat5 |hred |gwin | gbeg | fnon | fhed | fbdy | chek)
// 2. clearAllLight(), clear all the current light effect.
// 3. bleSetLightAnimation(animation: string, lastTime: number, color: number), play a preset animation
// 4. bleSetLight(JSON.stringify({colors:[255,255,255,255,255,255,255,255,255,255,255,255],bright:1}))
// colors means the 12 lights on JOYO, 8 is top and 4 is bottom light. brightness is between 0 -1
var scan_again_flag; // If somebody collect all the target, he/she need to scan again to confirm
var target_len_for_player; // The initial config of target number
var target_len; // the target lenth of the game, depend on the player number, eg, 2player is 12
var players; // the array store all the player's target
var player_scanned; // the array store all the player's target that has been scanned
var link; // the target of the current player
var current_scanned; // all the found target of the current player
var temp; // when player begin to scan again, the temp array record his scanned target
var map; // the game map with length 36(36 dots), each element record the linked dots.

// trigger when Joyo scan any code,  params 'value' means the code id
function When_JOYO_Read(value) {
  print(value);
  if (scan_again_flag == 1) {
    handle_scan_again(value);
  } else {
    // when joyo read start maker, 41: 1 player, 42: 2player···
    if (value >= 41 && value <= 46) {
      clearAllLight();
      blePlayMusic("mov5");
      sleepFn(0.3);
      init_player(value - 40);
    }
    // when joyo read the identify
    if (value >= 49 && value <= 54) {
      when_read_indentify(value - 48);
    }
    // when JOYO scan the dots
    if (value >= 1 && value <= 36) {
      handle_scan_dots(value);
    }
  }
}

// create list by value
function listsRepeat(value, n) {
  var array = [];
  for (var i = 0; i < n; i++) {
    array[i] = JSON.parse(JSON.stringify(value));
  }
  return JSON.parse(JSON.stringify(array));
}

// init and generate target by the player number
function init_player(number) {
  bleSetLightAnimation('run', 0, 0xffffff);
  target_len = target_len_for_player[(number - 1)];
  players = listsRepeat([], number);
  player_scanned = listsRepeat([], number);
  print('in');
  for (var i = 0; i < number; i++) {
    players[i] = generate_target();
	link = [];
  }
  link = [];
  blePlayMusic("gbeg");
  print("players", JSON.stringify(players));
  sleepFn(0.5);
  clearAllLight();
  sleepFn(0.5);
  // blue
  bleSetLight(JSON.stringify({colors:[255,255,255,255,255,255,255,255,255,255,255,255],bright:1}));
}

// check good or not when scan the dots
function handle_scan_dots(input_value) {
  if (link.indexOf(input_value) >= 0) {
    // green
    bleSetLight(JSON.stringify({colors:[65280,65280,65280,65280,65280,65280,65280,65280,65280,65280,65280,65280],bright:1}));
    blePlayMusic("03mi");
    // if current player have not collect the dots yet, just collect it
    if (current_scanned != null && !(current_scanned.indexOf(input_value) >= 0)) {
	  current_scanned.push(input_value);
    }
    // he has collect all, ask player to scan one more
    if (current_scanned.length >= target_len) {
      sleepFn(0.5);
      // blue
      bleSetLight(JSON.stringify({colors:[255,255,255,255,255,255,255,255,255,255,255,255],bright:1}));
      sleepFn(1);
      blePlayMusic("fhed");
      scan_again_flag = 1;
      temp = [];
    }
    print("current_scanned", JSON.stringify(current_scanned));
  } else {
    var is_other_target = 0;
    for (var n_index in players) {
      n = players[n_index];
      if (n.indexOf(input_value) >= 0) {
        bleSetLight(JSON.stringify({colors:[16776960,16776960,16776960,16776960,16776960,16776960,16776960,16776960,16776960,16776960,16776960,16776960],bright:1}));
        blePlayMusic("olwh");
        is_other_target = 1;
      }
    }
    if (is_other_target == 0) {
      bleSetLight(JSON.stringify({colors:[16711680,16711680,16711680,16711680,16711680,16711680,16711680,16711680,16711680,16711680,16711680,16711680],bright:1}));
      blePlayMusic("olwh");
    }
  }
}

function mathRandomInt(a, b) {
  if (a > b) {
    // Swap a and b to ensure a is smaller.
    var c = a;
    a = b;
    b = c;
  }
  return Math.floor(Math.random() * (b - a + 1) + a);
}

// Describe this function...
function generate_target() {
  link[0] = mathRandomInt(1, 36);
  while (link.length < target_len) {
    random_next_node();
  }
  return link;
}

function listsGetRandomItem(list, remove) {
  var x = Math.floor(Math.random() * list.length);
  if (remove) {
    return list.splice(x, 1)[0];
  } else {
    return list[x];
  }
}

// repeat get target node
function random_next_node() {
  var random_temp_list = [];
  var node = link[link.length - 1];
  var k_list = map[(node - 1)];
  for (var k_index in k_list) {
    k = k_list[k_index];
    if (!(link.indexOf(k) >= 0)) {
	  random_temp_list.push(k);
    }
  }
  link.push(listsGetRandomItem(random_temp_list, false));
}

// do something when player collect all and need to scan again
function handle_scan_again(read_value) {
  // when JOYO scan the dots
  if (read_value >= 1 && read_value <= 36) {
    if (!(temp.indexOf(read_value) >= 0)) {
      blePlayMusic("01do");
      temp.push(read_value);
	  var arr = [0,0,0,0,0,0,0,0,0,0,0,0];
	  for (var i = 0; i < temp.length; i++) {
		  arr[i] = 0xffffff;
	  }
      bleSetLight(JSON.stringify({colors:arr,bright:1}));
      print("temp", JSON.stringify(temp));
      if (temp.length == target_len) {
        is_all_right = 1;
        
        for (var j = 0; j < target_len; j++) {
          if (link.indexOf(temp[j]) < 0) {
            is_all_right = 0;
          }
        }
        if (is_all_right == 1) {
          bleSetLightAnimation('run', 0, 0x00ff00);
		  sleepFn(0.2);
          blePlayMusic("gwin");
        } else {
          bleSetLight(JSON.stringify({colors:[16711680,16711680,16711680,16711680,16711680,16711680,16711680,16711680,16711680,16711680,16711680,16711680],bright:1}));
          sleepFn(0.2);
          blePlayMusic("olwh");
        }
        scan_again_flag = 0;
        temp = [];
      }
    }
  }
}

// when JOYO read the player identify
function when_read_indentify(player_id) {
  clearAllLight();
  current_scanned = null;
  sleepFn(0.3);
  current_scanned = player_scanned[player_id - 1];
  link = players[(player_id - 1)];
  bleSetLight(JSON.stringify({colors:[255,255,255,255,255,255,255,255,255,255,255,255],bright:1}));
  blePlayMusic("mov5");
  print("current_scanned", JSON.stringify(current_scanned));
}


function setUp() {
	bleSetLight(JSON.stringify({ colors: [null, null, null, null, null, null, null, null, '#3cbf2e', '#3cbf2e', '#3cbf2e', '#3cbf2e'], bright: 1 }))
  // config the game target number with different player
  target_len_for_player = [24, 12, 8, 6, 5, 4];
  current_scanned = null;
  temp = [];
  scan_again_flag = 0;
  link = [];
  map = [[2, 8], [1, 3, 8, 9], [2, 4], [3, 5, 9, 10], [4, 6], [5, 11], [8, 13], [1, 2, 7, 10], [2, 4], [4, 8, 11, 15, 16, 17], [6, 10, 12, 17], [11, 18], [7, 14], [13, 19], [8, 10, 16, 20], [10, 15, 17, 21], [10, 11, 16, 18, 22, 29], [12, 17, 23, 24], [14, 20, 25, 26], [8, 19, 15, 21, 26, 27], [16, 20, 22, 27], [17, 21, 27, 29], [18, 29], [18, 30], [19, 31], [19, 20, 27, 33], [20, 21, 22, 26, 29, 33], [29, 35], [17, 23, 22, 27, 28, 35], [24, 36], [25, 32], [31, 33], [26, 27, 32, 34], [33, 35], [28, 29, 34, 36], [30, 35]];
  // init_player(4);
}
setUp();

