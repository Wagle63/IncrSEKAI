let damageUpgradeCost = 1;
let healingSpellUpgradeCost = 1;


// Referencias a elementos HTML
const gameContainer = document.getElementById('game-container');
const playerContainer = document.getElementById('player-container');
const damageUpgradeDamageButton = document.getElementById('damage-upgrade-button');
const shopContainer = document.getElementById('shop-container');
const healingSpellUpgradeButton = document.getElementById('healingSpell-upgrade-button');

// Configuración inicial de los elementos HTML
function showISEKAIUI() {
    // TODO? añadir animacion
    unlocks = 2;
    gameContainer.style.cursor = 'all-scroll';
    playerContainer.style.display = 'grid';
    showEnemiesUI();
}


// Función para comprar mejoras de daño
function buyDamageUpgrade() {
    if (gold >= damageUpgradeCost) {
        gold -= damageUpgradeCost;
        playerDamage++;
        damageUpgradeCost = (damageUpgradeCost * 2);
        damageUpgradeDamageButton.innerText = `Mejorar arma a ${materiales[playerDamage]} \n Costo: ${damageUpgradeCost.toFixed(0)}`;
        updateDamage();
        updateGold();
    }
    if (playerDamage == 4) {
        showRunicForgeUI();
        unlocks++;
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

