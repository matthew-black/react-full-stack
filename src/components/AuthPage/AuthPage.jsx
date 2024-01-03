import { useState } from 'react'

import useAuth from '../../useAuth.jsx'

function AuthPage() {
  const { register, logIn, logOut } = useAuth()

  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const handleRegister = (e) => {
    e.preventDefault()

    register(registerUsername, registerPassword)
      .then(() => {
        console.log('successful registeration!')
      })
      .catch((error) => {
        console.log('registerUser fail:', error)
      })
  }

  const handleLogIn = (e) => {
    e.preventDefault()

    logIn(loginUsername, loginPassword)
      .then(() => {
        console.log('successful login!')
      })
      .catch((error) => {
        console.log('loginUser fail:', error)
      })
  }

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log('successful logout!')
      })
      .catch((error) => {
        console.log('logoutUser fail:', error)
      })
  }

  return (
    <div>
      <h1>Auth Page!</h1>
      
      <form onSubmit={handleRegister}>
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
      <form onSubmit={handleLogIn}>
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
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  )
}


export default AuthPage
