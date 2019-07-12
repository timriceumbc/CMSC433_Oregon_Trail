var gameIterator = setInterval(iterateGame, 1000/60);
var gameInProgress = false;
var playerName = "";
var occupation = "";
var textFile = "";

class Person{
	measles = 0;
	snakebite = 0;
	exhaustion = 0;
	typhoid = 0;
	cholera = 0;
	dysentery = 0;
	name = "";
	
	constructor(name){
		this.name = name;
	}
}

function textBoxFullscreen(){
	document.getElementById("textbg").style.top = "8px";
	document.getElementById("textbg").style.left = "8px";
	document.getElementById("textbg").style.width = "904px";
	document.getElementById("textbg").style.height = "586px";
}

function textBoxInvisible(){
	document.getElementById("textbg").style.top = "0px";
	document.getElementById("textbg").style.left = "0px";
	document.getElementById("textbg").style.width = "0px";
	document.getElementById("textbg").style.height = "0px";
}

function startGame(){
	gameInProgress = true;
	document.getElementById("displayText").innerHTML = textFile;
}

function iterateGame(){
	console.log("iterate");
	if(textFile != "" && gameInProgress == false){
		startGame();
	}
}

function keyDown(){
	ENTER = 13;
	keyCode = event.keyCode;
	
	if(keyCode == ENTER){
		processInput(document.getElementById("input").value);
	}
}

function processInput(input){
	console.log(input);
}

function loadDoc() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			textFile = this.responseText;
		}
	};
	xhttp.open("POST", "main_game_text.txt", true);
	xhttp.send();
}

loadDoc();