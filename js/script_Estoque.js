window.onload = function () {
    fetchAndRenderItems();

    // Verificar se a URL contém o parâmetro `edit`
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    if (editId) {
        // Espera até que os itens sejam carregados antes de abrir o modal
        fetch('https://662eceed43b6a7dce30dce42.mockapi.io/product')
            .then(response => response.json())
            .then(data => {
                console.log('Dados recuperados do banco de dados:', data);
                itemsData = data;
                renderItems(itemsData.slice(0, 12)); // Renderiza os primeiros 12 itens
                
                // Abrir o modal se o parâmetro `edit` estiver presente
                openEditModal(editId);
            })
            .catch(error => console.error('Erro ao buscar itens:', error));
    }
};

let itemsData = [];
let currentEditItemId = null;

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
            <button onclick="openEditModal('${item.idProduct}')">Editar</button>
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

function openEditModal(id) {
    console.log('Abrindo modal de edição para o ID:', id);
    currentEditItemId = id;
    const item = itemsData.find(item => item.idProduct === id);
    if (item) {
        document.getElementById('editId').value = item.idProduct;
        document.getElementById('editName').value = item.productName;
        document.getElementById('editDescription').value = item.descriptionProduct;
        document.getElementById('editMaterial').value = item.material;
        document.getElementById('editWeight').value = item.weight;
        document.getElementById('editSupplier').value = item.supplier;
        document.getElementById('editGroupWeight').value = item.groupWeight;
        document.getElementById('editQuantity').value = item.quantityGroupProduct;

        // Alterando a URL
        const newUrl = window.location.origin + window.location.pathname + `?edit=${id}`;
        history.pushState({}, '', newUrl);

        // Exibindo o modal de edição
        document.getElementById('editModal').style.display = 'block';
    }
}

function closeModal() {
    // Alterando a URL de volta ao estado original
    const originalUrl = window.location.origin + window.location.pathname;
    history.pushState({}, '', originalUrl);

    document.getElementById('editModal').style.display = 'none';
}

function saveChanges() {
    console.log('Salvando alterações para o ID:', currentEditItemId);
    const updatedItem = {
        productName: document.getElementById('editName').value,
        descriptionProduct: document.getElementById('editDescription').value,
        material: document.getElementById('editMaterial').value,
        weight: document.getElementById('editWeight').value,
        supplier: document.getElementById('editSupplier').value,
        groupWeight: document.getElementById('editGroupWeight').value,
        quantityGroupProduct: document.getElementById('editQuantity').value
    };

    fetch(`https://662eceed43b6a7dce30dce42.mockapi.io/product/${currentEditItemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedItem)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Item atualizado com sucesso:', data);
            closeModal();
            fetchAndRenderItems();
        })
        .catch(error => console.error('Erro ao atualizar o item:', error));
}

function generateEtiqueta() {
    const editId = document.getElementById('editId').value;
    const editName = document.getElementById('editName').value;
    const editDescription = document.getElementById('editDescription').value;
    const editWeight = document.getElementById('editWeight').value;
    const editMaterial = document.getElementById('editMaterial').value;
    const editSupplier = document.getElementById('editSupplier').value;
    const editGroupWeight = document.getElementById('editGroupWeight').value;
    const editQuantity = document.getElementById('editQuantity').value;

    // Verificar se todos os campos obrigatórios estão preenchidos
    if (!editName || !editDescription || !editWeight || !editMaterial || !editSupplier) {
        console.error('Erro ao gerar etiqueta: campos obrigatórios não preenchidos.');
        return;
    }

    // Obtém os elementos da etiqueta
    const idProductElement = document.getElementById('idProduct');
    const productNameElement = document.getElementById('productName');
    const weightProductElement = document.getElementById('weightProduct');
    const materialTypeElement = document.getElementById('materialType');
    const descriptionProductElement = document.getElementById('descriptionProduct');
    const supplierProductElement = document.getElementById('supplierProduct');
    const quantityGroupProductElement = document.getElementById('quantityGroupProduct');
    const weightGroupProductElement = document.getElementById('weightGroupProduct');

    // Verifica se os elementos foram corretamente obtidos
    if (!idProductElement || !productNameElement || !weightProductElement || !materialTypeElement ||
        !descriptionProductElement || !supplierProductElement) {
        console.error("Erro ao obter elementos da etiqueta.");
        return;
    }

    // Define o conteúdo da etiqueta
    idProductElement.textContent = "Id: " + editId;
    productNameElement.textContent = "Nome do Produto: " + productName;
    weightProductElement.textContent = "Peso: " + weight + "Kg";
    materialTypeElement.textContent = "Material: " + material;
    descriptionProductElement.textContent = "Descrição: " + descriptionProduct;
    supplierProductElement.textContent = "Fornecedor: " + supplier;

    if (groupWeight && quantityGroupProduct) {
        quantityGroupProductElement.textContent = "Quantidade: " + quantityGroupProduct;
        weightGroupProductElement.textContent = "Peso do Conjunto: " + groupWeight + "Kg";
    }

    // Gera o QR Code
    gerarQrCode(editId);
}




function gerarQrCode(idProduct) {
    let textoQRCode = 'https://qrstock-control.vercel.app/estoque.html?edit=' + idProduct;

    if (idProduct) {
        new QRCode(document.getElementById('Etiqueta_full_right_protocol'), {
            text: textoQRCode,
            width: 320,
            height: 320,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    } else {
        console.error("Protocolo inválido, digite novamente!");
    }
}