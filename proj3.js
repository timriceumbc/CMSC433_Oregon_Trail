var gameIterator = setInterval(iterateGame, 1000/60);
var gameState = "";
/*possible states: 
	game not started = ""
	"\\.Start"
	...
*/
var playerName = "";
var occupation = "";
var textFile = "";
var stateText = "";

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
	changeGameState("\\.Start");
	document.getElementById("displayText").innerHTML = stateText;
}

function iterateGame(){
	console.log("iterate");
}

function changeGameState(state){
	gameState = state;
	stateText = "";
	var pattern = new RegExp(state + ".*?__End", "s");
	stateText = pattern.exec(textFile)[0];
	stateText = stateText.substr(state.length, stateText.length - 5 - state.length);
	console.log(stateText);
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
			startGame();
		}
	};
	xhttp.open("POST", "main_game_text.txt", true);
	xhttp.send();
}

loadDoc();