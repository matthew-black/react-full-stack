import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App.jsx'
import AuthContextProvider from './contexts/AuthContext.jsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
)
