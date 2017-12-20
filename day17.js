
function testData() {
	var moves=3;
	var buffer=[0];
	var currentLoc=0;
	for(var i=1;i<=9;i++){
		currentLoc=(currentLoc+moves)%buffer.length;
		console.log("Current Loc: "+ currentLoc);
		currentLoc++;// so we select the new item.
		buffer.splice(currentLoc,0,i);
		console.log(buffer);
	}
}


function day17a() {
	var moves=345;
	var buffer=[0];
	var currentLoc=0;
	for(var i=1;i<=2017;i++){
		currentLoc=(currentLoc+moves)%buffer.length;
		console.log("Current Loc: "+ currentLoc);
		currentLoc++;// so we select the new item.
		buffer.splice(currentLoc,0,i);
		console.log(buffer);
	}
	var index=buffer.indexOf(2017);
	console.log(buffer[index+1]);
	return buffer;
}


function day17b() {
	var moves=345;
	var buffer=[0];
	var currentLoc=0;
	for(var i=1;i<=50000000;i++){
		currentLoc=(currentLoc+moves)%buffer.length;
		currentLoc++;// so we select the new item.
		buffer.splice(currentLoc,0,i);
		console.log(buffer[1]);
	}
	return buffer;
}

function day17c() {
	var moves=345;
	var valueAfterZero=1;
	var currentLoc=0;
	var arrayLength=1;
	for(var i=1;i<=50000000;i++){
		currentLoc=(currentLoc+moves)%arrayLength;
		if(currentLoc===0){
			valueAfterZero=i;
		}
		currentLoc++;// so we select the new item.
		arrayLength++;
		console.log(valueAfterZero);
	}
}
