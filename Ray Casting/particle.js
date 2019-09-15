class Particle {
    constructor (x,y) {
        this.pos = createVector(width/2,height/2);
        this.rays = [];
        for (let i = 0; i < 360; i+= 0.5) {
            //every 10 degrees from 0 to 360.
            this.rays.push(new Ray(this.pos, radians(i)));
        }
    }
    show() {
        fill(255);
        ellipse(this.pos.x,this.pos.y,4);
        for(let ray of this.rays) {
            ray.show();
        }
    }
    update(x,y) {
        this.pos.set(x,y);
    }
    look(walls) {
        for(let ray of this.rays) {
            //? Here is where we find the wall that is of shortest distance away in any straight line (for each of our rays)
            //? This means that we are going to check, for each ray, what is the closest wall in that line?
            // Remeber, our rays cannot go through a wall to another wall.
            let closest = null;
            let record = Infinity;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if(pt) {
                    // We get our distance from our ray to the pt of the walls
                    const d = p5.Vector.dist(this.pos,pt);
                    if(d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            //Now that we have checked all out walls, we check for the closest wall and draw our ray onto that wall.
            if(closest) {
                stroke(255,100);
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
        }
    }
}