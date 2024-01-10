import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext.jsx'


function RegistrationForm() {
  const navigate = useNavigate()
  const { register } = useAuthContext()
  const [ registerUsername, setRegisterUsername ] = useState('')
  const [ registerPassword, setRegisterPassword ] = useState('')

  const handleRegister = (e) => {
    e.preventDefault()

    register(registerUsername, registerPassword)
      .then(() => navigate('/login', {replace: true}))
      .catch((error) => console.log('handleRegister fail:', error))
  }

  return (
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
  )
}


export default RegistrationForm
