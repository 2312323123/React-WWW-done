// roomid unique, buildingid unique per building, floorid unique per building (to ostatnie automatycznie tutaj)

class Node {
  constructor(name, buildingid, lat, long, floorNumber) {
    this.name = name
    this.id = buildingid
    this.lat = lat
    this.long = long
    this.floorNumber = floorNumber
  }
}

export const buildings = [
  new Node('budynek 1', 1, 50.05439045165468, 19.93637152232552, 2),
  new Node(
    'Katedra Wawelska / budynek 2',
    2,
    50.054686658718666,
    19.935633914868227,
    1
  ),
  new Node(
    'Jakaś szkoła czy coś / budynek 3',
    3,
    50.052838688882204,
    19.93651727279573,
    1
  ),
  new Node('trzypiętrowy budynek', 4, 50.0546807888141, 19.93322057400747, 3),
]

class Room {
  constructor(name, roomid, points) {
    this.name = name
    this.id = roomid
    this.points = points
    this.fetched = false
    this.available = false
  }
}

export const floors = {
  building1floor1: [
    new Room('b1f1r1', 1, [
      [157, 112],
      [164, 112],
      [166, 128],
      [216, 122],
      [214, 101],
      [192, 101],
      [193, 92],
      [182, 92],
      [182, 100],
      [164, 103],
      [156, 104],
    ]),
    new Room('b1f1r2', 2, [
      [169, 135],
      [158, 138],
      [159, 147],
      [169, 148],
      [169, 166],
      [158, 168],
      [160, 176],
      [169, 177],
      [171, 181],
      [220, 177],
      [220, 168],
      [224, 165],
      [224, 147],
      [218, 142],
      [217, 129],
    ]),
  ],
  building1floor2: [
    new Room('b1f2r1', 3, [
      [169, 135],
      [158, 138],
      [159, 147],
      [169, 148],
      [169, 166],
      [158, 168],
      [160, 176],
      [169, 177],
      [171, 181],
      [220, 177],
      [220, 168],
      [224, 165],
      [224, 147],
      [218, 142],
      [217, 129],
    ]),
  ],
  building2floor1: [
    new Room('b2f1r1', 4, [
      [226, 317.0500030517578],
      [226, 341.0500030517578],
      [235, 343.0500030517578],
      [235, 370.6666717529297],
      [223, 373.6666717529297],
      [270, 483.6666717529297],
      [334, 621.6666870117188],
      [341, 616.6666870117188],
      [346, 625.6666870117188],
      [538, 585.6666870117188],
      [522, 223],
      [420, 213],
      [420, 220],
      [398, 218.5],
      [397, 211.5],
      [248, 201],
      [249, 297.6666717529297],
    ]),
  ],
  building3floor1: [
    new Room('laboratorium', 5, [
      [159, 183],
      [233, 184],
      [234, 77],
      [159, 77],
    ]),
    new Room('sala 1', 6, [
      [280, 185],
      [353, 186],
      [351, 78],
      [278, 77],
    ]),
    new Room('sala muzyczna', 7, [
      [456, 185],
      [532, 185],
      [530, 77],
      [456, 77],
    ]),
    new Room('sala gimnastyczna', 8, [
      [679, 372],
      [787, 372],
      [786, 215],
      [677, 217],
    ]),
    new Room('sala 2', 9, [
      [537, 343],
      [576, 343],
      [575, 237],
      [534, 235],
    ]),
    new Room('sala 3', 10, [
      [458, 343],
      [529, 341],
      [527, 236],
      [457, 235],
    ]),
    new Room('sala 4', 11, [
      [279, 343],
      [352, 342],
      [352, 234],
      [277, 235],
    ]),
    new Room('sala 5', 12, [
      [199, 343],
      [272, 343],
      [270, 236],
      [198, 236],
    ]),
    new Room('sala aktywności', 13, [
      [119, 342],
      [192, 341],
      [190, 236],
      [120, 237],
    ]),
  ],
  building4floor1: [
    new Room('sala 1', 14, [
      [37, 118],
      [96, 118],
      [93, 41],
      [35, 42],
    ]),
    new Room('sala artystyczna', 15, [
      [128, 120],
      [191, 120],
      [189, 43],
      [128, 44],
    ]),
    new Room('sala szycia', 16, [
      [129, 198],
      [190, 197],
      [189, 125],
      [127, 125],
    ]),
    new Room('audytorium', 17, [
      [299, 277],
      [426, 276],
      [427, 62],
      [299, 62],
    ]),
    new Room('sala 4', 18, [
      [534, 263],
      [598, 263],
      [596, 181],
      [535, 181],
    ]),
    new Room('sala 5', 19, [
      [598, 136],
      [596, 43],
      [537, 44],
      [537, 137],
    ]),
    new Room('sala 6', 20, [
      [629, 137],
      [690, 135],
      [691, 42],
      [629, 44],
    ]),
    new Room('sala 8', 21, [
      [628, 409],
      [689, 408],
      [688, 311],
      [627, 310],
    ]),
    new Room('sala 9', 22, [
      [535, 408],
      [597, 406],
      [597, 310],
      [536, 312],
    ]),
    new Room('lobby', 23, [
      [312, 353],
      [426, 353],
      [426, 310],
      [393, 309],
      [377, 324],
      [348, 321],
      [332, 308],
      [311, 309],
    ]),
    new Room('sala 3', 24, [
      [129, 408],
      [190, 409],
      [190, 310],
      [126, 309],
    ]),
    new Room('sala zajęć technicznych', 25, [
      [36, 409],
      [99, 408],
      [96, 310],
      [36, 310],
    ]),
  ],
  building4floor2: [
    new Room('sala 8', 26, [
      [53, 42],
      [43, 43],
      [45, 103],
      [56, 103],
      [56, 113],
      [166, 112],
      [165, 30],
      [54, 32],
    ]),

    new Room('audytorium', 27, [
      [271, 281],
      [453, 280],
      [452, 32],
      [272, 31],
    ]),

    new Room('laboratorium biologiczne', 28, [
      [699, 60],
      [682, 44],
      [671, 44],
      [671, 33],
      [558, 33],
      [558, 114],
      [671, 115],
      [671, 105],
      [686, 104],
      [699, 91],
    ]),

    new Room('sala 10', 29, [
      [584, 227],
      [672, 227],
      [672, 162],
      [587, 163],
    ]),

    new Room('sala 11', 30, [
      [585, 289],
      [669, 288],
      [669, 231],
      [587, 231],
    ]),

    new Room('sala muzealna', 31, [
      [584, 449],
      [684, 449],
      [684, 294],
      [585, 294],
    ]),

    new Room('sala 12', 32, [
      [523, 422],
      [579, 421],
      [580, 345],
      [524, 345],
    ]),

    new Room('sala 13', 33, [
      [470, 421],
      [519, 422],
      [519, 346],
      [470, 344],
    ]),

    new Room('sala 14', 34, [
      [414, 346],
      [415, 422],
      [465, 421],
      [465, 345],
    ]),

    new Room('sala 15', 35, [
      [204, 421],
      [258, 421],
      [257, 345],
      [204, 345],
    ]),

    new Room('sala 16', 36, [
      [147, 421],
      [199, 421],
      [198, 346],
      [146, 345],
    ]),

    new Room('sala muzyczna', 37, [
      [39, 447],
      [137, 446],
      [138, 293],
      [41, 291],
    ]),

    new Room('sala 17', 38, [
      [53, 286],
      [135, 287],
      [135, 224],
      [55, 224],
    ]),
    new Room('sala 18', 39, [
      [137, 219],
      [137, 122],
      [55, 120],
      [54, 218],
    ]),
  ],
  building4floor3: [
    new Room('sala 19', 40, [
      [13, 84],
      [73, 84],
      [73, 7],
      [12, 6],
    ]),

    new Room('sala 20', 41, [
      [110, 86],
      [183, 87],
      [183, 20],
      [109, 20],
    ]),

    new Room('sala 21', 42, [
      [188, 85],
      [250, 85],
      [249, 22],
      [187, 22],
    ]),

    new Room('sala 22', 43, [
      [257, 85],
      [328, 86],
      [328, 23],
      [257, 21],
    ]),

    new Room('sala 26', 44, [
      [441, 84],
      [497, 83],
      [496, 6],
      [441, 7],
    ]),

    new Room('sala 25', 45, [
      [441, 202],
      [497, 202],
      [498, 126],
      [441, 126],
    ]),

    new Room('sala 24', 46, [
      [333, 187],
      [406, 188],
      [406, 124],
      [333, 123],
    ]),

    new Room('sala 23', 47, [
      [257, 188],
      [328, 187],
      [329, 124],
      [257, 123],
    ]),

    new Room('sala 30', 48, [
      [186, 187],
      [250, 188],
      [249, 123],
      [185, 123],
    ]),

    new Room('sala 31', 49, [
      [110, 187],
      [180, 188],
      [180, 124],
      [109, 123],
    ]),

    new Room('sala 27.5', 50, [
      [13, 203],
      [74, 204],
      [73, 125],
      [11, 124],
    ]),
  ],
}
