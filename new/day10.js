// This is the traditional Traveling Salesman problem, so there isn't a "good" solution, so I'm stuck brute forcing.

var speakSayInput="1321131112";

function testData(){
	var start="1";
	var current = start;
	for(var i=0;i<5;i++){
		current = speakSayOneTime(current);
		console.log(current);
	}
}

function speakSayOneTime(inputString){
	var outputString="";
	var currentChar;
	var inputArray = inputString.split("");
	if(inputArray.length<1){
		return "";
	}
	currentChar=inputArray[0];
	currentCount=1;
	for(var i=1;i<inputArray.length;i++){
		if(currentChar!==inputArray[i]){
			outputString+=currentCount+currentChar;
			currentChar=inputArray[i];
			currentCount=1;
		} else {
			currentCount++;
		}
	}
	outputString+=currentCount+currentChar;
	return outputString;
}

function day10a(input){
	var current = input;
	for(var i=0;i<40;i++){
		current = speakSayOneTime(current);
		console.log(current);
	}
	console.log(current.length);
}

function day10b(input){
	var current = input;
	for(var i=0;i<50;i++){
		current = speakSayOneTime(current);
	}
	console.log(current.length);
}

//testData();
//day10a(speakSayInput);
day10b(speakSayInput);