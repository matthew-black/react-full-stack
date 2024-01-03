import { Navigate } from 'react-router-dom'
import useAuth from '../../useAuth.jsx'

function RequireAuth({ children }) {
  const { user } = useAuth()

  return user.id ? children : <Navigate to="/auth" replace />
}


export default RequireAuth
