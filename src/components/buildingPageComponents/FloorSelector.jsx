import { useWindowData } from '../../pages/PagesProvider'

import { buildings } from '../BuildingData'

export default function FloorSelector() {
  const containerStyle = {
    maxWidth: '80rem',
    margin: '0 auto',
    background: '#444',
    padding: '1rem',
  }

  const inputStyle = {
    fontSize: '1rem',
  }

  const { building, setFloor } = useWindowData()

  let building_id = buildings.findIndex((element) => element.id === building)

  return buildings[building_id].floorNumber > 1 ? (
    <div style={containerStyle}>
      <label htmlFor="floor">Piętro: </label>
      <select
        style={inputStyle}
        onChange={(e) => setFloor(Number(e.target.value))}
      >
        {new Array(buildings[building_id].floorNumber)
          .fill(0)
          .map((_, index) => (
            <option value={index + 1}>{index + 1}</option>
          ))}
      </select>
    </div>
  ) : (
    <></>
  )
}
