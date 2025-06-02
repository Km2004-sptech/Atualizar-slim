var database = require("../database/config");

function listarPorUsuario(idUsuario) {
 var instrucao = `
    SELECT quantidade_acertos AS acertos, 
           DATE_FORMAT(data_hora, '%d/%m %H:%i') AS dataFormatada
    FROM Quiz
    WHERE usuario_id = ${idUsuario}
    ORDER BY data_hora ASC;
`;

    return database.executar(instrucao);
}

module.exports = {
    listarPorUsuario
};
