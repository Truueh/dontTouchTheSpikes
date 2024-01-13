let dimentions;
let bird;
let borderSpikes;
let canvas;
let wallSpikes;
let gameInfo = {
    direction: "right",
    difficulty: 1,
    score: 0
};

function setup() {
    dimentions = getBestRes();
    bird = new Bird();
    canvas = createCanvas(dimentions[0], dimentions[1]);
    canvas.class("canvas");
    borderSpikes = initiateBorders();
    wallSpikes = generateWallSpikes();
    frameRate(60);
}

function draw() {
    background("#E0F7FA");
    drawScore(); // draw score

    // bird
    bird.show();
    bird.move();

    // draw border spikes
    for (let i = 0; i < borderSpikes.length; i++) {
        borderSpikes[i].show();
    }

    // wall spikes
    for (let i = 0; i < wallSpikes.length; i++) {
        wallSpikes[i].show();
        if (wallSpikes[i].checkCollision(bird)) {
            gameLost();
        }
    }

    // bird wall collision
    birdTouchedBorder();

    // bird top and bottom spikes collision
    if (bird.y > dimentions[1] - 60 || bird.y < 60)
        gameLost();
}

function getBestRes() {
    let res = [0, 0]; // width, height
    let offset = windowHeight * 1/10;

    if (windowHeight > windowWidth * 3 / 4) {
        res = [windowWidth * 3/4, windowWidth];
        return res;
    }

    res = [windowHeight * 3/4 - offset, windowHeight - offset];
    return res;
}

function birdTouchedBorder() {
    if (bird.x >= dimentions[0] - 31 || bird.x <= 31) {
        if (gameInfo.direction == "right") {
            gameInfo.direction = "left";
        } else {
            gameInfo.direction = "right";
        }
        bird.touchBorder();
        wallSpikes = generateWallSpikes();
        gameInfo.score++;

        if (gameInfo.score % 5 == 0) {
            gameInfo.difficulty++;
        }
    }
}

function keyPressed() {
    if (keyCode == RETURN) {
        if (bird.dead)
            resetGame();

        bird.jump();
    }
}

function initiateBorders() {
    let borders = new Array();
    for (let i = 1; i < 10; i++) {
        borders.push(new Spike(i, "up"));
        borders.push(new Spike(i, "down"));
    }   

    return borders;
}

function generateWallSpikes() {
    let spikes = new Array();
    let options = new Array(1, 2, 3, 4, 5, 6, 7, 8);
    let maxSpikes = min(gameInfo.difficulty + 3, 7);
    let minSpikes = min(2 + gameInfo.difficulty / 4, 6);

    for (let i = 0; i < random(minSpikes, maxSpikes); i++) {
        let rnd = random(options);
        spikes.push(new Spike(rnd,gameInfo.direction));
        options.splice(rnd - 1, 1);
    }

    return spikes;
}

function drawScore() {
    // DRAW SCORE
    push();
    fill(255, 255, 255, 90);
    noStroke();
    circle(dimentions[0] / 2, dimentions[1] / 2, 300);
    fill(0, 0, 0, 30);
    textSize(100);   
    textAlign(CENTER, CENTER);  
    text(gameInfo.score, dimentions[0] / 2, dimentions[1] / 2);
    pop();
}

function gameLost() {
    bird.dead = true;
    bird.reset();
    gameInfo.direction = "right";
    wallSpikes = generateWallSpikes();
}

function resetGame() {
    gameInfo = {
        direction: "right",
        difficulty: 1,
        score: 0
    };
    bird.dead = false;
}