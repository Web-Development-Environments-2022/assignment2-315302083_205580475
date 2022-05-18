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
var strike;
var monster1 = new Object();
var monster2 = new Object();
var monster3 = new Object();
var monster4 = new Object();
var specialMonster = new Object();
var monsterArray = [];
var moveMonnster = ["up", "down", "left", "right"];
var check = true;
var ballsGet = 0;
var timer;

$(document).ready(function() {
	if (localStorage.getItem("k") === null) {
		var username = "k";
		var password = "k";
		var fullname = "k k";
		var email = "k@k.com";
		var birthDate = "k";
		var array = [password, fullname, email, birthDate];
		localStorage.setItem(username, JSON.stringify(array));
	}
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
	document.getElementById("lblTime").value = document.getElementById("timeForGame").value;
	document.getElementById("lbluser").value = userInside;
	timer = setTimeout(countdown, 1000);
	monsterArray = [];
	document.getElementById("ballShow").innerHTML = document.getElementById("ball").value;
	document.getElementById("monsterShow").innerHTML = document.getElementById("monster").value;
	document.getElementById("fivecolorpickerShow").style = "background-color: " + document.getElementById("fivecolorpicker").value;
	document.getElementById("fifteencolorpickerShow").style = "background-color: " + document.getElementById("fifteencolorpicker").value;
	document.getElementById("twentyfivecolorpickerShow").style = "background-color: " + document.getElementById("twentyfivecolorpicker").value;
	document.getElementById("upShow").innerHTML = document.getElementById("up").value;
	document.getElementById("downShow").innerHTML = document.getElementById("down").value;
	document.getElementById("leftShow").innerHTML = document.getElementById("left").value;
	document.getElementById("rightShow").innerHTML = document.getElementById("right").value;
	document.getElementById("timeForGameShow").innerHTML = document.getElementById("lblTime").value;

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

function startNewGame(){
	ballsGet = 0;
	clearTimeout(timer);
    timer = 0;
	document.getElementById("backgroundMusic").pause();
	document.getElementById("winnerMusic").pause();
	document.getElementById("crowdbooMusic").pause();
	window.clearInterval(interval);
	returnText();
}	

function startNewGameWithNewSettingse(){
	monsterArray = [];
	ballsGet = 0;
	clearTimeout(timer);
    timer = 0;
	document.getElementById("backgroundMusic").pause();
	document.getElementById("winnerMusic").pause();
	document.getElementById("crowdbooMusic").pause();
	window.clearInterval(interval);
	toggleDiv(document.getElementById('settings').id);
}		

function Start() {
	document.getElementById("backgroundMusic").play();
	board = new Array();
	score = 0;
	strike = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = numberOfBalls;
	fiveColor = parseInt(0.6*numberOfBalls);
	fifteenColor = parseInt(0.3*numberOfBalls);
	twentyfiveColor = parseInt(0.1*numberOfBalls);
	goal = fiveColor + fifteenColor + twentyfiveColor;
	var colors = Array("1", "3", "5");
	var pacman_remain = 1;
	start_time = new Date();
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
					shape.direction = "right";
					shape.firsti = i;
					shape.firstj = j;
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

		specialMonster.i = 4;
		specialMonster.j = 4;
		specialMonster.num = 10;
		specialMonster.hasBall = board[4][4];
		board[4][4] = 10;
		monsterArray.push(specialMonster);
		if (monstersRemain > 0) {
			monster1.i = 0;
			monster1.j = 0;
			monster1.num = 6;
			monster1.hasBall = board[0][0];
			monstersRemain--;
			board[0][0] = 6;
			monsterArray.push(monster1);
		}
		if (monstersRemain > 0) {
			monster2.i = 0;
			monster2.j = 9;
			monster2.num = 7;
			monster2.hasBall = board[0][9];
			monstersRemain--;
			board[0][9] = 7;
			monsterArray.push(monster2);
		}
		if (monstersRemain > 0) {
			monster3.i = 9;
			monster3.j = 0;
			monster3.num = 8;
			monster3.hasBall = board[9][0];
			monstersRemain--;
			board[9][0] = 8;
			monsterArray.push(monster3);
		}
		if (monstersRemain > 0) {
			monster4.i = 9;
			monster4.j = 9;
			monster4.num = 9;
			monster4.hasBall = board[9][9];
			monstersRemain--;
			board[9][9] = 9;
			monsterArray.push(monster4);
		}

	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 11;
	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 12;
	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 13;

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
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblStrike.value = strike;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if ((board[i][j] == 2) && (shape.direction === "right")) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if ((board[i][j] == 2) && (shape.direction === "up")) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x - 15, center.y, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if ((board[i][j] == 2) && (shape.direction === "down")) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x - 15, center.y, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if ((board[i][j] == 2) && (shape.direction === "left")) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
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
				var img = new Image();
				img.src = "./pictures/wall.jpg";
				context.drawImage(img, center.x - 30, center.y - 30, 60, 60);
			} else if (board[i][j] == 10) {
				var img = new Image();
				img.src = "./pictures/plankton.jpeg";
				context.drawImage(img, center.x - 30, center.y - 30, 60, 60);
			} else if (board[i][j] == 11) {
				var img = new Image();
				img.src = "./pictures/clock.png";
				context.drawImage(img, center.x - 30, center.y - 30, 60, 60);
			} else if (board[i][j] == 12) {
				var img = new Image();
				img.src = "./pictures/nostrike.jpg";
				context.drawImage(img, center.x - 30, center.y - 30, 60, 60);
			}
			else if (board[i][j] == 13) {
				var img = new Image();
				img.src = "./pictures/points.png";
				context.drawImage(img, center.x - 30, center.y - 30, 60, 60);
			} 
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			if (!((board[shape.i][shape.j - 1] === 6) || (board[shape.i][shape.j - 1] === 7) || (board[shape.i][shape.j - 1] === 8) || (board[shape.i][shape.j - 1] === 9))){

				shape.j--;
				shape.direction = "up";
			}
		 	else {
				score-=10;
				strike++;
				board[shape.i][shape.j] = 0;
				shape.i = shape.firsti;
				shape.j = shape.firstj;
		}}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			if (!((board[shape.i][shape.j + 1] === 6) || (board[shape.i][shape.j + 1] === 7) || (board[shape.i][shape.j + 1] === 8) || (board[shape.i][shape.j + 1] === 9))){

				shape.j++;
				shape.direction = "down";
			}
		  else {
			score-=10;
			strike++;
			board[shape.i][shape.j] = 0;
			shape.i = shape.firsti;
			shape.j = shape.firstj;
		}}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			if (!((board[shape.i - 1][shape.j] === 6) || (board[shape.i - 1][shape.j] === 7) || (board[shape.i - 1][shape.j] === 8) || (board[shape.i - 1][shape.j] === 9))){

				shape.i--;
				shape.direction = "left";
			}
		   else {
			score-=10;
			strike++;
			board[shape.i][shape.j] = 0;
			shape.i = shape.firsti;
			shape.j = shape.firstj;
		}}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
		 	if (!((board[shape.i + 1][shape.j] === 6) || (board[shape.i + 1][shape.j] === 7) || (board[shape.i + 1][shape.j] === 8) || (board[shape.i + 1][shape.j] === 9))){

				shape.i++;
				shape.direction = "right";
			}
		   else {
			score-=10;
			strike++;
			board[shape.i][shape.j] = 0;
			shape.i = shape.firsti;
			shape.j = shape.firstj;
		}}
	}
	if (board[shape.i][shape.j] == 1) {
		score += 5;
		ballsGet++;
		goal--;
	}
	else if (board[shape.i][shape.j] == 3) {
		score += 15;
		ballsGet++;
		goal--;
	}
	else if (board[shape.i][shape.j] == 5) {
		score += 25;
		ballsGet++;
		goal--;
	}
	else if (board[shape.i][shape.j] == 10) {
		if(monsterArray[0].hasBall!=0){
			goal--;
			if(monsterArray[0].hasBall===1){
				score += 5;
			}
			else if(monsterArray[0].hasBall===3){
				score += 15;
			}
			else {
				score += 25;
			}
		}
		score += 50;
		monsterArray.shift();
		
	}
	else if (board[shape.i][shape.j] == 11) {
		timeLeft = timeLeft + 10;
	}
	else if (board[shape.i][shape.j] == 12) {
		strike = 0;
	}
	else if (board[shape.i][shape.j] == 13) {
		score = score + 10;
	}
	board[shape.i][shape.j] = 2;
	for (var i = 0; i < monsterArray.length; i++) {
		while (check) {
			var randomMoveChoose = moveMonnster[Math.floor(Math.random()*moveMonnster.length)];
			if (randomMoveChoose === "up") {
				if (monsterArray[i].j > 0 && board[monsterArray[i].i][monsterArray[i].j - 1] != 4) {
					if (monsterArray[i].hasBall !== 0) {
						board[monsterArray[i].i][monsterArray[i].j] = monsterArray[i].hasBall;
					} else {
						board[monsterArray[i].i][monsterArray[i].j] = 0;
					}
					if ((board[monsterArray[i].i][monsterArray[i].j-1] === 2) && (monsterArray[i].num === 10)) {
						score+=50;
						monsterArray.shift();
						i=0;
					} else if (board[monsterArray[i].i][monsterArray[i].j-1] === 2) {
						score-=10;
						strike++;
						board[shape.i][shape.j] = 0;
						shape.i = shape.firsti;
						shape.j = shape.firstj;
					} else if ((board[monsterArray[i].i][monsterArray[i].j-1] === 6) || (board[monsterArray[i].i][monsterArray[i].j-1] === 7)
						|| (board[monsterArray[i].i][monsterArray[i].j-1] === 8) || (board[monsterArray[i].i][monsterArray[i].j-1] === 9) || (board[monsterArray[i].i][monsterArray[i].j-1] === 10))  {
							
					} else {
						monsterArray[i].j--;
						monsterArray[i].hasBall = board[monsterArray[i].i][monsterArray[i].j];
					}
					check = false;
				}
			} else if (randomMoveChoose === "down") {
				if (monsterArray[i].j < 9 && board[monsterArray[i].i][monsterArray[i].j + 1] != 4) {
					if (monsterArray[i].hasBall !== 0) {
						board[monsterArray[i].i][monsterArray[i].j] = monsterArray[i].hasBall;
					} else {
						board[monsterArray[i].i][monsterArray[i].j] = 0;
					}
					if ((board[monsterArray[i].i][monsterArray[i].j+1] === 2) && (monsterArray[i].num === 10)) {
						score+=50;
						monsterArray.shift();
						i=0;
					} else if (board[monsterArray[i].i][monsterArray[i].j+1] === 2) {
						score-=10;
						strike++;
						board[shape.i][shape.j] = 0;
						shape.i = shape.firsti;
						shape.j = shape.firstj;
					} else if ((board[monsterArray[i].i][monsterArray[i].j+1] === 6) || (board[monsterArray[i].i][monsterArray[i].j+1] === 7)
						|| (board[monsterArray[i].i][monsterArray[i].j+1] === 8) || (board[monsterArray[i].i][monsterArray[i].j+1] === 9) || (board[monsterArray[i].i][monsterArray[i].j+1] === 10))  {
						
					} else {
						monsterArray[i].j++;
						monsterArray[i].hasBall = board[monsterArray[i].i][monsterArray[i].j];
					}
					check = false;
				}
			} else if (randomMoveChoose === "left") {
				if (monsterArray[i].i > 0 && board[monsterArray[i].i - 1][monsterArray[i].j] != 4) {
					if (monsterArray[i].hasBall !== 0) {
						board[monsterArray[i].i][monsterArray[i].j] = monsterArray[i].hasBall;
					} else {
						board[monsterArray[i].i][monsterArray[i].j] = 0;
					}
					if ((board[monsterArray[i].i-1][monsterArray[i].j] === 2) && (monsterArray[i].num === 10)) {
						score+=50;
						monsterArray.shift();
						i=0;
					} else if (board[monsterArray[i].i-1][monsterArray[i].j] === 2) {
						score-=10;
						strike++;
						board[shape.i][shape.j] = 0;
						shape.i = shape.firsti;
						shape.j = shape.firstj;
					} else if ((board[monsterArray[i].i-1][monsterArray[i].j] === 6) || (board[monsterArray[i].i-1][monsterArray[i].j] === 7)
						|| (board[monsterArray[i].i-1][monsterArray[i].j] === 8) || (board[monsterArray[i].i-1][monsterArray[i].j] === 9) || (board[monsterArray[i].i-1][monsterArray[i].j] === 10))  {
						
					} else {
						monsterArray[i].i--;
						monsterArray[i].hasBall = board[monsterArray[i].i][monsterArray[i].j];
					}
					check = false;
				}
			} else if (randomMoveChoose === "right") {
				if (monsterArray[i].i < 9 && board[monsterArray[i].i + 1][monsterArray[i].j] != 4) {
					if (monsterArray[i].hasBall !== 0) {
						board[monsterArray[i].i][monsterArray[i].j] = monsterArray[i].hasBall;
					} else {
						board[monsterArray[i].i][monsterArray[i].j] = 0;
					}
					if ((board[monsterArray[i].i+1][monsterArray[i].j] === 2) && (monsterArray[i].num === 10)) {
						score+=50;
						monsterArray.shift();
						i=0;
					} else if (board[monsterArray[i].i+1][monsterArray[i].j] === 2) {
						score-=10;
						strike++;
						board[shape.i][shape.j] = 0;
						shape.i = shape.firsti;
						shape.j = shape.firstj;
					} else if ((board[monsterArray[i].i+1][monsterArray[i].j] === 6) || (board[monsterArray[i].i+1][monsterArray[i].j] === 7)
						|| (board[monsterArray[i].i+1][monsterArray[i].j] === 8) || (board[monsterArray[i].i+1][monsterArray[i].j] === 9) || (board[monsterArray[i].i+1][monsterArray[i].j] === 10))  {
						
					} else {
						monsterArray[i].i++;
						monsterArray[i].hasBall = board[monsterArray[i].i][monsterArray[i].j];
					}
					check = false;
				}
			}
		}
		board[monsterArray[i].i][monsterArray[i].j] = monsterArray[i].num;
		check = true;
	}
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if(goal===0){
		Draw();
		document.getElementById("backgroundMusic").pause();
		document.getElementById("winnerMusic").play();
		window.clearInterval(interval);
		var modal = document.getElementById("winner");
		var span = document.getElementsByClassName("close1")[0];
		gameModal(modal, span);
		ballsGet = 0;
	} else if (parseInt(document.getElementById("lblTime").value) === 0) {
		document.getElementById("backgroundMusic").pause();
		document.getElementById("crowdbooMusic").play();
		window.clearInterval(interval);
		document.getElementById("finalScore").innerHTML = score;
		var modal = document.getElementById("points");
		var span = document.getElementsByClassName("close3")[0];
		gameModal(modal, span);
		ballsGet = 0;
	} else if (strike > 5) {
		document.getElementById("backgroundMusic").pause();
		document.getElementById("crowdbooMusic").play();
		window.clearInterval(interval);
		var modal = document.getElementById("loser");
		var span = document.getElementsByClassName("close2")[0];
		gameModal(modal, span);
		ballsGet = 0;
		
	} else {
		Draw();
	}
}

function countdown() {
	timeLeft--;
	document.getElementById("lblTime").value = String( timeLeft );
	if (timeLeft > 0) {
		timer = setTimeout(countdown, 1000);
	}
};

function gameModal(modal, span) {
	modal.style.display = "block";
	span.onclick = function() {
		modal.style.display = "none";
	}
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
		  modal.style.display = "none";
	  }
	})
}