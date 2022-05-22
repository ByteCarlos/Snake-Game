const scoreIs = document.getElementById('score');    

// atualiza pontuação
export function updateScore () {
    scoreIs.innerText = +(scoreIs.textContent || 0) + 1 
}

// zera pontuação
export function resetScore() {
    scoreIs.innerText = 0; 
}

// desenha um quadrado..
export function drawSquare(x,y,color, ctx, cellSize ) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, cellSize, cellSize);	
}

// desenha fruta 
export function drawFood(food, foodColor, context, canvasCellSize) {
	drawSquare(food.x, food.y, foodColor, context, canvasCellSize);
}