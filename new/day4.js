var md5 = require('md5');

var inputString="iwrupvqb";

function day4a(input){
	var found=false;
	for(var i=0;(i<10000000) && (!found);i++){
		var hash=md5(input+i);
		if(hash.substring(0, 5) === "00000") {
			found=true;
			console.log(i);
		}
	}
}

function day4b(input){
	var found=false;
	// checking the values until it finds a match.
	for(var i=0;(i<10000000) && (!found);i++){
		var hash=md5(input+i);
		if(hash.substring(0, 6) === "000000") {
			found=true;
			console.log(i);
		}
	}
}

day4b(inputString);