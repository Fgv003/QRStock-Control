//Cadastro:

function validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

document.addEventListener("DOMContentLoaded", function () {
    
    function validarFormulario() {
        var userName = document.getElementById('userName').value;
        var userEmail = document.getElementById('userEmail').value;
        var userPassword = document.getElementById('userPassword').value;
        var passwordConfirm = document.getElementById('password_confirm').value;
        var phoneNumberUser = document.getElementById('phoneNumberUser').value;

        if (!userName || !userEmail || !userPassword || !phoneNumberUser) {
            window.alert('Por favor, preencha todos os campos corretamente.');
            return false;
        }

        if (userPassword.length < 8) {
            window.alert('Sua senha deve ter no mínimo oito dígitos. Por favor, verifique e tente novamente.');
            return false;
        }

        if (userPassword !== passwordConfirm) {
            window.alert('As senhas não coincidem. Por favor, verifique e tente novamente.');
            return false;
        }

        if (!validarEmail(userEmail)) {
            window.alert('Por favor, insira um email válido.');
            return false;
        }
        
        var usuario = {
            "userName": userName,
            "userEmail": userEmail,
            "userPassword": userPassword,
            "phoneNumberUser": phoneNumberUser,
        };

        return usuario;
    }

    document.querySelector('.btn-signup').addEventListener('click', function (event) {
        event.preventDefault();
        let resp = validarFormulario();
        if (resp) {
            fetch('https://662eceed43b6a7dce30dce42.mockapi.io/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resp)
            })
            .then(() => window.location.href = 'Bem_Vindo.html')
            .catch(error => console.error('Erro ao enviar formulário:', error));
        } else {
            console.log('Formulário não foi validado corretamente.');
        }
    });
});


   


//Login:

document.addEventListener('DOMContentLoaded', function () {
    debugger;
    const form = document.querySelector('.form-login');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        debugger;

        const userEmail = document.getElementById('userEmail').value;
        const userPassword = document.getElementById('userPassword').value;

        fetch(`https://662eceed43b6a7dce30dce42.mockapi.io/user`)
            .then(response => response.json())
            .then(data => {
                const usuario = data.find(user => user.userEmail === userEmail && user.userPassword === userPassword);
                if (usuario) {
                    console.log("Usuário encontrado:", usuario);
                    window.location.href = 'Bem_Vindo.html';
                } else {
                    const nomeErrorElement = document.getElementById('nome-error');
                    if (nomeErrorElement) {
                        nomeErrorElement.textContent = 'E-mail ou senha inválidos.';
                    }
                }
            })
            .catch((error) => {
                console.error('Erro na requisição:', error);
                const nomeErrorElement = document.getElementById('nome-error');
                if (nomeErrorElement) {
                    nomeErrorElement.textContent = 'Erro ao tentar logar. Por favor, tente novamente mais tarde.';
                }
            });
    });
});
