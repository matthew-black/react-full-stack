import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/Auth/LoginForm.jsx'


function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="dev-outline">
      <h2>Log-In Page:</h2>
      
      <LoginForm />

      <button onClick={() => navigate('/registration')}>
        Go to Registration
      </button>
    </div>
  )
}


export default LoginPage
