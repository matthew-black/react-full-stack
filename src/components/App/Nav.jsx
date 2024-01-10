import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext.jsx'


function Nav() {
  const navigate = useNavigate()
  const { user, logOut } = useAuthContext()

  const handleLogOut = () => {
    logOut()
      .then(() => navigate('/'))
      .catch((error) => {
        console.log('handleLogOut fail:', error)
      })
  }

  return (
  <nav className="dev-outline">
    <h2>Nav:</h2>
    <ul>
      <li>
        { 
          user.id ? 
            `hello, ${user.username}`
                  :
            <NavLink to="/login">login/register</NavLink>
        }
      </li>
      <li>
        <NavLink to="/">home</NavLink>
      </li>
      { 
        user.id &&
          <>
            <li>
              <NavLink to="/user_posts">my posts</NavLink>
            </li>
            <li>
              <NavLink to="/new_post">write a post</NavLink>
            </li>
          </>
      }
      <li>
        <NavLink to="/about">about</NavLink>
      </li>
      { 
        user.id && 
          <li>
            <button onClick={handleLogOut}>log out</button>
          </li>
      }
    </ul>
  </nav>
  )
}


export default Nav
