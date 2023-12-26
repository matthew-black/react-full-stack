import { HashRouter, Routes, Route, Navigate } from "react-router-dom"
import Nav from './Nav.jsx'
import ColorsPage from '../ColorsPage/ColorsPage.jsx'


function App() {
  return (
    <div>
      <HashRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Navigate to="/colors" replace />} />
          <Route path="colors" element={<ColorsPage />} />
          <Route path="auth" element={<h1>The Auth View!</h1>} />
          <Route path="about" element={<h1>The About View!</h1>} />
          <Route path="*" element={<h1>Hmm. That's not a thing.</h1>} />
        </Routes>
      </HashRouter>
    </div>
  )
}


export default App

