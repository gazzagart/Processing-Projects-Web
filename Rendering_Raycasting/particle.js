class Particle {
    constructor (x,y) {
        this.fov = 45;
        this.pos = createVector(screenW/2,screenH/2);
        this.rays = [];
        this.heading = 0;
        for (let i = -this.fov/2; i < this.fov/2; i+= 1) {
            //every 60 degrees from -30 to 30. Center is 0.
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
    rotate(angle) {
        this.heading += angle;
        let index = 0;
        for (let i = 0; i < this.rays.length; i++) {
            //every 45 degrees from 0 to 360.
            this.rays[index].setAngle(radians(i) + this.heading);
            index++;
        }
    }
    move(amt) {
        const vel = p5.Vector.fromAngle(this.heading);
        vel.setMag(amt);
        this.pos.add(vel);
    }
    look(walls) {
        let scene = []
        for(let i = 0; i < this.rays.length; i++) {
            //? Here is where we find the wall that is of shortest distance away in any straight line (for each of our rays)
            //? This means that we are going to check, for each ray, what is the closest wall in that line?
            // Remeber, our rays cannot go through a wall to another wall.
            const ray = this.rays[i];
            let closest = null;
            let record = Infinity;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if(pt) {
                    // We get our distance from our ray to the pt of the walls
                    let d = p5.Vector.dist(this.pos,pt);
                    //!This gets rid of the fish eye effect
                    // this is the angle of the ray relative to the camera (particle)
                    const a = ray.dir.heading() - this.heading;
                    d *= cos(a);
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
            scene[i] = record;
        }
        return scene;
    }
    updateFOV (fov) {
        this.fov = fov;
        this.rays = [];
        for (let i = -this.fov/2; i < this.fov/2; i+= 1) {
            this.rays.push(new Ray(this.pos, radians(i)) + this.heading);
        }
    }
}