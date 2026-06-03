const { Pool } = require('pg');

module.exports = new Pool({
    // connectionString: "postgresql://odi000:1997@localhost:5432/the_longue",
    connectionString: process.env.DATABASE_URL
})