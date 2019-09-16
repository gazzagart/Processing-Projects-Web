export default class Food {
    constructor (p5) {
        this.SCL = 20;
        this.food = this.pickLocation(p5);
    }
    show (p5) {
        p5.fill(255,0,100);
        p5.rect(this.food.x,this.food.y,this.SCL,this.SCL);
    }
    pickLocation (p5) {
        let cols = p5.floor((p5.width)/this.SCL);
        let rows = p5.floor((p5.height)/this.SCL);
        let location = p5.createVector(p5.floor(p5.random(cols)), p5.floor(p5.random(rows)));
        location.mult(this.SCL);
        return location;
    }
}