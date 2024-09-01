const drawButton = document.getElementById('drawButton');
const result = document.getElementById('result');
let drawnNumbers = [];

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

function speakNumber(number) {
    const msg = new SpeechSynthesisUtterance(`Número ${number}`);
    msg.lang = 'pt-BR';
    window.speechSynthesis.speak(msg);
}

drawButton.addEventListener('click', () => {
    const number = getRandomNumber();
    if (number !== null) {
        result.textContent = `Número sorteado: ${number}`;
        speakNumber(number);
    }
});
