var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var inputUp = 38;
var inputDown = 40;
var inputLeft = 37;
var inputRight = 39;
var numberOfBalls = 50;
var fiveColor, fifteenColor, twentyfiveColor;
var goal;
var timeForGame;
var monstersRemain;
var monsterNumber = 6;

$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});

function upUpdate(event){
	inputUp = event.which - 32;
}
function downUpdate(event){
	inputDown = event.which - 32;
}
function leftUpdate(event){
	inputLeft = event.which - 32;
}
function rightUpdate(event){
	inputRight = event.which - 32;
}

function returnText(){
	context = canvas.getContext("2d");
	numberOfBalls = document.getElementById("ball").value;
	timeForGame = parseInt(document.getElementById("timeForGame").value);
	monstersRemain = parseInt(document.getElementById("monster").value);
	toggleDiv(document.getElementById('game').id);
	timeLeft = timeForGame;
	setTimeout(countdown, 1000);
	Start();
}

function randomPick(){
	// random for seconds
	secondsRandom = Math.floor(Math.random() * (1001 - 60)) + 60;
	document.getElementById("timeForGame").value = secondsRandom;
	document.getElementById("timeForGame").nextElementSibling.value = secondsRandom;
	// random for balls
	ballsRandom = Math.floor(Math.random() * (91 - 50)) + 50;
	document.getElementById("ball").value = ballsRandom;
	document.getElementById("ball").nextElementSibling.value = ballsRandom;
	// random for monsters
	monstersRandom = Math.floor(Math.random() * (5 - 1)) + 1;
	document.getElementById("monster").value = monstersRandom;
	document.getElementById("monster").nextElementSibling.value = monstersRandom;
	// random for colors
	randomFiveColor = Math.floor(Math.random()*16777215).toString(16);
	document.getElementById("fivecolorpicker").value = "#" + randomFiveColor;
	randomFifteenColor = Math.floor(Math.random()*16777215).toString(16);
	document.getElementById("fifteencolorpicker").value = "#" + randomFifteenColor;
	randomTwentyfiveColor = Math.floor(Math.random()*16777215).toString(16);
	document.getElementById("twentyfivecolorpicker").value = "#" + randomTwentyfiveColor;
	// random keyboard
	inputUp = 38;
	inputDown = 40;
	inputLeft = 37;
	inputRight = 39;
	document.getElementById("up").value = "up arrow";
	document.getElementById("down").value = "down arrow";
	document.getElementById("left").value = "left arrow";
	document.getElementById("right").value = "right arrow";
}

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = numberOfBalls;
	fiveColor = parseInt(0.6*numberOfBalls);
	fifteenColor = parseInt(0.3*numberOfBalls);
	twentyfiveColor = parseInt(0.1*numberOfBalls);
	goal = 5*fiveColor + 15*fifteenColor + 25*twentyfiveColor;
	var colors = Array("1", "3", "5");
	var pacman_remain = 1;
	// var monstersRemain = 1;
	start_time = new Date();
	// start_time = (new Date()).setSeconds(timeForGame);
	// start_time=timeForGame;
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					var randomColor = colors[Math.floor(Math.random()*colors.length)]
					if(randomColor === "1" && fiveColor > 0) {
						board[i][j] = 1;
						fiveColor--;
						if (fiveColor === 0) {
							const index = colors.indexOf("1");
							if (index > -1) {
								colors.splice(index, 1);
							}
						}
					}
					else if (randomColor === "3" && fifteenColor > 0) {
						board[i][j] = 3;
						fifteenColor--;
						if (fifteenColor === 0) {
							const index = colors.indexOf("3");
							if (index > -1) {
								colors.splice(index, 1);
							}
						}
					}
					else if (randomColor === "5" && twentyfiveColor > 0) {
						board[i][j] = 5;
						twentyfiveColor--;
						if (twentyfiveColor === 0) {
							const index = colors.indexOf("5");
							if (index > -1) {
								colors.splice(index, 1);
							}
						}
					}
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		var randomColor = colors[Math.floor(Math.random()*colors.length)]
		// board[emptyCell[0]][emptyCell[1]] = 1;
		if(randomColor === "1" && fiveColor > 0) {
			board[emptyCell[0]][emptyCell[1]] = 1;
			fiveColor--;
			if (fiveColor === 0) {
				const index = colors.indexOf("1");
				if (index > -1) {
					colors.splice(index, 1);
				}
			}
		}
		else if (randomColor === "3" && fifteenColor > 0) {
			board[emptyCell[0]][emptyCell[1]] = 3;
			fifteenColor--;
			if (fifteenColor === 0) {
				const index = colors.indexOf("3");
				if (index > -1) {
					colors.splice(index, 1);
				}
			}
		}
		else if (randomColor === "5" && twentyfiveColor > 0) {
			board[emptyCell[0]][emptyCell[1]] = 5;
			twentyfiveColor--;
			if (twentyfiveColor === 0) {
				const index = colors.indexOf("5");
				if (index > -1) {
					colors.splice(index, 1);
				}
			}
		}
		food_remain--;
	}
	while (monstersRemain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		if (monsterNumber === 6) {
			board[emptyCell[0]][emptyCell[1]] = 6;
			monsterNumber++;
		} else if (monsterNumber === 7) {
			board[emptyCell[0]][emptyCell[1]] = 7;
			monsterNumber++;
		} else if (monsterNumber === 8) {
			board[emptyCell[0]][emptyCell[1]] = 8;
			monsterNumber++;
		} else if (monsterNumber === 9) {
			board[emptyCell[0]][emptyCell[1]] = 9;
			monsterNumber++;
		} 
		if (monstersRemain === 1) {
			monsterNumber = 6;
		}
		monstersRemain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[inputUp]) {
		return 1;
	}
	if (keysDown[inputDown]) {
		return 2;
	}
	if (keysDown[inputLeft]) {
		return 3;
	}
	if (keysDown[inputRight]) {
		return 4;
	}
	// if (keysDown[38]) {
	// 	return 1;
	// }
	// if (keysDown[40]) {
	// 	return 2;
	// }
	// if (keysDown[37]) {
	// 	return 3;
	// }
	// if (keysDown[39]) {
	// 	return 4;
	// }
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = document.getElementById("fivecolorpicker").value; //color
				context.fill();
			} else if (board[i][j] == 3) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = document.getElementById("fifteencolorpicker").value; //color
				context.fill();
			} else if (board[i][j] == 5) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = document.getElementById("twentyfivecolorpicker").value; //color
				context.fill();
			} else if (board[i][j] == 6) {
				var img = new Image();
				img.src = "./pictures/monster1.jpg";
				context.drawImage(img, center.x - 30, center.y - 30, 60, 60);
			} else if (board[i][j] == 7) {
				var img = new Image();
				img.src = "./pictures/monster2.jpg";
				context.drawImage(img, center.x - 30, center.y - 30, 60, 60);
			} else if (board[i][j] == 8) {
				var img = new Image();
				img.src = "./pictures/monster3.jpg";
				context.drawImage(img, center.x - 30, center.y - 30, 60, 60);
			} else if (board[i][j] == 9) {
				var img = new Image();
				img.src = "./pictures/monster4.jpg";
				context.drawImage(img, center.x - 30, center.y - 30, 60, 60);
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score += 5;
	}
	else if (board[shape.i][shape.j] == 3) {
		score += 15;
	}
	else if (board[shape.i][shape.j] == 5) {
		score += 25;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == goal) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}

function countdown() {
	timeLeft--;
	document.getElementById("seconds").innerHTML = String( timeLeft );
	if (timeLeft > 0) {
		setTimeout(countdown, 1000);
	}
};