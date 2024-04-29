//LINK REF: https://www.youtube.com/watch?v=oQ3_p4oCzDE&t=52s

const botaoPdf = document.querySelector("#button-pdf");

botaoPdf.addEventListener("click", () => {

    const content = document.querySelector("#etiqueta-imprimir");
    //Opções de formatação do documento (Acertar parte visual)
    //Options genérica por hora
    const options = {
        //Nome do arquivo podemos puxar o protocolo ou nome + protocolo, falta definir.
        filename: "etiquetaTeste.pdf",
        html2canvas: { scale: 2 },
        jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
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

            let url = new URL('Etiqueta.html', window.location.origin);
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    url.searchParams.append(key, data[key]);
                }
            }
        
            window.location.href = url.href;

        } else {
            console.error('Erro ao cadastrar produto:', await response.text());
        }

    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
    }
}


//LINK REF: https://www.youtube.com/watch?v=D_f7rGBMuPI

async function cadastrarUser() {

    const bcrypt = require('bcrypt');

    let userName = document.getElementById('userName').value;
    let userEmail = document.getElementById('userEmail').value;
    let userPassword = document.getElementById('userPassword').value;
    let phoneNumberUser = document.getElementById('phoneNumberUser').value;

    try {
        let hashUserPassword = await bcrypt.hash(userPassword, 8);

        const user = {
            userName,
            userEmail,
            hashUserPassword,
            phoneNumberUser,
        };

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


//Necessario acessar db
function gerarQrCode(protocolo) {

    let divQrCode = document.getElementsByClassName('Etiqueta_full_right_protocol');


    if (protocolo) {

        divQrCode.innerHTML = '';

        let qrcode = new QRCode(divQrCode, {
            text: protocolo,
            width: 128,
            height: 128,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: qrcode.CorrectLevel.H
        });
    } else {
        console.error("Protocolo inválido, digite novamente!", error);
    }
}


//Testes Carregar conteúdo:

function getParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get(param);
    console.log(`Parameter ${param}:`, value);
    
    return value;

}

function carregarEtiqueta() {
    console.log("Executando carregarEtiqueta()");


    let idProduct = getParameter('idProduct');
    let productName = getParameter('productName');
    let descriptionProduct = getParameter('descriptionProduct');
    let materialType = getParameter('materialType');
    let weightProduct = getParameter('weightProduct');
    let supplierProduct = getParameter('supplierProduct');
    let weightGroupProduct = getParameter('weightGroupProduct');
    let quantityGroupProduct = getParameter('quantityGroupProduct');

    document.getElementById('idProduct').textContent = 'Id: ' + idProduct;
    document.getElementById('productName').textContent = 'Nome do produto: ' + productName;
    document.getElementById('descriptionProduct').textContent = 'Descrição: ' + descriptionProduct;
    document.getElementById('materialType').textContent = 'Material: ' + materialType;
    document.getElementById('weightProduct').textContent = 'Peso: ' + weightProduct;
    document.getElementById('supplierProduct').textContent = 'Fornecedor: ' + supplierProduct;
    document.getElementById('weightGroupProduct').textContent = 'Peso do conjunto: ' + weightGroupProduct;
    document.getElementById('quantityGroupProduct').textContent = 'Quantidade: ' + quantityGroupProduct;
}