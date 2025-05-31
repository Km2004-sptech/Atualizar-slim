require('dotenv').config();
var mysql = require("mysql2/promise"); // Mantenha apenas esta linha

var pool = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10
});

async function executar(instrucao, valores = []) {
    try {
        const [rows] = await pool.execute(instrucao, valores); // Note o uso de execute() em vez de query()
        return rows;
    } catch (erro) {
        console.error('Erro na query:', instrucao, valores, erro);
        throw erro;
    }
}

module.exports = {
    executar
};