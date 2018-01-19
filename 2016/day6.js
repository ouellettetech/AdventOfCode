var File = require("fs");

function readFile(fileName){
	var inputContent = File.readFileSync(fileName, "utf-8").trim();
	var inputArray = inputContent.split("\n");
	console.log(inputArray);
	return inputArray;
}
 
function leastValue(a,b){
	if (a.value < b.value) {
		return -1;
	}
	if (a.value > b.value) {
		return 1;
	}
	if (a.name < b.name) {
		return -1;
	}
	if (a.name > b.name) {
		return 1;
	}
	// a must be equal to b
	return 0;
}

function largestValue(a,b){
	if (a.value > b.value) {
		return -1;
	}
	if (a.value < b.value) {
		return 1;
	}
	if (a.name < b.name) {
		return -1;
	}
	if (a.name > b.name) {
		return 1;
	}
	// a must be equal to b
	return 0;
}

function findMessage(messages,sortFunction){
	var characterUsage = [];
	var messageLength = messages[0].length;
	var lettersUsed = [];
	var curMesArray;
	var firstchar = "a".charCodeAt(0);
	var foundMessage = "";
	for(var j=0;j<messageLength;j++){
		lettersUsed = [];
		var firstchar = "a".charCodeAt(0);
		for(var i=0;i<26;i++){
			lettersUsed.push({name: String.fromCharCode(firstchar+i), value: 0});
		}
		characterUsage.push(lettersUsed);
	}

	for(var i=0;i<messages.length;i++){
		curMesArray = messages[i].split("");
		for(var k=0;k<curMesArray.length;k++){
			characterUsage[k][curMesArray[k].charCodeAt(0)-firstchar].value++;
		}
	}
	//console.log(characterUsage);
	for (var l=0;l<characterUsage.length;l++){
		characterUsage[l].filter(function(value){
			return value.value>0;
		});
		characterUsage[l].sort(sortFunction);
		foundMessage+=characterUsage[l][0].name;
	}
	return foundMessage;
}

function testData(){
	var testStrings = ["eedadn",
		"drvtee",
		"eandsr",
		"raavrd",
		"atevrs",
		"tsrnev",
		"sdttsa",
		"rasrtv",
		"nssdts",
		"ntnada",
		"svetve",
		"tesnvt",
		"vntsnd",
		"vrdear",
		"dvrsen",
		"enarar"];
	
	console.log(findMessage(testStrings, largestValue));
}

function day6a(messages) {
	var found = findMessage(messages,largestValue);
	console.log(found);
	return found;
}

function day6b(messages) {
	var found = findMessage(messages,leastValue);
	console.log(found);
	return found;
}

var message = readFile("inputDay6.txt");
testData();
console.log("Day 6 Part A");
day6a(message);
console.log("Day 6 Part B");
day6b(message);
