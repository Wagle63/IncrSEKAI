
// re
const healingSpellButton = document.getElementById('healingSpell-button');
const goldDisplay = document.getElementById('gold');
const regenerationDisplay = document.getElementById('regeneration');
const playerDamageDisplay = document.getElementById('player-damage-value');
const healthDisplay = document.getElementById('player-health-value');

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
healingSpellButton.addEventListener('click', () => { castHealingSpell() });

function updateHealingSpell() {
    healingSpellButton.textContent = `Curar ${healingSpell} de vida`;
}

function updatePlayerHealth() {
    healthDisplay.textContent = playerHealth.toFixed(1);
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

// Función para calcular la defensa del jugador
function updateDefense() {
    defense += 0.1;
}

// Función para actualizar el daño del jugador
function updateDamage() {
    playerDamageDisplay.textContent = damage;
}

// Función para actualizar el oro del jugador
function updateGold() {
    goldDisplay.textContent = gold;
    if (unlocks == 1) {
        shopContainer.style.display = 'grid';
        unlocks++;
    }
}

// Funcion de notificacion de vida baja
function lowHealthNotification() {
    if (lastLowHealthNotification + 60000 < Date.now()) {
        lastLowHealthNotification = Date.now();
        showDialog("Estas demasido herido, no puedes pelear");
    }
}
