class Spike {
    constructor(index, pos) {
        this.index = index;
        this.pos = pos;
        this.size = dimentions[0] / 11;
        this.x = (dimentions[0] / 11) * this.index;
        this.y = (dimentions[1] / 11) * this.index;
        this.initiate();
    }

    initiate = function() {
        if (this.pos == "down") {
            this.corners = [createVector(this.x, dimentions[1]), createVector(this.x + this.size, dimentions[1]), createVector(this.x + (this.size / 2), dimentions[1] - this.size)];
        } else if ( this.pos == "up") {
            this.corners = [createVector(this.x, 0), createVector(this.x + this.size, 0), createVector(this.x + (this.size / 2), this.size)];
        } else if (this.pos == "left") {
            this.corners = [createVector(0, this.y), createVector(this.size, this.y + (this.size / 2)), createVector(0, this.y + this.size)];
        } else if (this.pos == "right") {
            this.corners = [createVector(dimentions[0], this.y), createVector(dimentions[0] - this.size, this.y + (this.size / 2)), createVector(dimentions[0], this.y + this.size)];
        }
    }

    show = function() {
        noStroke();
        fill("#9E9E9E");
        triangle(this.corners[0].x, this.corners[0].y, this.corners[1].x, this.corners[1].y, this.corners[2].x, this.corners[2].y);
    }

    checkCollision = function(bird) {
        let points = new Array();

        if (gameInfo.direction == "left") {
            for (let i = 1; i < this.size; i+= 20) { // loop through the points in the diagonal lines in the spike triangle
                points.push(createVector(i, this.y +(i / 2))); // y = 0.5x
                points.push(createVector(i, this.y -(i / 2) + this.size)); // y = 2x
            }

            points.push(createVector(this.size, this.y + (this.size / 2)));
        } else {
            for (let i = 1; i < this.size; i+= 20) { // loop through the points in the diagonal lines in the spike triangle
                points.push(createVector(dimentions[0] - i, this.y +(i / 2))); // y = 0.5x
                points.push(createVector(dimentions[0] - i, this.y -(i / 2) + this.size)); // y = 2x
            }

            points.push(createVector(dimentions[0] - this.size, this.y + (this.size / 2)));
        }

        for (let i = 0; i < points.length; i++) {
            // logic
            if (points[i].x > bird.x - bird.size / 2 && points[i].x < bird.x + bird.size / 2 && points[i].y > bird.y - bird.size / 2 && points[i].y < bird.y + bird.size / 2) {
                return true;
            }
        }

        return false;
    }
}