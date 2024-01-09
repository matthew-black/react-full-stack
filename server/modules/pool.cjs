const pg = require('pg')

const config = {
  host: 'localhost',
  port: 5432,
  database: 'blog'
}

const pool = new pg.Pool(config)

module.exports = pool
