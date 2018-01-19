var File = require("fs");

function readFile(fileName){
	var inputContent = File.readFileSync(fileName, "utf-8").trim();
	var inputArray = inputContent.split("\n");
	console.log(inputArray);
	return inputArray;
}
 

function checkValidRegEx(ipAddress){
	var abba = /(.)(.)\2\1/
	var abbaNotaaaa = /((.)(?!\2)(.)\3\2)/
	var brackets = /\[.*\]/
	var subText=ipAddress.match(brackets)[0];
	if(!!subText.match(abbaNotaaaa)){
		console.log(subText);
		console.log(subText.match(abbaNotaaaa)[0]);
		console.log("Returning False");
		return false;
	}
	return !!ipAddress.match(abbaNotaaaa);
}

function checkValid(ipAddress){
	var inSubSection = false;
	var foundString = false;
	var ipArray = ipAddress.split("");
	for(var i=0;i<ipArray.length-3;i++){
		switch(ipArray[i]){
			case "[":
				inSubSection = true;
				break;
			case "]":
				inSubSection = false;
				break;
			default:
				if((ipAddress[i]===ipAddress[i+3]) && (ipAddress[i+1]===ipAddress[i+2]) && (ipAddress[i]!==ipAddress[i+1])){
					if(inSubSection){
						return false;
					}
					else {
						foundString = true;
					}
				}
		}
	}
	return foundString;
}

function findSSL(ipAddress){
	var inSubSection = false;
	var foundString = false;
	var ipArray = ipAddress.split("");
	for(var i=0;i<ipArray.length-2;i++){
		switch(ipArray[i]){
			case "[":
				inSubSection = true;
				break;
			case "]":
				inSubSection = false;
				break;
			default:
				if(!inSubSection){
					if((ipAddress[i]===ipAddress[i+2]) && (ipAddress[i]!==ipAddress[i+1])){
						var curbab = [ipArray[i+1],ipArray[i],ipArray[i+1]];
						//console.log("Found BAB: "+ curbab)
						if(checkBAB(ipArray,curbab)){
							return true;
						}
					}
				}
		}
	}
	return foundString;
}

function checkBAB(ipArray,babSequence){
	var inSubSection = false;
	for(var i=0;i<ipArray.length-2;i++){
		switch(ipArray[i]){
			case "[":
				inSubSection = true;
				break;
			case "]":
				inSubSection = false;
				break;
			default:
				if(inSubSection){
					//console.log("In SubSection "+ipArray[i]);
					if((ipArray[i]===babSequence[0]) && 
					(ipArray[i+1]===babSequence[1]) && 
					(ipArray[i+2]===babSequence[2]) ){
						return true;
					}
				}
		}
	}
	return false;
}


function testData() {
	var test1 = "abba[mnop]qrst";
	var test2 = "abcd[bddb]xyyx";
	var test3 = "aaaa[qwer]tyui";
	var test4 = "ioxxoj[asdfgh]zxcvbn";
	var test5 = "epmnxkubnsnyeeyubv[ydzhcoytayiqmxlv]edmbahbircojbkmrg[dlxyprugefqzkum]svdaxiwnnwlkrkukfg[eacekyzjchfpzghltn]ofwgevhoivrevueaj";
	
	var test6 = "aba[bab]xyz";
	var test7 = "xyx[xyx]xyx";
	var test8 = "aaa[kek]eke";
	var test9 = "zazbz[bzb]cdb";
	console.log(checkValid(test1));
	console.log(checkValid(test2));
	console.log(checkValid(test3));
	console.log(checkValid(test4));

	console.log(checkValid(test5));
	console.log(checkValidRegEx(test5));

	console.log("Part B");
	console.log(findSSL(test6));
	console.log(findSSL(test7));
	console.log(findSSL(test8));
	console.log(findSSL(test9));
}

function day7a(ipAddress) {
	var matches=0;

	for(var i=0;i<ipAddress.length;i++){
		var valid=false;
		if(checkValid(ipAddress[i])){
			valid=true;
			matches++;
		}
	}
	return matches;
}

function day7b(ipAddress) {
	var matches=0;

	for(var i=0;i<ipAddress.length;i++){
		var valid=false;
		if(findSSL(ipAddress[i])){
			valid=true;
			matches++;
		}
	}
	return matches;
}

var ipAddress = readFile("inputDay7.txt");
testData();
console.log("Day 7 Part A");
console.log(day7a(ipAddress));
console.log("Day 7 Part B");
console.log(day7b(ipAddress));
