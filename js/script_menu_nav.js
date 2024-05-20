document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu_toggle');
    const menuNav = document.querySelector('.menu_nav');

    menuToggle.addEventListener('click', function (event) {
        // Prevenir que o clique no menuToggle feche o menu
        event.stopPropagation();
        menuNav.classList.toggle('active');
    });

    // Adicionar um evento de clique ao documento inteiro
    document.addEventListener('click', function () {
        // Verificar se o menu está ativo
        if (menuNav.classList.contains('active')) {
            menuNav.classList.remove('active');
        }
    });

    // Impedir que cliques dentro do menuNav fechem o menu
    menuNav.addEventListener('click', function (event) {
        event.stopPropagation();
    });
});
