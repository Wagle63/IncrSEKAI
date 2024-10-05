
const preIsekaiContainer = document.getElementById('pre-isekai-container');
const gameContainer = document.getElementById('game-container');
const playerContainer = document.getElementById('player-container');
const shopContainer = document.getElementById('shop-container');
const runicForgeContainer = document.getElementById('runic-forge-container');

// La primera es xq en unlock 0 es la gui inicial
const cachedGUIs = [() => { }, showISEKAIGUI, showShopGUI, showRunicForgeUI];
const cachedUpdates = [updateDamage, updateGold, updatePlayerDefense, updateHealingSpell, updatePlayerHealth, updateEnemyHealth];


async function updateALLGUI() {
    for (let i = 0; i <= unlocks; i++) {
        cachedGUIs[i]();
    }
    for (let i = 0; i < cachedUpdates.length; i++) {
        cachedUpdates[i]();
    }
}

// Función para ocultar la interfaz pre-isekai
function hideStartingGUI() {
    preIsekaiContainer.style.display = 'none';
    if (unlocks == 0) {
        showMessagesWithDelay(startingMessages);
        unlocks++;
    }
}

// Función para mostrar la interfaz inicial del isekai
function showISEKAIGUI() {
    // TODO? añadir animacion
    hideStartingGUI();
    gameContainer.style.cursor = 'all-scroll';
    playerContainer.style.display = 'grid';
    showEnemiesGUI();
}
function showEnemiesGUI() {
    enemyContainer.style.display = 'grid';
    enemyNameDisplay.textContent = enemies[currentEnemy].name;
    enemyHealthDisplay.textContent = enemyHealth;
}

// Función para mostrar la interfaz de la tienda
function showShopGUI() {
    shopContainer.style.display = 'grid';
    if (unlocks == 1) {
        showMessagesWithDelay(shopMessages);
        unlocks++;
    }
}

// Función para mostrar la interfaz de la forja rúnica
function showRunicForgeUI() {
    runicForgeContainer.style.display = 'grid';
    notifyDialog();
    if (unlocks == 2) {
        showMessagesWithDelay(runicForgeMessages);
        unlocks++;
    }
}
