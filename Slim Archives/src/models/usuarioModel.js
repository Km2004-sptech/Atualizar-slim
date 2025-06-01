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

function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

 var instrucaoSql = `INSERT INTO Usuario (nome, email, senha) VALUES (?, ?, ?);`;
return database.executar(instrucaoSql, [nome, email, senha]);

}
module.exports = {
    autenticar,
    cadastrar
};