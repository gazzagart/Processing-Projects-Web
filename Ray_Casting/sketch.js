let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10000;
function setup() {
    createCanvas(windowWidth,windowHeight,WEBGL);
    for (let i = 0; i < 5; i++) {
        let x1 =  random(width);
        let x2 =  random(width);
        let y1 =  random(height);
        let y2 =  random(height);
        walls[i] = new Boundry(x1, y1, x2, y2);
    }
    // We want to set the boundries for the canvas, this will extend our rays to the boundries when there is no wall in the way.
    setBoundriesCanvas();
    ray = new Ray(100,200);
    particle = new Particle();
}

function draw() {
    background(0);
    translate(-width/2,-height/2,0); //moves our drawing origin to the top left corner
    for (let wall of walls) {
        wall.show();
    }
    particle.update(noise(xoff)*width,noise(yoff)*height);
    particle.show();
    particle.look(walls);

    xoff += 0.01;
    yoff += 0.01;
}

function setBoundriesCanvas () {
    walls.push(new Boundry(0,0, width, 0));
    walls.push(new Boundry(width,0, width, height));
    walls.push(new Boundry(width,height, 0, height));
    walls.push(new Boundry(0,height, 0, 0));
}
