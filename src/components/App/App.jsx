import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { useAuthContext } from '../../contexts/AuthContext.jsx'

import Nav from './Nav.jsx'
import RequireAuth from './RequireAuth.jsx'
import RejectAuth from './RejectAuth.jsx'
import AboutPage from '../AboutPage/AboutPage.jsx'
import RegistrationPage from '../AuthPages/RegistrationPage.jsx'
import LoginPage from '../AuthPages/LoginPage.jsx'
import ColorsPage from '../ColorsPage/ColorsPage.jsx'


function App() {
  useEffect(() => {
    // If the current user has an active session, this function
    // sets the AuthContext's user state to look something like:
    // { id: 2, username: 'unicorn10' }
    setSessionUser()
  }, [])
  
  // Hooking into AuthContext to get state and a function:
  const { setSessionUser } = useAuthContext()

  return (
    <div>
      <h1>Highly Complex Web Application:</h1>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Navigate to="/colors" />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/registration" element={ <RejectAuth>
                                                  <RegistrationPage />
                                                </RejectAuth> }
          />
          <Route path="/login" element={  <RejectAuth>
                                            <LoginPage />
                                          </RejectAuth> }
          />
          <Route path="/colors" element={ <RequireAuth>
                                            <ColorsPage />
                                          </RequireAuth> }
          />
          <Route path="*" element={<h1>Hmm. That's not a thing.</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


export default App

