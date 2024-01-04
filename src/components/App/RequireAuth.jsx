import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../AuthContext.jsx'

function RequireAuth({ children }) {
  const { user } = useAuthContext()

  // If there's a logged-in user, this component will render whatever
  // its child components are.
  // If not, it redirects to /auth: (my current wonky POC auth page...)
  return user.id ? children : <Navigate to="/auth" replace />
}


export default RequireAuth
