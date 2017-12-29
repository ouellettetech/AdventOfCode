var inputInstruction = "set b 84\nset c b\njnz a 2\njnz 1 5\nmul b 100\nsub b -100000\nset c b\nsub c -17000\nset f 1\nset d 2\nset e 2\nset g d\nmul g e\nsub g b\njnz g 2\nset f 0\nsub e -1\nset g e\nsub g b\njnz g -8\nsub d -1\nset g d\nsub g b\njnz g -13\njnz f 2\nsub h -1\nset g b\nsub g c\njnz g 2\njnz 1 3\nsub b -17\njnz 1 -23";

function testData(){
	var testString="sub h -1";
	var instructionArray=testString.split("\n");
	var env={};
	env["currentExecution"]=0;
	env["recovery"]==null;
	env["registers"]={};
	env["multiplyCount"]=0;
	while(env.currentExecution<instructionArray.length){
		console.log("Array Length: "+instructionArray.length);
		console.log("Line: " + env.currentExecution + " command: "+ instructionArray[env.currentExecution]);
		runOneInstruction(env, instructionArray[env.currentExecution].split(" "));
	}
	console.log("Multiply Times run" + env.multiplyCount);
}

function day23a(input){
	var instructionArray=input.split("\n");
	var env={};
	env["currentExecution"]=0;
	env["recovery"]==null;
	env["registers"]={};
	env["multiplyCount"]=0;
	while(env.currentExecution<instructionArray.length){
		console.log("Array Length: "+instructionArray.length);
		console.log("Line: " + env.currentExecution + " command: "+ instructionArray[env.currentExecution]);
		runOneInstruction(env, instructionArray[env.currentExecution].split(" "));
	}
	console.log("Multiply Times run" + env.multiplyCount);
}

function day23b(input){
	var instructionArray=input.split("\n");
	var env={};
	env["currentExecution"]=0;
	env["recovery"]==null;
	env["registers"]={};
	env["multiplyCount"]=0;
	env.registers["a"]=1;
	while(env.currentExecution<instructionArray.length){
		// console.log("Array Length: "+instructionArray.length);
		// console.log("Line: " + env.currentExecution + " command: "+ instructionArray[env.currentExecution]);
		runOneInstruction(env, instructionArray[env.currentExecution].split(" "));
	}
	console.log("register h: " + env.registers.h);
}

function runOneInstruction(env, instruction){
//	console.log(env);
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
//			console.log("Checking Jump, Comparator: " + comparator + "jumping: "+ jumpVal);
			if(comparator!=0){
				var newJumpLocation=env.currentExecution+jumpVal-1;
				// subtract 1 since we will be incrementing the counter for all executions.
//				console.log("New Jump Value: " + newJumpLocation);
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
//	console.log("Setting : "+ value + " To :"+ register);
	env.registers[register]=value;
//	console.log(env.registers[register]);
	return env;
}

function getValue(env,value){
	var intVal = parseInt(value);
	if(Number.isNaN(intVal)){
		intVal=env.registers[value] || 0;
	}
//	console.log("Getting Value :" + intVal + "From :" + value);
	return intVal;
}

//day23a(inputInstruction);
findhvalue(true);
//testData();

// Running the code too too long in javascript, so I just converted the "psudo assembly code to js, then optomized"
function findhvalue(debug){
	if(debug==0){
		var b=84;
		var c=b;
	} else {
		var b=108400; //84*100+100000; //constant
		var c=b;
		c=c+17000;
	}

	var h=0;
	var done = false;
	for(var cur=b;cur<=c;cur+=17){
		console.log("checking current value:"+cur);
		found=false;
		var medianValue=Math.sqrt(cur); // if we are checking for prime numbers anything greater than a sqrt is irrelevant.
		for(var i=2;i<medianValue&&!found;i++){
			if(cur%i===0){
				found=true;
			}
		}
		if(found){
			h++;
			console.log("Found an h: "+h);
		}
	}
}
