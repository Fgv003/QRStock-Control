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

    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
    }
}


/*
       TESTANDO ABAIXO:
*/


// LINK REF: https://github.com/davidshimjs/qrcodejs?utm_source=cdnjs&utm_medium=cdnjs_link&utm_campaign=cdnjs_library

//script de acesso a biblioteca
//<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>


//Necessario ter db
function gerarQrCode(protocolo, divQrCodeId) {

    let divQrCode = document.getElementById(divQrCodeId);


    if (protocolo) {

        divQrCode.innerHTML = '';

        let qrcode = new QRCode(divQrCode, {
            text: protocolo,
            width: 128,
            height: 128,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    } else {
        alert("Protocolo inválido, digite novamente!");
    }
}