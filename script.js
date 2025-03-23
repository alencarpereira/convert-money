// apagar aqui

const convertButton = document.querySelector('.convert-button');
const currencySelect = document.querySelector('.currency-select');
const fromCurrencySelect = document.querySelector('.currency-from');
const currencyName = document.querySelector('.currency');  // Nome da moeda
const currencyFlag = document.querySelector('.currency-flag');  // Bandeira da moeda
const inputCurrency = document.querySelector('.input-currency');  // Input de valor da moeda

const API_KEY = '62f82c9698fdda65f6c2af7c'; // Coloque a sua chave de API aqui
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

function convertValues() {
    let inputCurrencyValue = parseFloat(inputCurrency.value.replace(/[^\d.-]/g, '')); // Limpeza do valor e conversão para número

    const currencyValueToConvert = document.querySelector('.currency-value-to-convert'); // valor em real
    const currencyValueConvertd = document.querySelector('.currency-value'); // valor em dolar e outras moedas

    const fromCurrency = fromCurrencySelect.value.toUpperCase(); // Moeda de origem selecionada (BRL, USD, etc.)
    const toCurrency = currencySelect.value.toUpperCase(); // Moeda de destino selecionada (BRL, USD, etc.)


    if (isNaN(inputCurrencyValue) || inputCurrencyValue <= 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }
    console.log(`Requisitando taxas de câmbio de ${fromCurrency} para ${toCurrency}`);

        // URL da API correta com o código da moeda (BRL, USD, etc.)
        fetch(`${API_URL}${fromCurrency}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta da API');
            }
            return response.json();
        })
        .then(data => {
            // Verifica se a resposta da API foi bem-sucedida
            if (data.result !== "success") {
                throw new Error("Erro ao obter as taxas de câmbio.");
            }

            // Pega as taxas de câmbio
            const exchangeRate = data.conversion_rates[toCurrency]; 

            if (!exchangeRate) {
                throw new Error(`Não foi possível encontrar a taxa de câmbio para ${toCurrency}`);
            }

            // Realiza a conversão
            const convertedValue = inputCurrencyValue * exchangeRate;

            // Exibe o valor convertido
            currencyValueConvertd.innerHTML = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: toCurrency,
            }).format(convertedValue);

            // Exibe o valor original com base na moeda de origem
            currencyValueToConvert.innerHTML = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: fromCurrency,
            }).format(inputCurrencyValue);
        })
        .catch(error => {
            console.error("Erro na requisição da API:", error);
            alert(`Erro ao obter as taxas de câmbio: ${error.message}`);
        });
}

// Defina um objeto contendo as moedas, bandeiras e formatos
const currencyData = {
    BRL: {
        name: "Real Brasileiro",
        flagSrc: "./assets/Real.png",
        flagAlt: "Bandeira do Real",
        format: 'pt-BR',
        currency: 'BRL'
    },
    USD: {
        name: "Dólar Americano",
        flagSrc: "./assets/dolar.png",
        flagAlt: "Bandeira do Dólar",
        format: 'en-US',
        currency: 'USD'
    },
    EUR: {
        name: "Euro",
        flagSrc: "./assets/euro.png",
        flagAlt: "Bandeira do Euro",
        format: 'de-DE',
        currency: 'EUR'
    },
    GBP: {
        name: "Libra Esterlina",
        flagSrc: "./assets/libra.png",
        flagAlt: "Bandeira da Libra",
        format: 'en-GB',
        currency: 'GBP'
    },
    JPY: {
        name: "Iene Japonês",
        flagSrc: "./assets/jpa.png",
        flagAlt: "Bandeira do Iene Japonês",
        format: 'ja-JP',
        currency: 'JPY'
    },
    CHF: {
        name: "Franco Suíço",
        flagSrc: "./assets/franco.jpg",
        flagAlt: "Bandeira do Franco Suíço",
        format: 'de-CH',
        currency: 'CHF'
    }
};

// Função para atualizar a moeda, bandeira e formatar o valor
function updateCurrencyValue() {
    const selectedCurrency = fromCurrencySelect.value;  // Pega o valor do select
    console.log('Moeda selecionada:', selectedCurrency); // Exibe a moeda no console

    let rawValue = inputCurrency.value.replace(/[^\d.-]/g, ''); // Remover símbolos e manter apenas números

    // Verifica se a moeda selecionada está no objeto 'currencyData'
    if (currencyData[selectedCurrency]) {
        const currencyInfo = currencyData[selectedCurrency];

        // Atualiza o nome da moeda, a bandeira e formata o valor
        currencyName.innerHTML = currencyInfo.name;  // Nome da moeda
        currencyFlag.src = currencyInfo.flagSrc;  // Bandeira ou imagem
        currencyFlag.alt = currencyInfo.flagAlt;  // Descrição alternativa da bandeira

        // Exibindo a formatação para a moeda selecionada na área de conversão
        document.querySelector('.currency-value-to-convert').innerHTML = new Intl.NumberFormat(currencyInfo.format, {
            style: 'currency',
            currency: currencyInfo.currency
        }).format(rawValue);  // Formata o valor com o símbolo da moeda
    } else {
        console.error('Moeda não encontrada no objeto currencyData');
    }
}


// Função para atualizar a moeda de destino
function changeCurrency() {
    const currencyName = document.getElementById("currency-name");
    const currencyImg = document.querySelector('.currency-img');

    switch (currencySelect.value) {
        case "USD":
            currencyName.innerHTML = "Dólar Americano";
            currencyImg.src = "./assets/dolar.png";
            break;
        case "EUR":
            currencyName.innerHTML = "Euro";
            currencyImg.src = "./assets/euro.png";
            break;
        case "GBP":
            currencyName.innerHTML = "Libra Esterlina";
            currencyImg.src = "./assets/libra.png";
            break;
        case "JPY":
            currencyName.innerHTML = "Iene Japonês";
            currencyImg.src = "./assets/jpa.png";
            break;
        case "BRL":
            currencyName.innerHTML = "Real Brasileiro";
            currencyImg.src = "./assets/Real.png";
            break;
        case "CHF":
            currencyName.innerHTML = "Franco Suíço";
            currencyImg.src = "./assets/franco.jpg";
            break;
        default:
            break;
    }

    convertValues();
}

// Adicionando evento de mudança no select da moeda de origem
fromCurrencySelect.addEventListener('change', function () {
    updateCurrencyValue();
    convertValues();
});

// Adicionando evento de mudança no select de destino
currencySelect.addEventListener('change', function () {
   changeCurrency(); // Muda o nome e a bandeira da moeda
    convertValues(); // Realiza a conversão
});

// Adicionando evento de mudança no select de destino
document.querySelector('.convert-button').addEventListener('click', convertValues);
// Adicionando evento de mudança no select de destino
currencySelect.addEventListener('change', convertValues);
fromCurrencySelect.addEventListener('change', updateCurrencyValue);
currencySelect.addEventListener('change', changeCurrency);
convertButton.addEventListener('click', convertValues);


