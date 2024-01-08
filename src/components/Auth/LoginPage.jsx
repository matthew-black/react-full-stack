import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext.jsx'

function LoginPage() {
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
    <div>
      <h2>Log-In Page:</h2>
      
      <form onSubmit={handleLogIn}>
        <input
          type="text"
          placeholder="provide your username"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="enter your password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button>Log In</button>
      </form>

      <button onClick={() => navigate('/registration')}>Go to Registration</button>

    </div>
  )
}


export default LoginPage
