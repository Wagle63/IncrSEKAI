// Variables del juego
let elementsDialog = 0;
let unlocks = 0;

// Referencias a elementos HTML
const dialog = document.getElementById('dialog-text');

// Función para mostrar los mensajes con un delay
async function showMessagesWithDelay(messages) {
    return new Promise((resolve) => {
        let index = 0;

        function showNextMessage() {
            if (index < messages.length) {
                const message = messages[index];
                showDialog(message.text);
                index++;
                setTimeout(showNextMessage, message.delay);
            } else {
                resolve(); // Resuelve la promesa cuando se hayan mostrado todos los mensajes
            }
        }

        showNextMessage(); // Inicia la secuencia de mensajes
    });
}

// Función para mostrar un dialogo
async function showDialog(t) {
    const newMessage = document.createElement('div'); // Usa 'div' para que cada mensaje esté en su propia línea
    newMessage.textContent = t;
    dialog.appendChild(newMessage);
    elementsDialog++;
    if (elementsDialog >= maxDialog) {
        dialog.removeChild(dialog.firstChild);
        elementsDialog--;
    }
};
