let damageUpgradeCost = 1;
let healingSpellUpgradeCost = 1;

// Referencias a elementos HTML
const damageUpgradeDamageButton = document.getElementById('damage-upgrade-button');
const healingSpellUpgradeButton = document.getElementById('healingSpell-upgrade-button');

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
    }
}
damageUpgradeDamageButton.addEventListener('click', () => {
    buyDamageUpgrade();
});


// Función para comprar mejoras de curación
let healingSpellUpgradeFunctions = [FIRSTbuyHealingUpgrade, buyHealingUpgrade];
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
        showHealingSpellButton();
        healingSpellUpgradeFunctions.shift();
    }
}
healingSpellUpgradeButton.addEventListener('click', () => { healingSpellUpgradeFunctions[0]() });


