import LoginRequired from '../components/LoginRequired'
import TimeSelector from '../components/TimeSelector'
import Map from '../components/mapPageComponents/Map'

export default function MapPage() {
  return (
    <LoginRequired>
      <TimeSelector />
      <Map />
    </LoginRequired>
  )
}
