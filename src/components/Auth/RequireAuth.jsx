import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext.jsx'


function RequireAuth({ children }) {
  const { user } = useAuthContext()

  if (user.id === null) {
    // If user.id is null, that means AuthContextProvider's user state
    // has not yet been discovered and set by setSessionUser.
    // By returning null, we are essentially waiting for setSessionUser
    // to finish its job.
    return null
  } else if (user.id) {
    // If there's a logged-in user, this component will render whatever
    // the child components are:
    return children
  } else {
    // If there's not a logged-in user, it redirects to /login:
    return <Navigate to="/login" replace />
  }
}


export default RequireAuth
