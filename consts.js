const maxDialog = 5;

const boxPositions = [
    { posX: 0, posY: 0 },
    { posX: 0, posY: 0 },
    { posX: -140, posY: 0 },
    { posX: 165, posY: 10 },
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

const enemyNames = [
]

const enemyHealths = []

const enemyDamages = []

const enemyGoldRewards = []

//const enemyExperienceRewards = []

const achievements = [
    { name: "Primera sangre", description: "Derrota a tu primer enemigo", reward: { resource: "damage", amout: 10 } },
]



