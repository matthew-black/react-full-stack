const rejectUnauthenticated = (req, res, next) => {
  if (req.session.user) {
    // The request came from an authenticated user, so we can
    // let the route do its job:
    next()
  } else {
    // The request came from an unauthenticated user, so we
    // send back "403 Forbidden" to the client:
    res.sendStatus(403)
  }
}


module.exports = {rejectUnauthenticated}
