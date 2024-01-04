# React Full-Stack w/ Shiny New Things

This is an exploration of building a React/Express app using newer tools/libraries/APIs. Eventually it'll be a multi-user blog with posts, comments, and likes. Maybe there will be some flexbox, because flexbox is all I really know. 🙂

## Usage

1. Create a `colors` database.
2. Run the queries from `/db/schema.sql`.
3. Run the queries from `/db/seed.sql`.
4. `npm install`.
5. `npm run server`.
6. `npm run client`.
7. Enjoy using this very advanced application.

## Notes:

My ongoing/condensed notes on how this approach differs from our current stack/curriculum.

#### Vite is Gravy.

* The end. It's just awesome. ⚡️
* Weird thing though, any files that aren't using ESM import/export syntax need to use the `.cjs` file extension. (I really dig the explictness of that.)

#### React-Router v6 is Slightly Different and Exposes Really Cool New Opt-In Features:

* `<NavLink>` is cool.
  * It has extra special powers if following a certain data querying paradigm:
    * https://reactrouter.com/en/main/components/nav-link
  * Otherwise, the difference between Link and NavLink is that NavLink, by default, has an 'active' CSS class applied to it when a user is "at" that route.
* There's a cool new paradigm that uses an `<Outlet/>` wrapper component. It sounds like this is how *Remix* works, and v6 slurped up a good idea that provides a good dev experience.
  * Docs for the `<Outlet />` component:
    * https://reactrouter.com/en/main/components/outlet
  * Check out line 38 here. Everything inside the `'<Layout />` component is nested in both:
    * The React Router path.
    * The React component tree.
    * Kinda neat, but a different approach for sure.
* I haven't gotten all the way through this, but it's worth reading for some context on what React Router is exploring:
  * https://remix.run/blog/remixing-react-router

#### Auth is Much Less Abstract w/o Redux/Redux-Saga/Passport.

* I chose to use cookies/sessions rather than JWT.
  * The top answer to this question is why I went with cookies/sessions:
    * https://stackoverflow.com/questions/69002252/jwt-token-based-authentication-vs-session-cookies-best-usage
* I'd be very excited to teach about what happens inside `sessionMiddleware.cjs`, especially getting students to understand the importance of  the `sameSite: true, httpOnly: true` cookie options. (This feels just as important as teaching about password hashing.)
* Not sure how to best organize files yet, but check out the `AuthContext.jsx` file. I left verbose comments that explain how it works, and especially how it high-level compares/contrasts to a Redux/Redux-Sagas implementation. This all feels very teachable to me. And valuable to teach. 🙂

#### How is Building a Complex CRUD App w/o Redux/Redux-Saga?

* Forthcoming! 🔥