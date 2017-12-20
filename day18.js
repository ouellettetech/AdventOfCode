function testData() {
	var instString="set a 1\nadd a 2\nmul a a\nmod a 5\nsnd a\nset a 0\nrcv a\njgz a -1\nset a 1\njgz a -2";
	var instructionArray=instString.split("\n");
	var env={};
	env["currentExecution"]=0;
	env["recovery"]==null;
	env["registers"]={};
	while(env.recovery==null && (0<=env.currentExecution,instructionArray.length)){
		console.log("Line: " + env.currentExecution + " command: "+ instructionArray[env.currentExecution]);
		runOneInstruction(env, instructionArray[env.currentExecution].split(" "));
	}
	console.log("Last Recovery" + env.recovery);
}

function day18a(input){
	var instructionArray=input.split("\n");
	var env={};
	env["currentExecution"]=0;
	env["recovery"]==null;
	env["registers"]={};
	while(env.recovery==null && (0<=env.currentExecution,instructionArray.length)){
		console.log("Line: " + env.currentExecution + " command: "+ instructionArray[env.currentExecution]);
		runOneInstruction(env, instructionArray[env.currentExecution].split(" "));
	}
	console.log("Last Recovery" + env.recovery);
}

function day18b(input){
	var instructionArray=input.split("\n");
	var envA={};
	envA["currentExecution"]=0;
	envA["recovery"]==null;
	envA["registers"]={};
	var queueA=[];
	var queueB=[];
	var envB={};
	envB["currentExecution"]=0;
	envB["recovery"]==null;
	envB["registers"]={};
	setValue(envA,"p",0);
	setValue(envB,"p",1);
	envA.sendCount=0;
	envB.sendCount=0;
	while(!envA.waiting || !envB.waiting){
		console.log("ALine: " + envA.currentExecution + " command: "+ instructionArray[envA.currentExecution]);
		console.log("BLine: " + envB.currentExecution + " command: "+ instructionArray[envB.currentExecution]);		
		if(0>envA.currentExecution>=instructionArray.length){
			envA.waiting=true;
		} else {
			runOneInstructionb(envA, instructionArray[envA.currentExecution].split(" "),queueA,queueB);			
		}
		if(0>envB.currentExecution>=instructionArray.length){
			envB.waiting=true;
		} else {	
			runOneInstructionb(envB, instructionArray[envB.currentExecution].split(" "),queueB,queueA);
		}
		if(!envA.waiting){
			envA.currentExecution++;
		}
		if(!envB.waiting){
			envB.currentExecution++;
		}
	}
	console.log("Program B sent " + envB.sendCount + " Times");
}

function testDatab(){
	var instString="set a 1\nadd a 2\nmul a a\nmod a 5\nsnd a\nset a 0\nrcv a\njgz a -1\nset a 1\njgz a -2";
	instString="snd 1\nsnd 2\nsnd p\nrcv a\nrcv b\nrcv c\nrcv d"	
	var instructionArray=instString.split("\n");
	var envA={};
	envA["currentExecution"]=0;
	envA["recovery"]==null;
	envA["registers"]={};
	var queueA=[];
	var queueB=[];
	var envB={};
	envB["currentExecution"]=0;
	envB["recovery"]==null;
	envB["registers"]={};
	setValue(envA,"p",0);
	setValue(envB,"p",1);
	envA.sendCount=0;
	envB.sendCount=0;
	while(!envA.waiting || !envB.waiting){
		console.log("ALine: " + envA.currentExecution + " command: "+ instructionArray[envA.currentExecution]);
		console.log("BLine: " + envB.currentExecution + " command: "+ instructionArray[envB.currentExecution]);		
		if(0>envA.currentExecution>=instructionArray.length){
			envA.waiting=true;
		} else {
			runOneInstructionb(envA, instructionArray[envA.currentExecution].split(" "),queueA,queueB);			
		}
		if(0>envB.currentExecution>=instructionArray.length){
			envB.waiting=true;
		} else {	
			runOneInstructionb(envB, instructionArray[envB.currentExecution].split(" "),queueB,queueA);
		}
		if(!envA.waiting){
			envA.currentExecution++;
		}
		if(!envB.waiting){
			envB.currentExecution++;
		}
	}
	console.log("Program B sent " + envB.sendCount + " Times");
}
function runOneInstruction(env, instruction){
	console.log(env);
	var command = instruction[0];
	var par1 = instruction[1];
	var par2 = instruction[2];
	switch(command){
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
		case "mul":
			// mul X Y sets register X to the result of multiplying the value contained in register X by the value of Y.
			var mulValue=getValue(env,par1);
			var mul2Value=getValue(env,par2);
			env=setValue(env,par1,mulValue*mul2Value);
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
		case "jgz":
			// jgz X Y jumps with an offset of the value of Y, 
			// but only if the value of X is greater than zero. 
			//(An offset of 2 skips the next instruction, an offset of -1 jumps to the previous instruction, and so on.)
			var comparator=getValue(env,par1);
			var jumpVal=getValue(env,par2);
			console.log("Checking Jump, Comparator: " + comparator + "jumping: "+ jumpVal);
			if(comparator>0){
				var newJumpLocation=env.currentExecution+jumpVal-1;
				// subtract 1 since we will be incrementing the counter for all executions.
				console.log("New Jump Value: " + newJumpLocation);
				env.currentExecution = newJumpLocation;
			}
			break;
	}
	env.currentExecution++;
}

function runOneInstructionb(env, instruction,inQueue,outQueue){
	console.log(env);
	var command = instruction[0];
	var par1 = instruction[1];
	var par2 = instruction[2];
	switch(command){
		case "snd":
			// snd X plays a sound with a frequency equal to the value of X.
			var sndValue=getValue(env,par1);
			outQueue.push(sndValue)
			env.sendCount++;
			break;
		case "set":
			// set X Y sets register X to the value of Y.
			setValue(env,par1,getValue(env,par2));
			break;
		case "add":
			// add X Y increases register X by the value of Y.
			var addValue=getValue(env,par1);
			var add2Value=getValue(env,par2);
			setValue(env,par1,addValue+add2Value);
			break;
		case "mul":
			// mul X Y sets register X to the result of multiplying the value contained in register X by the value of Y.
			var mulValue=getValue(env,par1);
			var mul2Value=getValue(env,par2);
			setValue(env,par1,mulValue*mul2Value);
			break;
		case "mod":	
			// mod X Y sets register X to the remainder of dividing the value contained in register X by the value of Y 
			// (that is, it sets X to the result of X modulo Y).
			var modValue=getValue(env,par1);
			var mod2Value=getValue(env,par2);
			setValue(env,par1,modValue%mod2Value);
			break;
		case "rcv":	
			// rcv X recovers the frequency of the last sound played, 
			//but only when the value of X is not zero. (If it is zero, the command does nothing.)
			if(inQueue.length>0){
				setValue(env,par1,inQueue.shift());
				env.waiting=false;
			} else {
				env.waiting=true;
			}
			break;
		case "jgz":
			// jgz X Y jumps with an offset of the value of Y, 
			// but only if the value of X is greater than zero. 
			//(An offset of 2 skips the next instruction, an offset of -1 jumps to the previous instruction, and so on.)
			var comparator=getValue(env,par1);
			var jumpVal=getValue(env,par2);
			console.log("Checking Jump, Comparator: " + comparator + "jumping: "+ jumpVal);
			if(comparator>0){
				var newJumpLocation=env.currentExecution+jumpVal-1;
				// subtract 1 since we will be incrementing the counter for all executions.
				console.log("New Jump Value: " + newJumpLocation);
				env.currentExecution = newJumpLocation;
			}
			break;
	}
}

function setValue(env,register,value){
	console.log("Setting : "+ value + " To :"+ register);
	env.registers[register]=value;
	console.log(env.registers[register]);
	return env;
}

function getValue(env,value){
	var intVal = parseInt(value);
	if(Number.isNaN(intVal)){
		intVal=env.registers[value] || 0;
	}
	console.log("Getting Value :" + intVal + "From :" + value);
	return intVal;
}
