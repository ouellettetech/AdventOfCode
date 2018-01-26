

var currentStates = [];
var previousStates = [];

function RTGState(){
	this.floors = [];
	this.elevatorState = 0;

	this.toString = function(){
		var curString = "";
		for(var i=this.floors.length-1;i>=0;i--){
			curString += "Floor :"+(i+1) + " Contains Generators: " + this.floors[i].generators +
			" Microchips: "+ this.floors[i].microchips + "\n";
		}
		return curString;
	}

	this.sortFunction = function(generatorA, generatorB){
		var microchipFloorA=null;
		var microchipFloorB=null;
		for(var i=0;i<this.floors.length;i++){
			if(this.floors[i].microchips.indexOf(generatorA) !==-1){
				microchipFloorA = i;
			}
			if(this.floors[i].microchips.indexOf(generatorB) !==-1){
				microchipFloorA = i;
			}
		}
		if(!(microchipFloorA && microchipFloorB)){
			console.log("lost a microchip somewhere....");
		}
		
		// I just need a stable sort for the current State, don't care about individual elements
		if (microchipFloorA < microchipFloorB) {
			return -1;
		}
		if (microchipFloorA > microchipFloorB) {
			return 1;
		}
		// a must be equal to b
		return 0;

	}
	this.convertStateToString = function(curState, elevator){
		var curString = "E"+elevator;
		curState.forEach(function(value){
			curString +="G";
			value.generators.forEach(function(gen){
				curString +=gen;
			});
			curString +="M";
			value.microchips.forEach(function(micro){
				curString +=micro;
			});
		});
		return curString;
	}

	this.getCurrentState = function(){ 
		var curElementNum = 0;
		var curElementMap = {};
		var newState = [];
		this.floors.forEach(function(value, index){
			value.generators.sort(this.sortFunction);
			newState[index] = {generators: [], microchips: []}
			value.generators.forEach(function(curGen){
				newState[index].generators.push(curElementNum);
				curElementMap[curGen] = curElementNum++;
			})
		});

		// Now Set the microchips
		this.floors.forEach(function(value, index){
			value.microchips.forEach(function(curMicro){
				newState[index].microchips.push(curElementMap[curMicro]);
			})
			newState[index].microchips.sort(); // Again make sure we are in stable state, I don't want to repeat states.
		});

		return this.convertStateToString(newState, this.elevatorState);
	}

	this.duplicate = function(){
		var dup = new RTGState();
		dup.elevatorState = this.elevatorState;
		this.floors.forEach(function(curFloor, floorNum){
			dup.floors[floorNum] = {
				generators : curFloor.generators.slice(), 
				microchips :curFloor.microchips.slice()};
		});
		return dup;
	}

	this.isValid = function(){
		var oldGen = this.floors[this.elevatorState].generators;
		var micro = this.floors[this.elevatorState].microchips.slice();
		
		for(var i=0;i<oldGen.length;i++){
			var newIdx = micro.indexOf(oldGen[i]);
			if(newIdx !== -1){
				//console.log("Removing :"+oldGen[i]);
				micro.splice(newIdx,1);
			}
		}
		return ((oldGen.length === 0 ) || (micro.length === 0 ));
	}
	
	this.checkIfSeenAndAddToList = function(){
		//console.log(this.toString());
		var currentState = this.getCurrentState();
		//console.log(currentState);
		//console.log(previousStates);
		if(previousStates.indexOf(currentState) === -1){
			previousStates.push(currentState);
			return false;
		}
		return true;
	}

	this.removeGenerator = function(generatorName, floor){
		var elementNum = this.floors[floor].generators.indexOf(generatorName);
		this.floors[floor].generators.splice(elementNum,1);
	}

	this.removeMicrochip = function(microchipName, floorNum){
		//console.log("Removing a Microchip!");
		var elementNum = this.floors[floorNum].microchips.indexOf(microchipName);
		//console.log(this.floors[floorNum].microchips);
		this.floors[floorNum].microchips.splice(elementNum,1);
		//console.log(this.floors[floorNum].microchips);
	}

	this.addGenerator = function(generatorName,newFloor){
		this.floors[newFloor].generators.push(generatorName);
	}

	this.addMicrochip = function(microchipName,newFloor){
		//console.log("Adding Microchip to "+newFloor);
		this.floors[newFloor].microchips.push(microchipName);
		//console.log(this.floors[newFloor].microchips);
	}
	this.moveGenerator = function(generatorName, oldFloor, newFloor){
		this.removeGenerator(generatorName,oldFloor);
		this.addGenerator(generatorName,newFloor);
	}

	this.moveMicrochip = function(microchipName, oldFloor, newFloor){
		//console.log("Removing Microchip from: "+oldFloor + " Adding to " + newFloor );
		this.removeMicrochip(microchipName,oldFloor);
		this.addMicrochip(microchipName,newFloor);
	}

	this.getNewStates = function(){
		var canGoDown = false;
		var canGoUp = this.elevatorState<this.floors.length - 1;
		var newStates = [];
		var curFloorElements = this.floors[this.elevatorState];
		for(var i=0;!canGoDown && i<this.elevatorState;i++){
			if(this.floors[i].generators.length>0||this.floors[i].microchips.length>0){
				canGoDown = true;
			}
		}

		//console.log("Checking Elevator Level: "+this.elevatorState);
		for(var i=0;i<curFloorElements.generators.length;i++){
			//console.log("Checking Generator "+ curFloorElements.generators[i] + " against "+curFloorElements.microchips);
			// Move a pair
			if(curFloorElements.microchips.indexOf(curFloorElements.generators[i]) !== -1){
				if(canGoDown){
					//console.log("In Can go down in Pair!");
					var newState = this.duplicate();
					newState.elevatorState--;
					newState.moveGenerator(curFloorElements.generators[i],this.elevatorState, newState.elevatorState);
					newState.moveMicrochip(curFloorElements.generators[i],this.elevatorState, newState.elevatorState);
					if(newState.isValid() && !newState.checkIfSeenAndAddToList()){
						newStates.push(newState); // Moving a pair can't invalidate
					}
				}
				if(canGoUp){
					//console.log("In Can go UP in Pair!");
					var newState = this.duplicate();
					newState.elevatorState++;
					newState.moveGenerator(curFloorElements.generators[i],this.elevatorState, newState.elevatorState);
					newState.moveMicrochip(curFloorElements.generators[i],this.elevatorState, newState.elevatorState);
					if(newState.isValid() && !newState.checkIfSeenAndAddToList()){
						newStates.push(newState); // Moving a pair can't invalidate
					}
				}
			}

			// Move one or two Generator
			for(var j=i+1;j<curFloorElements.generators.length+1;j++){
				var currentFloorValid=true;
				if(canGoDown){
					var newState = this.duplicate();
						
					newState.moveGenerator(curFloorElements.generators[i],this.elevatorState, this.elevatorState-1);
					if(j<curFloorElements.generators.length){
						newState.moveGenerator(curFloorElements.generators[j],this.elevatorState, this.elevatorState-1);
					}
					if(!newState.isValid()){ // Make sure removing the generator(s) doen't break this floor
						currentFloorValid=false;
					}
					newState.elevatorState--;
					if(currentFloorValid && newState.isValid() && !newState.checkIfSeenAndAddToList()){
						newStates.push(newState);
					}
				}
				if(canGoUp){
					currentFloorValid=true;
					var newState = this.duplicate();

					newState.moveGenerator(curFloorElements.generators[i],this.elevatorState, this.elevatorState+1);
					if(j<curFloorElements.generators.length){
						newState.moveGenerator(curFloorElements.generators[j],this.elevatorState, this.elevatorState+1);
					}
					if(!newState.isValid()){
						currentFloorValid=false;
					}
					newState.elevatorState++;
					if(currentFloorValid && newState.isValid() && !newState.checkIfSeenAndAddToList()){
						newStates.push(newState);
					}
				}
			}
		}

		// Move one, or two Microchip
		for(var i=0;i<curFloorElements.microchips.length;i++){
			for(var j=i+1;j<curFloorElements.microchips.length+1;j++){
				var currentFloorValid=true;
				if(canGoDown){
					var newState = this.duplicate();
						
					newState.moveMicrochip(curFloorElements.microchips[i],this.elevatorState, this.elevatorState-1);
					if(j<curFloorElements.microchips.length){
						newState.moveMicrochip(curFloorElements.microchips[j],this.elevatorState, this.elevatorState-1);
					}
					if(!newState.isValid()){ // Make sure removing the generator(s) doen't break this floor
						currentFloorValid=false;
					}
					newState.elevatorState--;
					if(currentFloorValid && newState.isValid() && !newState.checkIfSeenAndAddToList()){
						newStates.push(newState);
					}
				}
				if(canGoUp){
					//console.log("Trying to move MicroChip Up i:" + i + " j: " + j);
					//console.log(curFloorElements.microchips);
					currentFloorValid=true;
					var newState = this.duplicate();
					//console.log("before new state");
					//console.log(newState);
					//console.log("After New State");
					newState.moveMicrochip(curFloorElements.microchips[i],this.elevatorState, this.elevatorState+1);
					if(j<curFloorElements.microchips.length){
						newState.moveMicrochip(curFloorElements.microchips[j],this.elevatorState, this.elevatorState+1);
					}
					if(!newState.isValid()){
						currentFloorValid=false;
					}
					newState.elevatorState++;
					// console.log("before Printing Current State");
					// console.log(newState.toString());
					// var isPreviousState = ;
					// console.log("Curent Floor Valid: "+currentFloorValid);
					// console.log("New State Valid: "+newState.isValid());
					// console.log("Is New State: "+!isPreviousState);
					if(currentFloorValid && newState.isValid() && !newState.checkIfSeenAndAddToList()){
						newStates.push(newState);
					}
				}
			}
		}
		//console.log("New States:");
		//console.log(newStates);
		return newStates;
	}
}


var startingState = new RTGState();

// The first floor contains a thulium generator, a thulium-compatible microchip, a plutonium generator, 
//       and a strontium generator.
// The second floor contains a plutonium-compatible microchip and a strontium-compatible microchip.
// The third floor contains a promethium generator, a promethium-compatible microchip, a ruthenium generator,
//       and a ruthenium-compatible microchip.
// The fourth floor contains nothing relevant.

startingState.floors[0] = {generators: ["t","p","s"], microchips: ["t"]};
startingState.floors[1] = {generators: [], microchips: ["p","s"]};
startingState.floors[2] = {generators: ["m","r"], microchips: ["m","r"]};
startingState.floors[3] = {generators: [], microchips: []};

function testData(){
	console.log(startingState.toString());
	console.log(startingState.getCurrentState());


	var newState = new RTGState();
	newState.floors[0] = {generators: ["t","s","p"], microchips: ["t"]};
	newState.floors[1] = {generators: [], microchips: ["p","s"]};
	newState.floors[2] = {generators: ["m","r"], microchips: ["r","m"]};
	newState.floors[3] = {generators: [], microchips: []};
	console.log(newState.getCurrentState());

	var testOtherState = new RTGState();
	testOtherState.floors[0] = {generators: [], microchips: []};
	testOtherState.floors[1] = {generators: ["h"], microchips: ["h","l"]};
	testOtherState.floors[2] = {generators: ["l"], microchips: []};
	testOtherState.floors[3] = {generators: [], microchips: []};
	testOtherState.elevatorState = 1;
	console.log(testOtherState.isValid());
}

function RunOnePass(stateList){
	var newStateList = [];
	stateList.forEach(function(val){
		var statesReturned = val.getNewStates();
		//console.log("States Returned...");
		//console.log(statesReturned);
		newStateList = newStateList.concat(statesReturned);
	});
	//console.log("States that I'm passing back!");
	//console.log(newStateList);
	return newStateList;
}

function FindSolution(startingState,finishStateString){
	var count = 0;
	var lastList=[startingState];
	//for(var i=0;i<11;i++){
	while((previousStates.indexOf(finishStateString)===-1) && (lastList.length !== 0)){
		lastList=RunOnePass(lastList);
		count++;
		console.log("Running: " + count);
	}
	console.log("Previous States: "+previousStates.length)
	console.log("Queue: "+lastList.length);
	return count++;
}

function testData2(){
	var testFirstState = new RTGState();
	testFirstState.floors[0] = {generators: [], microchips: ["h","l"]};
	testFirstState.floors[1] = {generators: ["h"], microchips: []};
	testFirstState.floors[2] = {generators: ["l"], microchips: []};
	testFirstState.floors[3] = {generators: [], microchips: []};
	var newStates = RunOnePass([testFirstState]);
	console.log("Testing RunOnePass Once!");
	console.log(newStates.length);
	console.log(previousStates);
	newStates = RunOnePass(newStates);
	console.log("Testing RunOnePass Once!");
	console.log(newStates.length);
	console.log(previousStates);

	console.log("Testing RunOnePass To move a pair");
	var testPairState = new RTGState();
	testPairState.floors[0] = {generators: [], microchips: ["l"]};
	testPairState.floors[1] = {generators: ["h"], microchips: ["h"]};
	testPairState.floors[2] = {generators: ["l"], microchips: []};
	testPairState.floors[3] = {generators: [], microchips: []};
	testPairState.elevatorState = 1;
	previousStates = [];
	newStates = RunOnePass([testPairState]);
	console.log("Testing RunOnePass Once!");
	console.log(newStates.length);
	newStates.forEach(function(val){
		console.log(val.toString());
	});
	console.log(previousStates);



	console.log("Test 3 - Missing a state moving one microchip down.");

	previousStates = [];
	var test1MicroDownState = new RTGState();
	test1MicroDownState.floors[0] = {generators: [], microchips: ["l"]};
	test1MicroDownState.floors[1] = {generators: [], microchips: []};
	test1MicroDownState.floors[2] = {generators: ["h","l"], microchips: ["h"]};
	test1MicroDownState.floors[3] = {generators: [], microchips: []};
	test1MicroDownState.elevatorState = 2;
	newStates = RunOnePass([testPairState]);
	console.log("Testing RunOnePass Once!");
	console.log(newStates.length);
	newStates.forEach(function(val){
		console.log(val.toString());
	});
	console.log(previousStates);


	previousStates = [testFirstState.getCurrentState()];
	console.log(FindSolution(testFirstState,"E3GMGMGMG01M01"));
	console.log("Printing States on 4th floor");
}

function day11a(startingState,endStateString){
	previousStates = [startingState.getCurrentState()];
	console.log(FindSolution(startingState,endStateString));
}

function day11b(startingState,endStateString){
	var partB = startingState.duplicate();
	partB.floors[0] = {generators: ["t","p","s","e","d"], microchips: ["t","e","d"]};
	previousStates = [partB.getCurrentState()];
	console.log(FindSolution(partB,endStateString));
}

//testData();
testData2();
console.log("Day 11 Part A");
day11a(startingState,"E3GMGMGMG01234M01234");
console.log("Day 11 Part B");
day11b(startingState,"E3GMGMGMG0123456M0123456");
