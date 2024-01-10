import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext.jsx'
// Nav + Auth Redirects:
import Nav from './Nav.jsx'
import RequireAuth from '../Auth/RequireAuth.jsx'
import RejectAuth from '../Auth/RejectAuth.jsx'
// Pages:
import AboutPage from '../../pages/AboutPage.jsx'
import CreatePostPage from '../../pages/CreatePostPage.jsx'
import HomePage from '../../pages/HomePage.jsx'
import LoginPage from '../../pages/LoginPage.jsx'
import MyPostsPage from '../../pages/MyPostsPage.jsx'
import PostPage from '../../pages/PostPage.jsx'
import RegistrationPage from '../../pages/RegistrationPage.jsx'


function App() {
  useEffect(() => {
    // If the current user has an active session, this function
    // sets the AuthContext's user state to look something like:
    // { id: 2, username: 'unicorn10' }
    // Else if the current user does not have an active session,
    // this function sets the AuthContext's user state to:
    // {}
    setSessionUser()
  }, [])
  
  // Hooking into AuthContext to get a function:
  const { setSessionUser } = useAuthContext()

  return (
    <div>
      <h1 className="pink-text">Highly Complex Web Application:</h1>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={ <HomePage /> }
          />
          <Route
            path="/about"
            element={ <AboutPage /> }
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
            exact path="/user_posts"
            element={ <RequireAuth>
                        <MyPostsPage />
                      </RequireAuth> }
          />
          <Route
            exact path="/new_post"
            element={ <RequireAuth>
                        <CreatePostPage />
                      </RequireAuth> }
          />
          <Route
            exact path="/posts/:id"
            element={ <PostPage /> }
          />
          <Route
            path="/bad_request"
            element={<><h2>Bad Request:</h2><p>This is awkward, but you've made a bad request. Let's not read too much into this.<br/><br/>If you click/swipe back, the magical powers of the web browser you are using will take you back to where you were before this regrettable mishap occurred.</p></>}
          />
          <Route
            path="*"
            element={<h2>Hmm. That's not a thing.</h2>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


export default App

