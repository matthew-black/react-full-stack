import { NavLink } from "react-router-dom";
import { useAuthContext } from '../../AuthContext.jsx'


function Nav() {
  const { user, logOut } = useAuthContext()

  return (
  <nav>
    <h2>Le Nav:</h2>
    <ul>
      <li>
        {user.id ? 
          <NavLink to="/colors">colors</NavLink>
                 :
          <NavLink to="/auth">login/register</NavLink>}
      </li>
      <li>
        <NavLink to="/about">about</NavLink>
      </li>
      {user.id && 
        <li>
          <button onClick={logOut}>
            log out
          </button>
        </li>}
    </ul>
  </nav>
  )
}


export default Nav
