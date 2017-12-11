function testData() {
	var testingData = "{}"
	console.log("Total Score :"+parseString(testingData));
	testingData = "{{{}}}"
	console.log("Total Score :"+parseString(testingData));
	testingData = "{{},{}}"
	console.log("Total Score :"+parseString(testingData));
	testingData = "{{{},{},{{}}}}"
	console.log("Total Score :"+parseString(testingData));	
	testingData = "{<a>,<a>,<a>,<a>}"
	console.log("Total Score :"+parseString(testingData));	
	testingData = "{{<ab>},{<ab>},{<ab>},{<ab>}}"
	console.log("Total Score :"+parseString(testingData));	
	testingData = "{{<!!>},{<!!>},{<!!>},{<!!>}}"
	console.log("Total Score :"+parseString(testingData));	
	testingData = "{{<a!>},{<a!>},{<a!>},{<ab>}}"
	console.log("Total Score :"+parseString(testingData));	
}

function day9a(inputString){
	console.log("Total Score :"+parseString(inputString));	
}

function day9b(inputString){
	console.log("Total Score :"+parseStringb(inputString));	
}

function parseStringb(inputString){
	var inputArray = inputString.split("");
	var currentSpot = 0;
	var groupLevel=0;
	var garbage=false;
	var totalScore=0;
	var garbageChars=0;

	while(currentSpot<inputArray.length){
		var currentChar = inputArray[currentSpot];
		if(garbage){
			switch (currentChar) {
				case "@":
					currentSpot++;
					break;
				case ">":
					garbage=false;
					break;
				default:
					garbageChars++;
					break;
			}
		} else {
			switch (currentChar) {
				case "<":
					//Entering Garbage Section
					garbage=true;
					break;
				case "{":
					// Entering new Group
					groupLevel++;
					totalScore = totalScore + groupLevel;
					break;
				case "}":
					//Ending Group
					groupLevel--;
					break;
				default:
					//Ignore Everything else
					break;
			}
		}
		currentSpot++;
	}
	console.log(garbageChars);
	return totalScore;
}

function parseString(inputString){
	var inputArray = inputString.split("");
	var currentSpot = 0;
	var groupLevel=0;
	var garbage=false;
	var totalScore=0;

	while(currentSpot<inputArray.length){
		var currentChar = inputArray[currentSpot];
		if(garbage){
			if(currentChar == "@"){
				currentSpot++;
			}
			if(currentChar == ">"){
				garbage=false;
			}
		} else {
			switch (currentChar) {
				case "<":
					//Entering Garbage Section
					garbage=true;
					break;
				case "{":
					// Entering new Group
					groupLevel++;
					totalScore = totalScore + groupLevel;
					break;
				case "}":
					//Ending Group
					groupLevel--;
					break;
				default:
					//Ignore Everything else
					break;
			}
		}
		currentSpot++;
	}
	return totalScore;
}