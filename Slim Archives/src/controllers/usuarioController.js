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
    // Garanta que campos opcionais sejam null quando não fornecidos
    const { 
        nomeServer: nome,
        nomeUsuarioServer: nomeUsuario = null, // Valor padrão null se não fornecido
        emailServer: email,
        senhaServer: senha,
        albumServer: album = null // Valor padrão null se não fornecido
    } = req.body;

    // Validações obrigatórias
    if (!nome || !email || !senha) {
        return res.status(400).send("Nome, email e senha são obrigatórios!");
    }

    usuarioModel.cadastrar(nome, nomeUsuario, email, senha, album)
        .then(resultado => {
            res.status(201).json({
                id: resultado.insertId,
                message: "Usuário cadastrado com sucesso!"
            });
        })
        .catch(erro => {
            console.error("Erro no cadastro:", erro);
            res.status(500).json({
                error: erro.code === 'ER_DUP_ENTRY' 
                    ? "Email já cadastrado" 
                    : "Erro ao cadastrar usuário"
            });
        });
}

module.exports = {
    autenticar,
    cadastrar
};