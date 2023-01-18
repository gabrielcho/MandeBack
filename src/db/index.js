const pgp = require('pg-promise')()


// Connection strings are shown as this is only a db mock
const connection = {
    host: 'postgres',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'postgres',
    max: 30
}

const db = pgp(connection)

module.exports = db;
