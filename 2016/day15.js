var inputDiscs=["Disc #1 has 17 positions; at time=0, it is at position 15.",
	"Disc #2 has 3 positions; at time=0, it is at position 2.",
	"Disc #3 has 19 positions; at time=0, it is at position 4.",
	"Disc #4 has 13 positions; at time=0, it is at position 2.",
	"Disc #5 has 7 positions; at time=0, it is at position 2.",
	"Disc #6 has 5 positions; at time=0, it is at position 0."];

function Disc(positions,starting){
	this.startPosition = starting;
	this.numPos = positions;
	this.fallsThrough = function(time){
		return !((time + this.startPosition) % this.numPos);
	}
}

function DiscSet(set){
	this.myset = [];
	if(set){
		this.myset = set;
	}
	this.checkTimer = function(time){
		var passed = true;
		for(var i=0;i<this.myset.length && passed; i++){
			if(!this.myset[i].fallsThrough(time+i+1)){
				passed = false;
			}
		}
		return passed;
	}

}

function parseString(strArray){
	var ret = [];
	for(var i=0;i<strArray.length;i++){
		var tempArray = strArray[i].split(" ");
		var numPos = parseInt(tempArray[3]);
		var startPos = parseInt(tempArray[11]);
		ret.push(new Disc(numPos,startPos));
	}
	return ret;
}

function testData(){
	var testString = ["Disc #1 has 5 positions; at time=0, it is at position 4.",
		"Disc #2 has 2 positions; at time=0, it is at position 1."];
	var checkDiscs = parseString(testString);
	var discs = new DiscSet(checkDiscs);
	console.log(discs);
	console.log(checkDiscs[0].fallsThrough(0));
	console.log(checkDiscs[0].fallsThrough(1));
	for(var i=0;i<10;i++){
		if(discs.checkTimer(i)){
			console.log("Passed at time: "+i);
		}
	}
}

function day15a(input){
	var checkDiscs = parseString(input);
	var discs = new DiscSet(checkDiscs);
	console.log(discs);
	var found = false;
	for(var i=0;!found;i++){
		if(discs.checkTimer(i)){
			console.log("Passed at time: "+i);
			found = true;
		}
	}
}

function day15b(input){
	var checkDiscs = parseString(input);
	checkDiscs.push(new Disc(11,0));
	var discs = new DiscSet(checkDiscs);
	console.log(discs);
	var found = false;
	for(var i=0;!found;i++){
		if(discs.checkTimer(i)){
			console.log("Passed at time: "+i);
			found = true;
		}
	}
}

testData();
console.log("Day 15 Part A");
day15a(inputDiscs);
console.log("Day 15 Part B");
day15b(inputDiscs);