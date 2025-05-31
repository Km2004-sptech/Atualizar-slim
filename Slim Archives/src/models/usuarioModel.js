var database = require("../database/config");

function autenticar(email, senha) {
    // Query com prepared statements
    const instrucaoSql = `
        SELECT id, nome, email 
        FROM usuario 
        WHERE email = ? AND senha = ?;
    `;
    
    // Passe os parâmetros como array
    return database.executar(instrucaoSql, [email, senha]);
}

function cadastrar(nome, nomeUsuario, email, senha, album) {
    const instrucaoSql = `
        INSERT INTO Usuario 
        (nome, nome_usuario, email, senha, album_favorito_id) 
        VALUES (?, ?, ?, ?, ?);
    `;
    return database.executar(instrucaoSql, [
        nome,
        nomeUsuario, // Pode ser null
        email,
        senha,
        album // Pode ser null
    ]);
}

module.exports = {
    autenticar,
    cadastrar
};