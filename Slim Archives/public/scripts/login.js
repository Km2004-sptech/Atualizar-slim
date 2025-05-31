// Exemplo: Cadastro (POST)
async function cadastrarUsuario() {
  const dados = {
    email: document.getElementById('email_input').value,
    senha: document.getElementById('senha_input').value,
  };

  try {
    const response = await fetch('http://localhost:3000/api/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    const result = await response.json();
    alert(result.message);
  } catch (error) {
    console.error("Erro:", error);
  }
}