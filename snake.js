
import { drawSquare } from './base.js'


// estado inicial
export const initialState = {
    snake: [],
    snakeLength: 5,
    food: {
        x: 200,
        y: 300,
    },
    direction: '',
    directionQueue: '',
    foodX: [],
    foodY: [],
    cellSize: 20
}


const snakeColor = '#3498db';

// adiciona possíveis posições x e y para separar arrays
for(let i = 0; i <= canvas.width - initialState.cellSize; i+= initialState.cellSize) {
	initialState.foodX.push(i);
	initialState.foodY.push(i);
}

// adiciona ao objeto comida suas coordenadas
export function createFood() { 
	initialState.food.x = initialState.foodX[Math.floor(Math.random() * initialState.foodX.length)]; // random x position from array
	initialState.food.y = initialState.foodY[Math.floor(Math.random() * initialState.foodY.length)]; // random y position from array
	// looping through the snake and checking if there is a collision
	for(let i = 0; i < initialState.snake.length; i++) {
		if(checkFoodCollision(initialState.food.x, initialState.food.y, initialState.snake[i].x, initialState.snake[i].y)) {
			createFood(); 
		}
	}
}

// criando a cobra e empurrando as coordenadas para a matriz
export function createSnake() {
	initialState.snake = [];
		for(var i = initialState.snakeLength; i > 0; i--) {
		let k = i * initialState.cellSize;
		initialState.snake.push({x: k, y:0});
	}
}

// percorre o array snake e desenha cada elemento
export function drawSnake(context, cellSize) {
	for(let i = 0; i < initialState.snake.length; i++) {
		drawSquare(initialState.snake[i].x, initialState.snake[i].y, snakeColor, context, cellSize);
	}
}

// interações de teclado | direção != '...' não deixa a cobra andar para trás
export function changeDirection(keycode) {
	if(keycode == 37 && initialState.direction != 'right') { initialState.directionQueue = 'left'; }
	else if(keycode == 38 && initialState.direction != 'down') { initialState.directionQueue = 'up'; }
	else if(keycode == 39 && initialState.direction != 'left') { initialState.directionQueue = 'right'; }
	else if(keycode == 40 && initialState.direction != 'top') { initialState.directionQueue = 'down' }
}


// alterando o movimento da cobra
export function moveSnake() {
	let x = initialState.snake[0].x; // pegando as coordenadas da cabeça...
	let y = initialState.snake[0].y;

	initialState.direction = initialState.directionQueue;

	if(initialState.direction == 'right') {
		x+=initialState.cellSize;
	}
	else if(initialState.direction == 'left') {
		x-=initialState.cellSize;
	}
	else if(initialState.direction == 'up') {
		y-=initialState.cellSize;
	}
	else if(initialState.direction == 'down') {
		y+=initialState.cellSize;
	}

	// remove a cauda e faz dela a nova cabeça...muito delicada, não toque nisso
	let tail = initialState.snake.pop(); 
	tail.x = x;
	tail.y = y;
	initialState.snake.unshift(tail);
}


// checa colisão com a comida
export function checkFoodCollision(x1,y1,x2,y2) {
	if(x1 == x2 && y1 == y2) {
		return true;
	}
	else {
		return false;
	}
}
