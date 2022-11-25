const sql = require('mssql');

const dbSettings = {
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    server: process.env.DBHOST,
    database: process.env.DBNAME,
    options: {
        encrypt: true, // for azure
        trustServerCertificate: false // change to true for local dev / self-signed certs
    }
}

async function getConnection() {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    getConnection,
    sql
};