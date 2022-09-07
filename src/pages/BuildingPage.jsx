import BuildingRequired from '../components/buildingPageComponents/BuildingRequired'
import LoginRequired from '../components/LoginRequired'
import TimeSelector from '../components/TimeSelector'

import FloorSelector from '../components/buildingPageComponents/FloorSelector'
import BuildingImageThing from '../components/buildingPageComponents/BuildingImageThing'
import RoomReservations from '../components/buildingPageComponents/RoomReservations'

export default function BuildingPage() {
  return (
    <LoginRequired>
      <BuildingRequired>
        <TimeSelector />
        <FloorSelector />
        <BuildingImageThing />
        <RoomReservations />
      </BuildingRequired>
    </LoginRequired>
  )
}
