// apagar aqui

const convertButton = document.querySelector('.convert-button');
const currencySelect = document.querySelector('.currency-select');
const fromCurrencySelect = document.querySelector('.currency-from');
const currencyName = document.querySelector('.currency');  // Nome da moeda
const currencyFlag = document.querySelector('.currency-flag');  // Bandeira da moeda
const inputCurrency = document.querySelector('.input-currency');  // Input de valor da moeda


// Função para atualizar a moeda, bandeira e formatar o valor
function updateCurrencyValue() {
    const selectedCurrency = fromCurrencySelect.value;  // Pega o valor do select

    console.log('Moeda selecionada:', selectedCurrency); // Exibe a moeda no console

    let rawValue = inputCurrency.value.replace(/[^\d.-]/g, ''); // Remover símbolos e manter apenas números


    // Atualiza o nome da moeda, a bandeira e formata o valor
    if (selectedCurrency === 'real') {
        currencyName.innerHTML = "Real Brasileiro";  // Nome da moeda
        currencyFlag.src = "./assets/Real.png";  // Bandeira ou imagem do Real
        currencyFlag.alt = "Bandeira do Real";  // Descrição alternativa

        // Exibindo a formatação para Real na área de conversão
        document.querySelector('.currency-value-to-convert').innerHTML = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(rawValue);  // Formata o valor com o símbolo do Real
    } else if (selectedCurrency === 'dolar') {
        currencyName.innerHTML = "Dólar Americano";  // Nome da moeda
        currencyFlag.src = "./assets/dolar.png";  // Bandeira ou imagem do Dólar
        currencyFlag.alt = "Bandeira do Dólar";  // Descrição alternativa

        // Exibindo a formatação para Dólar na área de conversão
        document.querySelector('.currency-value-to-convert').innerHTML = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(rawValue);  // Formata o valor com o símbolo do Dólar
    }
}


function convertValues() {
    let inputCurrencyValue = parseFloat(inputCurrency.value.replace(/[^\d.-]/g, '')); // Limpeza do valor e conversão para número

    const currencyValueToConvert = document.querySelector('.currency-value-to-convert'); // valor em real
    const currencyValueConvertd = document.querySelector('.currency-value'); // valor em dolar e outras moedas

    const dolarToday = 5.2; // Taxa do Dólar
    const euroToday = 6.2; // Taxa do Euro
    const libraToday = 7.2; // Taxa da Libra
    const ieneToday = 0.5; // Taxa do Iene
    const francoSuiçoToday = 0.92;

    if (isNaN(inputCurrencyValue) || inputCurrencyValue <= 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    // Conversão de Dólar para outras moedas (Euro, Libra, Iene, Real)
    if (fromCurrencySelect.value === 'dolar') {
        if (currencySelect.value == "dolar") {
            // Caso Dólar para Dólar, retorna o valor sem conversão
            currencyValueConvertd.innerHTML = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(inputCurrencyValue);  // Simplesmente exibe o valor em Dólar
        } else if (currencySelect.value == "euro") {
            currencyValueConvertd.innerHTML = new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'EUR',
            }).format(inputCurrencyValue * (euroToday / dolarToday));  // Dólar para Euro
        } else if (currencySelect.value == "libra") {
            currencyValueConvertd.innerHTML = new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',
            }).format(inputCurrencyValue * (libraToday / dolarToday));  // Dólar para Libra
        } else if (currencySelect.value == "iene") {
            currencyValueConvertd.innerHTML = new Intl.NumberFormat('ja-JP', {
                style: 'currency',
                currency: 'JPY',
            }).format(inputCurrencyValue * (dolarToday / ieneToday));  // Dólar para Iene
        } else if (currencySelect.value == "real") {
            currencyValueConvertd.innerHTML = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(inputCurrencyValue * dolarToday);  // Dólar para Real
        } else if (currencySelect.value == "franco") {
            // Dólar para Franco Suíço
            currencyValueConvertd.innerHTML = new Intl.NumberFormat('de-CH', {
                style: 'currency',
                currency: 'CHF',
            }).format(inputCurrencyValue * francoSuiçoToday);  // Dólar para Franco Suíço
        }
    }

    // Converter de Real para as outras moedas (Dólar, Euro, Libra)
    else if (fromCurrencySelect.value === 'real') {
        if (currencySelect.value == "real") {
            // Caso Real para Real, retorna o valor sem conversão
            currencyValueConvertd.innerHTML = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(inputCurrencyValue);  // Simplesmente exibe o valor em Real
        }
        if (currencySelect.value == "dolar") {
            currencyValueConvertd.innerHTML = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(inputCurrencyValue / dolarToday);
        }

        if (currencySelect.value == "euro") {
            currencyValueConvertd.innerHTML = new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'EUR',
            }).format(inputCurrencyValue / euroToday);
        }

        if (currencySelect.value == "libra") {
            currencyValueConvertd.innerHTML = new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',
            }).format(inputCurrencyValue / libraToday);
        }

         if (currencySelect.value == "franco") {
            // Real para Franco Suíço
            currencyValueConvertd.innerHTML = new Intl.NumberFormat('de-CH', {
                style: 'currency',
                currency: 'CHF',
            }).format(inputCurrencyValue / francoSuiçoToday);  // Real para Franco Suíço
        }

        if (currencySelect.value == "iene") {
            currencyValueConvertd.innerHTML = new Intl.NumberFormat('ja-JP', {
                style: 'currency',
                currency: 'JPY',
            }).format(inputCurrencyValue / ieneToday);
        }
    }

    // Aqui, formatamos o valor de acordo com a moeda de origem
    if (fromCurrencySelect.value == 'real') {
        currencyValueToConvert.innerHTML = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(inputCurrencyValue);  // Formata para Real
    } else if (fromCurrencySelect.value == 'dolar') {
        currencyValueToConvert.innerHTML = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(inputCurrencyValue);  // Formata para Dólar
    }

}

function changeCurreny() {
    const currencyName = document.getElementById("currency-name");
    const currencyImg = document.querySelector('.currency-img');


    if (currencySelect.value == "dolar") {
        currencyName.innerHTML = "Dólar Americano";
        currencyImg.src = "./assets/dolar.png";
    } else if (currencySelect.value == "euro") {
        currencyName.innerHTML = "Euro";
        currencyImg.src = "./assets/euro.png";
    } else if (currencySelect.value == "libra") {
        currencyName.innerHTML = "£ Libra Esterlina";
        currencyImg.src = "./assets/libra.png";
    } else if (currencySelect.value == "iene") {
        currencyName.innerHTML = "¥ Iene Japonês";
        currencyImg.src = "./assets/jpa.png";
    } else if (currencySelect.value == "real") {
        currencyName.innerHTML = "Real Brasileiro";
        currencyImg.src = "./assets/Real.png";
    } else if (currencySelect.value == "franco") {
        currencyName.innerHTML = "₣ Franco Suíço";
        currencyImg.src = "./assets/franco.jpg";
    }


    convertValues();
}

// Adicionando evento de mudança no select da moeda de origem
fromCurrencySelect.addEventListener('change', function () {
    updateCurrencyValue();
    convertValues();
});


// Adicionando evento de mudança no select de destino
currencySelect.addEventListener('change', convertValues);
fromCurrencySelect.addEventListener('change', updateCurrencyValue);
currencySelect.addEventListener('change', changeCurreny);
convertButton.addEventListener('click', convertValues);


