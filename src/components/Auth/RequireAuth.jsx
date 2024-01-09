import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext.jsx'


function RequireAuth({ children }) {
  const { user } = useAuthContext()

  if (user.id) {
    // If there's a logged-in user, this component will render whatever
    // its child components are:
    return children
  } else {
    // If not, it redirects to /login:
    return <Navigate to="/login" replace />
  }
}


export default RequireAuth
