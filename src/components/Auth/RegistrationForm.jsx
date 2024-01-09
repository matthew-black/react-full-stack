import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext.jsx'


function RegistrationForm() {
  const { register } = useAuthContext()

  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')

  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()

    register(registerUsername, registerPassword)
      .then(() => {
        console.log('successful registeration!')
        navigate('/login', { replace: true })
      })
      .catch((error) => {
        console.log('registerUser fail:', error)
      })
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
