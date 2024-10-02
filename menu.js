
const dialogContainer = document.getElementById('dialog-container');


// Función para notificar de un mensaje
async function notifyDialog() {
    let delay = 300;
    let colors = ['d82dbb', 'ccc'];
    changeColorDialog(colors[0]);
    for (let i = 1; i < 4 * 2; i++) {
        setTimeout(() => { changeColorDialog(colors[i % 2]) }, delay);
        delay+= (delay/i);
    }
}

// Función para cambiar color
async function changeColorDialog(color) {
    dialogContainer.style.borderColor = "#" + color;
}
