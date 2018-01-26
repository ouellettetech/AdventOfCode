var md5 = require('md5');

var inputString="ahsbgdzn";

function hashCache(){
	this.cache = [];
	this.getHashValue = function(salt,index){
		if(!this.cache[index]){
			this.cache[index]=md5(salt+index);
		}
		return this.cache[index];
	}
	this.getStretchedValue = function(salt,index){
		if(!this.cache[index]){
			var temp=md5(salt+index);
			for(var i=0;i<2016;i++){
				var temp=md5(temp);
			}
			this.cache[index]=temp;
		}
		return this.cache[index];
	}
}


function testData(){
	var start = "abc";
	var validHashes = 0;
	var tripple = /(.)\1\1/
	var cache = new hashCache();
	for(var i=0;validHashes<64;i++){
		curHash = cache.getHashValue(start,i);
		var foundMatch = curHash.match(tripple);
		if(foundMatch){
			var character=foundMatch[1];// get just one character
			console.log("found tripplet! at index: "+i + " with Char: " + character);
			var found = false;
			var nextHash;
			for( var j=1;j<=1000 && !false;j++){
				nextHash = cache.getHashValue(start,i+j);
				if(nextHash.indexOf(character+character+character+character+character)!== -1){
					console.log("Hash is valid!");
					validHashes++;
					found = true;
				}
			}
		}
	}
	console.log("Index: " + (i-1));
	var cache = new hashCache();
	console.log("Hash Stretching....."+cache.getStretchedValue(start,0));
}

function day14a(input){
	var validHashes = 0;
	var tripple = /(.)\1\1/
	var cache = new hashCache();
	for(var i=0;validHashes<64;i++){
		curHash = cache.getHashValue(input,i);
		var foundMatch = curHash.match(tripple);
		if(foundMatch){
			var character=foundMatch[1];// get just one character
			var found = false;
			var nextHash;
			for( var j=1;j<=1000 && !false;j++){
				nextHash = cache.getHashValue(input,i+j);
				if(nextHash.indexOf(character+character+character+character+character)!== -1){
					validHashes++;
					found = true;
				}
			}
		}
	}
	console.log("Index: " + (i-1));
}

function day14b(input){
	var validHashes = 0;
	var tripple = /(.)\1\1/
	var cache = new hashCache();
	for(var i=0;validHashes<64;i++){
		curHash = cache.getStretchedValue(input,i);
		var foundMatch = curHash.match(tripple);
		if(foundMatch){
			var character=foundMatch[1];// get just one character
			var found = false;
			var nextHash;
			for( var j=1;j<=1000 && !false;j++){
				nextHash = cache.getStretchedValue(input,i+j);
				if(nextHash.indexOf(character+character+character+character+character)!== -1){
					validHashes++;
					found = true;
				}
			}
		}
	}
	console.log("Index: " + (i-1));
}

testData();
console.log("Day 14 Part A");
day14a(inputString);
console.log("Day 5 Part B");
day14b(inputString);