var database = require("../database/config");

function autenticar(email, senha) {
    const instrucaoSql = `
        SELECT id, nome, email 
        FROM Usuario 
        WHERE email = ? AND senha = ?;
    `;
    return database.executar(instrucaoSql, [email, senha]);
}

function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL");
    var instrucaoSql = `INSERT INTO Usuario (nome, email, senha) VALUES (?, ?, ?);`;
    return database.executar(instrucaoSql, [nome, email, senha]);
}

// Corrija a conexão e uso do DB na registrarQuiz
async function registrarQuiz(usuario_id, quantidade_acertos) {
  const data_hora = new Date();
  const query = 'INSERT INTO Quiz (data_hora, quantidade_acertos, usuario_id) VALUES (?, ?, ?)';
  try {
    const resultado = await database.executar(query, [data_hora, quantidade_acertos, usuario_id]);
    return resultado;
  } catch (erro) {
    throw erro;
  }
}

async function buscarResultadosQuiz(usuario_id) {
    const query = `
        SELECT data_hora, quantidade_acertos
        FROM Quiz
        WHERE usuario_id = ?
        ORDER BY data_hora ASC
    `;
    return await database.executar(query, [usuario_id]);
}




module.exports = {
    autenticar,
    cadastrar,
    registrarQuiz,
      buscarResultadosQuiz
};
