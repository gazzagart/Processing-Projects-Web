
class Snake {
    constructor () {
        this.x = 0;
        this.y = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.SCL = 20;
        this.total = 0;
        this.tail = [];
    }
    show () {
        fill(255);
        for(let i = 0; i < this.total; i++) {
            rect(this.tail[i].x,this.tail[i].y,this.SCL,this.SCL);
        }
        rect(this.x,this.y,this.SCL,this.SCL);
    }
    update() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i+1];
        }
        this.tail[this.total-1] = createVector(this.x,this.y);
        this.x = this.x + (this.xSpeed * this.SCL);
        this.y = this.y + (this.ySpeed * this.SCL);
        //We want to check after moving the snake
        this.death();

        //?p5.js has a constrain setting to help you set boundries quickly
        this.x = constrain(this.x, 0, width - this.SCL);
        this.y = constrain(this.y, 0, height - this.SCL);

    }
    direction(x,y) {
        this.xSpeed = x;
        this.ySpeed = y;
    }
    getDirection () {
        // Up
        if (this.xSpeed === 0 && this.ySpeed < 0) return 0;
        // Right
        else if (this.xSpeed > 0 && this.ySpeed === 0) return 1;
        //Down
        else if (this.xSpeed === 0 && this.ySpeed > 0) return 2;
        // Left
        else if (this.xSpeed < 0 && this.ySpeed === 0) return 3;
        // Not moving
        else return -1;
    }
    //Check if location of food and snake are the same.
    eat (foodPos) {
        if(dist(this.x, this.y, foodPos.x, foodPos.y) < 5) {
            this.total++;
            return true;
        }
        return false;
    }
    death () {
        for (let i = 0; i < this.tail.length; i++) {
            let pos = this.tail[i];
            let d = dist(this.x,this.y, pos.x, pos.y);
            if (d < 1) {
                this.total = 0;
                this.tail = [];
            }
        }
    }
}