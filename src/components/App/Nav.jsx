import { NavLink } from "react-router-dom";
import { useAuthContext } from '../../contexts/AuthContext.jsx'


function Nav() {
  const { user, logOut } = useAuthContext()

  return (
  <nav>
    <h2>Le Nav:</h2>
    <ul>
      <li>
        { user.id ? 
            `hello, ${user.username}`
                  :
            <NavLink to="/login">login/register</NavLink>
        }
      </li>
      <li>
        <NavLink to="/">home</NavLink>
      </li>
      { user.id &&
        <li>
          <NavLink to="/colors">colors</NavLink>
        </li>
      }
      { user.id &&
        <li>
          <NavLink to="/my_posts">my posts</NavLink>
        </li>
      }
      <li>
        <NavLink to="/about">about</NavLink>
      </li>
      { user.id && 
        <li>
          <button onClick={logOut}>log out</button>
        </li>
      }
    </ul>
  </nav>
  )
}


export default Nav
