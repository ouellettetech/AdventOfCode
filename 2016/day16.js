var startingString="11101000110010100";

function getNextDragonCurveString(currentArray){
	var partB = currentArray.slice(); // create a destination array that is already sized. 
	//so it doesn't resize as filling.
	for(var i=0;i<currentArray.length;i++){
		if(currentArray[((currentArray.length-1)-i)] === '1'){
			partB[i] = "0";
		} else {
			partB[i] = "1";
		}
	}
	return currentArray.concat(["0"]).concat(partB);
}

function getOneCheckSumLevel(currentArray){
	var newArray = [];
	for(var i=0;i<currentArray.length;i+=2){
		if(currentArray[i] === currentArray[i+1]){
			newArray.push("1");
		} else {
			newArray.push("0");
		}
	}
	return newArray;
}

function getCheckSum(currentArray){
	var current = currentArray;
	while((current.length%2) === 0){
		current = getOneCheckSumLevel(current);
	}	
	return current;
}
function fillDisc(seed,size){
	var randomData = seed;
	while(randomData.length<size){
		randomData = getNextDragonCurveString(randomData);
	}
	randomData = randomData.slice(0,size);
	return getCheckSum(randomData);
}

function testData(){
	console.log(getNextDragonCurveString(["1"]).join(""));
	console.log(getNextDragonCurveString(["0"]).join(""));
	console.log(getNextDragonCurveString("11111".split("")).join(""));
	console.log(getNextDragonCurveString("111100001010".split("")).join(""));
	console.log(getOneCheckSumLevel("110010110100".split("")));
	console.log(getOneCheckSumLevel("110101".split("")));
	console.log(getCheckSum("110010110100".split("")));
	console.log(fillDisc("10000".split(""),20).join(""));
}

function day16a(input){
	console.log(fillDisc(input.split(""),272).join(""));
}

function day16b(input){
	console.log(fillDisc(input.split(""),35651584).join(""));
}

testData();
console.log("Day 16 Part A");
day16a(startingString);
console.log("Day 16 Part B");
day16b(startingString);