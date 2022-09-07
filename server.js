const express = require('express')
const app = express()

/* db definitions */

const sqlite3 = require('sqlite3').verbose()
const crypto = require('crypto')
const db = new sqlite3.Database('room_reservations_database')
function hash(arg) {
  return crypto.createHash('md5').update(arg).digest('hex')
}

/* /db definitions */

/* routes */

app.use(express.json())

app.get('/hey', (req, res) => res.send('ho!'))

// user, password
app.post('/login', (req, res) => {
  // res.json({ requestBody: req.body })
  // console.log(req.body)

  // res.json({ message: 'helllo expresss kurwa' })

  if (
    typeof req.body.user !== 'undefined' &&
    req.body.user !== null &&
    typeof req.body.password !== 'undefined' &&
    req.body.password !== null
  ) {
    var ok = false
    var passwordHash = hash(req.body.password)

    db.each(
      'SELECT user, password FROM users',
      (err, row) => {
        if (typeof row !== 'undefined') {
          if (row.user === req.body.user && row.password === passwordHash) {
            ok = true
          }
        }
      },
      () => {
        if (ok) {
          res.status(200)
          res.send(JSON.stringify({ message: 'Successful login' }))
        } else {
          res.status(400)
          res.send(JSON.stringify({ error: 'Wrong login' }))
        }
      }
    )
  } else {
    res.status(401)
    res.send(JSON.stringify({ error: 'Unauthorized' }))
  }
})

// user, password
app.post('/new_user', (req, res) => {
  if (
    typeof req.body.user !== 'undefined' &&
    req.body.user !== null &&
    typeof req.body.password !== 'undefined' &&
    req.body.password !== null
  ) {
    var ok = true
    var passwordHash = hash(req.body.password)

    db.each(
      'SELECT user, password FROM users',
      (err, row) => {
        if (typeof row !== 'undefined') {
          if (row.user === req.body.user) {
            ok = false
          }
        }
      },
      () => {
        if (ok) {
          db.run('CREATE TABLE users (user TEXT, password TEXT)', () => {
            const stmt = db.prepare('INSERT INTO users VALUES (?, ?)')

            stmt.run([req.body.user, passwordHash], () => {
              res.status(201)
              res.send(JSON.stringify({ message: 'User created successfully' }))
            })
            stmt.finalize()
          })
        } else {
          res.status(401)
          res.send(JSON.stringify({ error: 'Username already exists' }))
        }
      }
    )
  } else {
    res.status(400)
    res.send(
      JSON.stringify({ error: 'Username already exists, or wrong request' })
    )
  }
})

// start, end, floorid, buildingid no i user
app.post('/floor_room_time_reservations', (req, res) => {
  authorize(req, res, tryGetFloorRoomTimeReservations)
})

// user, password, roomid
app.post('/room_reservations', (req, res) => {
  authorize(req, res, tryGetRoomReservations)
})

// user, password
app.post('/user_reservations', (req, res) => {
  authorize(req, res, tryGetUserReservations)
})

// user, password, roomid, start (Unix milliseconds), end (Unix milliseconds)
app.post('/add_reservation', (req, res) => {
  authorize(req, res, tryAddReservation)
})

// user, password, rowid
app.post('/remove_reservation', (req, res) => {
  authorize(req, res, tryRemoveReservation)
})

/* /routes */

function authorize(req, res, callback) {
  if (
    typeof req.body.user !== 'undefined' &&
    req.body.user !== null &&
    typeof req.body.password !== 'undefined' &&
    req.body.password !== null
  ) {
    var ok = false
    var passwordHash = hash(req.body.password)

    db.each(
      'SELECT user, password FROM users',
      (err, row) => {
        if (typeof row !== 'undefined') {
          // console.log(row.user + ': ' + row.password)
          if (row.user === req.body.user && row.password === passwordHash) {
            ok = true
          }
        }
      },
      () => {
        if (ok) {
          callback(req, res)
        } else {
          res.status(401)
          res.send(JSON.stringify({ error: 'Unauthorized' }))
        }
      }
    )
  } else {
    res.status(401)
    res.send(JSON.stringify({ error: 'Unauthorized' }))
  }
}

function tryAddReservation(req, res) {
  if (
    typeof req.body.roomid !== 'undefined' &&
    req.body.roomid !== null &&
    typeof req.body.start !== 'undefined' &&
    req.body.start !== null &&
    typeof req.body.end !== 'undefined' &&
    req.body.end !== null
  ) {
    req.body.roomid = Number(req.body.roomid)
    req.body.start = Number(req.body.start)
    req.body.end = Number(req.body.end)

    if (
      Number.isInteger(req.body.roomid) &&
      Number.isInteger(req.body.start) &&
      Number.isInteger(req.body.end) &&
      req.body.start < req.body.end
    ) {
      var ok = false
      var ok2 = true

      db.each(
        'SELECT * FROM rooms',
        (err, row) => {
          if (typeof row !== 'undefined') {
            if (row.roomid === req.body.roomid) {
              ok = true
            }
          }
        },
        () => {
          if (ok) {
            db.each(
              `SELECT * FROM reservations WHERE roomid='${req.body.roomid}'`,
              (err, row) => {
                if (typeof row !== 'undefined') {
                  if (
                    !(req.body.end <= row.start || req.body.start >= row.end)
                  ) {
                    ok2 = false
                  }
                }
              },
              () => {
                if (ok2) {
                  const stmt = db.prepare(
                    'INSERT INTO reservations VALUES (?, ?, ?, ?)'
                  )

                  stmt.run(
                    [
                      req.body.user,
                      req.body.start,
                      req.body.end,
                      req.body.roomid,
                    ],
                    () => {
                      res.status(201)
                      res.send(
                        JSON.stringify({
                          message: 'Reservation added successfully',
                        })
                      )
                    }
                  )
                  stmt.finalize()
                } else {
                  res.status(401)
                  res.send(
                    JSON.stringify({
                      error: 'Room reservation collision detected!',
                    })
                  )
                }
              }
            )
          } else {
            res.status(401)
            res.send(JSON.stringify({ error: "Room doesn't exist" }))
          }
        }
      )
    } else {
      res.status(400)
      res.send(
        JSON.stringify({ error: 'Wrong trying to add reservation data' })
      )
    }
  } else {
    res.status(400)
    res.send(JSON.stringify({ error: 'Wrong data' }))
  }
}

function tryGetUserReservations(req, res) {
  // zwraca (incrementing): [{start, end, roomid, rowid}, ...]

  var results = []

  db.each(
    `SELECT *, rowid FROM reservations WHERE user='${req.body.user}' ORDER BY 'start' ASC`,
    (err, row) => {
      if (typeof row !== 'undefined') {
        results.push({
          start: row.start,
          end: row.end,
          roomid: row.roomid,
          rowid: row.rowid,
        })
      }
    },
    () => {
      res.status(200)
      res.send(JSON.stringify(results))
    }
  )
}

function tryGetRoomReservations(req, res) {
  // zwraca (incrementing): [{start, end}, ...]

  var results = []

  db.each(
    `SELECT start, end FROM reservations WHERE roomid='${req.body.roomid}' ORDER BY 'start' ASC`,
    (err, row) => {
      if (typeof row !== 'undefined') {
        results.push({
          start: row.start,
          end: row.end,
        })
      }
    },
    () => {
      res.status(200)
      res.send(JSON.stringify(results))
    }
  )
}

function tryRemoveReservation(req, res) {
  // user, password, rowid

  req.body.rowid = Number(req.body.rowid)

  if (Number.isInteger(req.body.rowid)) {
    var ok = false

    db.each(
      `SELECT * FROM reservations WHERE rowid = ${req.body.rowid}`,
      (err, row) => {
        if (typeof row !== 'undefined') {
          if (row.user === req.body.user) {
            ok = true
          }
        }
      },
      () => {
        if (ok) {
          db.run(
            `DELETE FROM reservations WHERE rowid=${req.body.rowid}`,
            () => {
              res.status(200)
              res.send(
                JSON.stringify({
                  message: 'Reservation deleted successfully',
                })
              )
            }
          )
        } else {
          res.status(400)
          res.send(
            JSON.stringify({ error: 'Wrong action while removing reservation' })
          )
        }
      }
    )
  } else {
    res.status(400)
    res.send(JSON.stringify({ error: 'Wrong id while removing reservation' }))
  }
}

function tryGetFloorRoomTimeReservations(req, res) {
  // start, end, floorid, buildingid no i user

  if (
    typeof req.body.buildingid !== 'undefined' &&
    req.body.buildingid !== null &&
    typeof req.body.floorid !== 'undefined' &&
    req.body.floorid !== null &&
    typeof req.body.start !== 'undefined' &&
    req.body.start !== null &&
    typeof req.body.end !== 'undefined' &&
    req.body.end !== null
  ) {
    req.body.buildingid = Number(req.body.buildingid)
    req.body.floorid = Number(req.body.floorid)
    req.body.start = Number(req.body.start)
    req.body.end = Number(req.body.end)

    if (
      Number.isInteger(req.body.buildingid) &&
      Number.isInteger(req.body.floorid) &&
      Number.isInteger(req.body.start) &&
      Number.isInteger(req.body.end) &&
      req.body.start < req.body.end
    ) {
      var ok = false

      var freeRoomIds = new Set()
      var roomIds = new Set()

      db.each(
        `SELECT roomid FROM rooms WHERE floorid='${req.body.floorid}' AND buildingid='${req.body.buildingid}'`,
        (err, row) => {
          if (typeof row !== 'undefined') {
            freeRoomIds.add(row.roomid)
            roomIds.add(row.roomid)
            ok = true
          }
        },
        () => {
          if (ok) {
            db.each(
              // nie wiem czy to AS potrzebne, ale jakos nie wadzi bardzo
              `SELECT reservations.start AS start, reservations.end AS end, reservations.roomid AS roomid FROM reservations INNER JOIN rooms ON reservations.roomid=rooms.roomid WHERE rooms.floorid='${req.body.floorid}' AND rooms.buildingid='${req.body.buildingid}'`,
              (err, row) => {
                if (typeof row !== 'undefined') {
                  if (
                    !(req.body.end <= row.start || req.body.start >= row.end)
                  ) {
                    freeRoomIds.delete(row.roomid)
                    // ok2 = false
                  }
                }
              },
              () => {
                res.status(200)
                res.send(
                  JSON.stringify(
                    Array.from(roomIds).map((roomId) => ({
                      roomid: roomId,
                      available: freeRoomIds.has(roomId),
                    }))
                  )
                )
              }
            )
          } else {
            res.status(400)
            res.send(JSON.stringify({ error: 'No rooms with specified floor' }))
          }
        }
      )
    } else {
      res.status(400)
      res.send(JSON.stringify({ error: 'Wrong data' }))
    }
  } else {
    res.status(400)
    res.send(JSON.stringify({ error: 'Very wrong data' }))
  }
}

function initializeDB() {
  // create users if not exists
  db.get(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='users'`,
    (err, row) => {
      if (typeof row === 'undefined') {
        db.run('CREATE TABLE users (user TEXT, password TEXT)', () => {
          const stmt = db.prepare('INSERT INTO users VALUES (?, ?)')

          stmt.run('Maciek', hash('mojesupertajnehaslo'))
          stmt.finalize()
        })
      }
    }
  )

  // create reservations if not exists
  db.get(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='reservations'`,
    (err, row) => {
      if (typeof row === 'undefined') {
        db.run(
          'CREATE TABLE reservations (user TEXT, start INT, end INT, roomid INT)'
        )
      }
    }
  )

  // create rooms if not exists
  db.get(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='rooms'`,
    (err, row) => {
      if (typeof row === 'undefined') {
        db.run(
          'CREATE TABLE rooms (roomid INT, floorid INT, buildingid INT)',
          () => {
            const stmt = db.prepare('INSERT INTO rooms VALUES (?, ?, ?)')

            const roomData = [
              { roomid: 1, buildingid: 1, floorid: 1 },
              { roomid: 2, buildingid: 1, floorid: 1 },
              { roomid: 3, buildingid: 1, floorid: 2 },
              { roomid: 4, buildingid: 2, floorid: 1 },

              { roomid: 5, buildingid: 3, floorid: 1 },
              { roomid: 6, buildingid: 3, floorid: 1 },
              { roomid: 7, buildingid: 3, floorid: 1 },
              { roomid: 8, buildingid: 3, floorid: 1 },
              { roomid: 9, buildingid: 3, floorid: 1 },
              { roomid: 10, buildingid: 3, floorid: 1 },
              { roomid: 11, buildingid: 3, floorid: 1 },
              { roomid: 12, buildingid: 3, floorid: 1 },
              { roomid: 13, buildingid: 3, floorid: 1 },

              { roomid: 14, buildingid: 4, floorid: 1 },
              { roomid: 15, buildingid: 4, floorid: 1 },
              { roomid: 16, buildingid: 4, floorid: 1 },
              { roomid: 17, buildingid: 4, floorid: 1 },
              { roomid: 18, buildingid: 4, floorid: 1 },
              { roomid: 19, buildingid: 4, floorid: 1 },
              { roomid: 20, buildingid: 4, floorid: 1 },
              { roomid: 21, buildingid: 4, floorid: 1 },
              { roomid: 22, buildingid: 4, floorid: 1 },
              { roomid: 23, buildingid: 4, floorid: 1 },
              { roomid: 24, buildingid: 4, floorid: 1 },
              { roomid: 25, buildingid: 4, floorid: 1 },

              { roomid: 26, buildingid: 4, floorid: 2 },
              { roomid: 27, buildingid: 4, floorid: 2 },
              { roomid: 28, buildingid: 4, floorid: 2 },
              { roomid: 29, buildingid: 4, floorid: 2 },
              { roomid: 30, buildingid: 4, floorid: 2 },
              { roomid: 31, buildingid: 4, floorid: 2 },
              { roomid: 32, buildingid: 4, floorid: 2 },
              { roomid: 33, buildingid: 4, floorid: 2 },
              { roomid: 34, buildingid: 4, floorid: 2 },
              { roomid: 35, buildingid: 4, floorid: 2 },
              { roomid: 36, buildingid: 4, floorid: 2 },
              { roomid: 37, buildingid: 4, floorid: 2 },
              { roomid: 38, buildingid: 4, floorid: 2 },
              { roomid: 39, buildingid: 4, floorid: 2 },

              { roomid: 40, buildingid: 4, floorid: 3 },
              { roomid: 41, buildingid: 4, floorid: 3 },
              { roomid: 42, buildingid: 4, floorid: 3 },
              { roomid: 43, buildingid: 4, floorid: 3 },
              { roomid: 44, buildingid: 4, floorid: 3 },
              { roomid: 45, buildingid: 4, floorid: 3 },
              { roomid: 46, buildingid: 4, floorid: 3 },
              { roomid: 47, buildingid: 4, floorid: 3 },
              { roomid: 48, buildingid: 4, floorid: 3 },
              { roomid: 49, buildingid: 4, floorid: 3 },
              { roomid: 50, buildingid: 4, floorid: 3 },
            ]

            for (let room of roomData) {
              stmt.run(room.roomid, room.floorid, room.buildingid)
            }
            stmt.finalize()
          }
        )
      }
    }
  )
}

/* */

initializeDB()

app.listen(8080)
