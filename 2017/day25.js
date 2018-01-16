var testData = "Begin in state A.\nPerform a diagnostic checksum after 6 steps.\n\nIn state A:\n  If the current value is 0:\n    - Write the value 1.\n    - Move one slot to the right.\n    - Continue with state B.\n  If the current value is 1:\n    - Write the value 0.\n    - Move one slot to the left.\n    - Continue with state B.\n\nIn state B:\n  If the current value is 0:\n    - Write the value 1.\n    - Move one slot to the left.\n    - Continue with state A.\n  If the current value is 1:\n    - Write the value 1.\n    - Move one slot to the right.\n    - Continue with state A.";
var day25String = "Begin in state A.\nPerform a diagnostic checksum after 12629077 steps.\n\nIn state A:\n  If the current value is 0:\n    - Write the value 1.\n    - Move one slot to the right.\n    - Continue with state B.\n  If the current value is 1:\n    - Write the value 0.\n    - Move one slot to the left.\n    - Continue with state B.\n\nIn state B:\n  If the current value is 0:\n    - Write the value 0.\n    - Move one slot to the right.\n    - Continue with state C.\n  If the current value is 1:\n    - Write the value 1.\n    - Move one slot to the left.\n    - Continue with state B.\n\nIn state C:\n  If the current value is 0:\n    - Write the value 1.\n    - Move one slot to the right.\n    - Continue with state D.\n  If the current value is 1:\n    - Write the value 0.\n    - Move one slot to the left.\n    - Continue with state A.\n\nIn state D:\n  If the current value is 0:\n    - Write the value 1.\n    - Move one slot to the left.\n    - Continue with state E.\n  If the current value is 1:\n    - Write the value 1.\n    - Move one slot to the left.\n    - Continue with state F.\n\nIn state E:\n  If the current value is 0:\n    - Write the value 1.\n    - Move one slot to the left.\n    - Continue with state A.\n  If the current value is 1:\n    - Write the value 0.\n    - Move one slot to the left.\n    - Continue with state D.\n\nIn state F:\n  If the current value is 0:\n    - Write the value 1.\n    - Move one slot to the right.\n    - Continue with state A.\n  If the current value is 1:\n    - Write the value 1.\n    - Move one slot to the left.\n    - Continue with state E.";

function constructStates(inputString){
	var lines=inputString.split("\n");
	var beginState=lines[0].replace("Begin in state ","").replace(".","");// get the first state off the instruction.
	var checkSumSteps = parseInt(lines[1].replace("Perform a diagnostic checksum after ","").replace(" steps.",""),10);
	var states={};
	for(var i=3;i<lines.length;i+=10){ 
		// Since the data is very structured making assumptions normally we should check indents and that format is correct
		var stateName=lines[i].replace("In state ","").replace(":","");
		// assume first is 0;
		var curState={Name: stateName, value: []};
		for(var j=0;j<2;j++){
			var offset=j*4;
			curState.value[j] = {};
			curState.value[j].write=parseInt(lines[i+2+offset].replace("    - Write the value ","").replace(".",""));
			if(lines[i+3+offset].indexOf("right")>0){// only moves one slot to the right or left, so just need direction.
				curState.value[j].move=1;
			} else {
				curState.value[j].move=-1;
			}
			curState.value[j].newState=lines[i+4+offset].replace("    - Continue with state ","").replace(".","");
		}
		states[curState.Name] = curState;
	}
	return {currentState: beginState, numSteps: checkSumSteps, states: states };
}

function testRun(){
	var stateMachine= constructStates(testData);
	stateMachine.data=[];
	stateMachine.pointer=0;
	runStateMachine(stateMachine);
	var checksum=getCheckSum(stateMachine.data);
	console.log(checksum);
	return checksum;
}

function day25a(inputString){
	var stateMachine= constructStates(inputString);
	stateMachine.data=[];
	stateMachine.pointer=0;
	runStateMachine(stateMachine);
	var checksum=getCheckSum(stateMachine.data);
	console.log(checksum);
	return checksum;
}


function runStateMachine(stateMachine){
	for(var i=0;i<stateMachine.numSteps;i++){
		runOneInstruction(stateMachine);
		//console.log(stateMachine.data);
	}
}

function runOneInstruction(stateMachine){
	var currentState=stateMachine.states[stateMachine.currentState];
	var currentData=stateMachine.data[stateMachine.pointer] || 0;
	var changes=currentState.value[currentData];
	stateMachine.data[stateMachine.pointer]=changes.write;
	stateMachine.pointer+=changes.move;
	stateMachine.currentState=changes.newState;
}

function getCheckSum(dataArray){
	var entries=Object.keys(dataArray);
	var count=0;
	for(var i=0;i<entries.length;i++){
		if(dataArray[entries[i]] === 1){
			count++;
		}
	}
	return count;
}

//testRun();
day25a(day25String);