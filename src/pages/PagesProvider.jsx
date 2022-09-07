import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createContext, useContext } from 'react'
import { useState } from 'react'
import LoginPage from './LoginPage'
import MapPage from './MapPage'
import BuildingPage from './BuildingPage'
import ReservationsPage from './ReservationsPage'
import NavBar from '../components/NavBar'

const userContext = createContext(null)
export const useWindowData = () => useContext(userContext)

export default function PagesProvider() {
  const [floor, setFloor] = useState(0)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [building, setBuilding] = useState(null)

  const [loginConfirmed, setLoginConfirmed] = useState(false)

  const [minTime, setMinTime] = useState('')
  const [maxTime, setMaxTime] = useState('')
  const [isTimeChosen, setIsTimeChosen] = useState()

  const [roomId, setRoomId] = useState()

  // uzywany w RoomReservations, zeby odswiezyc BuildingImageThing
  const [funnyCounter, setFunnyCounter] = useState(100)

  const content = {
    maxWidth: '80rem',
    margin: '0 auto',
  }

  return (
    <userContext.Provider
      value={{
        floor,
        setFloor,
        login,
        setLogin,
        password,
        setPassword,
        building,
        setBuilding,
        loginConfirmed,
        setLoginConfirmed,
        minTime,
        setMinTime,
        maxTime,
        setMaxTime,
        isTimeChosen,
        setIsTimeChosen,
        roomId,
        setRoomId,
        funnyCounter,
        setFunnyCounter,
      }}
    >
      <BrowserRouter>
        <NavBar />
        <div style={content}>
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/map" element={<MapPage />}></Route>
            <Route path="/building" element={<BuildingPage />}></Route>
            <Route path="/reservations" element={<ReservationsPage />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </userContext.Provider>
  )
}
