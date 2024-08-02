let photon;
let waterMolecules = [];
let carbonDioxideMolecules = [];
let numWater = 5;
let numCO2 = 5;
let gameState = 0;
let timer = 60;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('game-container');
    photon = new Photon();
    for (let i = 0; i < numWater; i++) {
        waterMolecules.push(new WaterMolecule());
    }
    for (let i = 0; i < numCO2; i++) {
        carbonDioxideMolecules.push(new CarbonDioxideMolecule());
    }
    setInterval(() => {
        if (gameState === 1 && timer > 0) {
            timer--;
        }
    }, 1000);
}

function draw() {
    background(220);
    if (gameState === 0) {
        showStartScreen();
    } else if (gameState === 1) {
        playGame();
    } else if (gameState === 2) {
        showWinScreen();
    } else if (gameState === 3) {
        showLoseScreen();
    }
}

function showStartScreen() {
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Photosynthesis Quest', width / 2, height / 2 - 50);
    text('Press ENTER to Start', width / 2, height / 2);
}

function playGame() {
    photon.move();
    photon.show();
    for (let water of waterMolecules) {
        water.show();
    }
    for (let co2 of carbonDioxideMolecules) {
        co2.show();
    }
    for (let i = waterMolecules.length - 1; i >= 0; i--) {
        if (photon.collects(waterMolecules[i])) {
            waterMolecules.splice(i, 1);
        }
    }
    for (let i = carbonDioxideMolecules.length - 1; i >= 0; i--) {
        if (photon.collects(carbonDioxideMolecules[i])) {
            carbonDioxideMolecules.splice(i, 1);
        }
    }
    showTimer();
    if (waterMolecules.length === 0 && carbonDioxideMolecules.length === 0) {
        gameState = 2;
    } else if (timer === 0) {
        gameState = 3;
    }
}

function showWinScreen() {
    textSize(32);
    textAlign(CENTER, CENTER);
    text('You Win!', width / 2, height / 2 - 50);
    text('Press ENTER to Play Again', width / 2, height / 2);
}

function showLoseScreen() {
    textSize(32);
    textAlign(CENTER, CENTER);
    text('You Lose!', width / 2, height / 2 - 50);
    text('Press ENTER to Play Again', width / 2, height / 2);
}

function showTimer() {
    textSize(32);
    textAlign(LEFT, TOP);
    text(`Time: ${timer}`, 10, 10);
}

function keyPressed() {
    if (keyCode === ENTER) {
        if (gameState === 0 || gameState === 2 || gameState === 3) {
            resetGame();
        }
    }
}

function resetGame() {
    gameState = 1;
    timer = 60;
    waterMolecules = [];
    carbonDioxideMolecules = [];
    for (let i = 0; i < numWater; i++) {
        waterMolecules.push(new WaterMolecule());
    }
    for (let i = 0; i < numCO2; i++) {
        carbonDioxideMolecules.push(new CarbonDioxideMolecule());
    }
}

class Photon {
    constructor() {
        this.x = width / 2;
        this.y = height - 50;
        this.size = 20;
    }

    move() {
        if (keyIsDown(LEFT_ARROW)) {
            this.x -= 5;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.x += 5;
        }
        if (keyIsDown(UP_ARROW)) {
            this.y -= 5;
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.y += 5;
        }
    }

    show() {
        fill(255, 204, 0);
        ellipse(this.x, this.y, this.size);
    }

    collects(molecule) {
        let d = dist(this.x, this.y, molecule.x, molecule.y);
        if (d < this.size / 2 + molecule.size / 2) {
            return true;
        } else {
            return false;
        }
    }
}

class WaterMolecule {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.size = 15;
    }

    show() {
        fill(0, 0, 255);
        ellipse(this.x, this.y, this.size);
    }
}

class CarbonDioxideMolecule {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.size = 15;
    }

    show() {
        fill(0, 255, 0);
        ellipse(this.x, this.y, this.size);
    }
}
