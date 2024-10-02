const maxDialog = 5;

const boxPositions = [
    { posX: 0, posY: 0 },
    { posX: 0, posY: 0 },
    { posX: -140, posY: 0 },
    { posX: 173, posY: 10 },
    { posX: 165, posY: -200 },
]

const startingMessages = [
    // El primero no tiene delay, el delay es para el siguiente mensaje
    { text: "De regreso de la tienda, te empiezas a sentir cansado", delay: 1000 },
    { text: "Sientes que te pesan los párpados", delay: 1500 },
    { text: "Y pronto te desmayas", delay: 1500 },
    { text: "...", delay: 1000 },
    { text: "...", delay: 1000 },
    { text: "...", delay: 800 },
    { text: "Abres los ojos pero solo logras ver una luz a lo lejos", delay: 2500 },
    { text: "Caminas hacia la luz y te encuentras en un lugar desconocido", delay: 2000 },
    { text: "Te encuentras con criaturas de fantasía, a lo lejos ves un castillo", delay: 1500 },
    { text: "Incluso ves dragones surcando el cielo", delay: 1500 },
    { text: "Y te das cuenta de que estas en otro mundo", delay: 0 }
]

const enemyNames = ["Slime", "Goblin", "Orc", "Troll", "Litch", "Dragon"]

const enemyHealths = [10, 20, 50, 100, 1000]

const enemyDamages = [1, 2, 5, 10, 100]

const enemyGoldRewards = [1, 2, 5, 10, 100]

//const enemyExperienceRewards = []

const materiales = ["Bronce", "Hierro", "Acero", "Mithril", "Adamantium"]

const achievements = [
    { name: "Primera sangre", description: "Derrota a tu primer enemigo", reward: "Desbloquea la tienda" },
    { name: "Arma mejorada", description: "Mejora tu arma al mejor metal", reward: "Desbloquea al herrero runico" },
    { name: "Aprende de tus enemigos", description: "Derrota a un Litch", reward: "Desbloquea el mana" },
]

const runicForgeMessages = [
    { text: "Bienvenido a la herreria runica", delay: 1000 },
    { text: "Veo que tienen una buena arma", delay: 1000 },
    { text: "Pero veo que todavia la sigues usando tu", delay: 1000 },
    { text: "Puedo convertirla en un arma conciente que trabaja para ti", delay: 1000 },
    { text: "Pero te costara 100 de oro", delay: 0 },
]

const libraryMessages = [
    { text: "Bienvenido a la biblioteca", delay: 1000 },
    { text: "", delay: 1000 },
]

// posible storyline?
const egoSwordMessages = [
    { text: "Humano veo que eres demasiado debil", delay: 1000 },
    { text: "Pero puedo ayudarte a ser mas fuerte", delay: 1000 },
    { text: "Haz un pacto conmigo y te dare poder", delay: 1000 },
    { text: "(Risa malvada)", delay: 1000 },
    { text: "Ahora no puedes hacer mas pactos con ninguna otra espada", delay: 0 },
]
