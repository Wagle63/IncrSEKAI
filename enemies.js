let currentEnemy = 0;
let enemyHealth = enemies[currentEnemy].health;

// Referencias a elementos HTML
const enemyContainer = document.getElementById('enemy-container');
const enemyNameDisplay = document.getElementById('enemy-name');
const enemyHealthDisplay = document.getElementById('enemy-health-value');
const attackButton = document.getElementById('attack-button');

// Función para mostrar la interfaz de enemigos
function showEnemiesUI() {
    enemyContainer.style.display = 'grid';
    enemyNameDisplay.textContent = enemies[currentEnemy].name;
    enemyHealthDisplay.textContent = enemyHealth;
}

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


// Funcion para actualizar vida del enemigo
let updateEnemyHealthFunctions = [FIRSTupdateEnemyHealth, updateEnemyHealth];
function FIRSTupdateEnemyHealth() {
    if (enemyHealth <= 0) {
        enemyHealth = enemies[currentEnemy].health;
        gold++;
        updateGold();
        shopContainer.style.display = 'grid';
        unlocks++;
        updateEnemyHealthFunctions.shift();
    }
    enemyHealthDisplay.textContent = enemyHealth;
}
function updateEnemyHealth() {
    if (enemyHealth <= 0) {
        enemyHealth = enemies[currentEnemy].health;
        gold++;
        updateGold();
    }
    enemyHealthDisplay.textContent = enemyHealth;
}
