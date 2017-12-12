function testData() {
	var testString="0 <-> 2\n1 <-> 1\n2 <-> 0, 3, 4\n3 <-> 2, 4\n4 <-> 2, 3, 6\n5 <-> 6\n6 <-> 4, 5";
	var linksArray = constructArray(testString);
	console.log(linksArray);
	var links = findLinks(0,linksArray);
	console.log("Number of Elements :"+links.length);
	return links;
}

function constructArray(testString){ // with Javascript its easier to parse it all into a datastructure 
	//and then analyze it, if I were worried about performace I'd parse it when analyzing it.
	var lines = testString.split("\n");
	linkArray=[];
	for(var i=0;i<lines.length; i++){
		var cur = lines[i].split(" ");
		var spot = cur[0]; //cur[i] should be equal to i, but just in case.
		linkArray[spot]=cur.slice(2).map(x => x.replace(",","")).map(x => parseInt(x));
	}
	return linkArray;
}

function day12a(testString){
	var linksArray = constructArray(testString);
	console.log(linksArray);
	var links = findLinks(0,linksArray);
	console.log("Number of Elements :"+links.length);
	return links;
}

function day12b(testString){
	var numberOfGgroups=0;
	var linksArray = constructArray(testString);
	console.log(linksArray);
	for(var i=0;i<linksArray.length;i++){
		if(linksArray[i]) {// If we haven't already added to a group
			numberOfGgroups++;
			var links = findLinks(i,linksArray);
			console.log("Number of Elements :"+links.length);
		}
	}
	console.log("Number of Groups: "+numberOfGgroups);
}


function findLinks(curElement, linksArray,elementLinks) { // This will destroy the original Array
	var elemLinks=elementLinks || [];
	console.log("Looking at Element :"+curElement);
	var curElements = linksArray[curElement];
	console.log(curElements);
	if(curElements){
		linksArray[curElement]=null; // Make sure we don't get into a loop.
		for(var i=0;i<curElements.length;i++){
			if(!elemLinks.includes(curElements[i])){
				console.log("adding ")
				elemLinks.push(curElements[i]); // add current Link				
			}
			elemLinks = findLinks(curElements[i], linksArray, elemLinks); // Add all current Links Children
		}
	}
	return elemLinks;
}
