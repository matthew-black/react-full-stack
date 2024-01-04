import { useState, createContext, useContext } from 'react'
import axios from 'axios'



// Create an piece of context. Exciting stuff:
const AuthContext = createContext()

// This is a custom wrapper component. It's kinda like the
// Redux Provider. But instead of handing it a store, it
// gets handed a value prop. We're bundling up a piece of global
// state, and four auth-related functions, then feeding them
// to the Provider as the value prop. This nice little care
// package of auth goodies will be available within any React
// component that's within the Provider's scope:
export default function AuthContextProvider({ children }) {
  // Standard React state, but it will become global state
  // for this Provider's children:
  const [user, setUser] = useState({})

  // A then-able function that creates a new user:
  const register = (username, password) => {
    // Doesn't necessarily need to be here. Just thought it'd be
    // clean to stuff it in here with the other auth/user-related
    // global functions.
    return new Promise((resolve, reject) => {

      axios({
        method: 'POST',
        url: '/api/users',
        data: {username, password}
      })
        .then(() => {
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // A then-able function that logs in the user, then calls
  // the setSessionUser function:
  const logIn = (username, password) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: '/api/users/sessions',
        data: {username, password}
      })
        .then((response) => {
          setSessionUser()
            .then(() => {
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
          
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // A then-able function that sets the user state to the
  // current user's data, if a session is active:
  const setSessionUser = () => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: '/api/users/sessions'
      })
        .then((response) => {
          const sessionUser = response.data
          if (sessionUser.id) {
            setUser(sessionUser)
          }
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // A then-able function that logs out the user:
  const logOut = () => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'DELETE',
        url: '/api/users/sessions'
      })
        .then(() => {
          setUser({})
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
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

// This is the custom hook that any of the Provider's children
// can use to hook into the authTools that Provider exposes:
export function useAuthContext() {
  return useContext(AuthContext)
}
