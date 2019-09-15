class Food {
    constructor () {
        this.SCL = 20;
        this.food = this.pickLocation();
    }
    show () {
        fill(255,0,100);
        rect(this.food.x,this.food.y,this.SCL,this.SCL);
    }
    pickLocation () {
        let cols = floor(width/this.SCL);
        let rows = floor(height/this.SCL);
        let location = createVector(floor(random(cols)), floor(random(rows)));
        location.mult(this.SCL);
        return location;
    }
}