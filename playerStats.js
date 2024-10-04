let maxHealth = 10;
let playerHealth = maxHealth;
let lastLowHealthNotification = 0;
let healingSpell = 0;
let gold = 0;
let playerDefense = 0.1;
let playerDamage = 1;
let regeneration = 0.1;

// Referencias a elementos HTML
const goldDisplay = document.getElementById('gold');
const regenerationDisplay = document.getElementById('regeneration');
const playerDamageDisplay = document.getElementById('player-damage-value');
const healthDisplay = document.getElementById('player-health-value');
const healingSpellButton = document.getElementById('healingSpell-button');

// Función para curar al jugador
function healPlayer() {
    playerHealth += 1;
    healthDisplay.textContent = playerHealth.toFixed(1);
}

// Función para lanzar el hechizo de curación
function castHealingSpell() {
    if (playerHealth <= maxHealth) {
        if (playerHealth <= maxHealth - healingSpell) {
            playerHealth += healingSpell;
        } else {
            playerHealth = maxHealth;
        }
        updatePlayerHealth();
    }
}



// Regeneracion pasiva del jugador
function regenerate() {
    playerHealth += regeneration;
    if (playerHealth > maxHealth) {
        playerHealth = maxHealth;
    }
    healthDisplay.textContent = playerHealth.toFixed(1);
}
setInterval(regenerate, 1000);

// Funcion de notificacion de vida baja
function lowHealthNotification() {
    if (lastLowHealthNotification + 60000 < Date.now()) {
        lastLowHealthNotification = Date.now();
        showDialog("Estas demasido herido, no puedes pelear");
    }
}


// Funciones para actualizar
// Función para calcular la defensa del jugador
function updatePlayerDefense() {
    playerDefense += 0.1;
}

// Función para actualizar el daño del jugador
function updateDamage() {
    playerDamageDisplay.textContent = playerDamage;
}

// Función para actualizar el oro del jugador
function updateGold() {
    goldDisplay.innerText = gold;
}

function updateHealingSpell() {
    healingSpellButton.textContent = `Curar ${healingSpell} de vida`;
}

function updatePlayerHealth() {
    healthDisplay.textContent = playerHealth.toFixed(1);
}

// Función para mostrar el botón de curación
function showHealingSpellButton() {
    healingSpellButton.style.display = 'block';
    healingSpellButton.addEventListener('click', () => { castHealingSpell() });
}
