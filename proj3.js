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
var party = [];

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

function iterateGame(){
	//console.log("iterate");
}

function changeGameState(state){
	gameState = state;
	stateText = "";
	var pattern = new RegExp(state + ".*?__End", "s");
	stateText = pattern.exec(textFile)[0];
	stateText = stateText.substr(state.length, stateText.length - 5 - state.length);
	document.getElementById("displayText").innerHTML = stateText;
}

function keyDown(){
	ENTER = 13;
	keyCode = event.keyCode;
	if(keyCode == ENTER){
		processInput(document.getElementById("input").value);
		document.getElementById("input").value = "";
	}
}

function processInput(input){
	console.log(input);
	if(gameState == "\\.Start" && input == "1"){
		changeGameState("\\.Travel");
	}
	else if(gameState == "\\.Travel"){
		if(input == "1"){
			occupation = "banker";
			changeGameState("\\.Chosen");
		}
		else if(input == "2"){
			occupation = "carpenter";
			changeGameState("\\.Chosen");
		}
		else if(input == "3"){
			occupation = "farmer";
			changeGameState("\\.Chosen");
		}
		else if(input == "4"){
			changeGameState("\\.Diff");
		}
	}
	else if(gameState == "\\.Diff"){
		changeGameState("\\.Travel");
	}
	else if(gameState == "\\.Chosen"){
		party.push(new Person(input));
		changeGameState("\\.Party");
	}
	else if(gameState == "\\.Party"){
		if(party.length <= 3){
			party.push(new Person(input));
			changeGameState("\\.Party");
			console.log(party)
		}
		else if(party.length == 4){
			party.push(new Person(input));
			changeGameState("\\.Leave");
			console.log(party)
		}
	}
}

function loadDoc() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			textFile = this.responseText;
			changeGameState("\\.Start");
		}
	};
	xhttp.open("POST", "main_game_text.txt", true);
	xhttp.send();
}

loadDoc();