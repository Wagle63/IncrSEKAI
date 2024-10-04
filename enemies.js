let currentEnemy = 0;
let enemyHealth = enemies[currentEnemy].health;

// Referencias a elementos HTML
const enemyContainer = document.getElementById('enemy-container');
const enemyNameDisplay = document.getElementById('enemy-name');
const enemyHealthDisplay = document.getElementById('enemy-health-value');
const attackButton = document.getElementById('attack-button');


// Función para atacar al enemigo
function attackEnemy() {
    if (playerHealth <= 1) {
        lowHealthNotification();
        return;
    }
    enemyHealth -= playerDamage;
    if (Math.random() < (1 - playerDefense)) {
        if (playerHealth <= enemies[currentEnemy].damage) {
            playerHealth = 0.1;
        } else {
            playerHealth -= enemies[currentEnemy].damage;
        }
        updatePlayerHealth();
    }
    updateEnemyHealthFunctions[0]();
}
attackButton.addEventListener('click', () => {
    attackEnemy();
});


// Updates
// Funcion para actualizar vida del enemigo
let updateEnemyHealthFunctions = [FIRSTupdateEnemyHealth, updateEnemyHealth];
function FIRSTupdateEnemyHealth() {
    if (enemyHealth <= 0) {
        updateEnemyHealthFunctions.shift();
        showShopGUI();
    }
    updateEnemyHealth();
}
function updateEnemyHealth() {
    if (enemyHealth <= 0) {
        enemyHealth = enemies[currentEnemy].health;
        gold++;
        updateGold();
    }
    enemyHealthDisplay.textContent = enemyHealth;
}
