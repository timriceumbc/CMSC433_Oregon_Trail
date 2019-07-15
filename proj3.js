var gameIterator;
var gameState = "";
/*possible states:
	game not started = ""
	"\\.Start"
	"Travel"
	...
*/
var myJSON = '{"0":["Independence","Kansas River Crossing",102],"1":["Kansas River crossing","Big Blue River crossing",83],"2":["Big Blue River crossing","Fort Kearney",119],"3":["Fort Kearney","Chimney Rock",250],"4":["Chimney Rock","Fort Laramie",86],"5":["Fort Laramie","Independence Rock",190],"6":["Independence Rock","South Pass",102],"7":["South Pass","Green River crossing",57],"8":["South Pass","Fort Bridger",125],"9":["Green River crossing","Soda Springs",143],"10":["Fort Bridger","Soda Springs",162],"11":["Soda Springs","Fort Hall",57],"12":["Fort Hall","Snake River crossing",182],"13":["Snake River crossing","Fort Boise",113],"14":["Fort Boise","Blue Mountains",160],"15":["Blue Mountains","Fort Walla Walla",55],"16":["Blue Mountains","The Dalles",125],"17":["Fort Walla Walla","The Dalles",120],"18":["The Dalles","Willemette Valley",100]}';
var locJSON = JSON.parse(myJSON);
var playerName = "";
var occupation = "";
var textFile = "";
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
var month = "";
var year = "";
var weather = "warm";
var health = "good";
var pace = "strenuous";
var ration = "meager";
var fishWeight = 0;
var year = 1848;
var oxenTotal = 0;
var foodTotal = 0;
var	clothTotal = 0;
var	wormTotal = 0;
var	spareTotal = 0;
var	loc = "Independence";
var	oxenCost = 20;
var	foodCost = .2;
var	clothCost = 10;
var	wormCost = .1;
var	wheelCost = 10;
var	axleCost = 10;
var	tongueCost = 10;
var buyInput = 0;
var	randomExchange = 0;
var	randomExchange2 = 0;
var	rivWid = 0;
var	rivDep = 0;
var	ferryCost = 0;
var	dayCost = 0;
var	peoplePoint = 0;
var	wagonPoint = 0;
var	oxenPoint = 0;
var	partPoint = 0;
var	clothPoint = 0;
var	wormPoint = 0;
var	foodPoint = 0;
var	moneyPoint = 0;
var	points = 0;
var distance = 0;
var dests = "";
var nextDestDist = locJSON[0][2];
var locNum = 0;

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

// Travel Logic
function iterateGame(){
	console.log("iterate");
	distance += 10;
	var display = "distance: " + distance;
	document.getElementById("displayText").innerHTML = display;
	
	// Sickness Logic
	for (var i = 0; i < party.length; i++){
		if(Math.random() < .005)
			party[i].measles = 100;
		if(Math.random() < .005)
			party[i].snakebite = 100;
		if(Math.random() < .005)
			party[i].exhaustion = 100;
		if(Math.random() < .005)
			party[i].typhoid = 100;
		if(Math.random() < .005)
			party[i].cholera = 100;
		if(Math.random() < .005)
			party[i].dysentery = 100;
	}
	console.log(party);
	
	// Destination Logic
	if(distance >= 2000){
		changeGameState("\\.Scoring")
		// TO DO Calculate score
	}
	else if(distance >= nextDestDist){
		locNum++;
		loc = locJSON[locNum][0];
		console.log("locNum: " + locNum);
		console.log("loc: " + loc);
		nextDestDist += locJSON[locNum][2];
		clearInterval(gameIterator);
		updateTopScreenLocation();
		changeGameState("\\.Location")
	}
}

function updateTopScreenLocation(){
	document.getElementById("ms").className = "Locations indepen1";
}

function calcBill(){
	oxenTotal = oxen * oxenCost;
	foodTotal = food * foodCost;
	clothTotal = clothes * clothCost;
	wormTotal = worms * wormCost;
	wheelTotal = wheels * wheelCost;
	axleTotal = axels * axleCost;
	tongueTotal = tongues * tongueCost;

	spareTotal = wheelTotal + axleTotal + tongueTotal;

	bill = oxenTotal + foodTotal + clothTotal + wormTotal + wheelTotal + axleTotal + tongueTotal;
	console.log("bill: " + bill);
}

function changeGameState(state){
	gameState = state;
	var stateText = "";
	if(state.substr(0,2) == "\\."){
		var pattern = new RegExp(state + ".*?__End", "s");
		stateText = pattern.exec(textFile)[0];
		stateText = stateText.substr(state.length, stateText.length - 5 - state.length);
		stateText = valueSub(stateText);
	}
	document.getElementById("displayText").innerHTML = stateText;
	document.getElementById("peopleTxt").innerHTML = "";
}

function changeGameStatePpl(state){
	gameState = state;
	var stateText = "";
	var pattern = new RegExp(state + ".*?__End", "s");
	stateText = pattern.exec(textFile)[0];
	stateText = stateText.substr(state.length, stateText.length - 5 - state.length);
	stateText = valueSub(stateText);
	document.getElementById("peopleTxt").innerHTML = stateText;
}

function valueSub(stateText){
	stateText = stateText.replace(/\(bill\)/, String(bill));
	stateText = stateText.replace(/\(playerName\)/, String(playerName));
	if(party[1] != null)
		stateText = stateText.replace(/\(party\[1\]\)/, String(party[1].name));
	if(party[2] != null)
		stateText = stateText.replace(/\(party\[2\]\)/, String(party[2].name));
	if(party[3] != null)
		stateText = stateText.replace(/\(party\[3\]\)/, String(party[3].name));
	if(party[4] != null)
		stateText = stateText.replace(/\(party\[4\]\)/, String(party[4].name));
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
	stateText = stateText.replace(/\(people\)/, String(party.length));
	stateText = stateText.replace(/\(location\)/, String(loc));
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
			money = 1800;
			changeGameState("\\.Chosen");
		}
		else if(input == "2"){
			occupation = "carpenter";
			money = 1200;
			changeGameState("\\.Chosen");
		}
		else if(input == "3"){
			occupation = "farmer";
			money = 600;
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
		party.push(new Person(input));
		changeGameState("\\.Party2");
		console.log(party)
	}
	else if(gameState == "\\.Party2"){
		party.push(new Person(input));
		changeGameState("\\.Party3");
		console.log(party)
	}
	else if(gameState == "\\.Party3"){
		party.push(new Person(input));
		changeGameState("\\.Party4");
		console.log(party)
	}
	else if(gameState == "\\.Party4"){
		party.push(new Person(input));
		changeGameState("\\.Party5");
		console.log(party)
	}
	else if(gameState == "\\.Party5"){
		changeGameState("\\.Leave");
	}
	else if(gameState == "\\.Leave"){
		if(input == "1"){
			month = "March";
			changeGameState("\\.Equipment");
		}
		else if(input == "2"){
			month = "April";
			changeGameState("\\.Equipment");
		}
		else if(input == "3"){
			month = "May";
			changeGameState("\\.Equipment");
		}
		else if(input == "4"){
			month = "June";
			changeGameState("\\.Equipment");
		}
		else if(input == "5"){
			month = "July";
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
		else if(input == "" && bill <= money){
			money -= bill;
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
		changeGameState("\\.Location");
	}
	else if(gameState == "\\.Location"){
		if(input == "1"){
			changeGameState("Travel");
			gameIterator = setInterval(iterateGame, 1000/2);
		}
	}
	else if(gameState == "Travel"){
		changeGameState("\\.Location");
		clearInterval(gameIterator);
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
	document.getElementById("ms").className = "GameLogo";
	loadDoc();
});
