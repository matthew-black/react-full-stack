import { useState, createContext, useContext } from 'react'
import axios from 'axios'

const authContext = createContext()

function useAuth() {
  const [user, setUser] = useState({})

  const register = (username, password) => {
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

  const logIn = (username, password) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: '/api/users/sessions',
        data: {username, password}
      })
        .then((response) => {
          getSessionUser()
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

  const getSessionUser = () => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: '/api/users/sessions'
      })
        .then((response) => {
          const sessionUser = response.data
          setUser(sessionUser)
          resolve(sessionUser)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  return {
    user,
    register,
    logIn,
    logOut,
    getSessionUser
  }
}

export function AuthProvider({ children }) {
  const auth = useAuth()

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  )
}

export default function AuthConsumer() {
  return useContext(authContext)
}
