const Pool = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config({path : '../.env'});

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});


module.exports = pool;