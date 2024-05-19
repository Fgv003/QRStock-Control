//Cadastro:

document.addEventListener("DOMContentLoaded", function () {
    var formErrorElement = document.querySelector('.form-error');
    if (formErrorElement) {
        formErrorElement.value = '';
    }

    function validarFormulario() {
        var userName = document.getElementById('userName').value;
        var userEmail = document.getElementById('userEmail').value;
        var userPassword = document.getElementById('userPassword').value;
        var passwordConfirm = document.getElementById('password_confirm').value;
        var phoneNumberUser = document.getElementById('phoneNumberUser').value;



        if (!userName || !userEmail || !userPassword || !phoneNumberUser || userPassword !== passwordConfirm) {
            if (userPassword !== passwordConfirm) {
                window.alert('As senhas não coincidem. Por favor, verifique e tente novamente.');
                return false;
            } else if (userPassword.length < 8) {

                window.alert('Sua senha deve ter no mínimo oito digitos. Por favor, verifique e tente novamente.');
                return false;

            } else {
                window.alert('Por favor, preencha todos os campos corretamente.');
                return false;
            }
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
                .then(() => window.location.href = 'index.html')
                .catch(error => console.error('Erro ao enviar formulário:', error));
        } else {
            console.log('Formulário não foi validado corretamente.');
        }
    });
});



//Login:

document.addEventListener('DOMContentLoaded', function () {

    const form = document.querySelector('.form-login');

    if (!form) return;
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const userEmail = document.getElementById('userEmail').value;
        const userPassword = document.getElementById('userPassword').value;

        fetch(`https://662eceed43b6a7dce30dce42.mockapi.io/user?userEmail=${userEmail}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                const usuario = data.find(user => user.userPassword === userPassword);
                if (usuario) {
                    console.log("Usuário encontrado:", usuario);
                    window.location.href = 'index.html';
                } else {
                    const nomeErrorElement = document.getElementById('nome-error');
                    if (nomeErrorElement) {
                        nomeErrorElement.textContent = 'Senha inválida.';
                    }
                }
            })
            .catch((error) => {
                console.error('Erro na requisição:', error);
                const nomeErrorElement = document.getElementById('nome-error');
                if (nomeErrorElement) {
                    nomeErrorElement.textContent = 'Usuário inválido.';
                }
            });
    });
});
