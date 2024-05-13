//LINK REF: https://www.youtube.com/watch?v=oQ3_p4oCzDE&t=52s



const botaoPdf = document.querySelector("#button-pdf");

botaoPdf.addEventListener("click", () => {

    const content = document.querySelector("#etiqueta-imprimir");

    let dataString = localStorage.getItem('productData');

    let data = JSON.parse(dataString);

    let tagName = (data.productName + data.idProduct).replace(/\s/g, "_");;

    console.log(tagName);

    const options = {
        filename: tagName,
        html2canvas: { scale: 2 },
        jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "landscape",
            compress: true,
        },
    };
    html2pdf().set(options).from(content).save()

});

async function cadastrarProduto() {

    let productName = document.getElementById('nome').value;
    let descriptionProduct = document.getElementById('descricao').value;
    let materialType = document.getElementById('material').value;
    let weightProduct = document.getElementById('peso_item').value;
    let supplierProduct = document.getElementById('fornecedor').value;

    let weightGroupProduct = document.getElementById('peso_conjunto')?.value || null;
    let quantityGroupProduct = document.getElementById('Qtd_item_conjunto')?.value || null;

    const product = {
        productName,
        descriptionProduct,
        materialType,
        weightProduct,
        supplierProduct,

        weightGroupProduct,
        quantityGroupProduct,
    };

    try {
        let response = await fetch('https://662eceed43b6a7dce30dce42.mockapi.io/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        if (response.ok) {
            let data = await response.json();
            console.log('Produto cadastrado com sucesso!');

            localStorage.setItem('productData', JSON.stringify(data));

            window.location.href = "Etiqueta.html";

        } else {
            console.error('Erro ao cadastrar produto:', await response.text());
        }

    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
    }
}


//LINK REF: https://www.youtube.com/watch?v=D_f7rGBMuPI

async function cadastrarUser() {
    let userName = document.getElementById('userName').value;
    let userEmail = document.getElementById('userEmail').value;
    let userPassword = document.getElementById('userPassword').value;
    let phoneNumberUser = document.getElementById('phoneNumberUser').value;

    const user = {
        userName,
        userEmail,
        userPassword,
        phoneNumberUser,
    };

    try {
        let response = await fetch('https://662eceed43b6a7dce30dce42.mockapi.io/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            console.log('Usuário cadastrado com sucesso!');
            window.location.href = "index.html";
        } else {
            console.error('Erro ao cadastrar usuário:', await response.text());
        }

    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
    }
}

function carregarEtiqueta() {

    let dataString = localStorage.getItem('productData');

    if (dataString) {

        let data = JSON.parse(dataString);


        let idProduct = document.getElementById('idProduct');
        idProduct.textContent = "Id: " + data.idProduct;

        let productName = document.getElementById('productName');
        productName.textContent = "Nome do Produto: " + data.productName;

        let weightProduct = document.getElementById('weightProduct');
        weightProduct.textContent = "Peso: " + data.weightProduct + "Kg";

        let materialType = document.getElementById('materialType');
        materialType.textContent = "Material: " + data.materialType;

        let descriptionProduct = document.getElementById('descriptionProduct');
        descriptionProduct.textContent = "Descrição: " + data.descriptionProduct;

        let supplierProduct = document.getElementById('supplierProduct');
        supplierProduct.textContent = "Fornecedor: " + data.supplierProduct;

        let quantityGroupProduct = document.getElementById('quantityGroupProduct');
        quantityGroupProduct.textContent = "Quantidade: " + data.quantityGroupProduct;

        let weightGroupProduct = document.getElementById('weightGroupProduct');
        weightGroupProduct.textContent = "Peso do Conjunto: " + data.weightGroupProduct + "Kg";

    }

    gerarQrCode();
}


//Em desenvolvimento
function validarUser() {

    const bcrypt = require('bcrypt');


}



/*
       TESTANDO ABAIXO:
*/


// LINK REF: https://github.com/davidshimjs/qrcodejs?utm_source=cdnjs&utm_medium=cdnjs_link&utm_campaign=cdnjs_library

//script de acesso a biblioteca
//<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>


function gerarQrCode() {

    let dataString = localStorage.getItem('productData');
    let data = JSON.parse(dataString);

    let idProtocol = data.idProduct;
    let productName = data.productName;
    let supplierProduct = data.supplierProduct;

    let textoQRCode = 'ID do Produto: '+ idProtocol + '\nNome do Produto: '+ productName +'\nFornecedor do Produto: '+ supplierProduct;

    console.log(textoQRCode);

    if (idProtocol) {

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



