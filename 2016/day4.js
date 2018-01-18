var File = require("fs");

function readFile(fileName){
	var inputContent = File.readFileSync(fileName, "utf-8").trim();
	var inputArray = inputContent.split("\n");
	inputArray = inputArray.map(function(value){
		var tempArray = value.trim().split("\[");
		var stringArray=tempArray[0].split("-");
		var numerical = parseInt(stringArray.splice(stringArray.length-1,1));
		var newString = stringArray.join("");
		return [newString,numerical,tempArray[1].replace("]","")];
	});
	console.log(inputArray);
	return inputArray;
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

function unencrypt(room){
	var roomArray=room[0].split("");
	var sector=room[1]%26;
	var first = "a".charCodeAt(0);
	var last = "z".charCodeAt(0);
	roomArray = roomArray.map(function(value){
		var newChar = value.charCodeAt(0) + sector;
		if(newChar > last){
			newChar = newChar - last + first-1;
		}
		return String.fromCharCode(newChar);
	});
	return roomArray.join("");
}

function checkEncryption(curSet){
	var checkString = curSet[0];
	var roomNum =  curSet[1];
	var checkSum = curSet[2];
	var lettersUsed = []; // just creating an array of 26 0's and I'll count letters on the array, and then sort by count.
	// Could also just a min heap, or some other array, but then search time is longer, 
	// and the 26 bytes this takes up isn't a problem
	var firstchar = "a".charCodeAt(0);
	for(var i=0;i<26;i++){
		lettersUsed.push({name: String.fromCharCode(firstchar+i), value: 0});
	}
	var stringArray = checkString.split("");
	for(var j=0;j<stringArray.length;j++){
		lettersUsed[stringArray[j].charCodeAt(0)-firstchar].value++;
	}
	lettersUsed = lettersUsed.filter(function(value){
		return value.value>0;
	});
	lettersUsed.sort(largestValue);
	//console.log(lettersUsed);
	var checkArray = checkSum.split("");
	for(var k=0;k<checkSum.length;k++){
		if(checkArray[k] !== lettersUsed[k].name){
			//console.log("Char " + checkArray[k] + " Doesn't match " + lettersUsed[k].name);
			return false;
		}
	}
	return true;
}

function testData(){
	var testEncrypted1 = ["aaaaabbbzyx",123,"abxyz"];
	var testEncrypted2 = ["abcdefgh",987,"abcde"];
	var testEncrypted3 = ["notarealroom",404,"oarel"];
	var testEncrypted4 = ["totallyrealroom",200,"decoy"];
	var testEncrypted5 = ["shoewudysrkddoqdqboiyi",530,"doiqs"];
	console.log(checkEncryption(testEncrypted1));
	console.log(checkEncryption(testEncrypted2));
	console.log(checkEncryption(testEncrypted3));
	console.log(checkEncryption(testEncrypted4));
	console.log(checkEncryption(testEncrypted5));
	var value =0;
	value+=testEncrypted1[1];
	value+=testEncrypted2[1];
	value+=testEncrypted3[1];
	console.log("Value :"+ value);

	var testEncrypted6 = ["qzmtzixmtkozyivhz",343,""];
	console.log(unencrypt(testEncrypted6));
}

function day4a(rooms) {
	var validTotal = 0;
	var count = 0;
	console.log("Total Rooms :"+rooms.length);
	for(var i=0;i<rooms.length;i++){
		if(checkEncryption(rooms[i])){
			validTotal+=rooms[i][1];
			count++;
			console.log(rooms[i][0]);
		}
	}
	console.log("Total Value: "+ validTotal + " Total Rooms: " + count);
}

function day4b(rooms) {
	var validTotal = 0;
	var count = 0;
	console.log("Total Rooms :"+rooms.length);
	for(var i=0;i<rooms.length;i++){
		if(checkEncryption(rooms[i])){
			validTotal+=rooms[i][1];
			count++;
			var roomName = unencrypt(rooms[i]);
			console.log(rooms[i][0]);
			if(roomName === "northpoleobjectstorage"){
				console.log(rooms[i]);
				return rooms[i][1];
			}
		}
	}
	console.log("Didn't find Room!!!");
}

var encryption = readFile("inputDay4.txt");
testData();
console.log("Day 1 Part A");
day4a(encryption);
console.log("Day 1 Part B");
console.log(day4b(encryption));
