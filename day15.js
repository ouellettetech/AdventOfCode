function testData() {
	var matches=0;
	var generateAValue=65;
	var generateBValue=8921;

	for(var i=0;i<40000000;i++){
		generateAValue=generatorA(generateAValue);
		generateBValue=generatorB(generateBValue);
		console.log("A: " + generateAValue+" B: "+generateBValue);
		if(checkLast16(generateAValue,generateBValue)){
			matches++;
			console.log("Found Match on "+i);
		}

	}
	return matches;

}

function day15a() {
	var matches=0;
	var generateAValue=277;
	var generateBValue=349;

	for(var i=0;i<40000000;i++){
		generateAValue=generatorA(generateAValue);
		generateBValue=generatorB(generateBValue);
		if(checkLast16(generateAValue,generateBValue)){
			matches++;
			console.log("Found Match on "+i);
		}
	}
	return matches;
}

function day15b() {
	var matches=0;
	var generateAValue=277;
	var generateBValue=349;

	for(var i=0;i<5000000;i++){
		generateAValue=generatorA(generateAValue);
		while(parseInt(generateAValue,10)%4!==0){
			generateAValue=generatorA(generateAValue)
		}
		generateBValue=generatorB(generateBValue);
		while(parseInt(generateBValue,10)%8!==0){
			generateBValue=generatorB(generateBValue);
		}
		if(checkLast16(generateAValue,generateBValue)){
			matches++;
			console.log("Found Match on "+i);
		}
	}
	return matches;
}


function checkLast16(inputA,inputB){
	return getLast16bits(convertDecToBinary(inputA)).join()===getLast16bits(convertDecToBinary(inputB)).join();
}

function generatorA(input){
	return generatorFunc(input,16807,2147483647);
}
function generatorB(input){
	return generatorFunc(input,48271,2147483647);
}
function generatorFunc(input,factor,divisor){
	return (input*factor)%divisor;
}

function convertDecToBinary(decString){
	return decString.toString(2);
}
function getLast16bits(binString){
	splitString = binString.split("");
	return splitString.slice(splitString.length-16);
}


