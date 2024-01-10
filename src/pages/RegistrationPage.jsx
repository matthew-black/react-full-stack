import { useNavigate } from 'react-router-dom'
import RegistrationForm from '../components/Auth/RegistrationForm.jsx'


function RegistrationPage() {
  const navigate = useNavigate()

  return (
    <div className="dev-outline">
      <h2>Registration Page:</h2>
      
      <RegistrationForm />

      <button onClick={() => navigate('/login')}>
        Go to Login
      </button>
    </div>
  )
}


export default RegistrationPage
