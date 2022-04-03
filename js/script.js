const canvas = document.getElementById('game');
const ctx = canvas.getContext("2d");

const die = document.getElementById('die');
const start = document.getElementById('start');
const money = document.getElementById('money');
start.volume = 0.3;
die.volume = 0.3;

const ground = new Image();
ground.src = "img/background.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

let box = 32,
    score = 0,
    food = {
        x: Math.floor((Math.random() * 17 + 1)) * box,
        y: Math.floor((Math.random() * 15 + 3)) * box,
    };

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

document.addEventListener("keydown", direction);
document.addEventListener("keydown", sound);

function sound(event){
    start.play()
}

let dir;

function direction(event){
    if(event.keyCode == 37 && dir != "right"){
        dir = "left";
    }else if(event.keyCode == 38 && dir != "down"){
        dir = "up";
    }else if(event.keyCode == 39 && dir != "left"){
        dir = "right";
    }else if(event.keyCode == 40 && dir != "up"){
        dir = "down";
    }
}

drawGame = () => {
    ctx.drawImage(ground, 0, 0);

	ctx.drawImage(foodImg, food.x, food.y);

	for(let i = 0; i < snake.length; i++) {
		ctx.fillStyle =  i === 0 ? "green" : "lime";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
	}

	ctx.fillStyle = "white";
	ctx.font = "50px Arial";
	ctx.fillText(score, box * 2.5, box * 1.7);

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if(snakeX == food.x && snakeY == food.y) {
		score++;
        money.play(1)
		food = {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 15 + 3)) * box,
		};
	} else
		snake.pop();

    if(snakeX < box || snakeX > box * 17
        || snakeY < 3 * box || snakeY > box * 17){
            die.play()
            start.pause()
            clearInterval(game)
            alert("Ты проиграл! Попрбуй еще раз")
            location.reload()
        }

	if(dir == "left") snakeX -= box;
	if(dir == "right") snakeX += box;
	if(dir == "up") snakeY -= box;
	if(dir == "down") snakeY += box;


    let newHead = {
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newHead);
}

let game = setInterval(drawGame, 100)