const bcrypt = require('bcryptjs')

const SALT_WORK_FACTOR = 10

function hash(password) {
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR)
  return bcrypt.hashSync(password, salt)
}

function verify(submittedPassword, storedHash) {
  return bcrypt.compareSync(submittedPassword, storedHash)
}

module.exports = {hash, verify}
