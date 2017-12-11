function testData() {
	var testingData = "0	2	7	0";
	day6b(testingData);
}

function day6a(originalLists) {
	var curColunms = originalLists.split("\t");
	for(var i=0; i< curColunms.length; i++){
		curColunms[i] = parseInt(curColunms[i]);
	}
	console.log("Column Data"+curColunms);
	var executionCount=0;
	var previousSeenTree = {};
	while(!CheckIfStateSeen(previousSeenTree, curColunms)){
	 	addToPreviousSeenTree(previousSeenTree, curColunms);
	 	moveChips(curColunms);
	 	executionCount = executionCount + 1;
	}
	console.log("Executions: " + executionCount);
	return executionCount;
}

function moveChips(curColunms){
	var largest=findLargestColumn(curColunms);
	var numToMove = curColunms[largest];
	curColunms[largest] = 0;
	for(var i=0;i<numToMove; i++){
		var incrColumn = (i + largest +1) %curColunms.length;
		curColunms[incrColumn] = curColunms[incrColumn] + 1;
	}
}

function findLargestColumn(curColunms) {
	var max = 0;
	for(var i=1; i< curColunms.length; i++){
		if(curColunms[i] > curColunms[max]){
			max = i;
		}
	}
	return max;
}

function CheckIfStateSeen(previousTree, currentState) {
	console.log("Checking if " + currentState + "Is in " + previousTree);
	if(currentState.length>0){
		if (currentState[0] in previousTree){
			return CheckIfStateSeen(previousTree[currentState[0]], currentState.slice(1,currentState.length));
		}
		return false;
	}
	return true;
}

function addToPreviousSeenTree(previousTree, currentState) {
	if(currentState.length>0){
		if (!(currentState[0] in previousTree)) {
			var newTree = {};
			previousTree[currentState[0]]= newTree;
		}
		addToPreviousSeenTree(previousTree[currentState[0]], currentState.slice(1,currentState.length));
	}
}

function day6b(originalLists) {
	var curColunms = originalLists.split("\t");
	for(var i=0; i< curColunms.length; i++){
		curColunms[i] = parseInt(curColunms[i]);
	}
	console.log("Column Data"+curColunms);
	var executionCount=0;
	var previousSeenTree = {};
	while(!CheckIfStateSeen(previousSeenTree, curColunms)){
	 	addToPreviousSeenTree(previousSeenTree, curColunms);
	 	moveChips(curColunms);
	 	executionCount = executionCount + 1;
	}
	console.log("First Set Executions: " + executionCount);

	executionCount=0;
	previousSeenTree = {};
	while(!CheckIfStateSeen(previousSeenTree, curColunms)){
	 	addToPreviousSeenTree(previousSeenTree, curColunms);
	 	moveChips(curColunms);
	 	executionCount = executionCount + 1;
	}

	console.log("Second Set Executions: " + executionCount);
	return executionCount;
}