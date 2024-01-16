import { useState, createContext, useContext } from 'react'
import axios from 'axios'


// Instantiate a context. Exciting stuff:
const AuthContext = createContext()

// This is a custom wrapper component. We're bundling up a piece of
// state and four auth-related functions, then feeding them
// to  AuthContext.Provider as the value prop.
// This nice little care package of auth goodies will be available
// via the useAuthContext hook within any React component that is
// a descendent of AuthContextProvider:
export default function AuthContextProvider({ children }) {
  const [ user, setUser ] = useState({id: null})

  // A then-able function that creates a new user:
  const register = (username, password) => {
    return new Promise((resolve, reject) => {
      axios.post('/api/users', {username, password})
        .then(() => resolve())
        .catch((error) => reject(error))
    })
  }

  // A then-able function that logs in the user, then calls
  // the setSessionUser function:
  const logIn = (username, password) => {
    return new Promise((resolve, reject) => {
      axios.post('/api/users/sessions', {username, password})
        .then((response) => {
          setSessionUser()
            .then(() => resolve())
            .catch((error) => reject(error)) 
        })
        .catch((error) => reject(error))
    })
  }

  // A then-able function that sets the user state to the
  // current session user's data (or an empty object):
  const setSessionUser = () => {
    return new Promise((resolve, reject) => {
      axios.get('/api/users/sessions')
        .then((response) => {
          const sessionUser = response.data
          setUser(sessionUser)
          resolve()
        })
        .catch((error) => reject(error))
    })
  }

  // A then-able function that logs out the user:
  const logOut = () => {
    return new Promise((resolve, reject) => {
      axios.delete('/api/users/sessions')
        .then(() => {
          setUser({})
          resolve()
        })
        .catch((error) => reject(error))
    })
  }

  // Bundling up the things we'd like any of the Provider's
  // children to be able to access:
  const authTools = {
    user,
    register,
    logIn,
    setSessionUser,
    logOut
  }

  return (
    <AuthContext.Provider value={authTools}>
      {children}
    </AuthContext.Provider>
  )
}

// This is the custom hook that any of AuthContextProvider's children
// can use to hook into the authTools that AuthContextProvider exposes:
export function useAuthContext() {
  return useContext(AuthContext)
}
