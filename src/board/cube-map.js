// const CUBE_MAP = cubeMap;
const CUBE_MAP = {
  1: { surface: 0, row: 0, col: 0, obstacle: null, player: null },
  2: { surface: 0, row: 0, col: 1, obstacle: null, player: null },
  3: { surface: 0, row: 0, col: 2, obstacle: null, player: null },
  4: { surface: 0, row: 0, col: 3, obstacle: null, player: null },
  5: { surface: 0, row: 0, col: 4, obstacle: null, player: null },
  6: { surface: 1, row: 0, col: 0, obstacle: null, player: null },
  7: { surface: 1, row: 0, col: 1, obstacle: null, player: null },
  8: { surface: 1, row: 0, col: 2, obstacle: null, player: null },
  9: {
    surface: 1,
    row: 0,
    col: 3,
    obstacle: { collectedBy: null, value: "blue", color: "0000FF", id: "25" },
    player: null,
  },
  10: {
    surface: 1,
    row: 0,
    col: 4,
    obstacle: { collectedBy: null, value: "blue", color: "0000FF", id: "25" },
    player: null,
  },
  11: { surface: 2, row: 0, col: 0, obstacle: null, player: null },
  12: { surface: 2, row: 0, col: 1, obstacle: null, player: null },
  13: { surface: 2, row: 0, col: 2, obstacle: null, player: null },
  14: { surface: 2, row: 0, col: 3, obstacle: null, player: null },
  15: { surface: 2, row: 0, col: 4, obstacle: null, player: null },
  16: { surface: 0, row: 1, col: 0, obstacle: null, player: null },
  17: { surface: 0, row: 1, col: 1, obstacle: null, player: null },
  18: { surface: 0, row: 1, col: 2, obstacle: null, player: null },
  19: { surface: 0, row: 1, col: 3, obstacle: null, player: null },
  20: { surface: 0, row: 1, col: 4, obstacle: null, player: null },
  21: { surface: 1, row: 1, col: 0, obstacle: null, player: null },
  22: { surface: 1, row: 1, col: 1, obstacle: null, player: null },
  23: { surface: 1, row: 1, col: 2, obstacle: null, player: null },
  24: {
    surface: 1,
    row: 1,
    col: 3,
    obstacle: { collectedBy: null, value: "blue", color: "0000FF", id: "25" },
    player: null,
  },
  25: {
    surface: 1,
    row: 1,
    col: 4,
    obstacle: { collectedBy: null, value: "blue", color: "0000FF", id: "25" },
    player: null,
  },
  26: { surface: 2, row: 1, col: 0, obstacle: null, player: null },
  27: { surface: 2, row: 1, col: 1, obstacle: null, player: null },
  28: { surface: 2, row: 1, col: 2, obstacle: null, player: null },
  29: { surface: 2, row: 1, col: 3, obstacle: null, player: null },
  30: { surface: 2, row: 1, col: 4, obstacle: null, player: null },
  31: { surface: 0, row: 2, col: 0, obstacle: null, player: null },
  32: { surface: 0, row: 2, col: 1, obstacle: null, player: null },
  33: { surface: 0, row: 2, col: 2, obstacle: null, player: null },
  34: { surface: 0, row: 2, col: 3, obstacle: null, player: null },
  35: { surface: 0, row: 2, col: 4, obstacle: null, player: null },
  36: { surface: 1, row: 2, col: 0, obstacle: null, player: null },
  37: { surface: 1, row: 2, col: 1, obstacle: null, player: null },
  38: { surface: 1, row: 2, col: 2, obstacle: null, player: null },
  39: { surface: 1, row: 2, col: 3, obstacle: null, player: null },
  40: { surface: 1, row: 2, col: 4, obstacle: null, player: null },
  41: { surface: 2, row: 2, col: 0, obstacle: null, player: null },
  42: { surface: 2, row: 2, col: 1, obstacle: null, player: null },
  43: { surface: 2, row: 2, col: 2, obstacle: null, player: null },
  44: { surface: 2, row: 2, col: 3, obstacle: null, player: null },
  45: { surface: 2, row: 2, col: 4, obstacle: null, player: null },
  46: { surface: 0, row: 3, col: 0, obstacle: null, player: null },
  47: { surface: 0, row: 3, col: 1, obstacle: null, player: null },
  48: { surface: 0, row: 3, col: 2, obstacle: null, player: null },
  49: { surface: 0, row: 3, col: 3, obstacle: null, player: null },
  50: { surface: 0, row: 3, col: 4, obstacle: null, player: null },
  51: {
    surface: 1,
    row: 3,
    col: 0,
    obstacle: { collectedBy: null, value: "purple", color: "800080", id: "52" },
    player: null,
  },
  52: {
    surface: 1,
    row: 3,
    col: 1,
    obstacle: { collectedBy: null, value: "purple", color: "800080", id: "52" },
    player: null,
  },
  53: { surface: 1, row: 3, col: 2, obstacle: null, player: null },
  54: {
    surface: 1,
    row: 3,
    col: 3,
    obstacle: { collectedBy: null, value: "yellow", color: "FFFF00", id: "69" },
    player: null,
  },
  55: {
    surface: 1,
    row: 3,
    col: 4,
    obstacle: { collectedBy: null, value: "yellow", color: "FFFF00", id: "69" },
    player: null,
  },
  56: { surface: 2, row: 3, col: 0, obstacle: null, player: null },
  57: { surface: 2, row: 3, col: 1, obstacle: null, player: null },
  58: { surface: 2, row: 3, col: 2, obstacle: null, player: null },
  59: { surface: 2, row: 3, col: 3, obstacle: null, player: null },
  60: { surface: 2, row: 3, col: 4, obstacle: null, player: null },
  61: { surface: 0, row: 4, col: 0, obstacle: null, player: null },
  62: { surface: 0, row: 4, col: 1, obstacle: null, player: null },
  63: { surface: 0, row: 4, col: 2, obstacle: null, player: null },
  64: { surface: 0, row: 4, col: 3, obstacle: null, player: null },
  65: { surface: 0, row: 4, col: 4, obstacle: null, player: null },
  66: {
    surface: 1,
    row: 4,
    col: 0,
    obstacle: { collectedBy: null, value: "purple", color: "800080", id: "52" },
    player: null,
  },
  67: {
    surface: 1,
    row: 4,
    col: 1,
    obstacle: { collectedBy: null, value: "purple", color: "800080", id: "52" },
    player: null,
  },
  68: { surface: 1, row: 4, col: 2, obstacle: null, player: null },
  69: {
    surface: 1,
    row: 4,
    col: 3,
    obstacle: { collectedBy: null, value: "yellow", color: "FFFF00", id: "69" },
    player: null,
  },
  70: {
    surface: 1,
    row: 4,
    col: 4,
    obstacle: { collectedBy: null, value: "yellow", color: "FFFF00", id: "69" },
    player: null,
  },
  71: { surface: 2, row: 4, col: 0, obstacle: null, player: null },
  72: { surface: 2, row: 4, col: 1, obstacle: null, player: null },
  73: { surface: 2, row: 4, col: 2, obstacle: null, player: null },
  74: { surface: 2, row: 4, col: 3, obstacle: null, player: null },
  75: { surface: 2, row: 4, col: 4, obstacle: null, player: null },
  76: {
    surface: 3,
    row: 0,
    col: 0,
    obstacle: { collectedBy: null, value: "green", color: "008000", id: "76" },
    player: null,
  },
  77: {
    surface: 3,
    row: 0,
    col: 1,
    obstacle: { collectedBy: null, value: "green", color: "008000", id: "76" },
    player: null,
  },
  78: { surface: 3, row: 0, col: 2, obstacle: null, player: null },
  79: { surface: 3, row: 0, col: 3, obstacle: null, player: null },
  80: { surface: 3, row: 0, col: 4, obstacle: null, player: null },
  81: { surface: 4, row: 0, col: 0, obstacle: null, player: null },
  82: { surface: 4, row: 0, col: 1, obstacle: null, player: null },
  83: { surface: 4, row: 0, col: 2, obstacle: null, player: null },
  84: { surface: 4, row: 0, col: 3, obstacle: null, player: null },
  85: { surface: 4, row: 0, col: 4, obstacle: null, player: null },
  86: { surface: 5, row: 0, col: 0, obstacle: null, player: null },
  87: { surface: 5, row: 0, col: 1, obstacle: null, player: null },
  88: { surface: 5, row: 0, col: 2, obstacle: null, player: null },
  89: { surface: 5, row: 0, col: 3, obstacle: null, player: null },
  90: { surface: 5, row: 0, col: 4, obstacle: null, player: null },
  91: {
    surface: 3,
    row: 1,
    col: 0,
    obstacle: { collectedBy: null, value: "green", color: "008000", id: "76" },
    player: null,
  },
  92: {
    surface: 3,
    row: 1,
    col: 1,
    obstacle: { collectedBy: null, value: "green", color: "008000", id: "76" },
    player: null,
  },
  93: { surface: 3, row: 1, col: 2, obstacle: null, player: null },
  94: { surface: 3, row: 1, col: 3, obstacle: null, player: null },
  95: {
    surface: 3,
    row: 1,
    col: 4,
    obstacle: { collectedBy: null, value: "red", color: "FF0000", id: "110" },
    player: null,
  },
  96: {
    surface: 4,
    row: 1,
    col: 0,
    obstacle: { collectedBy: null, value: "red", color: "FF0000", id: "110" },
    player: null,
  },
  97: { surface: 4, row: 1, col: 1, obstacle: null, player: null },
  98: { surface: 4, row: 1, col: 2, obstacle: null, player: null },
  99: { surface: 4, row: 1, col: 3, obstacle: null, player: null },
  100: { surface: 4, row: 1, col: 4, obstacle: null, player: null },
  101: {
    surface: 5,
    row: 1,
    col: 0,
    obstacle: {
      collectedBy: null,
      value: "orange",
      color: "FFA500",
      id: "117",
    },
    player: null,
  },
  102: {
    surface: 5,
    row: 1,
    col: 1,
    obstacle: {
      collectedBy: null,
      value: "orange",
      color: "FFA500",
      id: "117",
    },
    player: null,
  },
  103: { surface: 5, row: 1, col: 2, obstacle: null, player: null },
  104: { surface: 5, row: 1, col: 3, obstacle: null, player: null },
  105: { surface: 5, row: 1, col: 4, obstacle: null, player: null },
  106: { surface: 3, row: 2, col: 0, obstacle: null, player: null },
  107: { surface: 3, row: 2, col: 1, obstacle: null, player: null },
  108: { surface: 3, row: 2, col: 2, obstacle: null, player: null },
  109: { surface: 3, row: 2, col: 3, obstacle: null, player: null },
  110: {
    surface: 3,
    row: 2,
    col: 4,
    obstacle: { collectedBy: null, value: "red", color: "FF0000", id: "110" },
    player: null,
  },
  111: {
    surface: 4,
    row: 2,
    col: 0,
    obstacle: { collectedBy: null, value: "red", color: "FF0000", id: "110" },
    player: null,
  },
  112: { surface: 4, row: 2, col: 1, obstacle: null, player: null },
  113: {
    surface: 4,
    row: 2,
    col: 2,
    obstacle: { collectedBy: null, value: "blue", color: "0000FF", id: "128" },
    player: null,
  },
  114: {
    surface: 4,
    row: 2,
    col: 3,
    obstacle: { collectedBy: null, value: "blue", color: "0000FF", id: "128" },
    player: null,
  },
  115: { surface: 4, row: 2, col: 4, obstacle: null, player: null },
  116: {
    surface: 5,
    row: 2,
    col: 0,
    obstacle: {
      collectedBy: null,
      value: "orange",
      color: "FFA500",
      id: "117",
    },
    player: null,
  },
  117: {
    surface: 5,
    row: 2,
    col: 1,
    obstacle: {
      collectedBy: null,
      value: "orange",
      color: "FFA500",
      id: "117",
    },
    player: null,
  },
  118: { surface: 5, row: 2, col: 2, obstacle: null },
  119: { surface: 5, row: 2, col: 3, obstacle: null, player: null },
  120: { surface: 5, row: 2, col: 4, obstacle: null, player: null },
  121: { surface: 3, row: 3, col: 0, obstacle: null, player: null },
  122: { surface: 3, row: 3, col: 1, obstacle: null, player: null },
  123: { surface: 3, row: 3, col: 2, obstacle: null, player: null },
  124: { surface: 3, row: 3, col: 3, obstacle: null, player: null },
  125: { surface: 3, row: 3, col: 4, obstacle: null, player: null },
  126: { surface: 4, row: 3, col: 0, obstacle: null, player: null },
  127: { surface: 4, row: 3, col: 1, obstacle: null, player: null },
  128: {
    surface: 4,
    row: 3,
    col: 2,
    obstacle: { collectedBy: null, value: "blue", color: "0000FF", id: "128" },
    player: null,
  },
  129: {
    surface: 4,
    row: 3,
    col: 3,
    obstacle: { collectedBy: null, value: "blue", color: "0000FF", id: "128" },
    player: null,
  },
  130: { surface: 4, row: 3, col: 4, obstacle: null, player: null },
  131: { surface: 5, row: 3, col: 0, obstacle: null, player: null },
  132: { surface: 5, row: 3, col: 1, obstacle: null, player: null },
  133: { surface: 5, row: 3, col: 2, obstacle: null, player: null },
  134: { surface: 5, row: 3, col: 3, obstacle: null, player: null },
  135: { surface: 5, row: 3, col: 4, obstacle: null, player: null },
  136: { surface: 3, row: 4, col: 0, obstacle: null, player: null },
  137: { surface: 3, row: 4, col: 1, obstacle: null, player: null },
  138: { surface: 3, row: 4, col: 2, obstacle: null, player: null },
  139: { surface: 3, row: 4, col: 3, obstacle: null, player: null },
  140: { surface: 3, row: 4, col: 4, obstacle: null, player: null },
  141: {
    surface: 4,
    row: 4,
    col: 0,
    obstacle: { collectedBy: "1", value: "purple", color: "800080", id: "157" },
    player: null,
  },
  142: {
    surface: 4,
    row: 4,
    col: 1,
    obstacle: { collectedBy: "1", value: "purple", color: "800080", id: "157" },
    player: null,
  },
  143: { surface: 4, row: 4, col: 2, obstacle: null, player: null },
  144: { surface: 4, row: 4, col: 3, obstacle: null, player: null },
  145: { surface: 4, row: 4, col: 4, obstacle: null, player: null },
  146: {
    surface: 5,
    row: 4,
    col: 0,
    obstacle: {
      collectedBy: null,
      value: "yellow",
      color: "FFFF00",
      id: "146",
    },
    player: null,
  },
  147: {
    surface: 5,
    row: 4,
    col: 1,
    obstacle: {
      collectedBy: null,
      value: "yellow",
      color: "FFFF00",
      id: "146",
    },
    player: null,
  },
  148: { surface: 5, row: 4, col: 2, obstacle: null, player: null },
  149: {
    surface: 5,
    row: 4,
    col: 3,
    obstacle: { collectedBy: null, value: "red", color: "FF0000", id: "205" },
    player: null,
  },
  150: {
    surface: 5,
    row: 4,
    col: 4,
    obstacle: { collectedBy: null, value: "red", color: "FF0000", id: "205" },
    player: null,
  },
  151: { surface: 6, row: 0, col: 0, obstacle: null, player: null },
  152: { surface: 6, row: 0, col: 1, obstacle: null, player: null },
  153: { surface: 6, row: 0, col: 2, obstacle: null, player: null },
  154: { surface: 6, row: 0, col: 3, obstacle: null, player: null },
  155: { surface: 6, row: 0, col: 4, obstacle: null, player: null },
  156: {
    surface: 7,
    row: 0,
    col: 0,
    obstacle: { collectedBy: "1", value: "purple", color: "800080", id: "157" },
    player: null,
  },
  157: {
    surface: 7,
    row: 0,
    col: 1,
    obstacle: { collectedBy: "1", value: "purple", color: "800080", id: "157" },
    player: null,
  },
  158: { surface: 7, row: 0, col: 2, obstacle: null },
  159: { surface: 7, row: 0, col: 3, obstacle: null, player: null },
  160: {
    surface: 7,
    row: 0,
    col: 4,
    obstacle: {
      collectedBy: null,
      value: "yellow",
      color: "FFFF00",
      id: "146",
    },
    player: null,
  },
  161: { surface: 8, row: 0, col: 0, obstacle: null, player: null },
  162: { surface: 8, row: 0, col: 1, obstacle: null, player: null },
  163: { surface: 8, row: 0, col: 2, obstacle: null, player: null },
  164: { surface: 8, row: 0, col: 3, obstacle: null, player: null },
  165: { surface: 8, row: 0, col: 4, obstacle: null, player: null },
  166: { surface: 6, row: 1, col: 0, obstacle: null, player: null },
  167: { surface: 6, row: 1, col: 1, obstacle: null, player: null },
  168: { surface: 6, row: 1, col: 2, obstacle: null, player: null },
  169: { surface: 6, row: 1, col: 3, obstacle: null, player: null },
  170: { surface: 6, row: 1, col: 4, obstacle: null, player: null },
  171: {
    surface: 7,
    row: 1,
    col: 0,
    obstacle: null,
    player: {
      current: 171,
      lastPassedByObstacles: {},
      id: "1",
      win: false,
      start: 118,
      goal: 108,
      absoluteDirection: "left",
      startDir: "left",
    },
  },
  172: { surface: 7, row: 1, col: 1, obstacle: null },
  173: { surface: 7, row: 1, col: 2, obstacle: null },
  174: { surface: 7, row: 1, col: 3, obstacle: null, player: null },
  175: {
    surface: 7,
    row: 1,
    col: 4,
    obstacle: {
      collectedBy: null,
      value: "yellow",
      color: "FFFF00",
      id: "146",
    },
    player: null,
  },
  176: { surface: 8, row: 1, col: 0, obstacle: null, player: null },
  177: { surface: 8, row: 1, col: 1, obstacle: null, player: null },
  178: { surface: 8, row: 1, col: 2, obstacle: null, player: null },
  179: { surface: 8, row: 1, col: 3, obstacle: null, player: null },
  180: { surface: 8, row: 1, col: 4, obstacle: null, player: null },
  181: { surface: 6, row: 2, col: 0, obstacle: null, player: null },
  182: { surface: 6, row: 2, col: 1, obstacle: null, player: null },
  183: { surface: 6, row: 2, col: 2, obstacle: null, player: null },
  184: { surface: 6, row: 2, col: 3, obstacle: null, player: null },
  185: { surface: 6, row: 2, col: 4, obstacle: null, player: null },
  186: {
    surface: 7,
    row: 2,
    col: 0,
    obstacle: { collectedBy: "1", value: "green", color: "008000", id: "202" },
    player: null,
  },
  187: {
    surface: 7,
    row: 2,
    col: 1,
    obstacle: { collectedBy: "1", value: "green", color: "008000", id: "202" },
    player: null,
  },
  188: {
    surface: 7,
    row: 2,
    col: 2,
    obstacle: null,
    player: {
      current: 188,
      lastPassedByObstacles: { 202: { tileNum: 187 } },
      id: "0",
      win: false,
      start: 188,
      goal: 38,
      absoluteDirection: "up",
      startDir: "up",
    },
  },
  189: { surface: 7, row: 2, col: 3, obstacle: null, player: null },
  190: { surface: 7, row: 2, col: 4, obstacle: null, player: null },
  191: { surface: 8, row: 2, col: 0, obstacle: null, player: null },
  192: { surface: 8, row: 2, col: 1, obstacle: null, player: null },
  193: { surface: 8, row: 2, col: 2, obstacle: null, player: null },
  194: { surface: 8, row: 2, col: 3, obstacle: null, player: null },
  195: { surface: 8, row: 2, col: 4, obstacle: null, player: null },
  196: { surface: 6, row: 3, col: 0, obstacle: null, player: null },
  197: { surface: 6, row: 3, col: 1, obstacle: null, player: null },
  198: { surface: 6, row: 3, col: 2, obstacle: null, player: null },
  199: { surface: 6, row: 3, col: 3, obstacle: null, player: null },
  200: { surface: 6, row: 3, col: 4, obstacle: null, player: null },
  201: {
    surface: 7,
    row: 3,
    col: 0,
    obstacle: { collectedBy: "1", value: "green", color: "008000", id: "202" },
    player: null,
  },
  202: {
    surface: 7,
    row: 3,
    col: 1,
    obstacle: { collectedBy: "1", value: "green", color: "008000", id: "202" },
    player: null,
  },
  203: { surface: 7, row: 3, col: 2, obstacle: null },
  204: { surface: 7, row: 3, col: 3, obstacle: null, player: null },
  205: {
    surface: 7,
    row: 3,
    col: 4,
    obstacle: { collectedBy: null, value: "red", color: "FF0000", id: "205" },
    player: null,
  },
  206: { surface: 8, row: 3, col: 0, obstacle: null, player: null },
  207: { surface: 8, row: 3, col: 1, obstacle: null, player: null },
  208: { surface: 8, row: 3, col: 2, obstacle: null, player: null },
  209: { surface: 8, row: 3, col: 3, obstacle: null, player: null },
  210: { surface: 8, row: 3, col: 4, obstacle: null, player: null },
  211: { surface: 6, row: 4, col: 0, obstacle: null, player: null },
  212: { surface: 6, row: 4, col: 1, obstacle: null, player: null },
  213: { surface: 6, row: 4, col: 2, obstacle: null, player: null },
  214: { surface: 6, row: 4, col: 3, obstacle: null, player: null },
  215: { surface: 6, row: 4, col: 4, obstacle: null, player: null },
  216: { surface: 7, row: 4, col: 0, obstacle: null, player: null },
  217: { surface: 7, row: 4, col: 1, obstacle: null, player: null },
  218: { surface: 7, row: 4, col: 2, obstacle: null, player: null },
  219: { surface: 7, row: 4, col: 3, obstacle: null, player: null },
  220: {
    surface: 7,
    row: 4,
    col: 4,
    obstacle: { collectedBy: null, value: "red", color: "FF0000", id: "205" },
    player: null,
  },
  221: { surface: 8, row: 4, col: 0, obstacle: null, player: null },
  222: { surface: 8, row: 4, col: 1, obstacle: null, player: null },
  223: { surface: 8, row: 4, col: 2, obstacle: null, player: null },
  224: { surface: 8, row: 4, col: 3, obstacle: null, player: null },
  225: { surface: 8, row: 4, col: 4, obstacle: null, player: null },
};
