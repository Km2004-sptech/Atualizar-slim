async function logar() {
    const email = document.getElementById('email_input').value;
    const senha = document.getElementById('senha_input').value;

    try {
        const response = await fetch('http://localhost:3333/usuarios/autenticar', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: senha
            })
        });

        if (!response.ok) throw await response.json();
        
        const data = await response.json();
        
        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = '/dashboard.html';
        } else {
            alert('Login falhou: ' + (data.message || 'Credenciais inválidas'));
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro: ' + (error.sqlMessage || error.message || 'Falha na conexão'));
    }
}