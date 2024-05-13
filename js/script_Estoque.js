window.onload = function () {
    fetchAndRenderItems();
};

let itemsData = [];

function fetchAndRenderItems() {
    fetch('https://662eceed43b6a7dce30dce42.mockapi.io/product')
        .then(response => response.json())
        .then(data => {
            console.log('Dados recuperados do banco de dados:', data);
            itemsData = data;
            renderItems(itemsData.slice(0, 12)); // Renderiza os primeiros 12 itens
        })
        .catch(error => console.error('Erro ao buscar itens:', error));
}

function renderItems(items) {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';

    if (items.length === 0) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = 'Nenhum item encontrado.';
        messageDiv.classList.add('msg');
        document.getElementById('msg').appendChild(messageDiv);
        return;
    }

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <h3>ID: ${item.idProduct}</h3>
            <p>Nome: ${item.productName}</p>
            <p>Descrição: ${item.descriptionProduct}</p>
            <p>Quantidade: ${item.quantityGroupProduct || 'N/A'}</p>
            <button onclick="deleteItem('${item.idProduct}')">Excluir</button>
        `;
        itemList.appendChild(itemDiv);
    });

    renderPagination();
}

function deleteItem(id) {
    if (confirm('Tem certeza que deseja excluir este item?')) {
        fetch(`https://662eceed43b6a7dce30dce42.mockapi.io/product/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    console.log('Item excluído com sucesso');
                    fetchAndRenderItems(); // Atualiza a lista de itens após excluir
                } else {
                    console.error('Falha ao excluir o item');
                }
            })
            .catch(error => console.error('Erro ao excluir o item:', error));
    }
}

function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(itemsData.length / 12); // Considerando 12 itens por página
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => changePage(i));
        paginationContainer.appendChild(pageButton);
    }
}

function changePage(pageNumber) {
    window.scrollTo(0, 0); // Rolando para o topo da página
    const startIndex = (pageNumber - 1) * 12; // Considerando 12 itens por página
    const endIndex = startIndex + 12; // Considerando 12 itens por página
    const itemsToShow = itemsData.slice(startIndex, endIndex);
    renderItems(itemsToShow);
}

function filterItems() {
    const filterValue = document.getElementById('searchInput').value.toLowerCase();
    const filteredItems = itemsData.filter(item => {
        return item.productName.toLowerCase().includes(filterValue) || item.idProduct.includes(filterValue);
    });

    if (filteredItems.length === 0) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = 'Nenhum item encontrado.';
        messageDiv.classList.add('msg');
        document.getElementById('msg').innerHTML = ''; // Limpa mensagens anteriores
        document.getElementById('msg').appendChild(messageDiv);
        setTimeout(resetFilters, 2000); // Resetar após 2 segundos
    } else {
        document.getElementById('msg').innerHTML = ''; // Limpa mensagens anteriores
        renderItems(filteredItems);
    }
}

function resetFilters() {
    document.getElementById('searchInput').value = ''; // Limpa o valor da caixa de pesquisa
    fetchAndRenderItems(); // Renderiza todos os itens novamente
}
