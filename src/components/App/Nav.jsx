import { NavLink } from "react-router-dom";
import useAuth from '../../useAuth.jsx'


function Nav() {
  const { user, logOut } = useAuth()

  return (
  <nav>
    <ul>
      <li>
        {user.id ? 
          <NavLink to="/colors">colors</NavLink>
          :
          <NavLink to="/auth">login/register</NavLink>
        }
      </li>
      <li>
        <NavLink
          to="/about"
          // Nifty extra NavLink powers if following a certain data querying paradigm:
            // https://reactrouter.com/en/main/components/nav-link
          // Otherwise, difference between Link and NavLink is that NavLink, by default,
          // has an 'active' CSS class applied to it when a user is "at" that route.
          // className={({ isActive, isPending }) =>
          //   isPending ? "pending" : isActive ? "active" : ""
          // }
        >
          about
        </NavLink>
      </li>
      {user.id && <li onClick={logOut}>log out</li>}
    </ul>
  </nav>
  )
}


export default Nav
