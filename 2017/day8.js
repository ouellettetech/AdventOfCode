function testData() {
	var testingData = "b inc 5 if a > 1\na inc 1 if b < 5\nc dec -10 if a >= 1\nc inc -20 if c == 10"
	var instructions = createInstructionList(testingData);
	console.log(instructions);
	var registers = {};
	runInstructions(registers, instructions);

	findMaxValue(registers);
	
	return registers;
}

function day8a(input) {
	var instructions = createInstructionList(input);
	console.log(instructions);
	var registers = {};
	runInstructions(registers, instructions);

	findMaxValue(registers);
	
	return registers;
}

function createInstructionList(instString){
	var instructions = [];
	var lines = instString.split("\n");
	for( var i=0;i<lines.length;i++){
		instructions.push(parseOneInstruction(lines[i]));
	}
	return instructions;
}


function parseOneInstruction(instructString){
	var instruction = {};
	var instrArray = instructString.split(" ");
	instruction.registry = instrArray[0];
	instruction.value = parseInt(instrArray[2]);
	if(instrArray[1] === 'dec'){
		instruction.value = instruction.value * -1;
	}
	instruction.compRegister = instrArray[4];

	var operators = {
		'>': function(a, b) { return a > b },
		'<': function(a, b) { return a < b },
		'>=': function(a, b) { return a >= b },
		'<=': function(a, b) { return a <= b },
		'==': function(a, b) { return a == b },
		'!=': function(a, b) { return a != b },
	};


	instruction.compFunction = operators[instrArray[5]];
	instruction.compValue = parseInt(instrArray[6]);
	return instruction;
}


function runInstructions(registers, instructions){
	for (var i=0;i<instructions.length;i++){
		var cur = instructions[i];
		registers[cur.registry] = registers[cur.registry] || 0;
		registers[cur.compRegister] = registers[cur.compRegister] || 0;
		if(cur.compFunction(registers[cur.compRegister], cur.compValue)) {
			registers[cur.registry] = registers[cur.registry] + cur.value;
		}
	}
}

function findMaxValue(registers){
	var keys = Object.keys(registers);
	var max = registers[keys[0]];
	for(var i=1;i<keys.length; i++){
		if(registers[keys[i]] > max) {
			max=registers[keys[i]];
		}
	}
	console.log("Max Value: "+ max);
	return max;
}


function day8b(input) {
	var instructions = createInstructionList(input);
	console.log(instructions);
	var registers = {};
	runInstructionsb(registers, instructions);

	findMaxValue(registers);
	
	return registers;
}

function runInstructionsb(registers, instructions){
	var maxValue=0;
	for (var i=0;i<instructions.length;i++){
		var cur = instructions[i];
		registers[cur.registry] = registers[cur.registry] || 0;
		registers[cur.compRegister] = registers[cur.compRegister] || 0;
		if(cur.compFunction(registers[cur.compRegister], cur.compValue)) {
			registers[cur.registry] = registers[cur.registry] + cur.value;
		}
		var newMax=findMaxValue(registers);
		if(newMax > maxValue){
			maxValue = newMax;
		}
	}
	console.log("Max Value Ever: "+maxValue);
}