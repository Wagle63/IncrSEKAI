let maxHealth = 10;
let playerHealth = maxHealth;
let damage = 1;
let regeneration = 0.1;
let enemyHealth = 10;
let gold = 0;
let defense = 0.1;
let lastLowHealthNotification = 0;
let enemyDamage = 1;
let damageUpgradeCost = 1;
let healingSpellUpgradeCost = 1;
let healingSpell = 0;

// Referencias a elementos HTML
const gameContainer = document.getElementById('game-container');
const playerContainer = document.getElementById('player-container');
const enemyContainer = document.getElementById('enemy-container');
const attackButton = document.getElementById('attack-button');
const damageUpgradeDamageButton = document.getElementById('damage-upgrade-button');
const enemyHealthDisplay = document.getElementById('enemy-health-value');
const shopContainer = document.getElementById('shop-container');
const healingSpellUpgradeButton = document.getElementById('healingSpell-upgrade-button');

// Configuración inicial de los elementos HTML
function showISEKAIUI() {
    // TODO? añadir animacion
    unlocks = 1;
    gameContainer.style.cursor = 'all-scroll';
    playerContainer.style.display = 'grid';
    enemyContainer.style.display = 'grid';
}

// Función para atacar al enemigo
function attackEnemy() {
    if (playerHealth <= 1) {
        lowHealthNotification();
        return;
    }
    enemyHealth -= damage;
    if (Math.random() < (1 - defense)) {
        if (playerHealth <= enemyDamage) {
            playerHealth = 0.1;
        } else {
            playerHealth -= enemyDamage;
        }
        updatePlayerHealth();
    }
    if (enemyHealth <= 0) {
        enemyHealth = 10;
        enemyHealthDisplay.textContent = enemyHealth;
        gold++;
        updateGold();
    } else {
        enemyHealthDisplay.textContent = enemyHealth;
    }
}
attackButton.addEventListener('click', () => {
    attackEnemy();
});


// // Generar puntos por segundo automáticamente
// setInterval(() => {
//     score += pointsPerSecond;
//     updateScore();
// }, 1000);

// Función para comprar mejoras de daño
function buyDamageUpgrade() {
    if (gold >= damageUpgradeCost) {
        gold -= damageUpgradeCost;
        damage++;
        damageUpgradeCost = (damageUpgradeCost * 2);
        damageUpgradeDamageButton.innerText = `Mejorar arma \n Costo: ${damageUpgradeCost.toFixed(0)}`;
        updateDamage();
        updateGold();
    }
}
damageUpgradeDamageButton.addEventListener('click', () => {
    buyDamageUpgrade();
});


// Función para comprar mejoras de curación
function buyHealingUpgrade() {
    if (gold >= healingSpellUpgradeCost) {
        gold -= healingSpellUpgradeCost;
        healingSpell += 1;
        healingSpellUpgradeCost = (healingSpellUpgradeCost * 2);
        healingSpellUpgradeButton.innerText = `Mejorar hechizo de cura\n Costo: ${healingSpellUpgradeCost.toFixed(0)}`;
        updateHealingSpell();
        updateGold();
    }
}
function FIRSTbuyHealingUpgrade() {
    if (gold >= healingSpellUpgradeCost) {
        buyHealingUpgrade();
        healingSpellButton.style.display = 'block';
        healingSpellUpgradeButton.removeEventListener('click', FIRSTbuyHealingUpgrade);
        healingSpellUpgradeButton.addEventListener('click', buyHealingUpgrade);
    }
}
healingSpellUpgradeButton.addEventListener('click', () => { FIRSTbuyHealingUpgrade() });

