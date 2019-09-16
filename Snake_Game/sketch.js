import Snake from './snake.js';
import Food from './food.js';
new p5(function(p5) {
    let snake;
    let food;
    p5.setup = function () {
        p5.createCanvas(p5.windowWidth,p5.windowHeight,p5.WEBGL);
        p5.frameRate(10);
        snake = new Snake();
        food = new Food(p5);
    }

    p5.draw = function () {
        p5.background(0);
        //!Needed for WebGL mode only
        p5.translate(-p5.width/2,-p5.height/2,0); //moves our drawing origin to the top left corner
        snake.update(p5);
        snake.show(p5);
        food.show(p5);
        if(snake.eat(p5,food.food)) food.food = food.pickLocation(p5);
    }
    //TODO: Can't hit the sides.
    //TODO: have a total that updates.
    //TODO: Can't have the food render ontop of the snake.
    p5.keyPressed = function() {
        if (p5.keyCode === p5.UP_ARROW) {
            if (snake.getDirection() !== 2) snake.direction(0,-1);
        } else if (p5.keyCode === p5.DOWN_ARROW) {
            if (snake.getDirection() !== 0) snake.direction(0,1);
        } else if (p5.keyCode === p5.RIGHT_ARROW) {
            if (snake.getDirection() !== 3) snake.direction(1,0);
        } else if (p5.keyCode === p5.LEFT_ARROW) {
            if (snake.getDirection() !== 1) snake.direction(-1,0);
        }
    }
});