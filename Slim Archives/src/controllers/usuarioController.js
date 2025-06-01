const usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (!email || !senha) {
        return res.status(400).send("Email e senha são obrigatórios!");
    }

    usuarioModel.autenticar(email, senha)
    .then(resultado => {
        if (resultado.length === 1) {
            // Aqui o login foi bem-sucedido
            // Coloque aqui para salvar o id na sessão:
            req.session.usuario_id = resultado[0].id;

            res.json({
                id: resultado[0].id,
                nome: resultado[0].nome,
                email: resultado[0].email
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
    const nome = req.body.nomeServer;
    const email = req.body.emailServer;
    const senha = req.body.senhaServer;

    if (!nome) {
        return res.status(400).send("Seu nome está undefined!");
    } else if (!email) {
        return res.status(400).send("Seu email está undefined!");
    } else if (!senha) {
        return res.status(400).send("Sua senha está undefined!");
    }

    usuarioModel.cadastrar(nome, email, senha)
        .then(resultado => {
            res.json({ idUsuario: resultado.insertId });
        })
        .catch(erro => {
            console.error("Erro ao realizar o cadastro:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


async function registrarResultadoQuiz(req, res) {
    const { quantidade_acertos } = req.body;
    const usuario_id = req.session.usuario_id;

    if (!usuario_id) {
        return res.status(401).json({ mensagem: 'Usuário não autenticado' });
    }

    try {
        await usuarioModel.registrarQuiz(usuario_id, quantidade_acertos);
        res.status(200).json({ mensagem: 'Resultado do quiz registrado com sucesso' });
    } catch (erro) {
        console.error('Erro ao registrar quiz:', erro);
        res.status(500).json({ mensagem: 'Erro ao registrar resultado do quiz' });
    }
}

module.exports = {
    autenticar,
    cadastrar,
    registrarResultadoQuiz
};
