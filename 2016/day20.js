
var File = require("fs");

function readFile(fileName){
	var inputContent = File.readFileSync(fileName, "utf-8").trim();
	var inputArray = inputContent.split("\n");
	console.log(inputArray);
	return inputArray;
}

function Range(lowOrString,high){
	this.low = lowOrString;
	this.high = high;
	this.setFromString = function(curRange){
		var cur = curRange.split("-");
		this.low = parseInt(cur[0]);
		this.high = parseInt(cur[1]);
	}
	if(!this.high){
		this.setFromString(this.low);
	}
	this.combineRange = function(higherSide){
		if(higherSide.high>this.high){
			this.high=higherSide.high;
		}
	}
	this.doesOverlap = function(secondSide){
		return (secondSide.low<=(this.high+1));
	}
}

function combineRanges(rangeArray){
	console.log("Checking last entry....");
	console.log(rangeArray[rangeArray.length-1]);
	var newRangeArray = [rangeArray[0]];
	var prev= 0;
	for(var i=0;i<rangeArray.length;i++){
		if(rangeArray[prev].doesOverlap(rangeArray[i])){
			rangeArray[prev].combineRange(rangeArray[i]);
		} else {
			newRangeArray.push(rangeArray[i]);
			prev = i;
		}
	}
	console.log("Checking last entry After combing....");
	console.log(newRangeArray[newRangeArray.length-1]);
	return newRangeArray;
}

function sortRange(a,b){
	if(a.low<b.low){
		return -1;
	}
	if(a.low>b.low){
		return 1;
	}
	if(a.high<b.high){
		return -1;
	}
	if(a.high>b.high){
		return 1;
	}
	return 0;
}

function parseRanges(rangeStrings){
	var rangeArray =[];
	rangeStrings.forEach(function(value){
		rangeArray.push(new Range(value));
	})
	return rangeArray;
}

function countGaps(rangeArray,maxVal){
	var count = 0;
	count = rangeArray[0].low;
	for(var i=0;i<rangeArray.length-1;i++){
		count +=(rangeArray[(i+1)].low) - (rangeArray[i].high+1);
	}
	console.log("Last Entry: " + rangeArray[(rangeArray.length-1)].high)
	count += maxVal-(rangeArray[(rangeArray.length-1)].high);
	return count;
}

function testData(){
	var ranges=["5-8",
		"0-2",
		"4-7"];
	var rangeArray = parseRanges(ranges);
	console.log(rangeArray);
	rangeArray = rangeArray.sort(sortRange);
	console.log(rangeArray);
	rangeArray = combineRanges(rangeArray);
	console.log("After Combining!");
	console.log(rangeArray);
	if(rangeArray[0].low === 0){
		console.log("First Available: "+ (rangeArray[0].high+1));
	} else {
		console.log("First Available: "+ 0);
	}

	console.log(countGaps(rangeArray,10));
}


function day20a(inputString) {
	var rangeArray = parseRanges(inputString);
	rangeArray = rangeArray.sort(sortRange);
	rangeArray = combineRanges(rangeArray);
	if(rangeArray[0].low === 0){
		console.log("First Available: "+ (rangeArray[0].high+1));
	} else {
		console.log("First Available: "+ 0);
	}
}

function day20b(inputString) {
	var rangeArray = parseRanges(inputString);
	rangeArray = rangeArray.sort(sortRange);
	console.log("Lines Before Compact: "+ rangeArray.length);
	rangeArray = combineRanges(rangeArray);
	console.log("Lines After Compact: "+ rangeArray.length);
	console.log(rangeArray[0]);
	console.log(rangeArray[1]);
	console.log(countGaps(rangeArray,4294967295));
}

var ranges = readFile("inputDay20.txt");
testData();
console.log("Day 20 Part A");
day20a(ranges);
console.log("Day 20 Part B");
day20b(ranges);
