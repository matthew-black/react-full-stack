import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext.jsx'


function RejectAuth({ children }) {
  const { user } = useAuthContext()

  if (user.id) {
    // If there's a logged-in user, this component will redirect to
    // the homepage:
    return <Navigate to='/' replace />
  } else {
    // If there's not a logged-in user, this component will render whatever
    // the child components are:
    return children
  }
}


export default RejectAuth
