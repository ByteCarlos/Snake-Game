import { initialState, changeDirection, createFood, createSnake, drawSnake, moveSnake, checkFoodCollision } from './snake.js'
import { resetScore, updateScore, drawFood } from './base.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.setAttribute('tabindex', 1);
const foodColor = '#ff3636';


//loop principal do jogo
function game(){
	let head = initialState.snake[0];
	
    // verificando colisões de parede
    checkWallColission(head, canvas, initialState.cellSize)
	
	// verificando colisões com o corpo da cobra
    checkSnakeBodyColission(initialState.snake, head)
	

	// verificando se há colisão com alimentos
	if(checkFoodCollision(head.x, head.y, initialState.food.x, initialState.food.y)) {
		initialState.snake[initialState.snake.length] = {x: head.x, y: head.y};
		createFood();
		drawFood(initialState.food, foodColor, ctx, initialState.cellSize);
        updateScore()
	}

    // adiciona o evento de tecla pressionado 
	canvas.onkeydown = function(evt) {
		evt = evt || window.event;
		changeDirection(evt.keyCode);
	};

   ctx.beginPath();
   setBackground('#fff', '#eee');
   drawSnake(ctx, initialState.cellSize);
   drawFood(initialState.food, foodColor, ctx, initialState.cellSize);
   moveSnake();
}


function checkSnakeBodyColission(snakeBody, snakeHead) {
    for(let i = 1; i < snakeBody.length; i++) {
		if(snakeHead.x == snakeBody[i].x && snakeHead.y == snakeBody[i].y) {
			setBackground();
			createSnake();
            drawSnake(ctx, initialState.cellSize);
			createFood();
            drawFood(initialState.food, foodColor, ctx, initialState.cellSize);
			initialState.directionQueue = 'right';
			resetScore();
		}
	}
}

function checkWallColission(snakeHead, canvas, canvasCellSize) {
    if(snakeHead.x < 0 || snakeHead.x > canvas.width - canvasCellSize  || snakeHead.y < 0 || snakeHead.y > canvas.height - canvasCellSize) {
		setBackground();
		createSnake();
        drawSnake(ctx, initialState.cellSize);
        drawFood(initialState.food, foodColor, ctx, initialState.cellSize);
		initialState.directionQueue = 'right';
		resetScore();
	}
}


// definindo as cores da tela. cor1 - o fundo, cor2 - a cor da linha
function setBackground(color1, color2) {
	ctx.fillStyle = color1;
	ctx.strokeStyle = color2;

	ctx.fillRect(0, 0, canvas.height, canvas.width);

	for(var x = 0.5; x < canvas.width; x += initialState.cellSize) {
		ctx.moveTo(x, 0);
		ctx.lineTo(x, canvas.height);
	}
	for(var y = 0.5; y < canvas.height; y += initialState.cellSize) {
		ctx.moveTo(0, y);
		ctx.lineTo(canvas.width, y);
	}

	ctx.stroke()
}

function newGame() {
	initialState.direction = 'right'; // direção inicial
	initialState.directionQueue = 'right'; // direção da cobra

	ctx.beginPath();
	createSnake();
    drawFood(initialState.food, foodColor, ctx, initialState.cellSize);
    let loop;

	if(typeof loop != 'undefined') {
		clearInterval(loop);
	}
	else {
		loop = setInterval(game, 70);
	}
}

// começa o jogo
newGame();