// Seleciona o botão de sorteio, o botão para conferir números e as áreas de resultado
const drawButton = document.getElementById('drawButton');
const checkNumbersButton = document.getElementById('checkNumbersButton');
const result = document.getElementById('result');
const sortedNumbersDiv = document.getElementById('sortedNumbers');

// Array para armazenar os números sorteados
let drawnNumbers = [];

// Função para sortear um número aleatório entre 1 e 75
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

// Função para falar um número usando a API SpeechSynthesis
function speakNumber(number) {
    const msg = new SpeechSynthesisUtterance(`Número ${number}`);
    msg.lang = 'pt-BR';
    window.speechSynthesis.speak(msg);
}

// Função para falar todos os números sorteados
function speakDrawnNumbers() {
    if (drawnNumbers.length > 0) {
        const numbersString = drawnNumbers.join(', ');
        const msg = new SpeechSynthesisUtterance(`Números sorteados: ${numbersString}`);
        msg.lang = 'pt-BR';
        window.speechSynthesis.speak(msg);
    }
}

// Evento para sortear e falar um número
drawButton.addEventListener('click', () => {
    const number = getRandomNumber();
    if (number !== null) {
        result.textContent = `Número sorteado: ${number}`;
        speakNumber(number);
    }
});

// Evento para exibir e falar os números já sorteados
checkNumbersButton.addEventListener('click', () => {
    if (drawnNumbers.length > 0) {
        sortedNumbersDiv.innerHTML = `<strong>Números sorteados:</strong> ${drawnNumbers.join(', ')}`;
        speakDrawnNumbers(); // Chama a função para falar os números sorteados
    } else {
        sortedNumbersDiv.textContent = "Nenhum número foi sorteado ainda.";
    }
});
