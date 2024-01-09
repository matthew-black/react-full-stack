import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext.jsx'


function LoginForm() {
  const { logIn } = useAuthContext()
  
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const navigate = useNavigate()

  const handleLogIn = (e) => {
    e.preventDefault()

    logIn(loginUsername, loginPassword)
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        console.log('loginUser fail:', error)
      })
  }
  
  return (
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
  )
}


export default LoginForm
