var x = 0;
gameIterator = setInterval(iterateGame, 500);

function iterateGame(){
	console.log("iterate");
}

function keyDown(){
	ENTER = 13;
	keyCode = event.keyCode;
	
	if(keyCode == ENTER){
		console.log(document.getElementById("input").value);
	}
}

clearInterval(gameIterator);