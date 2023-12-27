import { useState } from 'react'
import axios from 'axios'

function AuthPage() {
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const registerUser = (e) => {
    e.preventDefault()

    axios({
      method: 'POST',
      url: '/api/users',
      data: {
        username: registerUsername,
        password: registerPassword
      }
    })
      .then((response) => {
        console.log('successful registeration!')
      })
      .catch((error) => {
        console.log('registerUser fail:', error)
      })
  }

  const loginUser = (e) => {
    e.preventDefault()

    axios({
      method: 'POST',
      url: '/api/users/sessions',
      data: {
        username: loginUsername,
        password: loginPassword
      }
    })
      .then((response) => {
        console.log('successful login!')
      })
      .catch((error) => {
        console.log('loginUser fail:', error)
      })
  }

  const logoutUser = () => {
    axios({
      method: 'DELETE',
      url: '/api/users/sessions'
    })
      .then((response) => {
        console.log('successful logout!')
      })
      .catch((error) => {
        console.log('logoutUser fail:', error)
      })
  }

  const getSession = () => {
    axios({
      method: 'GET',
      url: '/api/users/sessions'
    })
      .then((response) => {
        console.log('session is:', response.data)
      })
      .catch((error) => {
        console.log('getSession fail:', error)
      })
  }

  return (
    <div>
      <h1>Auth Page!</h1>
      
      <form onSubmit={registerUser}>
        <input
          type="text"
          placeholder="username"
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button>Register</button>
      </form>
      <br/>
      <form onSubmit={loginUser}>
        <input
          type="text"
          placeholder="username"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button>Log In</button>
      </form>
      <br/>
      <button onClick={logoutUser}>Log Out</button>
      <br/>
      <button onClick={getSession}>Get Session</button>


    </div>
  )
}


export default AuthPage

// REGISTRATION:
// 1. C: Registration form submit username/password to server.
// 2. S: Verify username doesn't exist. Hash password. Store username
//       and hashed password. Respond with 201.
// 3. C: Routes to login page.

// LOGIN:
// 1. C: Login form submits username/password to server.
// 2. S: Verify username exists. Hash submitted password and verify
//       that it matches the stored password hash.
// 3. S: Yay. cookie-parser (or?) time! Bake a session cookie:
              // response.cookie('nameOfCookie', 'cookieValue', {
              //   maxAge: 60 * 60 * 1000, // 1 hour
              //   httpOnly: true,
              //   secure: true,
              //   sameSite: true,
              // })
// 4. S: Respond with 201 (session created) and the cookie.
// 5. C: useContext and a custom hook that makes a global user obj.

// AUTHENTICATED USER REQ/RES:
// 1. C: Requests a resource that requires auth. (Cookie comes along!)
// 2. S: Express route runs some kind of "verifyAuthenticatedUser" middleware.