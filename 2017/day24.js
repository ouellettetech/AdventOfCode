var inputInstruction = "24/14\n30/24\n29/44\n47/37\n6/14\n20/37\n14/45\n5/5\n26/44\n2/31\n19/40\n47/11\n0/45\n36/31\n3/32\n30/35\n32/41\n39/30\n46/50\n33/33\n0/39\n44/30\n49/4\n41/50\n50/36\n5/31\n49/41\n20/24\n38/23\n4/30\n40/44\n44/5\n0/43\n38/20\n20/16\n34/38\n5/37\n40/24\n22/17\n17/3\n9/11\n41/35\n42/7\n22/48\n47/45\n6/28\n23/40\n15/15\n29/12\n45/11\n21/31\n27/8\n18/44\n2/17\n46/17\n29/29\n45/50";

function testData(){
	var testString="0/2\n2/2\n2/3\n3/4\n3/5\n0/1\n10/1\n9/10"
	var collection = constructPipeArray(testString);
	return findGreatestStrength(0,collection);
}

function testData2(){
	var testString="0/2\n2/2\n2/3\n3/4\n3/5\n0/1\n10/1\n9/10"
	var collection = constructPipeArray(testString);
	return findLongest(0,collection);	
}

function constructPipeArray(inputString){
	var inputPipes = inputString.split("\n");
	console.log(inputPipes);
	var currentPipe;
	var collection = new PipeCollection();
	for(var i=0;i<inputPipes.length;i++){
		currentPipe = inputPipes[i].split("/");
		collection.addPipe(parseInt(currentPipe[0],10),parseInt(currentPipe[1],10));
	}
	return collection;
}

function findGreatestStrength(lastConnection, collection){
	var currentMax = 0;
	var pipeOptions = collection.getPipes(lastConnection);
	var curPipeArray=[];
	//console.log(pipeOptions);
	for(var i=0;i<pipeOptions.length;i++){
		var curPipe=pipeOptions[i];
		//console.log("Checking End: "+lastConnection + " Pipe "+ curPipe.sideA +"/"+ curPipe.sideB);
		var curCollection = collection.removePipe(curPipe);
		var subArray=[];
		var subStrength=0;

		if(curPipe.sideA==lastConnection){
			subArray=findGreatestStrength(curPipe.sideB, curCollection);
		} else {
			subArray=findGreatestStrength(curPipe.sideA, curCollection);
		}

		var newStrength = subArray.strength+curPipe.strength;
		if(newStrength > currentMax){
			currentMax=newStrength;
			curPipeArray = []; // clear previous loop.
			curPipeArray.push(curPipe);
			curPipeArray=curPipeArray.concat(subArray.pipes);
		}
	}
	return {pipes: curPipeArray, strength: currentMax};

}

function findLongest(lastConnection, collection){
	var currentLength = 0;
	var curStrength = 0;
	var pipeOptions = collection.getPipes(lastConnection);
	var curPipeArray=[];
	//console.log(pipeOptions);
	for(var i=0;i<pipeOptions.length;i++){
		var curPipe=pipeOptions[i];
		//console.log("Checking End: "+lastConnection + " Pipe "+ curPipe.sideA +"/"+ curPipe.sideB);
		var curCollection = collection.removePipe(curPipe);
		var subArray=[];
		var subStrength=0;

		if(curPipe.sideA==lastConnection){
			subArray=findLongest(curPipe.sideB, curCollection);
		} else {
			subArray=findLongest(curPipe.sideA, curCollection);
		}

		var newStrength = subArray.strength+curPipe.strength;
		var newLength = subArray.pipes.length + 1;
		if((newLength > currentLength) || 
			((newLength === currentLength) && (newStrength > curStrength))) {
			
			currentLength = newLength;
			curStrength = newStrength;

			curPipeArray = []; // clear previous loop.
			curPipeArray.push(curPipe);
			curPipeArray=curPipeArray.concat(subArray.pipes);
		}
	}
	return {pipes: curPipeArray, strength: curStrength};

}

function day24a(input){
	var collection = constructPipeArray(input);
	console.log(findGreatestStrength(0,collection));
}

function day24b(input){
	var collection = constructPipeArray(input);
	console.log(findLongest(0,collection));
}

function Pipe(origSideA, origSideB){
	this.sideA = origSideA;
	this.sideB = origSideB;
	this.strength = this.sideA + this.sideB;
	this.toString = function() {
		return ""+this.sideA+"/"+this.sideB;
	}
}
function pipeArrayToString(pipeArray){
	var retString="";
	for(var i=0;i<pipeArray.length;i++){
		retString+=pipeArray[i].toString() + " -> ";
	}
	return retString;
}

function PipeCollection(copyPipes){
	this.pipes=copyPipes || [];

	this.toString = function(){
		var retString="";
		for(var i=0;i<pipes.length;i++){
			retString+="\n"+i+": ";
			for(var j=0;j<pipes[i].length;j++){
				retString+=pipes[i][j].toString+" ";
			}
		}
		return retString;
	}

	this.removePipe = function(pipeToRemove){
		
		var newPipes = this.pipes.slice(0);
		var first = newPipes[pipeToRemove.sideA].slice(0);
		var firstIndex=first.indexOf(pipeToRemove);
		if (firstIndex > -1) {
			first.splice(firstIndex, 1);
		} else {
			console.log("Error no pipe found");
		}
		newPipes[pipeToRemove.sideA] = first;

		var second = newPipes[pipeToRemove.sideB].slice(0);
		var secondIndex=second.indexOf(pipeToRemove);
		if (secondIndex > -1) {
			second.splice(secondIndex, 1);
		} else {
			console.log("Error no pipe found");
		}
		newPipes[pipeToRemove.sideB] = second;
		return new PipeCollection(newPipes);
	}

	this.getPipes = function(connection){
		return (this.pipes[connection] || []).slice(0);
	}

	this.addPipe = function(origSideA,origSideB){
		var newPipe = new Pipe(origSideA,origSideB);
		this.pipes[origSideA] = this.pipes[origSideA] || [];
		this.pipes[origSideB] = this.pipes[origSideB] || [];
		this.pipes[origSideA].push(newPipe);
		this.pipes[origSideB].push(newPipe);
	}
}

//day24a(inputInstruction);
day24b(inputInstruction);