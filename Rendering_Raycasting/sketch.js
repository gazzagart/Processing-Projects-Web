let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10000;
const screenW = 400;
const screenH = 400;
let cliderFOV;
function setup() {
    // createCanvas(windowWidth,windowHeight,WEBGL);
    createCanvas(800,400,WEBGL);
    for (let i = 0; i < 5; i++) {
        let x1 =  random(screenW);
        let x2 =  random(screenW);
        let y1 =  random(screenH);
        let y2 =  random(screenH);
        walls[i] = new Boundry(x1, y1, x2, y2);
    }
    // We want to set the boundries for the canvas, this will extend our rays to the boundries when there is no wall in the way.
    setBoundriesCanvas();
    ray = new Ray(100,200);
    particle = new Particle();
    sliderFOV = createSlider(0,360,45);
    sliderFOV.input(changeFOV);
}

function changeFOV() {
    const fov = sliderFOV.value();
    particle.updateFOV(fov);
}

function draw() {
    background(0);
    //Move this to the middel because we want to draw it on the right hand side.
    translate(-width/2,-height/2,0); //moves our drawing origin to the top left corner
    for (let wall of walls) {
        wall.show();
    }
    particle.update(noise(xoff)*screenW,noise(yoff)*screenH);
    // particle.update(mouseX,mouseY);
    particle.show();

    xoff += 0.01;
    yoff += 0.01;


    let scene = particle.look(walls);
    // Width is based on the length
    const w = screenW/scene.length;
    push();
    translate(screenW,0);
    for (let i = 0; i < scene.length; i++) {
        noStroke();
        const sq = scene[i]*scene[i];
        const wSq = screenW * screenW;
        const b = map(scene[i],0,wSq,255,0);
        const h = map(scene[i], 0, screenW, screenH,0);
        fill(b);
        rectMode(CENTER);
        rect(i*w + w / 2,screenH/2,w+1,h);
    }
    pop();
    if (keyIsDown(LEFT_ARROW)) {
        particle.rotate(-0.05);
    } else if (keyIsDown(RIGHT_ARROW)) {
        particle.rotate(0.05);
    } else if (keyIsDown(UP_ARROW)) {
        particle.rotate(1);
    } else if (keyIsDown(DOWN_ARROW)) {
        particle.move(-1);
    }
}

function setBoundriesCanvas () {
    walls.push(new Boundry(0,0, screenW, 0));
    walls.push(new Boundry(screenW,0, screenW, screenH));
    walls.push(new Boundry(screenW,screenH, 0, screenH));
    walls.push(new Boundry(0,screenH, 0, 0));
}
