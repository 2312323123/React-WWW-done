import { floors } from '../BuildingData'
import TimeSelector from '../TimeSelector'

import { useWindowData } from '../../pages/PagesProvider'
import { useEffect, useState } from 'react'

export default function RoomReservations(props) {
  const buttonStyle = {
    fontSize: '1.25rem',
    marginLeft: '2rem',
  }

  const {
    login,
    password,
    maxTime,
    minTime,
    building,
    floor,
    roomId,
    funnyCounter,
    setFunnyCounter,
    isTimeChosen,
  } = useWindowData()
  const floorData = floors[`building${building}floor${floor}`]

  const [room, setRoom] = useState(null)

  const [existingReservations, setExistingReservations] = useState('')

  useEffect(() => {
    if (roomId) {
      setRoom(floorData.find((room) => room.id === roomId))

      // Using Fetch API
      fetch(`/room_reservations`, {
        // user, password, roomid, start (Unix milliseconds), end (Unix milliseconds)
        method: 'POST',
        body: `{"user": "${login}", "password": "${password}", "roomid": ${roomId}}`,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        mode: 'cors',
      })
        .then((response) => response.json())
        .then((data) => {
          setExistingReservations(
            <ul style={{ listStyleType: 'circle', marginLeft: '1.5rem' }}>
              {data.map((startEnd) => (
                <li>
                  {`${('0' + new Date(startEnd.start).getDate()).slice(-2)}/${(
                    '0' +
                    (new Date(startEnd.start).getMonth() + 1)
                  ).slice(-2)}/${new Date(startEnd.start).getFullYear()}, ${(
                    '0' + new Date(startEnd.start).getHours()
                  ).slice(-2)}:${(
                    '0' + new Date(startEnd.start).getMinutes()
                  ).slice(-2)}`}{' '}
                  -
                  {`${('0' + new Date(startEnd.end).getDate()).slice(-2)}/${(
                    '0' +
                    (new Date(startEnd.end).getMonth() + 1)
                  ).slice(-2)}/${new Date(startEnd.end).getFullYear()}, ${(
                    '0' + new Date(startEnd.end).getHours()
                  ).slice(-2)}:${(
                    '0' + new Date(startEnd.end).getMinutes()
                  ).slice(-2)}`}
                </li>
              ))}
            </ul>
          )
          // Handle data
        })
        .catch((err) => {
          console.log(err.message)
        })
    } else {
      // alert('najpierw wybierz czas!')
    }
  }, [roomId])

  const reservationClick = () => {
    if (isTimeChosen) {
      // Using Fetch API
      fetch(`/add_reservation`, {
        // user, password, roomid, start (Unix milliseconds), end (Unix milliseconds)
        method: 'POST',
        body: `{"user": "${login}", "password": "${password}", "start": ${Date.parse(
          minTime
        )}, "end": ${Date.parse(maxTime)}, "roomid": ${roomId}}`,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        mode: 'cors',
      })
        .then((response) => {
          if (response.status === 201) {
            setFunnyCounter((funnyCounter % 100) + 101)
            alert('rezerwacja dodana')
          } else {
            alert('sala w tym czasie zajęta!') // 401
          }
          return response.json()
        })
        .catch((err) => {
          console.log(err.message)
        })
    } else {
      alert('najpierw wybierz czas!')
    }
  }

  return (
    room && (
      <section
        style={{
          marginBottom: '8rem',
          padding: '1rem',
          background: '#444',
        }}
      >
        <h2 style={{ marginBlock: '0.25rem' }}>Wybrany pokój: {room.name}</h2>
        <h2 style={{ marginBlock: '0.25rem' }}>Istniejące rezerwacje:</h2>
        <div>{existingReservations}</div>
        <TimeSelector />
        <button style={buttonStyle} onClick={reservationClick}>
          Rezerwuj
        </button>
      </section>
    )
  )
}
