function testData() {
	var stepString="ne,ne,ne";
	console.log(findDistance(findLocation(stepString)));
	var stepString="ne,ne,sw,sw";
	console.log(findDistance(findLocation(stepString)));
	var stepString="ne,ne,s,s";
	console.log(findDistance(findLocation(stepString)));
	var stepString="se,sw,se,sw,sw";
	console.log(findDistance(findLocation(stepString)));
}

function day11a(inputString){
	console.log(findDistance(findLocation(inputString)));
}

function findDistance(input) {
	var x=Math.abs(input.x); //we don't care what direction for distance
	var y=Math.abs(input.y);
	if(x*.5>y){ //we have to go up and down to get to the x coordinate. and the y coordinate is irrelevant
		return x;
	}
	// Start with X since y is a simple change;
	var steps=x;
	y=y-(.5*x); // remove the half steps for the diagonals, and then should be just up and down.
	steps = steps + y;
	return steps;
}

function findLocation(inputString){
	var location = {};
	location.x=0;
	location.y=0;
	var Distance=0;
	var stepList=inputString.split(",");
	for(var i=0;i<stepList.length;i++){
		var curDist=findDistance(location);
		if(curDist>Distance){
			Distance=curDist;
		}
		switch(stepList[i]){
			case "n":
				location.y++;
				break;
			case "s":
				location.y--;
				break;
			case "ne":
				location.y=location.y+.5;
				location.x++;
				break;
			case "se":
				location.y=location.y-.5;
				location.x++;
				break;
			case "nw":
				location.y=location.y+.5;
				location.x--;
				break;
			case "sw":
				location.y=location.y-.5;
				location.x--;
				break;
			default:
				Console.log("Error unknown value: "+stepList[i]);
		}
	}
	console.log("Furthest Distance: "+Distance);
	return location;

}