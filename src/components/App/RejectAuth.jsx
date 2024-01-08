import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext.jsx'

function RejectAuth({ children }) {
  const { user } = useAuthContext()

  // If there's a logged-in user, this component will redirect to
  // the homepage.
  // If not, the user is routed to the correct page.
  return user.id ? <Navigate to='/' replace /> :  children
}


export default RejectAuth
