class Ray {
    constructor (pos,angle) {
        this.pos = pos;
        this.dir = p5.Vector.fromAngle(angle);
    }

    setAngle(a) {
        this.dir = p5.Vector.fromAngle(a);
    }

    lookAt(x,y) {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir.normalize();
    }

    show() {
        stroke(255);
        push();
        translate(this.pos.x,this.pos.y);
        line(0,0,this.dir.x *10,this.dir.y*10);
        pop();
    }
    cast(wall) {
        //The walls start points (x1,y1) walls endpoints (x2,y2)
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;
        //This is now the rays (vector) position.
        //? x3,y3 is the start point of the vector and then x4,y4 is the direction or the end point of the vector.
        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;
        //! Equation can be found here: https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
        //The denominator:
        const den = (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);//If zero, then the lines are parallel
        if (den == 0) {
            return;
        }
        const t = ((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4))/den;
        const u = -((x1-x2)*(y1-y3)-(y1-y2)*(x1-x3))/den;
        if(t > 0 && t < 1 && u > 0){
            const pt = createVector();
            //We now get the point (p1,p2) of the intersection between our ray(vector) and wall(line)
            //? Essenctially we go and get the point of intersection between out ray and the wall which form two lines.
            //using the formula from wikipedia:
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return pt;
        } else {
            return;
        }
    }
}