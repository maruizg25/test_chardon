// Conectar a la base de datos SQL Server
// ========================================
const sql = require('mssql');

const configDB = {
    user: Process.env.DB_USER,
    password: Process.env.DB_PASSWORD,
    server: Process.env.DB_SERVER,
    database: Process.env.DB_DATABASE,
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }

}

// Conectar a la base de datos
export async function connectDB() {
    try {
        const pool = await sql.connect(configDB);
        // const result = await pool.request().query("select 1");
        // console.log(result);
        return pool;
    } catch (error) {
        console.error(error);
    }
}

export { sql }





