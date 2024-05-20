document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu_toggle');
    const menuNav = document.querySelector('.menu_nav');
    const menuLinks = document.querySelectorAll('.menu_nav a');

    if (menuToggle) {
        menuToggle.addEventListener('click', function (event) {
            // Prevenir que o clique no menuToggle feche o menu
            event.stopPropagation();
            console.log("Clicou no toggle");
            // Toggle da classe 'active' no menu
            menuNav.classList.toggle('active');
            console.log("Classe 'active' toggled");
        });
    } else {
        console.error("Elemento .menu_toggle não encontrado");
    }

    if (menuNav) {
        // Adicionar um evento de clique ao documento inteiro
        document.addEventListener('click', function () {
            // Verificar se o menu está ativo
            if (menuNav.classList.contains('active')) {
                console.log("Menu está ativo");
                menuNav.classList.remove('active');
                console.log("Classe 'active' removida");
            }
        });

        // Impedir que cliques dentro do menuNav fechem o menu
        menuNav.addEventListener('click', function (event) {
            event.stopPropagation();
            console.log("Clicou dentro do menu");
        });

        // Fechar o menu ao clicar em qualquer link dentro dele
        menuLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                if (menuNav.classList.contains('active')) {
                    menuNav.classList.remove('active');
                    console.log("Classe 'active' removida após clique no link");
                }
            });
        });
    } else {
        console.error("Elemento .menu_nav não encontrado");
    }
});
