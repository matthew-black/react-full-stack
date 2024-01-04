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
