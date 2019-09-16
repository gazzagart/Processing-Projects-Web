export default class Snake {
    constructor () {
        this.x = 0;
        this.y = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.SCL = 20;
        this.total = 0;
        this.tail = [];
    }
    show (p5) {
        p5.fill(255);
        for(let i = 0; i < this.total; i++) {
            p5.rect(this.tail[i].x,this.tail[i].y,this.SCL,this.SCL);
        }
        p5.rect(this.x,this.y,this.SCL,this.SCL);
    }
    update(p5) {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i+1];
        }
        this.tail[this.total-1] = p5.createVector(this.x,this.y);
        this.x = this.x + (this.xSpeed * this.SCL);
        this.y = this.y + (this.ySpeed * this.SCL);
        //We want to check after moving the snake
        this.death(p5);

        //?p5.js has a constrain setting to help you set boundries quickly
        this.x = p5.constrain(this.x, 0, p5.width - this.SCL);
        this.y = p5.constrain(this.y, 0, p5.height - this.SCL);

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
    eat (p5,foodPos) {
        if(p5.dist(this.x, this.y, foodPos.x, foodPos.y) < 5) {
            this.total++;
            return true;
        }
        return false;
    }
    death (p5) {
        for (let i = 0; i < this.tail.length; i++) {
            let pos = this.tail[i];
            let d = p5.dist(this.x,this.y, pos.x, pos.y);
            if (d < 1) {
                this.total = 0;
                this.tail = [];
            }
        }
    }
}