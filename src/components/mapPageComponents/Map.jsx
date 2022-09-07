import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { useWindowData } from '../../pages/PagesProvider'

import { buildings } from '../BuildingData'

export default function Map() {
  const position = [50.054161097435944, 19.935435577161144]

  const { setBuilding, setFloor } = useWindowData()

  const markers = buildings.map((node, index) => (
    <Marker key={index} position={[node.lat, node.long]}>
      <Popup>
        {node.name} <br />
        <span
          onClick={() => {
            setBuilding(node.id)
            setFloor(1)
          }}
        >
          <Link style={{ color: 'blue' }} to={'/building'}>
            choose
          </Link>
        </span>
      </Popup>
    </Marker>
  ))

  return (
    <>
      <MapContainer
        style={{ height: '80vh' }}
        center={position}
        zoom={17}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
      </MapContainer>
    </>
  )
}
