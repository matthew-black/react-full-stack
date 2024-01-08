import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { useAuthContext } from '../../contexts/AuthContext.jsx'

// Nav + Auth Redirects:
import Nav from './Nav.jsx'
import RequireAuth from '../Auth/RequireAuth.jsx'
import RejectAuth from '../Auth/RejectAuth.jsx'
// Pages:
import AboutPage from '../AboutPage/AboutPage.jsx'
import ColorsPage from '../ColorsPage/ColorsPage.jsx'
import HomePage from '../HomePage/HomePage.jsx'
import LoginPage from '../Auth/LoginPage.jsx'
import RegistrationPage from '../Auth/RegistrationPage.jsx'

function App() {
  useEffect(() => {
    // If the current user has an active session, this function
    // sets the AuthContext's user state to look something like:
    // { id: 2, username: 'unicorn10' }
    setSessionUser()
  }, [])
  
  // Hooking into AuthContext to get a function:
  const { setSessionUser } = useAuthContext()

  return (
    <div>
      <h1>Highly Complex Web Application:</h1>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/about"
            element={<AboutPage />}
          />
          <Route
            path="/registration"
            element={ <RejectAuth>
                        <RegistrationPage />
                      </RejectAuth> }
          />
          <Route
            path="/login"
            element={ <RejectAuth>
                        <LoginPage />
                      </RejectAuth> }
          />
          <Route
            path="/colors"
            element={ <RequireAuth>
                        <ColorsPage />
                      </RequireAuth> }
          />
          <Route
            path="*"
            element={<h1>Hmm. That's not a thing.</h1>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


export default App

