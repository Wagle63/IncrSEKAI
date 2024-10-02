let study = 0;

// Referencias a elementos HTML
const preIsekaiContainer = document.getElementById('pre-isekai-container');
const studyDisplay = document.getElementById('study');
const startButton = document.getElementById('start-button');
const studyButton = document.getElementById('study-button');

// Función para incrementar el puntaje al hacer clic
studyButton.addEventListener('click', () => {
    study++;
    if (study == 3) {
        showDialog("Ya estudie suficiente, deberia ir a comprar algo de comer");
    }
});

// Función para comenzar el juego
startButton.addEventListener('click', async () => {
    hideStartingUI();
    notifyDialog();
    await showMessagesWithDelay(startingMessages);
    showISEKAIUI();
});

function hideStartingUI() {
    preIsekaiContainer.style.display = 'none';
}
