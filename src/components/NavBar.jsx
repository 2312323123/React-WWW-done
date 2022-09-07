import { Link } from 'react-router-dom'
import { useWindowData } from '../pages/PagesProvider'
import '../styles/navbar.css'
import vite from '../images/vite.svg'

export default function NavBar() {
  const { loginConfirmed } = useWindowData()

  const unavaible = {
    color: '#444',
    padding: '1rem',
    fontSize: '1.5rem',
    // pointerEvents: 'none',
    userSelect: 'none',
  }

  const avaible = {
    color: 'white',
    padding: '1rem',
    fontSize: '1.5rem',
    userSelect: 'none',
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <img className="navbar-logo" src={vite} alt="Vite logo" />
        <div></div>
        <Link style={loginConfirmed ? avaible : unavaible} to={'/map'}>
          Map
        </Link>
        <Link style={loginConfirmed ? avaible : unavaible} to={'/building'}>
          Building
        </Link>
        <Link style={loginConfirmed ? avaible : unavaible} to={'/reservations'}>
          Reservations
        </Link>
        <Link style={avaible} to={'/'}>
          Login Page
        </Link>
      </div>
    </nav>
  )
}
