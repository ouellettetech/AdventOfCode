
var File = require("fs");

function readFile(fileName){
	var inputContent = File.readFileSync(fileName, "utf-8").trim();
	var inputArray = inputContent.split("\n");
	console.log(inputArray);
	return inputArray;
}
 

function ValueInstruction(oneInstructionArray){
	this.bot = parseInt(oneInstructionArray[5]);
	this.value = parseInt(oneInstructionArray[1]);
}

function BotInstruction(oneInstructionArray){
//bot 2 gives low to bot 1 and high to bot 0

	this.toString = function(){
		var output = "";
		output += "Name: "+this.botName + "\n";
		output += "LowValue: " + (this.lowValue? this.lowValue.value : "null")  + "\n";
		output += "HighValue: " + (this.highValue? this.highValue.value : "null")  + "\n";
		output += "Extras: " + this.extras.length + "\n";
		return output;
	}

	this.botName = parseInt(oneInstructionArray[1]);
	this.low;
	this.high;
	this.lowValue = null;
	this.highValue = null;
	var lowDest = parseInt(oneInstructionArray[6]);
	var highDest = parseInt(oneInstructionArray[11]);
	this.extras = [];
	switch(oneInstructionArray[5]){
		case "bot":
			this.low = function(curEnv){
				curEnv.botList[lowDest].addValue(this.lowValue);
				this.lowValue = null;
			}
			break;
		case "output":
			this.low = function(curEnv){
				curEnv.output[lowDest] = curEnv.output[lowDest] || [];
				curEnv.output[lowDest].push(this.lowValue);
				this.lowValue = null;
			}
			break;
	}

	switch(oneInstructionArray[10]){
		case "bot":
			this.high = function(curEnv){
				curEnv.botList[highDest].addValue(this.highValue);
				this.highValue = null;
			}
			break;
		case "output":
			this.high = function(curEnv){
				//console.log("High Dest: "+ highDest);
				curEnv.output[highDest] = curEnv.output[highDest] || [];
				curEnv.output[highDest].push(this.highValue);
				this.highValue = null;
			}
			break;
	}
	this.addValue = function(newValue){
		if(this.highValue && this.lowValue){
			console.log("Error It already has two values!");
			this.extras.push(newValue);
		} else {
			if(!this.lowValue){
				if(this.highValue && (newValue.value >  this.highValue.value)){
					this.lowValue = this.highValue;
					this.highValue = newValue;					
				} else {
					this.lowValue = newValue;
				}
			} else {
				//console.log("Has Low Value "+ this.lowValue);
				if(newValue.value < this.lowValue.value){
					//console.log("Swapping Low to High!"+ this.lowValue.value);
					this.highValue = this.lowValue;
					this.lowValue = newValue;
				} else {
					this.highValue = newValue;
				}
			}
		}
	}

	this.hasTwoValues = function(){
		return !!(this.highValue && this.lowValue);
	}
	this.passValues = function(curEnv){
		this.low(curEnv);
		this.high(curEnv);
		if(this.extras.length>0){
			if(this.extras.length>1){
				if(this.extras[0].value>this.extras[1].value){
					this.highValue = this.extras.shift();
					this.lowValue = this.extras.shift();
				} else {
					this.lowValue = this.extras.shift();
					this.highValue = this.extras.shift();
				}
			} else {
				this.lowValue = this.extras.shift();
			}
		}
	}
}

function parseInstructions(instructions){
	var startInst = [];
	var botExchanges = [];
	for(var i=0;i<instructions.length;i++){
		var curInst = instructions[i].split(" ");
		switch(curInst[0]){
			case "value":
				var cur = new ValueInstruction(curInst);
				startInst.push(cur);
				break;
			case "bot":
				var cur = new BotInstruction(curInst);
				//console.log("Bot Name to Add = "+cur.botName);
				botExchanges[cur.botName] = cur;
				break;
		}

	}
	return { startInst: startInst, botExchanges: botExchanges};
}

function setupStartingConditions(env, startInst){
	for(var i=0;i<startInst.length;i++){
		env.botList[startInst[i].bot].addValue({value: startInst[i].value});
	}
}

function printState(curEnv){
	curEnv.botList.forEach(function(value){
		console.log(value.toString());
	});
	curEnv.output.forEach(function(val,index){
		if(val){
			console.log("Output [" +  index + "]");
			console.log(val);
		}
	});
}

function playOneRound(env,checkValues){
	var result = false;
	var running = env.botList.filter(function(curBot){
		return curBot.hasTwoValues();
	})
	running.forEach(function(curBot){
		if(checkValues && (checkValues[0] === curBot.lowValue.value) && (checkValues[1] === curBot.highValue.value)){
			result = curBot.botName;
			console.log("Found Check Values on Bot: "+curBot.botName);
		}
		if(!result){
			result = true;
		}
		curBot.passValues(env);
	});
	printState(env);
	return result;
}

function testData(){
	var testInstructions=["value 5 goes to bot 2",
		"bot 2 gives low to bot 1 and high to bot 0",
		"value 3 goes to bot 1",
		"bot 1 gives low to output 1 and high to bot 0",
		"bot 0 gives low to output 2 and high to output 0",
		"value 2 goes to bot 2"];
	var envInstructions = parseInstructions(testInstructions);
	var env = {output:[],botList:envInstructions.botExchanges};
	setupStartingConditions(env,envInstructions.startInst);
	printState(env);
	var result = playOneRound(env,[2,5]);
	while(result === true){
		result = playOneRound(env,[5,2]);
	}
	console.log("Found Result in Bot: "+ result);
	//result = playOneRound(env,[5,2]);
	//console.log(result);
}


function day10a(compressedString) {
	var envInstructions = parseInstructions(compressedString);
	var env = {output:[],botList:envInstructions.botExchanges};
	setupStartingConditions(env,envInstructions.startInst);
	printState(env);
	var result = playOneRound(env,[17,61]);
	while(result === true){
		result = playOneRound(env,[17,61]);
	}
	console.log("Found Result in Bot: "+ result);
	//result = playOneRound(env,[5,2]);
	//console.log(result);
}

function day10b(compressedString) {
	var envInstructions = parseInstructions(compressedString);
	var env = {output:[],botList:envInstructions.botExchanges};
	setupStartingConditions(env,envInstructions.startInst);
	printState(env);
	var result = playOneRound(env);
	while(result === true){
		result = playOneRound(env);
	}
	var outputVal = env.output[0][0].value*env.output[1][0].value*env.output[2][0].value;
	console.log("Output Value: "+ outputVal);
}

var instructions = readFile("inputDay10.txt");
testData();
console.log("Day 10 Part A");
day10a(instructions);
console.log("Day 10 Part B");
day10b(instructions);
