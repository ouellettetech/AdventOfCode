var md5 = require('md5');

var inputString="reyedfim";

function testData(){
	var start = "abc";
	var password = "";
	for(var i=0;password.length<8;i++){
		var hash=md5(start+i);
		//console.log(i);
		if(hash.substring(0, 5) === "00000") {
			password = password + hash.substring(5,6);
			console.log(password);
		}
	}
	console.log(password);
}

function day5a(input){
	var password = "";
	for(var i=0;password.length<8;i++){
		var hash=md5(input+i);
		//console.log(i);
		if(hash.substring(0, 5) === "00000") {
			password = password + hash.substring(5,6);
			console.log(password);
		}
	}
	console.log(password);
}

function day5b(input){
	var passwordArray = [-1,-1,-1,-1,-1,-1,-1,-1];
	foundPassword = false;
	for(var i=0;!foundPassword;i++){
		var hash=md5(input+i);
		//console.log(i);
		if(hash.substring(0, 5) === "00000") {
			var pos = parseInt(hash.substring(5,6),16);
			console.log(pos);
			var character = hash.substring(6,7);
			if(passwordArray[pos]===-1){
				passwordArray[pos] = character;
			}
			foundPassword = true;
			passwordArray.forEach(function(val){
				if(val === -1){
					foundPassword = false;
				}
			});
			console.log(passwordArray);
		}
	}
	console.log(passwordArray.join(""));
}

//testData();
console.log("Day 5 Part A");
//day5a(inputString);
console.log("Day 5 Part B");
day5b(inputString);