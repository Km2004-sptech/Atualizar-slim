var database = require("../database/config");

// Altere a query de autenticação para:
function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT id, nome, email, senha FROM usuario 
        WHERE email = ? AND senha = ?;
    `;
    return database.executar(instrucaoSql, [email, senha]);
}

function cadastrar(nome, nomeUsuario, email, senha, album) {
    var instrucaoSql = `
        INSERT INTO Usuario 
        (nome, nome_usuario, email, senha, album_favorito_id) 
        VALUES (?, ?, ?, ?, ?);
    `;
    return database.executar(instrucaoSql, 
        [nome, nomeUsuario, email, senha, album]); // Prepared statement
}

module.exports = {
    autenticar,
    cadastrar
};