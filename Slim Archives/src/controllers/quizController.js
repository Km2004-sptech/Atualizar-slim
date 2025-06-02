var quizModel = require("../models/quizModel");

function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    quizModel.listarPorUsuario(idUsuario)
        .then(function (resultado) {
            res.json(resultado);
        }).catch(function (erro) {
            console.log("Erro ao buscar quizzes do usuário:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listarPorUsuario
};
