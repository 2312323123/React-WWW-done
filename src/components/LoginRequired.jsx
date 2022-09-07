import { Link } from 'react-router-dom'
import { useWindowData } from '../pages/PagesProvider'

export default function LoginRequired(props) {
  const { loginConfirmed } = useWindowData()

  return (
    <>
      {!loginConfirmed ? (
        <>
          <h1 style={{ padding: '1rem', fontSize: '1.5rem' }}>
            Musisz najpierw się{' '}
            <Link
              style={{
                color: 'white',
              }}
              to={'/'}
            >
              zalogować!
            </Link>{' '}
          </h1>
        </>
      ) : (
        <>{props.children}</>
      )}
    </>
  )
}
