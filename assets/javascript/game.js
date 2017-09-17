//Character Objects
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
	hp: 150,
	attack: 6,
	counter: 20,
	profile: "test-img.jpg",
	objectName: "maul"
}

//REUSABLE GAME FUNCTIONS
// function build character object buildCharacter(character, location)
function buildCharacter(character, locationId) {
	var htmlString = '<div class="col-sm-3 text-center character" id="' + character.objectName + '"><h1>' + character.name +'</h1>' + '<div class="img-responsive character-image"><img src="assets/images/' + character.profile + '"></div>' + '<div class="hp">' + character.hp + '</div><div class="progress hp-bar"><div class="progress-bar" role="progressbar" aria-valuenow="'+ hpPercent(character) + '" aria-valuemin="0" aria-valuemax="100" style="width: '+ hpPercent(character) + '%;"></div></div></div> <!-- end character -->'
	$('#'+ locationId).append(htmlString);
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


//GAME ORDER LOGIC
//Build all characters into the Characters div
buildCharacter(obiwan, 'characters');
buildCharacter(vader, 'characters');
buildCharacter(maul, 'characters');

//Select player character
	//remove character from characters and build in player

//Select enemy character
	//remove character from characters and build in enemy

$('div.character').click( function() {
	removeCharacter($(this).attr('id'));
	//console.log(this);
})