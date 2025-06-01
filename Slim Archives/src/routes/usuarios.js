var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

// Recebendo os dados do html e direcionando para as funções do controller
router.post("/cadastrar", usuarioController.cadastrar);
router.post("/autenticar", usuarioController.autenticar);

// Rota para registrar o resultado do quiz
router.post("/quiz", usuarioController.registrarResultadoQuiz);

module.exports = router;
