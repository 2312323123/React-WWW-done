import { useState } from 'react'

import { useWindowData } from './PagesProvider'

export default function LoginPage() {
  const { loginConfirmed, setLoginConfirmed, login, setLogin, setPassword } =
    useWindowData()

  const [loginLogin, setLoginLogin] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registerLogin, setRegisterLogin] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')

  const logOut = () => {
    setLogin('')
    setPassword('')
    setLoginConfirmed(false)
  }

  const logIn = () => {
    // Using Fetch API
    fetch(`/login`, {
      method: 'POST',
      body: `{"user": "${loginLogin}", "password": "${loginPassword}"}`,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      mode: 'cors',
    })
      .then((response) => {
        if (response.status === 200) {
          setLogin(loginLogin)
          setPassword(loginPassword)
          setLoginConfirmed(true)
        } else {
          alert('Zły login bądź hasło!')
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const register = () => {
    // Using Fetch API
    fetch(`/new_user`, {
      method: 'POST',
      body: `{"user": "${registerLogin}", "password": "${registerPassword}"}`,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      mode: 'cors',
    })
      .then((response) => {
        if (response.status === 201) {
          setLogin(registerLogin)
          setPassword(registerPassword)
          setLoginConfirmed(true)
        } else {
          alert('Username zajęty!')
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <div >
      {' '}
      {loginConfirmed ? (
        <section>
          <h2
            style={{
              fontSize: '2rem',
              textAlign: 'center',
              marginBlock: '1rem',
            }}
          >
            Zalogowany jako: {login}
          </h2>
          <input
            style={{
              fontSize: '1.25rem',
              display: 'block',
              margin: 'auto',
              marginBlockStart: '2rem',
            }}
            onClick={logOut}
            type="submit"
            value="Wyloguj się"
          />
        </section>
      ) : (
        <>
          <section>
            <div class="container-fluid center">
              <div class="row">
              <h2
                style={{
                  fontSize: '2rem',
                  marginBlock: '1rem',
                }}
              >
                <h1 class="center">Zaloguj się</h1>
              </h2>
              <div class="center">
                <input
                  style={{ fontSize: '1.25rem'}}
                  type="text"
                  value={loginLogin}
                  onChange={(e) => setLoginLogin(e.target.value)}
                />
                <br></br>
                <input
                  style={{ fontSize: '1.25rem' }}
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <br></br>
                <input
                  style={{ fontSize: '1rem' }}
                  type="submit"
                  onClick={logIn}
                  value="Zaloguj się"
                />
                </div>
              </div>
            </div>
          </section>
          <section>
            <div class="container-fluid center">
              <h2
                style={{
                  fontSize: '2rem',
                  marginBlockStart: '1rem',
                  marginBlockEnd: '1rem',
                }}
              >
                <h1 class="center">Stwórz konto</h1>
              </h2>
              <div class="container-fluid center">
                <input
                  style={{ fontSize: '1.25rem' }}
                  type="text"
                  value={registerLogin}
                  onChange={(e) => setRegisterLogin(e.target.value)}
                />
                <input
                  style={{ fontSize: '1.25rem' }}
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <br></br>
                <input
                  style={{ fontSize: '1rem' }}
                  
                  type="submit"
                  onClick={register}
                  value="Utwórz konto"
                />
              </div>
            </div>
          </section>{' '}
        </>
      )}
    </div>
  )
}
