var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (!email || !senha) {
        return res.status(400).send("Email e senha são obrigatórios!");
    }

   usuarioModel.autenticar(email, senha)
    .then(resultado => {
        if (resultado.length === 1) {
            res.json({
                id: resultado[0].id,
                nome: resultado[0].nome,
                email: resultado[0].email
                // Remova qualquer referência a empresaId
            });
        } else {
            res.status(403).send("Credenciais inválidas");
        }
    })
        .catch(erro => {
            console.error("Erro no login:", erro);
            res.status(500).send("Erro interno no servidor");
        });
}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    console.log(req.body)
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    console.log(senha);


    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
        // }  else if (idTransportadora == undefined) {
        //     res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
              
                    res.json({ idUsuario: resultado.insertId })
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar
};