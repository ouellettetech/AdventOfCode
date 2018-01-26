var inputInstruction = [
	"cpy 1 a",
	"cpy 1 b",
	"cpy 26 d",
	"jnz c 2",
	"jnz 1 5",
	"cpy 7 c",
	"inc d",
	"dec c",
	"jnz c -2",
	"cpy a c",
	"inc a",
	"dec b",
	"jnz b -2",
	"cpy c b",
	"dec d",
	"jnz d -6",
	"cpy 13 c",
	"cpy 14 d",
	"inc a",
	"dec d",
	"jnz d -2",
	"dec c",
	"jnz c -5"];


function testData(){
	var testInstructions=[
		"cpy 41 a",
		"inc a",
		"inc a",
		"dec a",
		"jnz a 2",
		"dec a"];

	var env={};
	env["currentExecution"]=0;
	env["registers"]={a:0,b:0,c:0,d:0};
	while(env.currentExecution<testInstructions.length){
		console.log("Array Length: "+testInstructions.length);
		console.log("Line: " + env.currentExecution + " command: "+ testInstructions[env.currentExecution]);
		runOneInstruction(env, testInstructions[env.currentExecution].split(" "));
	}
	console.log("Register A Value: " + env.registers.a);
}

function day12a(input){
	var instructionArray=input;
	var env={};
	env["currentExecution"]=0;
	env["registers"]={a:0,b:0,c:0,d:0};
	while(env.currentExecution<instructionArray.length){
		console.log("Array Length: "+instructionArray.length);
		console.log("Line: " + env.currentExecution + " command: "+ instructionArray[env.currentExecution]);
		runOneInstruction(env, instructionArray[env.currentExecution].split(" "));
	}
	console.log("Register A Value: " + env.registers.a);
}

function day12b(input){
	var instructionArray=input;
	var env={};
	env["currentExecution"]=0;
	env["registers"]={a:0,b:0,c:1,d:0};
	while(env.currentExecution<instructionArray.length){
		console.log("Array Length: "+instructionArray.length);
		console.log("Line: " + env.currentExecution + " command: "+ instructionArray[env.currentExecution]);
		runOneInstruction(env, instructionArray[env.currentExecution].split(" "));
	}
	console.log("Register A Value: " + env.registers.a);
}

function runOneInstruction(env, instruction){
	var command = instruction[0];
	var par1 = instruction[1];
	var par2 = instruction[2];
	switch(command){
		case "cpy":
			// cpy x y copies x (either an integer or the value of a register) into register y.
			env=setValue(env,par2,getValue(env,par1));
			break;
		case "dec":
			//dec x decreases the value of register x by one.
			var cur=getValue(env,par1);
			setValue(env,par1,cur-1);
			break;
		case "hlf":
			var cur=getValue(env,par1);
			setValue(env, par1, cur/2);
			break;
		case "tpl":
			var cur=getValue(env,par1);
			setValue(env, par1, cur*3);
			break;
		case "inc":
			//inc x increases the value of register x by one.
			var cur=getValue(env,par1);
			setValue(env,par1,cur+1);
			break;
		case "jmp":
			var jumpVal=getValue(env,par1);
			var newJumpLocation=env.currentExecution+jumpVal-1;
			// subtract 1 since we will be incrementing the counter for all executions.
			env.currentExecution = newJumpLocation;
			break;
		case "jie":
			var comparator=getValue(env,par1);
			var jumpVal=getValue(env,par2);
			if(comparator%2===0){
				var newJumpLocation=env.currentExecution+jumpVal-1;
				// subtract 1 since we will be incrementing the counter for all executions.
				env.currentExecution = newJumpLocation;
			}
			break;
		case "jio":
			var comparator=getValue(env,par1);
			var jumpVal=getValue(env,par2);
			if(comparator===1){
				var newJumpLocation=env.currentExecution+jumpVal-1;
				// subtract 1 since we will be incrementing the counter for all executions.
				env.currentExecution = newJumpLocation;
			}
			break;
		case "snd":
			// snd X plays a sound with a frequency equal to the value of X.
			var sndValue=getValue(env,par1);
			env=setValue(env,"played",sndValue);
			//TODO: Play a sound with a frequency equal to the value of 'value'
			break;
		case "set":
			// set X Y sets register X to the value of Y.
			env=setValue(env,par1,getValue(env,par2));
			break;
		case "add":
			// add X Y increases register X by the value of Y.
			var addValue=getValue(env,par1);
			var add2Value=getValue(env,par2);
			env=setValue(env,par1,addValue+add2Value);
			break;
		case "sub":
			// add X Y increases register X by the value of Y.
			var addValue=getValue(env,par1);
			var add2Value=getValue(env,par2);
			if(par1=="h"){
				console.log("current h Value: "+addValue);
			}
			env=setValue(env,par1,addValue-add2Value);
			break;
		case "mul":
			// mul X Y sets register X to the result of multiplying the value contained in register X by the value of Y.
			var mulValue=getValue(env,par1);
			var mul2Value=getValue(env,par2);
			env=setValue(env,par1,mulValue*mul2Value);
			env.multiplyCount++;
			break;
		case "mod":	
			// mod X Y sets register X to the remainder of dividing the value contained in register X by the value of Y 
			// (that is, it sets X to the result of X modulo Y).
			var modValue=getValue(env,par1);
			var mod2Value=getValue(env,par2);
			env=setValue(env,par1,modValue%mod2Value);
			break;
		case "rcv":	
			// rcv X recovers the frequency of the last sound played, 
			//but only when the value of X is not zero. (If it is zero, the command does nothing.)
			var rcvValue=getValue(env,par1);
			if(rcvValue!=0){
				var lastSnd=getValue(env,"played");
				console.log(lastSnd);
				env.recovery=lastSnd;// Stop on the first recovery operation
			}
			break;
		case "jnz":
			// jgz X Y jumps with an offset of the value of Y, 
			// but only if the value of X is not zero. 
			//(An offset of 2 skips the next instruction, an offset of -1 jumps to the previous instruction, and so on.)
			var comparator=getValue(env,par1);
			var jumpVal=getValue(env,par2);
			if(comparator!=0){
				var newJumpLocation=env.currentExecution+jumpVal-1;
				// subtract 1 since we will be incrementing the counter for all executions.
				env.currentExecution = newJumpLocation;
			}
			break;

		default:
			exit();
			break;
	}
	env.currentExecution++;
}

function setValue(env,register,value){
	env.registers[register]=value;
	return env;
}

function getValue(env,value){
	var intVal = parseInt(value);
	if(Number.isNaN(intVal)){
		intVal=env.registers[value] || 0;
	}
	return intVal;
}

testData();
console.log("Day 12 Part A");
day12a(inputInstruction);
console.log("Day 12 Part B");
day12b(inputInstruction);
