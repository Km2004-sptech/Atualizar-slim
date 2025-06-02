const mysql = require("mysql2");

const mySqlConfig = {
  host: process.env.DB_HOST,       // Ex: 192.168.15.71
  database: process.env.DB_DATABASE, // Ex: slim_archives
  user: process.env.DB_USER,         // Ex: sptech
  password: process.env.DB_PASSWORD, // Ex: Kaua2004!
  port: process.env.DB_PORT          // Ex: 3306
}

function executar(instrucao) {
  return new Promise(function (resolve, reject) {
    var conexao = mysql.createConnection(mySqlConfig);
    conexao.connect(function(err) {
      if (err) {
        reject('Erro na conexão: ' + err.message);
        return;
      }
      conexao.query(instrucao, function (erro, resultados) {
        conexao.end();
        if (erro) {
          reject(erro);
          return;
        }
        console.log(resultados);
        resolve(resultados);
      });
    });
    
    conexao.on('error', function (erro) {
      console.error("Erro no MySQL:", erro.sqlMessage);
    });
  });
}

module.exports = { executar };
