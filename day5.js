function day5a(stack) {
	var memoryStack = stack.split("\n");
	for(var i=0; i< memoryStack.length; i++){
		memoryStack[i] = parseInt(memoryStack[i]);
	}
	var executions = 0;
	var currentSpace = 0;
	while(currentSpace>=0 && currentSpace < memoryStack.length) {
		memoryStack[currentSpace] = memoryStack[currentSpace] + 1;
		currentSpace = currentSpace + memoryStack[currentSpace] - 1;
		executions = executions + 1;
	}
	return executions;
}

function day5b(stack) {
	var memoryStack = stack.split("\n");
	for(var i=0; i< memoryStack.length; i++){
		memoryStack[i] = parseInt(memoryStack[i]);
	}
	var executions = 0;
	var currentSpace = 0;
	while(currentSpace>=0 && currentSpace < memoryStack.length) {
		var offset = memoryStack[currentSpace];
		console.log("Current Space: " + currentSpace + "Offset :"+offset);		
		var lastSpace = currentSpace;
		currentSpace = currentSpace + memoryStack[currentSpace];
		if(offset>=3){
			offset=offset-1;
		} else {
			offset=offset+1;
		}
		memoryStack[lastSpace] = offset;
		executions = executions + 1;
	}
	return executions;
}
