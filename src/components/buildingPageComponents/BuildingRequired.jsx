import { Link } from 'react-router-dom'
import { useWindowData } from '../../pages/PagesProvider'

export default function BuildingRequired(props) {
  const { building } = useWindowData()

  return (
    <>
      {building ? (
        <>{props.children}</>
      ) : (
        <>
          <h1 style={{ padding: '1rem', fontSize: '1.5rem' }}>
            Musisz najpierw wybrać budynek na{' '}
            <Link
              style={{
                color: 'white',
              }}
              to={'/map'}
            >
              mapie
            </Link>{' '}
            !
          </h1>
        </>
      )}
    </>
  )
}
