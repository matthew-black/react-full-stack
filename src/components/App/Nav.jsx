import { NavLink } from "react-router-dom";


function Nav() {
  return (
  <nav>
    <ul>
      <li>
        <NavLink to="/colors">
          colors
        </NavLink>
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
      <li>
        <NavLink to="/auth">
          login/register
        </NavLink>
      </li>
    </ul>
  </nav>
  )
}


export default Nav
