import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Nav from './Nav.jsx'

import AboutPage from '../AboutPage/AboutPage.jsx'
import AuthPage from '../AuthPage/AuthPage.jsx'
import ColorsPage from '../ColorsPage/ColorsPage.jsx'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Navigate to="/colors" replace />} />
          <Route path="colors" element={<ColorsPage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<h1>Hmm. That's not a thing.</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


export default App

