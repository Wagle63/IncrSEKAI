// Variables del juego
let elementsDialog = 0;
let unlocks = 0;
let activeDialog = [];

// Referencias a elementos HTML
const dialog = document.getElementById('dialog-text');
const btnAchivments = document.getElementById('achivments-button');
const achivmentsContainer = document.getElementById('achivments-container');
const dialogContainer = document.getElementById('dialog-container');

// Función para mostrar los mensajes con un delay
async function showMessagesWithDelay(messages) {
    activeDialog.push(messages);
    return new Promise((resolve) => {
        let index = 0;
        function showNextMessage() {
            if (activeDialog.length == 0) { resolve(); }
            if (activeDialog[0].length > 0) {
                const message = activeDialog[0][0];
                showDialog(message.text);
                activeDialog[0].shift();
                setTimeout(showNextMessage, message.delay);
            } else {
                activeDialog.shift();
            }
        }
        notifyDialog();
        showNextMessage();
        // asi como esta si llega otro dialogo va a ~doble de velocidad
        // no es a proposito pero es util
    });
}

// Función para mostrar un dialogo
async function showDialog(t) {
    const newMessage = document.createElement('div'); // Usa 'div' para que cada mensaje esté en su propia línea
    newMessage.textContent = t;
    dialog.appendChild(newMessage);
    elementsDialog++;
    if (elementsDialog >= 5) {
        dialog.removeChild(dialog.firstChild);
        elementsDialog--;
    }
};

btnAchivments.addEventListener('click', () => {
    if (achivmentsContainer.style.display == 'block') {
        achivmentsContainer.style.display = 'none';
    } else {
        achivmentsContainer.style.display = 'block';
    }
});






// Funciones para cargar y guardar el estado del juego
async function saveGame() {
    let gameData = {
        playerDamage: playerDamage,
        playerHealth: playerHealth,
        playerDefense: playerDefense,
        regeneration: regeneration,
        gold: gold,
        healingSpell: healingSpell,
        damageUpgradeCost: damageUpgradeCost,
        healingSpellUpgradeCost: healingSpellUpgradeCost,
        study: study,
        unlocks: unlocks,
        enemyHealth: enemyHealth,
        healingSpellUpgradeFunctions: healingSpellUpgradeFunctions.length,
        updateEnemyHealthFunctions: updateEnemyHealthFunctions.length,
    };
    localStorage.setItem('gameData', JSON.stringify(gameData));
    //console.log(localStorage.getItem('gameData'));
}

setInterval(saveGame, 10000);

function loadGame() {
    let savedData = JSON.parse(localStorage.getItem('gameData'));
    if (savedData) {
        playerDamage = savedData.playerDamage;
        playerHealth = savedData.playerHealth;
        playerDefense = savedData.playerDefense;
        regeneration = savedData.regeneration;
        gold = savedData.gold;
        healingSpell = savedData.healingSpell;
        damageUpgradeCost = savedData.damageUpgradeCost;
        healingSpellUpgradeCost = savedData.healingSpellUpgradeCost;
        study = savedData.study;
        unlocks = savedData.unlocks;
        enemyHealth = savedData.enemyHealth;
        if (savedData.healingSpellUpgradeFunctions == 1) {
            healingSpellUpgradeFunctions.shift();
            showHealingSpellButton();
        }
        if (savedData.updateEnemyHealthFunctions == 1) {
            updateEnemyHealthFunctions.shift();
        }
        updateALLGUI();
    }
}

function resetGame() {
    localStorage.removeItem('gameData');
    location.reload();
}
