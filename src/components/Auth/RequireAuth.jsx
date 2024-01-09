import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext.jsx'


function RequireAuth({ children }) {
  const { user } = useAuthContext()

  if (user.id === null) {
    // If user.id is null, that means AuthContextProvider's user state
    // is still evaluating to the default value. This means that we're
    // waiting on AuthContextProvider's setSessionUser function to finish
    // its job, which will set user to a valid user object or an empty object.
    // Essentially, we're waiting to know whether or not there is a logged-in
    // user. So, instead of rendering children or redirecting to /login, we
    // just return null, which causes nothing to happen:
    return null
  } else if (user.id) {
    // If there's a logged-in user, this component will render whatever
    // its child components are:
    return children
  } else {
    // If not, it redirects to /login:
    return <Navigate to="/login" replace />
  }
}


export default RequireAuth
