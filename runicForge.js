let runicSwords = 0;
let egoImbuedCost = 100;
let runicSwordsDamage = 0;

const egoSwordsDisplay = document.getElementById('ego-swords-display');
const buyImbueSwordButton = document.getElementById('buy-imbue-sword-button');



// Función para imbuir con ego la espada
function buyEgoSword() {
    if (playerDamage < 3) {
        showDialog('Tu espada no es lo suficientemente fuerte');
        return;
    }
    if (gold >= egoImbuedCost) {
        gold -= egoImbuedCost;
        egoImbuedCost = (egoImbuedCost * 2);
        runicSwords++;
        egoSwordsDisplay.innerText = `Actualmente tienes ${runicSwords} espadas con ego`;
        buyImbueSwordButton.innerText = `Imbuir espada con ego \n Costo: ${egoImbuedCost.toFixed(0)} de oro`;
        runicSwordsDamage++;
        updateGold();
        playerDamage = 1;
        updateDamage();
    }
}
function FIRSTbuyEgoSword() {
    buyEgoSword();
    if (playerDamage > 3 && gold < egoImbuedCost) { return; }
    buyImbueSwordButton.removeEventListener('click', () => { FIRSTbuyEgoSword(); });
    buyImbueSwordButton.addEventListener('click', () => { atackEgoSwords(); });
    // TODO?: dialogo de ego sword
    setInterval(atackEgoSwords, 1000);
}
buyImbueSwordButton.addEventListener('click', () => { FIRSTbuyEgoSword(); });

// Evento de ataque de espadas con ego
async function atackEgoSwords() {
    if (runicSwords > 0) {
        enemyHealth -= runicSwordsDamage;
        updateEnemyHealth();
    }
}
