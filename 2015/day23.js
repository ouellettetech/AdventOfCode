var inputInstruction = [
	"jio a 19",
	"inc a",
	"tpl a",
	"inc a",
	"tpl a",
	"inc a",
	"tpl a",
	"tpl a",
	"inc a",
	"inc a",
	"tpl a",
	"tpl a",
	"inc a",
	"inc a",
	"tpl a",
	"inc a",
	"inc a",
	"tpl a",
	"jmp 23",
	"tpl a",
	"tpl a",
	"inc a",
	"inc a",
	"tpl a",
	"inc a",
	"inc a",
	"tpl a",
	"inc a",
	"tpl a",
	"inc a",
	"tpl a",
	"inc a",
	"tpl a",
	"inc a",
	"inc a",
	"tpl a",
	"inc a",
	"inc a",
	"tpl a",
	"tpl a",
	"inc a",
	"jio a 8",
	"inc b",
	"jie a 4",
	"tpl a",
	"inc a",
	"jmp 2",
	"hlf a",
	"jmp -7"];


function testData(){
	var testInstructions=[
		"inc a",
		"jio a 2",
		"tpl a",
		"inc a",
	] 
	var env={};
	env["currentExecution"]=0;
	env["registers"]={a:0,b:0};
	while(env.currentExecution<testInstructions.length){
		console.log("Array Length: "+testInstructions.length);
		console.log("Line: " + env.currentExecution + " command: "+ testInstructions[env.currentExecution]);
		runOneInstruction(env, testInstructions[env.currentExecution].split(" "));
	}
	console.log("Register A Value: " + env.registers.a);
}

function day23a(input){
	var instructionArray=input;
	var env={};
	env["currentExecution"]=0;
	env["registers"]={a:0,b:0};
	while(env.currentExecution<instructionArray.length){
		console.log("Array Length: "+instructionArray.length);
		console.log("Line: " + env.currentExecution + " command: "+ instructionArray[env.currentExecution]);
		runOneInstruction(env, instructionArray[env.currentExecution].split(" "));
	}
	console.log("Register A Value: " + env.registers.a);
	console.log("Register B Value: " + env.registers.b);

}

function day23b(input){
	var instructionArray=input;
	var env={};
	env["currentExecution"]=0;
	env["registers"]={a:1,b:0};
	while(env.currentExecution<instructionArray.length){
		console.log("Array Length: "+instructionArray.length);
		console.log("Line: " + env.currentExecution + " command: "+ instructionArray[env.currentExecution]);
		runOneInstruction(env, instructionArray[env.currentExecution].split(" "));
	}
	console.log("Register A Value: " + env.registers.a);
	console.log("Register B Value: " + env.registers.b);

}

function runOneInstruction(env, instruction){
	var command = instruction[0];
	var par1 = instruction[1];
	var par2 = instruction[2];
	switch(command){
		case "hlf":
			var cur=getValue(env,par1);
			setValue(env, par1, cur/2);
			break;
		case "tpl":
			var cur=getValue(env,par1);
			setValue(env, par1, cur*3);
			break;
		case "inc":
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
			// but only if the value of X is greater than zero. 
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
console.log("Day 23 Part A");
day23a(inputInstruction);
console.log("Day 23 Part B");
day23b(inputInstruction);
