function testData() {
	var pathString="     |          \n     |  +--+    \n     A  |  C    \n F---|----E|--+ \n     |  |  |  D \n     +B-+  +--+ ";
	var pathArray=createPathGrid(pathString);
	console.log(pathArray);
	var startColumn=findStartOfGrid(pathArray);
	console.log(startColumn);
	var x=startColumn;
	var y=0;
	return followGrid(x,y,DIRECTION.DOWN,pathArray);
}

function createPathGrid(inputString){
	var gridLines=inputString.split("\n");
	for(var i=0;i<gridLines;i++){
		gridLines[i]=gridLines[i].split("");
	}
	return gridLines;
}

function findStartOfGrid(inputGrid){
	console.log(inputGrid[0]);
	return inputGrid[0].indexOf("|");
}

var DIRECTION = {
	UP : {value: 0, name: "Up", xChange: 0, yChange: -1}, // Down is positive since the top row starts at 0
	DOWN: {value: 1, name: "Down", xChange: 0, yChange: 1},  //  and increments going down.
	LEFT : {value: 2, name: "Left", xChange: -1, yChange: 0},
	RIGHT : {value: 3, name: "Right", xChange: 1, yChange: 0}
};

function followGrid(inputx,inputy,startingDirection,pathArray){
	var x=inputx;
	var y=inputy;
	var direction=startingDirection;
	var exited=false;
	var Nodes="";
	var steps=0;
	while(!exited){
		x+=direction.xChange;
		y+=direction.yChange;
		var newSpace=getElement(x,y,pathArray);
		switch(newSpace){
			case " ": // End Search;
				exited=true;
				break;
			case "+": // Change Direction
				console.log("Direction Change!");
				direction=getNewDirection(x,y,direction,pathArray);
				console.log("New Direction: "+direction.name);
				break;
			case "|":
			case "-":// Ignore and keep moving
				break;
			default:
				Nodes+=newSpace;
				break;
		}
		console.log("Current Position X: "+x+" Y: "+y);
		steps++;
	}
	return {nodes: Nodes,steps: steps};
}

function getNewDirection(x,y,direction,pathArray){
	switch(direction){
		case DIRECTION.DOWN: // If we are going up or down the next will be left or right.
		case DIRECTION.UP:
			var leftElement=getElement(x-1,y,pathArray);
			var rightElement=getElement(x+1,y,pathArray);
			if(leftElement===" "){
				return DIRECTION.RIGHT;
			}
			if(rightElement===" "){
				return DIRECTION.LEFT;
			} 
			// If we get here, there is something to both sides.
			if(leftElement==="-"){
				return DIRECTION.LEFT;
			}
			if(rightElement==="-"){
				return DIRECTION.RIGHT;
			}
			console.log("Error Can't tell which direction to go!!!!");
			return DIRECTION.LEFT //We Don't know, this is just a guess.
			break;
		case DIRECTION.LEFT:// If we are going up or down the next will be left or right.
		case DIRECTION.RIGHT:
			var upElement=getElement(x,y-1,pathArray);
			var downElement=getElement(x,y+1,pathArray);
			if(upElement===" "){
				return DIRECTION.DOWN;
			}
			if(downElement===" "){
				return DIRECTION.UP;
			} 
			// If we get here, there is something to both sides.
			if(upElement==="|"){
				return DIRECTION.UP;
			}
			if(downElement==="|"){
				return DIRECTION.DOWN;
			}
			console.log("Error Can't tell which direction to go!!!!");
			return DIRECTION.DOWN; //We Don't know, this is just a guess.
			break;
	}
}

function getElement(x,y,pathArray){
	if(x<0||y<0|| y>=pathArray.length || x>=pathArray[y].length){
		return " ";
	}
	else {
		return pathArray[y][x];
	}
}

function day19a(inputString) {
	var pathArray=createPathGrid(inputString);
	console.log(pathArray);
	var startColumn=findStartOfGrid(pathArray);
	console.log(startColumn);
	var x=startColumn;
	var y=0;
	return followGrid(x,y,DIRECTION.DOWN,pathArray);
}