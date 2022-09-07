import { useWindowData } from '../../pages/PagesProvider'
import '../../styles/buildingimagething.css'

import { images } from './Images'
import { floors } from '../BuildingData'
import { useLayoutEffect, useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export default function BuildingImageThing(props) {
  const {
    login,
    password,
    building,
    floor,
    setRoomId,
    minTime,
    maxTime,
    isTimeChosen,
    funnyCounter,
  } = useWindowData()

  const imageRef = useRef(null)

  const [width, setWidth] = useState()
  const [height, setHeight] = useState()

  const [counter, setCounter] = useState(0)

  useEffect(() => {
    let l = floors[`building${building}floor${floor}`].length
    for (let i = 0; i < l; i++) {
      floors[`building${building}floor${floor}`][i].fetched = false
    }
  }, [floor, building])

  useEffect(() => {
    if (isTimeChosen) {
      // Using Fetch API
      fetch(`/floor_room_time_reservations`, {
        method: 'POST',
        body: `{"user": "${login}", "password": "${password}", "start": ${Date.parse(
          minTime
        )}, "end": ${Date.parse(
          maxTime
        )}, "floorid": ${floor}, "buildingid": ${building}}`,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        mode: 'cors',
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle data
          for (let obj of data) {
            let roomIndex = floors[
              `building${building}floor${floor}`
            ].findIndex((room) => room.id === obj.roomid)
            floors[`building${building}floor${floor}`][roomIndex].fetched = true
            floors[`building${building}floor${floor}`][roomIndex].available =
              obj.available
          }

          setCounter((counter + 1) % 100)
        })
        .catch((err) => {
          console.log(err.message)
        })
    } else {
      for (let room of floors[`building${building}floor${floor}`]) {
        room.fetched = false
      }

      setCounter((counter + 1) % 100)
    }
  }, [minTime, maxTime, floor, isTimeChosen, funnyCounter])

  return (
    <section style={{ position: 'relative' }}>
      <img
        style={{ display: 'block' }}
        onLoad={() => {
          setWidth(imageRef.current.width)
          setHeight(imageRef.current.height)
        }}
        src={images[`building${building}floor${floor}`]}
        alt="building image"
        ref={imageRef}
      />

      <svg
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          enableBackground: 'new 0 0 960 960',
        }}
        height={height}
        width={width}
        version="1.1"
        id="target"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox={`0 0 ${width} ${height}`}
      >
        <g>
          {floors[`building${building}floor${floor}`].map((room, index) => (
            <g
              key={index}
              style={{ position: 'relative' }}
              className="tooltip-container"
            >
              <polygon
                className={
                  room.fetched
                    ? room.available
                      ? 'known-free'
                      : 'known-reserved'
                    : 'unknown'
                }
                onClick={() => {
                  setRoomId(room.id)
                  window.scrollTo(0, document.body.scrollHeight)
                }}
                points={room.points.reduce(
                  (total, [x, y]) => total + x + ',' + y + ' ',
                  ''
                )}
              >
                <title
                  style={{
                    transform: `translate(${room.points[0][0]}px, ${room.points[0][1]}px)`,
                  }}
                  className="tooltip-tak"
                >
                  {room.name}
                </title>
              </polygon>
            </g>
          ))}
        </g>
      </svg>
    </section>
  )
}
