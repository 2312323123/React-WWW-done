import { useEffect, useState } from 'react'
import LoginRequired from '../components/LoginRequired'

import { useWindowData } from './PagesProvider'
import { buildings, floors } from '../components/BuildingData'

export default function ReservationsPage() {
  const { login, password, loginConfirmed } = useWindowData()

  const [counter, setCounter] = useState(0)
  const [userReservations, setUserReservations] = useState()

  const backwardEngineerRoomNameAndBuildingNameAndFloorFromRoomId = (
    roomid
  ) => {
    for (let key in floors) {
      if (floors[key].findIndex((room) => room.id === roomid) >= 0) {
        let roomName = floors[key].find((room) => room.id === roomid).name
        let buildingIndex = Number(key.slice(8, 9))
        let building = buildings.find(
          (building) => building.id === buildingIndex
        )
        return {
          buildingName: building.name,
          floor: Number(key.slice(-1)),
          roomName,
        }
      }
    }
  }

  const makeCoolDate = (unixTime) => {
    return `${('0' + new Date(unixTime).getDate()).slice(-2)}/${(
      '0' +
      (new Date(unixTime).getMonth() + 1)
    ).slice(-2)}/${new Date(unixTime).getFullYear()}, ${(
      '0' + new Date(unixTime).getHours()
    ).slice(-2)}:${('0' + new Date(unixTime).getMinutes()).slice(-2)}`
  }

  useEffect(() => {
    // Using Fetch API
    fetch(`/user_reservations`, {
      // user, password, roomid, start (Unix milliseconds), end (Unix milliseconds)
      method: 'POST',
      body: `{"user": "${login}", "password": "${password}"}`,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((data) => {
        setUserReservations(data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [counter])

  const cancelReservation = (rowId) => {
    // Using Fetch API
    fetch(`/remove_reservation`, {
      // user, password, roomid, start (Unix milliseconds), end (Unix milliseconds)
      method: 'POST',
      body: `{"user": "${login}", "password": "${password}", "rowid": "${rowId}"}`,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      mode: 'cors',
    })
      .then((response) => response.status)
      .then((status) => {
        if (status === 200) {
          setCounter(counter + 1)
          alert('rezerwacja usunięta pomyślnie')
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <LoginRequired>
      {loginConfirmed && (
        <>
          <h1
            style={{
              fontSize: '2rem',
              textAlign: 'center',
              marginBlock: '1rem',
            }}
          >
            Twoje rezerwacje:
          </h1>
          {userReservations ? (
            // userReservations.map((entry, index) => entry.roomid)
            userReservations.map((entry, index) => {
              const stuff =
                backwardEngineerRoomNameAndBuildingNameAndFloorFromRoomId(
                  entry.roomid
                )
              return (
                <p
                  style={{
                    background: '#888',
                    padding: '0.25rem',
                    marginBlock: '0.5rem',
                    minHeight: '2rem',
                    borderRadius: '0.25rem',
                  }}
                  key={index}
                >
                  budynek: {stuff.buildingName}, piętro: {stuff.floor}, pokój: "
                  {stuff.roomName}", od: {makeCoolDate(entry.start)}, do:{' '}
                  {makeCoolDate(entry.end)}
                  <button
                    style={{ float: 'right', fontSize: '1rem' }}
                    onClick={() => cancelReservation(entry.rowid)}
                  >
                    anuluj rezerwację
                  </button>
                </p>
              )
            })
          ) : (
            <p>Brak rezerwacji</p>
          )}
        </>
      )}
    </LoginRequired>
  )
}
