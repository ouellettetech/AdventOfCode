var File = require("fs");

function readFile(fileName){
	var inputContent = File.readFileSync(fileName, "utf-8").trim();
	var inputArray = inputContent.split("\n");
	console.log(inputArray);
	return inputArray;
}

function ScrambleInstruction(inputString){
	var inputArray = inputString.split(" ");
	var newFunc;
	switch(inputArray[0]){
		case "swap":
			var x = inputArray[2];
			var y = inputArray[5];
			if(inputArray[1] === "position"){
				//swap position X with position Y means that the letters at indexes X and Y (counting from 0) should be swapped.
				newFunc = function(scrambleString){
					var tempStr = scrambleString.split("");
					var temp = tempStr[x];
					tempStr[x] = tempStr[y];
					tempStr[y] = temp;
					return tempStr.join("");
				}
			} else { // "letter"
				newFunc = function(scrambleString){
					var tempStr = scrambleString.split("");
					var indexX = tempStr.indexOf(x);
					var indexY = tempStr.indexOf(y);
					var temp = tempStr[indexX];
					tempStr[indexX] = tempStr[indexY];
					tempStr[indexY] = temp;
					return tempStr.join("");
				}
			}
			break;
		case "rotate":
			var rotateString = function(scrambleString, amount){
				//	console.log("Rotate by " + amount);
				var amt = (scrambleString.length +  amount) % scrambleString.length;
				// console.log("Modified Amt " + amt);
				var end = scrambleString.slice(0,scrambleString.length-amt);
				var start = scrambleString.slice(scrambleString.length-amt);
				// console.log("New String Start: "+ start + " End: " + end);
				return start + end;
			}
			if(inputArray[1] == "based"){
				//rotate based on position of letter X means that the whole string should be rotated 
				// to the right based on the index of letter X (counting from 0) 
				// as determined before this instruction does any rotations. 
				// Once the index is determined, rotate the string to the right one time, 
				// plus a number of times equal to that index, plus one additional time 
				// if the index was at least 4.
				
				// rotate based on position of letter c
				var x = inputArray[6];
				newFunc = function(scrambleString){
					var index = scrambleString.indexOf(x);
					if(index>=4){
						index++;
					}
					index++
					return rotateString(scrambleString,index);
				}
			} else { // position
				var x = inputArray[2];
				var direction = 1;
				if(inputArray[1] === "left"){
					direction = -1;
				}
				newFunc = function(scrambleString){
					return rotateString(scrambleString,x*direction);
				}
			}
			break;
		case "reverse":
			var x = parseInt(inputArray[2]);
			var y = parseInt(inputArray[4]);
			//reverse positions X through Y means that the span of letters at indexes X through Y 
			// (including the letters at X and Y) should be reversed in order.
			newFunc = function(scrambleString){
				var start = scrambleString.slice(0,x);
				var end = scrambleString.slice(y+1);
				var reverseSection = scrambleString.slice(x,y+1).split("");
				reverseSection = reverseSection.reverse();
				var retString = start + reverseSection.join("") + end;
				return retString;
			}
			break;
		case "move":
			var x = parseInt(inputArray[2]);
			var y = parseInt(inputArray[5]);
			newFunc = function(scrambleString){
				var movingLetter = scrambleString.slice(x,(x+1));
				var start = scrambleString.slice(0,x);
				var end = scrambleString.slice(x+1);
				var tempString = start + end;
				start = tempString.slice(0,y);
				end = tempString.slice(y);
				return start + movingLetter + end;
			}
			break;
	}
	return newFunc;
}


function UnScrambleInstruction(inputString){
	var inputArray = inputString.split(" ");
	var newFunc;
	switch(inputArray[0]){
		case "swap": // Works the same to undo.
			var x = inputArray[2];
			var y = inputArray[5];
			if(inputArray[1] === "position"){
				//swap position X with position Y means that the letters at indexes X and Y (counting from 0) should be swapped.
				newFunc = function(scrambleString){
					var tempStr = scrambleString.split("");
					var temp = tempStr[x];
					tempStr[x] = tempStr[y];
					tempStr[y] = temp;
					return tempStr.join("");
				}
			} else { // "letter"
				newFunc = function(scrambleString){
					var tempStr = scrambleString.split("");
					var indexX = tempStr.indexOf(x);
					var indexY = tempStr.indexOf(y);
					var temp = tempStr[indexX];
					tempStr[indexX] = tempStr[indexY];
					tempStr[indexY] = temp;
					return tempStr.join("");
				}
			}
			break;
		case "rotate":
			var rotateString = function(scrambleString, amount){
				//console.log("Rotate by " + amount);
				var amt = (scrambleString.length +  amount) % scrambleString.length;
				//console.log("Modified Amt " + amt);
				var end = scrambleString.slice(0,scrambleString.length-amt);
				var start = scrambleString.slice(scrambleString.length-amt);
				//console.log("New String Start: "+ start + " End: " + end);
				return start + end;
			}

			var getOriginalindex = function(scrambledStr, x){
				var index = scrambledStr.indexOf(x);
				// Locations after rotating. (function is weird so writing out...);
				// [0,1,1
				//  1,2,3
				//  2,3,5
				//  3,4,7
				//  4,6,10
				//  5,7,12
				//  6,8,14
				//  7,9,16]

				// reorder
				//  7,9,0  ,-9
				//  0,1,1  ,-1
				//  4,6,2  ,-6
				//  1,2,3  ,-2
				//  5,7,4  ,-7
				//  2,3,5  ,-3
				//  6,8,6  ,-8
				//  3,4,7  ,-4
				var lookupTable = [-9,-1,-6,-2,-7,-3,-8,-4];
				return lookupTable[index];
			}
			if(inputArray[1] == "based"){
				//rotate based on position of letter X means that the whole string should be rotated 
				// to the right based on the index of letter X (counting from 0) 
				// as determined before this instruction does any rotations. 
				// Once the index is determined, rotate the string to the right one time, 
				// plus a number of times equal to that index, plus one additional time 
				// if the index was at least 4.
				
				// rotate based on position of letter c
				var x = inputArray[6];
				newFunc = function(scrambleString){
					var index = getOriginalindex(scrambleString, x);
					return rotateString(scrambleString,index);
				}
			} else { // position
				var x = inputArray[2];
				var direction = -1; // To invert just swap direction.
				if(inputArray[1] === "left"){
					direction = 1;
				}
				newFunc = function(scrambleString){
					return rotateString(scrambleString,x*direction);
				}
			}
			break;
		case "reverse": // again just run backwards
			var x = parseInt(inputArray[2]);
			var y = parseInt(inputArray[4]);
			//reverse positions X through Y means that the span of letters at indexes X through Y 
			// (including the letters at X and Y) should be reversed in order.
			newFunc = function(scrambleString){
				var start = scrambleString.slice(0,x);
				var end = scrambleString.slice(y+1);
				var reverseSection = scrambleString.slice(x,y+1).split("");
				reverseSection = reverseSection.reverse();
				var retString = start + reverseSection.join("") + end;
				return retString;
			}
			break;
		case "move": // just need to swap x and y.
			var y = parseInt(inputArray[2]);
			var x = parseInt(inputArray[5]);
			newFunc = function(scrambleString){
				var movingLetter = scrambleString.slice(x,(x+1));
				var start = scrambleString.slice(0,x);
				var end = scrambleString.slice(x+1);
				var tempString = start + end;
				start = tempString.slice(0,y);
				end = tempString.slice(y);
				return start + movingLetter + end;
			}
			break;
	}
	return newFunc;
}

function parseInst(rangeStrings){
	var rangeArray =[];
	rangeStrings.forEach(function(value){
		rangeArray.push(ScrambleInstruction(value));
	})
	return rangeArray;
}

function parseInst2(rangeStrings){
	var rangeArray =[];
	rangeStrings.forEach(function(value){
		rangeArray.push(UnScrambleInstruction(value));
	})
	return rangeArray.reverse();
}

function testData(){
	var startStr= "abcde";
	var testInst=["swap position 4 with position 0",
		"swap letter d with letter b",
		"reverse positions 0 through 4",
		"rotate left 1 step",
		"move position 1 to position 4",
		"move position 3 to position 0",
		"rotate based on position of letter b",
		"rotate based on position of letter d"];
	var inst = parseInst(testInst);
	console.log(inst);
	var curString = startStr;
	inst.forEach(function(val){
		curString = val(curString);
		console.log(curString);
	});
	console.log("Final String: "+ curString);
}


function day21a(inputString) {
	var startStr= "abcdefgh";
	var inst = parseInst(inputString);
	console.log(inst);
	var curString = startStr;
	inst.forEach(function(val){
		curString = val(curString);
		console.log(curString);
	});
	console.log("Final String: "+ curString);
}

function day21b(inputString) {
	var scrambledStr = "fbgdceah";
	var inst = parseInst2(inputString);
	console.log(inst);
	var curString = scrambledStr;
	inst.forEach(function(val){
		curString = val(curString);
		console.log(curString);
	});
	console.log("Final String: "+ curString);

}

var inst = readFile("inputDay21.txt");
testData();
console.log("Day 21 Part A");
day21a(inst);
console.log("Day 21 Part B");
day21b(inst);
