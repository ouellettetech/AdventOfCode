var globalCalled=0;

function Wizard(hp, mana, manaUsed, rounds){
	this.hp = hp;
	this.mana = mana;
	this.manaUsed = manaUsed;
	this.trail = [];
	this.rounds = rounds;
	this.spellsKnown = [
		{ name: "Magic Missle", Cost: 53, Damage: 4, Heal: 0, Armor: 0, Duration: 0, Mana: 0},
		{ name: "Drain", Cost: 73, Damage: 2, Heal: 2, Armor: 0, Duration: 0, Mana: 0},
		{ name: "Shield", Cost: 113, Damage: 0, Heal: 0, Armor: 7, Duration: 6, Mana: 0},
		{ name: "Poison", Cost: 173, Damage: 3, Heal: 0, Armor: 0, Duration: 6, Mana: 0},
		{ name: "Recharge", Cost: 229, Damage: 0, Heal: 0, Armor: 0, Duration: 5, Mana: 101},
	]
	this.effects = []; //current Effects;

	this.getCurrentArmor = function (){
		var curArmor=0;
		for(var i=0;i<this.effects.length;i++){
			curArmor+=this.effects[i].armor;
		}
		return curArmor;
	}

	this.cloneWizard = function(){
		var newWiz = new Wizard(this.hp,this.mana, this.manaUsed, this.rounds);
		newWiz.effects = [];
		for(var i=0;i<this.effects.length;i++){
			newWiz.effects.push({name: this.effects[i].name,
				damage: this.effects[i].damage,
				timer: this.effects[i].timer, 
				mana: this.effects[i].mana,
				armor: this.effects[i].armor,
				heal: this.effects[i].heal,
			});
		}

		for(var i=0;i<this.trail.length;i++){
			newWiz.trail.push(this.trail[i]);
		}

		return newWiz;
	}

	this.getUpKeepDamage = function(){
		var curDamage=0;
		for(var i=0;i<this.effects.length;i++){
			curDamage+=this.effects[i].damage;
		}
		return curDamage;
	}
	
	this.getUpKeepManaChange = function(){
		var curManaChange=0;
		for(var i=0;i<this.effects.length;i++){
			curManaChange+=this.effects[i].mana;
		}
		return curManaChange;
	}

	this.updateManaTimers = function(){
		for(var i=0;i<this.effects.length;i++){
			this.effects[i].timer--;
		}
		this.effects = this.effects.filter(function(value){ return value.timer>0;});
	}

	this.spellCanBeCast = function(spell){
		if(spell.Cost>this.mana){
			return false;
		}
		for(var i=0;i<this.effects.length;i++){
			if(this.effects[i].name === spell.name){
				return false;
			}
		}
		return true;
	}
	this.castSpell = function(spell, boss){
		if(spell.Duration === 0){// Instantanous Spell,
			boss.hp += (-1 * spell.Damage);
			this.hp += spell.Heal;
			this.manaUsed += spell.Cost;
			this.mana += spell.Mana;
			this.mana -= spell.Cost;
			this.trail.push(spell);
		} else {
			this.manaUsed += spell.Cost;
			this.mana -= spell.Cost;
			this.trail.push(spell);
			var newEffect = { 
				name: spell.name,
				damage: spell.Damage,
				timer: spell.Duration, 
				mana: spell.Mana,
				armor: spell.Armor,
				heal: spell.Heal,
			}
			this.effects.push(newEffect);
		}
	}

	this.startingRound = function(){
		this.rounds++;
	}

	this.isDead = function(){
		return this.hp<=0;
	}
}

function Boss(currentHp){
	this.hp = currentHp;
	this.damage = 8;

	this.cloneBoss = function(){
		var newBoss = new Boss();
		return new Boss(this.hp);
	}

	this.isDead = function(){
		return this.hp<=0;
	}
}

var startingPlayer = new Wizard(50,500,0,0);
var startingBoss = new Boss(55);

var currentStatesQueue = [];

function addNewState(curBoss, wizard, playerTurn){
	var newState = {Boss: curBoss.cloneBoss(), Player: wizard.cloneWizard(), PlayerTurn: playerTurn};
	currentStatesQueue.push(newState);
}

function lowestManaUsage(a,b){
	if (a.Player.manaUsed < b.Player.manaUsed) {
		return -1;
	  }
	  if (a.Player.manaUsed > b.Player.manaUsed) {
		return 1;
	  }
	  // a must be equal to b
	  return 0;
}

var runState = (function () {
	"use strict";
	function runStateHelper() { 
		if(currentStatesQueue.length<1){
			console.log("Error Ran out of states");
			return -1;
		}
		//console.log("Starting Run One State");
		currentStatesQueue.sort(lowestManaUsage);
		var curItem = currentStatesQueue.shift();
		console.log(curItem.Player.manaUsed);
	
		var state=playOneRound(curItem.Boss, curItem.Player, curItem.PlayerTurn);
		
		if(state!==-1){
			console.log("State is not -1");
			console.log(curItem);
			console.log(state);
			return state;
		}
		return runStateHelper();
	}
	return runStateHelper();
});


function runOneStateTail(){
	if(currentStatesQueue.length<1){
		console.log("Error Ran out of states");
		return -1;
	}
	//console.log("Starting Run One State");
	currentStatesQueue.sort(lowestManaUsage);
	var curItem = currentStatesQueue.shift();
	console.log(curItem.Player.manaUsed);

	var state=playOneRound(curItem.Boss, curItem.Player, curItem.PlayerTurn);
	if(state===-1){
		return runOneState();
	} else {
		console.log("State is not -1");
		console.log(curItem);
		console.log(state);
		return state;
	}
}

function runOneState(part2){
	var state=-1;
	var Newstate;
	var path=[];
	while((state===-1) || (currentStatesQueue.length>0)){
		if(currentStatesQueue.length<1){
			console.log("Error Ran out of states");
			return -1;
		}
		if(state!==-1){
			// We found a winner just confirm there are no slightly smaller in the "upkeep phase";
			currentStatesQueue=currentStatesQueue.filter(function(value){
				return value.Player.manaUsed<state;
			});
		}
		if(currentStatesQueue.length>0){
			//console.log("Starting Run One State");
			currentStatesQueue.sort(lowestManaUsage);
			var curItem = currentStatesQueue.shift();
			console.log(curItem.Player.manaUsed);

			Newstate=playOneRound(curItem.Boss, curItem.Player, curItem.PlayerTurn, part2);
			if(Newstate!==-1){
				if((-1===state)||(Newstate<state)){
					state = Newstate;
					path = curItem.Player.trail;
					console.log("State is not -1");
					console.log(state);
				}
			}
		}
	}
	console.log(path);
	return state;
}

function playOneRound(boss,player, playerTurn, part2){
	globalCalled++;
	if(playerTurn && part2){
		player.hp--;
		if(player.isDead()){
			return -1;
		}
	}
	player.startingRound();
//	console.log("Running one Round!");
//	console.log(player);
//	console.log(boss);

	boss.hp+=(-1*player.getUpKeepDamage());
	player.mana+=player.getUpKeepManaChange();
	var curArmor = player.getCurrentArmor();
	player.updateManaTimers();

	if(boss.isDead()){
		console.log("Killed in Upkeep Phase!");
		return player.manaUsed;
	}
	if(playerTurn){
		var availableSpells = player.spellsKnown;
		for(var i=0;i<availableSpells.length;i++){
			if(player.spellCanBeCast(availableSpells[i])){ // don't run a spell if we can't afford it.
//				console.log("available");
//				console.log(availableSpells[i]);
				var newPlayer = player.cloneWizard();
				var newBoss = boss.cloneBoss();
				newPlayer.castSpell(availableSpells[i],newBoss);
				if(newBoss.isDead()){
					console.log("Killed in Combat!");
					return newPlayer.manaUsed;
				} else {
					addNewState(newBoss,newPlayer, !playerTurn);
				}
			}
		}
	} else {
		var bossDamage = curArmor-boss.damage;
		// don't have to worry about doing at least one, since we can only have 7 armor.
		player.hp+=bossDamage;
		if(player.isDead()){
			return -1;
		} else {
			addNewState(boss,player, !playerTurn);
		}
	}
	return -1;
}

function testData(){
	currentStatesQueue = [];
	var player1 = new Wizard(10,100,0,0);
	var boss1 = new Boss(5);
	playOneRound(boss1,player1,true);
	console.log(currentStatesQueue);
	boss1.hp+=-3;
	console.log(boss1.hp);
	console.log(currentStatesQueue[0].Boss.hp);

	console.log("Trying Player 2");
	var player2 = new Wizard(10,229,0,0);
	var boss2 = new Boss(20);
	playOneRound(boss2,player2,true);
	console.log(currentStatesQueue);
}

function testData2(){
	currentStatesQueue = [];

	var player1 = new Wizard(50,500,0,0);
	var boss1 = new Boss(55);
	var curState;
	curState = testOneRound(boss1,player1,"Poison");
	curState = testOneRound(curState.Boss, curState.Player, "Recharge");
	curState = testOneRound(curState.Boss, curState.Player, "Shield");
	curState = testOneRound(curState.Boss, curState.Player, "Magic Missle");
	curState = testOneRound(curState.Boss, curState.Player, "Magic Missle");
	curState = testOneRound(curState.Boss, curState.Player, "Poison");
	curState = testOneRound(curState.Boss, curState.Player, "Magic Missle");
	curState = testOneRound(curState.Boss, curState.Player, "Magic Missle");
}

function testData3(){
	currentStatesQueue = [];

	var player = new Wizard(50,500,0,0);
	var boss = new Boss(4);
	addNewState(boss,player, true, false);
	console.log(runOneState(false));
}

function testOneRound(boss,player,spellName){
	var curState;
	playOneRound(boss,player,true);
	console.log("Players Turn!");
	curState=currentStatesQueue.find(function(value){
		if(value.Player.trail[(value.Player.trail.length-1)].name === spellName){
			return true;
		}
	});
	if(curState===undefined){
	//	console.log("Couldn't find spell being cast...");
		console.log(currentStatesQueue);
		currentStatesQueue.forEach(function(value){
			console.log(value.Player.trail);
		});
	}
	console.log(curState);
	curState.Player.effects.forEach(function(value){
		console.log(value);
	});
	currentStatesQueue = []; // Clear current State;
	console.log("Bosses Turn!");
	playOneRound(curState.Boss,curState.Player,false);
	curState = currentStatesQueue[0];
	currentStatesQueue = [];
	console.log(curState);
	curState.Player.effects.forEach(function(value){
		console.log(value);
	});
	return curState;
}

// One of the other problems a suggested solution was to use A*, which actually seems really appropriate here.
// (Was worried about going down a long trail of recharge and getting caugth in that.)
// It turns out to be really slow though, I could increase the speed significantly, by caching results, or 
// making sure I remove duplicate states.
function day22a(curBoss, curPlayer){
	addNewState(curBoss,curPlayer, true, false);
	console.log(runOneState(false));
}

function day22b(curBoss, curPlayer){
	addNewState(curBoss,curPlayer, true);
	console.log(runOneState(true));
}

//testData2();
testData3();
console.log("Day 22 Part A");
//console.log(day22a(startingBoss,startingPlayer));
console.log("Day 21 Part B");
//console.log(day22b(startingBoss,startingPlayer));
