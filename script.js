// Seleciona os elementos necessários
const drawButton = document.getElementById('drawButton');
const checkNumbersButton = document.getElementById('checkNumbersButton');
const result = document.getElementById('result');
const sortedNumbersDiv = document.getElementById('sortedNumbers');
const bingoModeSelect = document.getElementById('bingoMode');

// Arrays para armazenar os números e letras sorteados
let drawnNumbers = [];
let drawnLetters = [];

// Alfabeto para o modo de bingo com letras
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

// Função para sortear um número entre 1 e 75
function getRandomNumber() {
    if (drawnNumbers.length >= 75) {
        alert("Todos os números foram sorteados!");
        return null;
    }
    
    let number;
    do {
        number = Math.floor(Math.random() * 75) + 1;
    } while (drawnNumbers.includes(number));
    
    drawnNumbers.push(number);
    return number;
}

// Função para sortear uma letra
function getRandomLetter() {
    if (drawnLetters.length >= 26) {
        alert("Todas as letras foram sorteadas!");
        return null;
    }

    let letter;
    do {
        letter = alphabet[Math.floor(Math.random() * alphabet.length)];
    } while (drawnLetters.includes(letter));

    drawnLetters.push(letter);
    return letter;
}

// Função para falar um número ou letra usando SpeechSynthesis
function speak(text) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'pt-BR';
    window.speechSynthesis.speak(msg);
}

// Função para sortear de acordo com o modo selecionado
drawButton.addEventListener('click', () => {
    const mode = bingoModeSelect.value;
    let resultText;
    
    if (mode === "numbers") {
        const number = getRandomNumber();
        if (number !== null) {
            resultText = `Número sorteado: ${number}`;
            speak(`Número ${number}`);
        }
    } else if (mode === "letters") {
        const letter = getRandomLetter();
        if (letter !== null) {
            resultText = `Letra sorteada: ${letter}`;
            speak(`Letra ${letter}`);
        }
    }

    if (resultText) {
        result.textContent = resultText;
    }
});

// Função para exibir os sorteios já realizados
checkNumbersButton.addEventListener('click', () => {
    const mode = bingoModeSelect.value;
    
    if (mode === "numbers") {
        if (drawnNumbers.length > 0) {
            sortedNumbersDiv.innerHTML = `<strong>Números sorteados:</strong> ${drawnNumbers.join(', ')}`;
            speak(`Números sorteados: ${drawnNumbers.join(', ')}`);
        } else {
            sortedNumbersDiv.textContent = "Nenhum número foi sorteado ainda.";
        }
    } else if (mode === "letters") {
        if (drawnLetters.length > 0) {
            sortedNumbersDiv.innerHTML = `<strong>Letras sorteadas:</strong> ${drawnLetters.join(', ')}`;
            speak(`Letras sorteadas: ${drawnLetters.join(', ')}`);
        } else {
            sortedNumbersDiv.textContent = "Nenhuma letra foi sorteada ainda.";
        }
    }
});
