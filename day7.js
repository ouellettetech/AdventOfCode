function testData() {
	var testingData = "pbga (66)\nxhth (57)\nebii (61)\nhavc (66)\nktlj (57)\nfwft (72) -> ktlj, cntj, xhth\nqoyq (66)\npadx (45) -> pbga, havc, qoyq\ntknk (41) -> ugml, padx, fwft\njptl (61)\nugml (68) -> gyxo, ebii, jptl\ngyxo (61)\ncntj (57)";
	var unusedList = createUnusedList(testingData);
	console.log(unusedList);
	var tree=createTree(unusedList);
	calculateTotalWeight(tree);
	return tree;
}

function day7a(input) {
	var unusedList = createUnusedList(input);
	console.log(unusedList);
	var tree=createTree(unusedList);
	console.log(tree);
	return tree;
}

function day7b(input) {
	var unusedList = createUnusedList(input);
	console.log(unusedList);
	var tree=createTree(unusedList);
	calculateTotalWeight(tree);
	return tree;
}

function createUnusedList(inputString) {
	var unUsedList = {};
	var lines = inputString.split("\n");
	var name=undefined;
	var weight;
	var children;
	for(var i=0;i<lines.length; i++){
		name = undefined;
		weight = undefined;
		children = undefined;
		var curLine = lines[i];
		var sections=curLine.split(" ");
		name = sections[0];
		weight = sections[1].replace("(","").replace(")","");
		if(sections.length>2){
			children = [];
			for(var j=3; j < sections.length; j++ ) {// Ignore the ->
				children.push(sections[j].replace(",",""));
			}
		}
		unUsedList[name] = treeElement(name, weight, children);
	}
	return unUsedList;
}

function treeElement(name, weight, childrenList){
	var newNode = {};
	newNode.name=name;
	newNode.nodeWeight = parseInt(weight);
	newNode.childrenList = childrenList;
	return newNode;
}

function createTree(unusedList){
	var keys = Object.keys(unusedList);
	for(var i = 0; i < keys.length ; i ++  ) {
		if(keys[i] in unusedList) { // since I'm going to remove elements as I go through...
			var current = unusedList[keys[i]];
			current.children = [];
			if( current.childrenList) { // If the node has no children ignore.
				unusedList=moveChildren(current,unusedList);
			}
		}
	}
	console.log(unusedList);
	if(Object.keys(unusedList).length != 1){
		console.log("Failed to Create 1 Tree!!!");
		return null;
	}
	else {
		return unusedList[Object.keys(unusedList)[0]];
	}
}

function moveChildren(current,unusedList){
	console.log("current Move" + current.name);
	current.children = current.children || [];
	for(var j=0;j<current.childrenList.length;j++){
		var currentChildName = current.childrenList[j];
		console.log("Moving: "+currentChildName);
		var currentChild = unusedList[currentChildName];
		current.children.push(currentChild);
		delete unusedList[currentChildName];
		if(currentChild.childrenList){ //current Child has Children
			moveChildren(currentChild,unusedList);
		}
	}
	current.childrenList = [];
	return unusedList;
}

function calculateTotalWeight(tree){
	tree.totalWeight=tree.nodeWeight;	// Start With nodes Weight
	if(tree.children){
		for (var i=0;i<tree.children.length;i++){
			tree.totalWeight=tree.totalWeight + calculateTotalWeight(tree.children[i]);
		}
	} 
	return tree.totalWeight;
}