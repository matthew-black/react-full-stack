import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { useAuthContext } from '../../AuthContext.jsx'

import Nav from './Nav.jsx'
import RequireAuth from './RequireAuth.jsx'
import AboutPage from '../AboutPage/AboutPage.jsx'
import AuthPage from '../AuthPage/AuthPage.jsx'
import ColorsPage from '../ColorsPage/ColorsPage.jsx'


function App() {
  useEffect(() => {
    // If the current user has an active session, this function
    // sets the AuthContext's user state to look something like:
    // { id: 2, username: 'unicorn10' }
    setSessionUser()
  }, [])
  
  // Hooking into AuthContext to get state and a function:
  const { user, setSessionUser } = useAuthContext()

  return (
    <div>
      <h1>Highly Complex Web Application:</h1>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Navigate to="/colors" replace />} />
          <Route path="/colors" element={
            <RequireAuth>
              <ColorsPage />
            </RequireAuth>
          } />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<h1>Hmm. That's not a thing.</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


export default App

