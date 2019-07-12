var gameIterator = setInterval(iterateGame, 500);
var playerName = "";
var occupation = "";


class Person{
	measles = 0;
	snakebite = 0;
	exhaustion = 0;
	typhoid = 0;
	cholera = 0;
	dysentary = 0;
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
	var p = new Person("h");
	console.log(p.name);
}

function iterateGame(){
	console.log("iterate");
	textBoxInvisible();
}

function keyDown(){
	ENTER = 13;
	keyCode = event.keyCode;
	
	if(keyCode == ENTER){
		console.log(document.getElementById("input").value);
	}
}

window.onload = startGame;