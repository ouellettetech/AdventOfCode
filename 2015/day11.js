// This is the traditional Traveling Salesman problem, so there isn't a "good" solution, so I'm stuck brute forcing.

var initialPassword="hxbxwxba";

function testData(){
	var curPass = "xzx";
	for(var i=0;i<10;i++){
		console.log(curPass);
		curPass=incrementPassword(curPass);
	}
	console.log(checkPassword("hijklmmn"));
	console.log(checkPassword("abbceffg"));
	console.log(checkPassword("abbcegjk"));
	console.log(checkPassword("abcdffaa"));
	console.log(checkPassword("ghjaabcc"));

	curPass="abcdefgh";
	console.log("Original Pass: "+ curPass);
	curPass=incrementPassword(curPass);
	while(!checkPassword(curPass)){
		curPass=incrementPassword(curPass);
	}
	console.log("Good Password: "+ curPass);

	curPass="ghijklmn";
	console.log("Original Pass: "+ curPass);
	curPass=incrementPassword(curPass);
	while(!checkPassword(curPass)){
		curPass=incrementPassword(curPass);
	}
	console.log("Good Password: "+ curPass);
}

function checkPassword(curPass){
	if(curPass.indexOf("i")!=-1 || curPass.indexOf("o")!=-1 || curPass.indexOf("l")!=-1){
		return false;
	}
	var twoPairs = /(.)\1.*(.)\2/;
	if(!twoPairs.test(curPass)){
		return false;
	}

	var passArray=curPass.split("");
	var lastCharValue=0;
	var numberOfCharsFound=1;
	for(var i=0;i<passArray.length && numberOfCharsFound<3;i++){
		if((passArray[i].charCodeAt(0)-1)===lastCharValue){
			numberOfCharsFound++;
		} else {
			numberOfCharsFound=1;
		}
		lastCharValue=passArray[i].charCodeAt(0);
	}

	if(numberOfCharsFound===3){
		return true;
	} else {
		return false;
	}

}

function incrementPassword(input){
	var passArray=input.split("");
	var charToInc=passArray.length-1;
	for(;charToInc>0 && passArray[charToInc]==='z';charToInc--){
		passArray[charToInc]='a';
	}
	// Increment the current Character one letter.
	passArray[charToInc]=String.fromCharCode(passArray[charToInc].charCodeAt(0)+1);
	return passArray.join("");
}

function day11a(input){
	curPass=input+"";
	console.log("Original Pass: "+ curPass);
	curPass=incrementPassword(curPass);
	while(!checkPassword(curPass)){
		curPass=incrementPassword(curPass);
	}
	console.log("Good Password: "+ curPass);
	return curPass;
}

function day11b(input){
	curPass=input+"";
	console.log("Original Pass: "+ curPass);
	curPass=incrementPassword(curPass);
	while(!checkPassword(curPass)){
		curPass=incrementPassword(curPass);
	}
	console.log("Good Password: "+ curPass);
	return curPass;
}

console.log("Testing...");
testData();
console.log("Day 11a");
var newPass=day11a(initialPassword);
console.log("Day 11b");
day11b(newPass);