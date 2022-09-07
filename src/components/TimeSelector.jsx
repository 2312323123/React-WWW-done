import { useEffect } from 'react'
import { useWindowData } from '../pages/PagesProvider'

export default function TimeSelector() {
  const containerStyle = {
    maxWidth: '80rem',
    margin: '0 auto',
    background: '#444',
    padding: '1rem',
  }

  const inputStyle = {
    fontSize: '1rem',
  }

  const {
    minTime,
    setMinTime,
    maxTime,
    setMaxTime,
    setIsTimeChosen,
    isTimeChosen,
  } = useWindowData()

  useEffect(() => {
    if (maxTime && minTime) {
      if (maxTime <= minTime) {
        setIsTimeChosen(false)
        alert(`"do" musi być większe od "od"!`)
      } else {
        setIsTimeChosen(true)
      }
    } else {
      setIsTimeChosen(false)
    }
  }, [minTime, maxTime, setIsTimeChosen])

  return (
    <div style={containerStyle}>
      Chcę zarezerwować <label htmlFor="input1">od: </label>
      <input
        id="input1"
        style={inputStyle}
        onChange={(e) => {
          if (e.target.value) {
            setMinTime(e.target.value)
          } else {
            setIsTimeChosen(false)
            setMinTime('')
          }
        }}
        value={minTime}
        min={new Date().toISOString().slice(0, -8)}
        type="datetime-local"
      />{' '}
      <label htmlFor="input2">do: </label>
      <input
        id="input2"
        style={inputStyle}
        onChange={(e) => {
          if (e.target.value) {
            setMaxTime(e.target.value)
          } else {
            setIsTimeChosen(false)
            setMaxTime('')
          }
        }}
        value={maxTime}
        min={new Date().toISOString().slice(0, -8)}
        type="datetime-local"
      />
    </div>
  )
}
