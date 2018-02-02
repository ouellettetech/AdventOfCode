var inputInstruction = [
	"cpy a b",
	"dec b",
	"cpy a d",
	"cpy 0 a",
	"cpy b c",
	"inc a",
	"dec c",
	"jnz c -2",
	"dec d",
	"jnz d -5",
	"dec b",
	"cpy b c",
	"cpy c d",
	"dec d",
	"inc c",
	"jnz d -2",
	"tgl c",
	"cpy -16 c",
	"jnz 1 c",
	"cpy 77 c",
	"jnz 87 d",
	"inc a",
	"inc d",
	"jnz d -2",
	"inc c",
	"jnz c -5"];





function testData(){
	var testInstructions=[
		"cpy 2 a",
		"tgl a",
		"tgl a",
		"tgl a",
		"cpy 1 a",
		"dec a",
		"dec a"];
	var env={};
	env["currentExecution"]=0;
	env["registers"]={a:0,b:0,c:0,d:0};
	env["instructions"] = testInstructions.map(function(val){
		return new Instruction(val);
	});
	while(env.currentExecution<env["instructions"].length){
		console.log("Array Length: "+env["instructions"].length);
		console.log("Line: " + env.currentExecution + " command: "+ env["instructions"][env.currentExecution]);
		runOneInstruction(env, env["instructions"][env.currentExecution]);
	}
	console.log("Register A Value: " + env.registers.a);
}

function day23a(input){
	var env={};
	env["currentExecution"]=0;
	env["instructions"] = input.map(function(val){
		return new Instruction(val);
	});
	env["registers"]={a:7,b:0,c:0,d:0};
	while(env.currentExecution<env["instructions"].length){
		runOneInstruction(env, env["instructions"][env.currentExecution]);
	}
	console.log("Register A Value: " + env.registers.a);
}

function day23b(input){
	var env={};
	env["currentExecution"]=0;
	env["instructions"] = input.map(function(val){
		return new Instruction(val);
	});
	env["registers"]={a:12,b:0,c:0,d:0};
	while(env.currentExecution<env["instructions"].length){
		runOneInstruction(env, env["instructions"][env.currentExecution]);
	}
	console.log("Register A Value: " + env.registers.a);
}

function Instruction(instString){
	var instruction = instString.split(" "); 
	this.command = instruction[0];
	this.par1 = instruction[1];
	this.par2 = instruction[2];
	this.run;
	
	this.isTwoParameter = function(){
		return this.par2 === undefined;
	}

	this.setExecution = function(){
		switch(this.command){
			case "cpy":
				this.run = function(env){
					// cpy x y copies x (either an integer or the value of a register) into register y.
					env=setValue(env,this.par2,getValue(env,this.par1));
				}
				break;
			case "dec":
				this.run = function(env){
					//dec x decreases the value of register x by one.
					var cur=getValue(env,this.par1);
					setValue(env,this.par1,cur-1);
				}
				break;
			case "hlf":
				this.run = function(env){
					var cur=getValue(env,this.par1);
					setValue(env, this.par1, cur/2);
				}
				break;
			case "tpl":
				this.run = function(env){
					var cur=getValue(env,this.par1);
					setValue(env, this.par1, cur*3);
				}
				break;
			case "inc":
				this.run = function(env){
					//inc x increases the value of register x by one.
					var cur=getValue(env,this.par1);
					setValue(env,this.par1,cur+1);
				}
				break;
			case "jmp":
				this.run = function(env){
					var jumpVal=getValue(env,this.par1);
					var newJumpLocation=env.currentExecution+jumpVal-1;
					// subtract 1 since we will be incrementing the counter for all executions.
					env.currentExecution = newJumpLocation;
				}
				break;
			case "jie":
				this.run = function(env){
					var comparator=getValue(env,this.par1);
					var jumpVal=getValue(env,this.par2);
					if(comparator%2===0){
						var newJumpLocation=env.currentExecution+jumpVal-1;
						// subtract 1 since we will be incrementing the counter for all executions.
						env.currentExecution = newJumpLocation;
					}
				}
				break;
			case "jio":
				this.run = function(env){
					var comparator=getValue(env,this.par1);
					var jumpVal=getValue(env,this.par2);
					if(comparator===1){
						var newJumpLocation=env.currentExecution+jumpVal-1;
						// subtract 1 since we will be incrementing the counter for all executions.
						env.currentExecution = newJumpLocation;
					}
				}
				break;
			case "snd":
				this.run = function(env){
					// snd X plays a sound with a frequency equal to the value of X.
					var sndValue=getValue(env,this.par1);
					env=setValue(env,"played",sndValue);
					//TODO: Play a sound with a frequency equal to the value of 'value'
				}
				break;
			case "set":
				this.run = function(env){
					// set X Y sets register X to the value of Y.
					env=setValue(env,this.par1,getValue(env,this.par2));
				}
				break;
			case "add":
				this.run = function(env){
					// add X Y increases register X by the value of Y.
					var addValue=getValue(env,this.par1);
					var add2Value=getValue(env,this.par2);
					env=setValue(env,this.par1,addValue+add2Value);
				}
				break;
			case "sub":
				this.run = function(env){
					// add X Y increases register X by the value of Y.
					var addValue=getValue(env,this.par1);
					var add2Value=getValue(env,this.par2);
					if(this.par1=="h"){
						console.log("current h Value: "+addValue);
					}
					env=setValue(env,this.par1,addValue-add2Value);
				}
				break;
			case "mul":
				this.run = function(env){
					// mul X Y sets register X to the result of multiplying the value contained in register X by the value of Y.
					var mulValue=getValue(env,this.par1);
					var mul2Value=getValue(env,this.par2);
					env=setValue(env,this.par1,mulValue*mul2Value);
					env.multiplyCount++;
				}
				break;
			case "mod":	
				this.run = function(env){
					// mod X Y sets register X to the remainder of dividing the value contained in register X by the value of Y 
					// (that is, it sets X to the result of X modulo Y).
					var modValue=getValue(env,this.par1);
					var mod2Value=getValue(env,this.par2);
					env=setValue(env,this.par1,modValue%mod2Value);
				}
				break;
			case "rcv":	
				this.run = function(env){
					// rcv X recovers the frequency of the last sound played, 
					//but only when the value of X is not zero. (If it is zero, the command does nothing.)
					var rcvValue=getValue(env,this.par1);
					if(rcvValue!=0){
						var lastSnd=getValue(env,"played");
						console.log(lastSnd);
						env.recovery=lastSnd;// Stop on the first recovery operation
					}
				}
				break;
			case "jnz":
				this.run = function(env){
					// jgz X Y jumps with an offset of the value of Y, 
					// but only if the value of X is not zero. 
					//(An offset of 2 skips the next instruction, an offset of -1 jumps to the previous instruction, and so on.)
					var comparator=getValue(env,this.par1);
					var jumpVal=getValue(env,this.par2);
					if(comparator!=0){
						var newJumpLocation=env.currentExecution+jumpVal-1;
						// subtract 1 since we will be incrementing the counter for all executions.
						env.currentExecution = newJumpLocation;
					}
				}
				break;
			case "tgl":
				this.run = function(env){
					var jumpVal=getValue(env,this.par1);
					var instPos=env.currentExecution+jumpVal;
					var curInst = env.instructions[instPos];
					if(curInst){
						if(curInst.isTwoParameter()){
							if(curInst.command === "inc"){
								curInst.command = "dec"; 
							} else {
								curInst.command = "inc"; 
							}
						} else {
							if(curInst.command === "jnz"){
								curInst.command = "cpy"; 
							} else {
								curInst.command = "jnz"; 
							}
						}
						curInst.setExecution();
					}
				}
				break;
			default:
				exit();
				break;
		}
	}
	this.setExecution();
}

function runOneInstruction(env, instruction){
	instruction.run(env);
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