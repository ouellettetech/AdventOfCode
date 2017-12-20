
function testData() {
	var dancePositions=["a","b","c","d","e"];
	var danceRoutince="s1,x3/4,pe/b";
	var danceArray=danceRoutince.split(",");
	for(var i=0;i<danceArray.length;i++){
		dancePositions=runOneDanceMove(dancePositions,danceArray[i]);
		console.log(dancePositions);
	}
	console.log(dancePositions);
}

function runOneDanceMove(dancePositions,currentMove){
	var type=currentMove.slice(0,1);
	switch(type){
		case "s":
			var numberOfSpaces=parseInt(currentMove.slice(1),10);
			var end = dancePositions.slice(dancePositions.length-numberOfSpaces);
			var begining = dancePositions.slice(0,dancePositions.length-numberOfSpaces);
			dancePositions=end.concat(begining);
			break;
		case "x":
			var bothParms=currentMove.slice(1).split("/");
			var firstSpace=parseInt(bothParms[0],10);
			var secondSpace=parseInt(bothParms[1],10);
			swapPos(dancePositions,firstSpace,secondSpace);
			break;
		case "p":
			var bothParms=currentMove.slice(1).split("/");
			var firstSpace=bothParms[0];
			var secondSpace=bothParms[1];
			findAndSwap(dancePositions,firstSpace,secondSpace);
			break;
	}
	return dancePositions;
}

function swapPos(dancePositions,pos1,pos2){
	var temp=dancePositions[pos1];
	dancePositions[pos1]=dancePositions[pos2];
	dancePositions[pos2]=temp;
}

function findAndSwap(dancePositions,item1,item2){
	var firstIndex=dancePositions.indexOf(item1);
	var secondIndex=dancePositions.indexOf(item2);
	swapPos(dancePositions,firstIndex,secondIndex);
}


function day16a(input){
	var dancePositions=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p"];
	var danceArray=input.split(",");
	for(var i=0;i<danceArray.length;i++){
		dancePositions=runOneDanceMove(dancePositions,danceArray[i]);
		console.log(dancePositions);
	}
	console.log(dancePositions);
	return dancePositions;
}

function day16c(input,runtimes){
	var dancePositions=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p"];
	var danceArray=input.split(",");
	for(var j=0;j<runtimes;j++){
		for(var i=0;i<danceArray.length;i++){
			dancePositions=runOneDanceMove(dancePositions,danceArray[i]);
		}
	}
	console.log(dancePositions);
	return dancePositions;
}


function day16b(input){
	var origdancePositions=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p"];
	var dancePositions=origdancePositions;
	var danceArray=input.split(",");
	
	var result=findCycleLength(dancePositions,danceArray);
	console.log(result);
	console.log(dancePositions);
	var result=findCycleLength(dancePositions,danceArray);
	console.log(dancePositions);
	console.log(result);
	var position=1000000000-result.Start; // Didn't know if the cycle would repeat to origin, or in the middle.
	position=position%result.length;
	position=position+result.Start;
	console.log(position);
	var dancePositions=origdancePositions;
	return day16c(input,position);
}


function findCycleLength(dancePositions,danceArray){
	var curCount=0;
	var hashTree={};
	var joinedDance=dancePositions.join("");
	while(Object.keys(hashTree).indexOf(joinedDance)===-1){
		curCount++;
		hashTree[joinedDance]=curCount;
		for(var i=0;i<danceArray.length;i++){
			dancePositions=runOneDanceMove(dancePositions,danceArray[i]);
		}
		var joinedDance=dancePositions.join("");
	}
	console.log(joinedDance);
	return {Start:hashTree[joinedDance],length:curCount};
}
