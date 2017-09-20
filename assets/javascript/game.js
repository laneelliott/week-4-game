//Character Objects
var characters = ["obiwan", "vader", "maul"]
var enemiesRemaining;
var chosenOne;
var chosenOneObj;
var chosenEnemy;
var chosenEnemyObj;
var playerSelected = false;
var enemySelected = false;

var obiwan = {
	name: "Obiwan Kenobi",
	hpmax: 115,
	hp: 115,
	attack: 6,
	counter: 18,
	profile: "test-img.jpg",
	objectName: "obiwan"
}
var vader = {
	name: "Darth Vader",
	hpmax: 150,
	hp: 150,
	attack: 6,
	counter: 12,
	profile: "test-img.jpg",
	objectName: "vader"
}
var maul = {
	name: "Darth Maul",
	hpmax: 110,
	hp: 110,
	attack: 6,
	counter: 40,
	profile: "test-img.jpg",
	objectName: "maul"
}

//REUSABLE GAME FUNCTIONS
// function build character object buildCharacter(character, location)
function buildCharacter(character, locationId) {
	var htmlString = '<div class="col-sm-3 text-center character" id="' + character.objectName + '"><h4>' + character.name +'</h4>' + '<div class="img-responsive character-image"><img src="assets/images/' + character.profile + '"></div>' + '<div class="hp">' + character.hp + '</div><div class="progress hp-bar"><div class="progress-bar" role="progressbar" aria-valuenow="'+ hpPercent(character) + '" aria-valuemin="0" aria-valuemax="100" style="width: '+ hpPercent(character) + '%;"></div></div></div> <!-- end character -->'
	$('#'+ locationId).prepend(htmlString);
}

//Determines which character was selected and returns it.
function whichCharacter(characterString){
	if (characterString == 'obiwan') {
		return obiwan;
	} else if (characterString == 'vader') {
		return vader;
	} else if (characterString == 'maul') {
		return maul;
	}
}

// function remove character object removeCharacter(character, location)
function removeCharacter(character) {
	//Can get character id by using $(this).attr('id') on a click function
	$('#'+ character).remove();
}

//function to get the hp percent of a character
function hpPercent(character) {
	var percent = parseInt(character.hp / character.hpmax * 100);
	return(percent);
}

//function where user chooses their character and it populates the enemies in the correct div
function chooseCharacter(clickedCharacter){	
	chosenOne = clickedCharacter;
	console.log(chosenOne);
	removeCharacter(chosenOne);
	buildCharacter(whichCharacter(chosenOne), 'player');
	playerSelected = true;
	//Remove the choose divs
	$(".choose").remove();
	//Build the other characters into the enemies section
	for (var i=0; i < characters.length; i++){
		if(characters[i] === chosenOne){
			//Do nothing
		} else {
			buildCharacter(whichCharacter(characters[i]), 'enemies');
		}
	}
}

//function where the user selects the opponent they want to battle
function chooseEnemy(clickedCharacter){
	chosenEnemy = clickedCharacter;
	console.log(chosenEnemy);
	if (chosenEnemy != chosenOne){
		removeCharacter(chosenEnemy);
		buildCharacter(whichCharacter(chosenEnemy), 'enemy');
		enemySelected = true;
		$('.attack').show();
		$(".btn-attack").prop("disabled",false);
	}
}

//calculates the attack and updates the objects
function attack(){
	//first player attacks then defender counter attacks checks in that order
	chosenEnemyObj.hp = chosenEnemyObj.hp - chosenOneObj.attack;
	chosenOneObj.hp = chosenOneObj.hp - chosenEnemyObj.counter;
	//run updateHealth
	updateHealth(chosenEnemyObj);
	updateHealth(chosenOneObj);
	//run displayResults before updating attack power
	displayResults()
	//increases the attack power of the character
	increaseAttack()
	//checks the condition of the game
	checkGameCondition();
}

//Changes the values of the hp bars
function updateHealth(character){
	$('#'+ character.objectName+' .hp').html(character.hp);
	$('#'+ character.objectName+' .hp-bar .progress-bar').width(hpPercent(character)+'%');
}

//Displays the events of the attack before the attack power is updated
function displayResults(){
	$('.damage-dealt').html('You attacked ' + chosenEnemyObj.name + ' for ' + chosenOneObj.attack + ' damage.');
	$('.damage-received').html(chosenEnemyObj.name + ' attacked you for ' + chosenEnemyObj.attack + ' damage.');
}

//Increases the attack power of the character by 6 points
function increaseAttack(){
	chosenOneObj.attack+=6;
	console.log(chosenOneObj.attack)
}

//Checks whether the player had won or not
function checkGameCondition(){
	// Check if either player or enemy were defeated
	if (chosenEnemyObj.hp <= 0 ) {
		//enemy was defeated
		removeCharacter(chosenEnemy);
		enemiesRemaining--
		enemySelected = false;
		$(".btn-attack").prop("disabled",true);
		console.log(enemiesRemaining);
		if(enemiesRemaining === 0 ) {
			win();
		} else if (chosenOneObj.hp <= 0 ) {
			//player was still defeated
			lose();
		}
	} else if (chosenOneObj.hp <= 0 ){
		//player was defeated
			lose();
	}
}

//Game win function
function win(){
	console.log('You Win')
	$('#game-container').fadeOut(1000);
	setTimeout(function(){
		$('#gameover').fadeIn(1000);
	}, 1000);
	buildCharacter(chosenOneObj, 'gameover');
}

//Game lose function
function lose(){
	console.log('You Lose')
	$('#game-container').fadeOut(1000);
	setTimeout(function(){
		$('#gameover').fadeIn(1000);
	}, 1000);
	buildCharacter(chosenOneObj, 'gameover');
}

//GAME ORDER LOGIC
//Build all characters into the Characters div
buildCharacter(obiwan, 'characters');
buildCharacter(vader, 'characters');
buildCharacter(maul, 'characters');

function playGame(){
	//Sets the enemiesRemaining counter for the game.
	enemiesRemaining = characters.length - 1;
	//Populates the players choice of characters and defenders
	$(document).on('click', 'div.character', function(){
		if (!playerSelected){
			chooseCharacter($(this).attr('id'));
		} else if (!enemySelected){
			chooseEnemy($(this).attr('id'));
		} else {
			console.log('do nothing');
		}
	})
	//Runs the attack functions for btn-attack
	$('.btn-attack').on('click', function(){
		//Get combatants objects
		console.log('attack')
		chosenOneObj = whichCharacter(chosenOne);
		chosenEnemyObj = whichCharacter(chosenEnemy);
		attack();
	})
	
}
playGame();



//Select player character
	//remove character from characters and build in player

//Select enemy character
	//remove character from characters and build in enemy













