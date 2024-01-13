class Bird {
    constructor() {
        this.x = dimentions[0] / 2;
        this.y = dimentions[1] / 2;
        this.ydir = 1;
        this.xdir = 1;
        this.velocity = 0;
        this.gravity = 0.3;
        this.floating = true;
        this.speed = 4.5;
        this.size = dimentions[0] / 11;
        this.dead = false;
    }

    show = function() {
        // body
        noStroke();
        fill("#FFD54F");
        rectMode(CENTER);
        rect(this.x, this.y, this.size, this.size, 10);

        // eyes
        ellipseMode(CENTER);
        fill("#F5F5F5");
        circle(this.x + 20*this.xdir, this.y - 10, 20);
        fill("black");
        circle(this.x + 25*this.xdir, this.y - 8, 8);
    }

    move = function() {
        // float
        if (this.floating) {
            if (this.velocity > 3 || this.velocity < -3) 
                this.ydir *= -1;
        }
        else { // move forward
            this.x += this.speed * this.xdir;
        }

        // fall
        this.velocity += this.gravity * this.ydir;
        this.y += this.velocity;
    }

    jump = function() {
        this.velocity = -8;
        if (this.floating) {
            this.floating = false;
            this.ydir = 1;
        }
    }

    touchBorder = function() {
        this.xdir *= -1;
        this.speed = Math.min(4.5 + gameInfo.difficulty / 2, 10);
    }

    reset = function() {
        this.x = dimentions[0] / 2;
        this.y = dimentions[1] / 2;
        this.floating = true;
        this.xdir = 1;
        this.speed = 4.5;
        this.velocity = 0;
    }
}