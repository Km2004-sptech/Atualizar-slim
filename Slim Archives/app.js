// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var avisosRouter = require("./src/routes/avisos");
var medidasRouter = require("./src/routes/medidas");
var aquariosRouter = require("./src/routes/aquarios");
var empresasRouter = require("./src/routes/empresas");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/avisos", avisosRouter);
app.use("/medidas", medidasRouter);
app.use("/aquarios", aquariosRouter);
app.use("/empresas", empresasRouter);

// Cadastro
app.post('/api/cadastro', async (req, res) => {
  const { nome, email, senha, album } = req.body;
  
  try {
    // 1. Hash da senha (usando bcrypt)
    const senhaHash = await bcrypt.hash(senha, 10);
    
    // 2. Insere no MySQL
    await connection.execute(
      `INSERT INTO usuarios (nome, email, senha, album_favorito) 
       VALUES (?, ?, ?, ?)`,
      [nome, email, senhaHash, album]
    );
    
    res.json({ message: "Usuário cadastrado!" });
  } catch (err) {
    res.status(500).json({ error: "Erro no cadastro" });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;
  
  const [user] = await connection.execute(
    'SELECT * FROM usuarios WHERE email = ?', 
    [email]
  );
  
  if (user.length === 0) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }
  
  const senhaValida = await bcrypt.compare(senha, user[0].senha);
  if (!senhaValida) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }
  
  // Gera token JWT para sessão (opcional)
  const token = jwt.sign({ id: user[0].id }, 'seuSegredo');
  res.json({ token, user: user[0] });
});

const cors = require('cors');
app.use(cors({
  origin: 'localhost',
  credentials: true
}));

app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
