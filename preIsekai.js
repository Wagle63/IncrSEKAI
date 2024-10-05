let study = 0;

// Función para incrementar el puntaje al hacer clic
studyButton.addEventListener('click', () => {
    study++;
    if (study == 3) {
        showDialog("Ya estudie suficiente, deberia ir a comprar algo de comer");
    }
});

// Función para comenzar el juego
startButton.addEventListener('click', async () => {
    hideStartingGUI();
    showISEKAIGUI();
});

