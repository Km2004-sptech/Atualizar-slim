var express = require("express");
var router = express.Router();
var quizController = require("../controllers/quizController");

router.get("/usuario/:idUsuario", function (req, res) {
    quizController.listarPorUsuario(req, res);
});

module.exports = router;
