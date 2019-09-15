function setup () {
    createCanvas(windowWidth,windowHeight,WEBGL);
    createCanvas(800,600,WEBGL);
    frameRate(10);
    snake = new Snake();
    food = new Food();
}

function draw () {
    background(0);
    //!Needed for WebGL mode only
    translate(-width/2,-height/2,0); //moves our drawing origin to the top left corner
    snake.update();
    snake.show();
    food.show();
    if(snake.eat(food.food)) food.food = food.pickLocation();
}
//TODO: Can't hit the sides.
//TODO: have a total that updates.
//TODO: Can't have the food render ontop of the snake.
function keyPressed() {
    if (keyCode === UP_ARROW) {
        if (snake.getDirection() !== 2) snake.direction(0,-1);
    } else if (keyCode === DOWN_ARROW) {
        if (snake.getDirection() !== 0) snake.direction(0,1);
    } else if (keyCode === RIGHT_ARROW) {
        if (snake.getDirection() !== 3) snake.direction(1,0);
    } else if (keyCode === LEFT_ARROW) {
        if (snake.getDirection() !== 1) snake.direction(-1,0);
    }
}