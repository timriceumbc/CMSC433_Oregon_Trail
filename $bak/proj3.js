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
var departureMonth = "";
var money = 0;
var bill = 0;
var oxen = 0;
var food = 0;
var clothes = 0;
var worms = 0;
var wheels = 0;
var axels = 0;
var tongues = 0;
var day = 1;
var weather = "warm";
var health = "good";
var pace = "strenuous";
var ration = "meager";
var fishWeight = 0;

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

function calcBill(){
	bill = (oxen * 20) + (food * .2) + (clothes * 10) + (worms * .1) + (wheels * 10)
	+ (axels * 10) + (tongues * 10);
	console.log("bill: " + bill);
}

function changeGameState(state){
	gameState = state;
	stateText = "";
	var pattern = new RegExp(state + ".*?__End", "s");
	stateText = pattern.exec(textFile)[0];
	stateText = stateText.substr(state.length, stateText.length - 5 - state.length);
	stateText = valueSub(stateText);
	document.getElementById("displayText").innerHTML = stateText;
}
function changeGameStatePpl(state){
	gameState = state;
	stateText = "";
	var pattern = new RegExp(state + ".*?__End", "s");
	stateText = pattern.exec(textFile)[0];
	stateText = stateText.substr(state.length, stateText.length - 5 - state.length);
	stateText = valueSub(stateText);
	document.getElementById("peopleTxt").innerHTML = stateText;
}

function valueSub(stateText){
	stateText = stateText.replace(/\(bill\)/, String(bill));
	stateText = stateText.replace(/\(playerName\)/, String(playerName));
	stateText = stateText.replace(/\(party[1]\)/, String(party[1]));
	stateText = stateText.replace(/\(party[2]\)/, String(party[2]));
	stateText = stateText.replace(/\(party[3]\)/, String(party[3]));
	stateText = stateText.replace(/\(party[4]\)/, String(party[4]));
	stateText = stateText.replace(/\(money\)/, String(money));
	stateText = stateText.replace(/\(month\)/, String(month));
	stateText = stateText.replace(/\(day\)/, String(day));
	stateText = stateText.replace(/\(year\)/, String(year));
	stateText = stateText.replace(/\(weather\)/, String(weather));
	stateText = stateText.replace(/\(health\)/, String(health));
	stateText = stateText.replace(/\(pace\)/, String(pace));
	stateText = stateText.replace(/\(ration\)/, String(ration));
	stateText = stateText.replace(/\(oxenTotal\)/, String(oxenTotal));
	stateText = stateText.replace(/\(foodTotal\)/, String(foodTotal));
	stateText = stateText.replace(/\(clothTotal\)/, String(clothTotal));
	stateText = stateText.replace(/\(wormTotal\)/, String(wormTotal));
	stateText = stateText.replace(/\(spareTotal\)/, String(spareTotal));
	stateText = stateText.replace(/\(people\)/, String(partyLength));
	stateText = stateText.replace(/\(location\)/, String(location));
	stateText = stateText.replace(/\(oxenCost\)/, String(oxenCost));
	stateText = stateText.replace(/\(clothCost\)/, String(clothCost));
	stateText = stateText.replace(/\(wormCost\)/, String(wormCost));
	stateText = stateText.replace(/\(wheelCost\)/, String(wheelCost));
	stateText = stateText.replace(/\(axleCost\)/, String(axleCost));
	stateText = stateText.replace(/\(tongueCost\)/, String(tongueCost));
	stateText = stateText.replace(/\(foodCost\)/, String(foodCost));
	stateText = stateText.replace(/\(buyInput\)/, String(buyInput));
	stateText = stateText.replace(/\(oxen\)/, String(oxen));
	stateText = stateText.replace(/\(clothes\)/, String(clothes));
	stateText = stateText.replace(/\(worms\)/, String(worms));
	stateText = stateText.replace(/\(wheels\)/, String(wheels));
	stateText = stateText.replace(/\(axles\)/, String(axels));
	stateText = stateText.replace(/\(tongues\)/, String(tongues));
	stateText = stateText.replace(/\(food\)/, String(food));
	stateText = stateText.replace(/\(randomExchange\)/, String(randomExchange));
	stateText = stateText.replace(/\(randomExchange2\)/, String(randomExchange2));
	stateText = stateText.replace(/\(rivWid\)/, String(rivWid));
	stateText = stateText.replace(/\(rivDep\)/, String(rivDep));
	stateText = stateText.replace(/\(ferryCost\)/, String(ferryCost));
	stateText = stateText.replace(/\(dayCost\)/, String(dayCost));
	stateText = stateText.replace(/\(fishWeight\)/, String(fishWeight));
	stateText = stateText.replace(/\(peoplePoint\)/, String(peoplePoint));
	stateText = stateText.replace(/\(wagonPoint\)/, String(wagonPoint));
	stateText = stateText.replace(/\(oxenPoint\)/, String(oxenPoint));
	stateText = stateText.replace(/\(partPoint\)/, String(partPoint));
	stateText = stateText.replace(/\(clothPoint\)/, String(clothPoint));
	stateText = stateText.replace(/\(wormPoint\)/, String(wormPoint));
	stateText = stateText.replace(/\(foodPoint\)/, String(foodPoint));
	stateText = stateText.replace(/\(moneyPoint\)/, String(moneyPoint));
	stateText = stateText.replace(/\(points\)/, String(points));
	return stateText;
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
		playerName = input;
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
	else if(gameState == "\\.Leave"){
		if(input == "1"){
			departureMonth = "March";
			changeGameState("\\.Equipment");
		}
		else if(input == "2"){
			departureMonth = "April";
			changeGameState("\\.Equipment");
		}
		else if(input == "3"){
			departureMonth = "May";
			changeGameState("\\.Equipment");
		}
		else if(input == "4"){
			departureMonth = "June";
			changeGameState("\\.Equipment");
		}
		else if(input == "5"){
			departureMonth = "July";
			changeGameState("\\.Equipment");
		}
		else if(input == "6"){
			changeGameState("\\.Advice");
		}
	}
	else if(gameState == "\\.Advice"){
		changeGameState("\\.Leave");
	}
	else if(gameState == "\\.Equipment"){
		changeGameState("\\.Equipment2");
	}
	else if(gameState == "\\.Equipment2"){
		document.getElementById("ms").className = "People p1";
		changeGameStatePpl("\\.Equipment3");
	}
	else if(gameState == "\\.Equipment3"){
		changeGameStatePpl("\\.Equipment4");
	}
	else if(gameState == "\\.Equipment4"){
		changeGameState("\\.Store1");
		calcBill();
	}
	else if(gameState == "\\.Store1"){
		if(input == "1"){
			changeGameState("\\.Mattoxen");
		}
		else if(input == "2"){
			changeGameState("\\.Mattfood");
		}
		else if(input == "3"){
			changeGameState("\\.Mattcloth");
		}
		else if(input == "4"){
			changeGameState("\\.Mattammo");
		}
		else if(input == "5"){
			changeGameState("\\.Mattspare");
		}
		else if(input == ""){
			changeGameState("\\.Mattdone");
		}
	}
	else if(gameState == "\\.Mattoxen"){
		if(Number(input) >= 0){
			oxen = Number(input) * 2;
			calcBill();
			changeGameState("\\.Store1");
		}
	}
	else if(gameState == "\\.Mattfood"){
		if(Number(input) >= 0){
			food = Number(input);
			calcBill();
			changeGameState("\\.Store1");
		}
	}
	else if(gameState == "\\.Mattcloth"){
		if(Number(input) >= 0){
			clothes = Number(input);
			calcBill();
			changeGameState("\\.Store1");
		}
	}
	else if(gameState == "\\.Mattammo"){
		if(Number(input) >= 0){
			worms = Number(input) * 20;
			calcBill();
			changeGameState("\\.Store1");
		}
	}
	else if(gameState == "\\.Mattspare"){
		if(Number(input) >= 0){
			wheels = Number(input);
			calcBill();
			changeGameState("\\.Mattspare2");
		}
	}
	else if(gameState == "\\.Mattspare2"){
		if(Number(input) >= 0){
			axels = Number(input);
			calcBill();
			changeGameState("\\.Mattspare3");
		}
	}
	else if(gameState == "\\.Mattspare3"){
		if(Number(input) >= 0){
			tongues = Number(input);
			calcBill();
			changeGameState("\\.Store1");
		}
	}
	else if(gameState == "\\.Mattdone"){
		if(Number(input) >= 0){
			wheels = Number(input);
			calcBill();
			changeGameState("\\.Location");
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

$(document).ready(function(){
	var myCanvas = document.createElement("canvas");
	myCanvas.className = "UI";
	document.body.appendChild(myCanvas);
	document.getElementById("ms").className = "EventSnow2 snowLost";
})
