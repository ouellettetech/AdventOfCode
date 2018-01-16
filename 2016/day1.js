var EasterBunnyDirections = "L5, R1, R3, L4, R3, R1, L3, L2, R3, L5, L1, L2, R5, L1, R5, R1, L4, R1, R3, L4, L1, R2, R5, R3, R1, R1, L1, R1, L1, L2, L1, R2, L5, L188, L4, R1, R4, L3, R47, R1, L1, R77, R5, L2, R1, L2, R4, L5, L1, R3, R187, L4, L3, L3, R2, L3, L5, L4, L4, R1, R5, L4, L3, L3, L3, L2, L5, R1, L2, R5, L3, L4, R4, L5, R3, R4, L2, L1, L4, R1, L3, R1, R3, L2, R1, R4, R5, L3, R5, R3, L3, R4, L2, L5, L1, L1, R3, R1, L4, R3, R3, L2, R5, R4, R1, R3, L4, R3, R3, L2, L4, L5, R1, L4, L5, R4, L2, L1, L3, L3, L5, R3, L4, L3, R5, R4, R2, L4, R2, R3, L3, R4, L1, L3, R2, R1, R5, L4, L5, L5, R4, L5, L2, L4, R4, R4, R1, L3, L2, L4, R3";

function testData(){
	var test1 = "R2, L3";
	var test2 = "R2, R2, R2";
	var test3 = "R5, L5, R5, R3";
	var direction1 = test1.split(", ");
	var curCord = {x: 0, y: 0, direction: DIRECTION[0]};// direction North;
	console.log("Starting Direction: "+curCord.direction.name);
	for(var i=0;i<direction1.length;i++){
		directionChange(curCord, direction1[i]);
	}
	console.log("Direction: "+curCord.direction.name + ", Distance: " + getDistance(curCord));

	var direction2 = test2.split(", ");
	curCord = {x: 0, y: 0, direction: DIRECTION[0]};// direction North;
	console.log("Starting Direction: "+curCord.direction.name);
	for(var i=0;i<direction2.length;i++){
		directionChange(curCord, direction2[i]);
	}
	console.log("Direction: "+curCord.direction.name + ", Distance: " + getDistance(curCord));


	var direction3 = test3.split(", ");
	curCord = {x: 0, y: 0, direction: DIRECTION[0]};// direction North;
	console.log("Starting Direction: "+curCord.direction.name);
	for(var i=0;i<direction3.length;i++){
		directionChange(curCord, direction3[i]);
	}
	console.log("Direction: "+curCord.direction.name + ", Distance: " + getDistance(curCord));


	var test4 = "R8, R4, R4, R8";
	var direction4 = test4.split(", ");
	curCord = {x: 0, y: 0, direction: DIRECTION[0]};// direction North;
	var visited = new Grid();
	visited.boolean = true;
	var visitedLoc = undefined;
	for(var i=0;i<direction3.length && !visitedLoc;i++){
		visitedLoc = directionChange(curCord, direction4[i], visited);
	}
	console.log("Distance: " + getDistance(visitedLoc));
}

var DIRECTION = [
	{name: "NORTH", xIncrease:  0, yIncrease:  1, index: 0},
	{name: "EAST", xIncrease:  1, yIncrease:  0, index: 1},
	{name: "SOUTH", xIncrease:  0, yIncrease: -1, index: 2},
	{name: "WEST", xIncrease: -1, yIncrease:  0, index: 3}];

function directionChange(curLocation, newOrder, visitedTrail){
	var dirChange = newOrder.slice(0,1);
	var distance = parseInt(newOrder.slice(1));
	// console.log("Distance: " + distance);
	var newDirIndex = ((curLocation.direction.index + (dirChange === "R" ? 1 : 3)) % 4);
	curLocation.direction = DIRECTION[newDirIndex];
	if(!visitedTrail){
		curLocation.x = curLocation.x + (curLocation.direction.xIncrease*distance);
		curLocation.y = curLocation.y + (curLocation.direction.yIncrease*distance);
	} else {
		var oldLocationX = curLocation.x;
		var oldLocationY = curLocation.y;
		curLocation.x = curLocation.x + (curLocation.direction.xIncrease*distance);
		curLocation.y = curLocation.y + (curLocation.direction.yIncrease*distance);
		var changeX = curLocation.x - oldLocationX;
		var changeY = curLocation.y - oldLocationY;
		// console.log("Change X: "+ changeX);
		// console.log("Change Y: "+ changeY);
		for(var i=1;i<Math.abs(changeX);i++){ // only one will be used so doesn't matter order
			var newX = (changeX<0) ? oldLocationX-i : oldLocationX+i;
			if(visitedTrail.get(newX,oldLocationY)){
				// console.log("Re-visited! x:"+ i);
				return {x: newX, y: oldLocationY, direction: curLocation.direction};
			} else {
				// console.log("Setting X:" +  (newX) + " Y:" +  oldLocationY);
				visitedTrail.set(newX,oldLocationY, true);
			}
		}

		for(var j=1;j<Math.abs(changeY);j++){ // only one will be used so doesn't matter order
			var newY = (changeY<0) ? oldLocationY-j : oldLocationY+j;
			if(visitedTrail.get(oldLocationX,newY)){
				// console.log("Re-visited! y:" + j );
				return {x: oldLocationX, y: newY, direction: curLocation.direction};
			} else {
				// console.log("Setting X:" +  (oldLocationX) + " Y:" +  newY);
				visitedTrail.set(oldLocationX,newY, true);
			}
		}
	}
	// console.log(curLocation);
	// console.log("Direction: "+curLocation.direction.name);
	return null;
}

function getDistance(cur){
	return Math.abs(cur.x) + Math.abs(cur.y); 
}

function day1a(inputString) {
	var direction = inputString.split(", ");
	var curCord = {x: 0, y: 0, direction: DIRECTION[0]};// direction North;
	for(var i=0;i<direction.length;i++){
		directionChange(curCord, direction[i]);
	}
	console.log("Direction: "+curCord.direction.name + ", Distance: " + getDistance(curCord));
}

function day1b(inputString) {
	var direction = inputString.split(", ");
	var curCord = {x: 0, y: 0, direction: DIRECTION[0]};// direction North;
	var visited = new Grid();
	visited.boolean = true;
	var visitedLoc = undefined;
	for(var i=0;i<direction.length && !visitedLoc;i++){
		visitedLoc = directionChange(curCord, direction[i], visited);
	}
	console.log("Distance: " + getDistance(visitedLoc));
}

testData();
console.log("Day 1 Part A");
day1a(EasterBunnyDirections);
console.log("Day 1 Part B");
day1b(EasterBunnyDirections);




function Grid(){
	this.grid=[];
	this.debug = false;
	this.boolean = false;
	this.toggleRangeOn = function(x1,y1,x2,y2){
		for(var i=x1;i <= x2 ;i++){
			for(var j=y1;j<=y2;j++) {
				this.set(i,j,true);
			}
		}
	}

	this.toggleOn = function(x,y){
		this.set(x,y,true);
	}

	this.toggleRangeOff = function(x1,y1,x2,y2){
		for(var i=x1;i <= x2 ;i++){
			for(var j=y1;j<=y2;j++) {
				this.set(i,j,false);
			}
		}
	}

	this.toggleOff = function(x,y){
		this.set(x,y,false);
	}

	this.setField = function(x1,y1,x2,y2,amount){
		for(var i=x1;i <= x2 ;i++){
			for(var j=y1;j<=y2;j++) {
				this.set(i,j,amount);
			}
		}
	}

	this.toggle = function(x1,y1,x2,y2){
		for(var i=x1;i <= x2 ;i++){
			for(var j=y1;j<=y2;j++) {
				this.set(i,j,!this.get(i,j));
			}
		}
	}

	this.incrementValues = function(x1,y1,x2,y2,amount){
		for(var i=x1;i <= x2 ;i++){
			for(var j=y1;j<=y2;j++) {
				var temp=this.get(i,j)+amount;
				if(temp<0){
					temp=0;
				}
				this.set(i,j,temp);
			}
		}
	}

	this.onCount = function(){
		var count=0;
		var rowKeys = Object.keys(this.grid);
		var colKeys;
		for(var i=0;i<rowKeys.length;i++){
			colKeys = Object.keys(this.grid[rowKeys[i]]);
			for(var j=0;j<colKeys.length;j++){
				count++;
			}
		}
		return count;
	}

	this.countTrue = function(){
		var count=0;
		var rowKeys = Object.keys(this.grid);
		var colKeys;
		for(var i=0;i<rowKeys.length;i++){
			colKeys = Object.keys(this.grid[rowKeys[i]]);
			for(var j=0;j<colKeys.length;j++){
				if(this.get(rowKeys[i],colKeys[j])){
					count++;
				}
			}
		}
		return count;
	}

	this.countValue = function(){
		var count=0;
		var rowKeys = Object.keys(this.grid);
		var colKeys;
		for(var i=0;i<rowKeys.length;i++){
			colKeys = Object.keys(this.grid[rowKeys[i]]);
			for(var j=0;j<colKeys.length;j++){
				count+=this.get(rowKeys[i],colKeys[j]);
			}
		}
		return count;
	}

	this.getHeight = function(){
		return this.grid.length;
	}

 	this.setFromStringa = function(inputStringArray){
		this.boolean = true;
		 this.grid=[];

		 for(var i=0;i<inputStringArray.length;i++){
			 var curRow=inputStringArray[i].split("");
			 for(var j=0;j<curRow.length;j++){
				 if(curRow[j]==="#"){
					this.set(i,j,true);
				 } else {
					this.set(i,j,false);
				 }
			 }
		 }
	};

	this.setFromStringb = function(inputStringArray){
		this.grid=[];

		for(var i=0;i<inputStringArray.length;i++){
			var curRow=inputStringArray[i].split("");
			for(var j=0;j<curRow.length;j++){
				if(this.debug){
					console.log("Setting: "+curRow[j]);
				}
				this.set(i,j,curRow[j]);
			}
		}
	};

	this.toStringBool = function(){
		var curRow;
		var fullString="";
		for(var i=0;i<this.grid.length;i++){
			if(this.grid[i]){
				curRow="";
				for(var j=0;j<this.grid[i].length;j++){
					if(this.get(i,j)){
						curRow+="#";
					} else {
						curRow+=".";
					}
				}
				fullString+=curRow+"\n";
			}
		}
		return fullString;
	}
	
	///forEach(value: any, coordinates: {x: Number, y: Number}, grid: Grid)
	this.forEach = function(callback){
		for(var i=0;i<this.grid.length;i++){
			if(this.grid[i]){
				for(var j=0;j<this.grid[i].length;j++){
					callback( this.get(i,j), {x:i,y:j}, this);
				}
			}
		}
	}
	 
	this.toStringValue = function(){
		var curRow;
		for(var i=0;i<this.grid.length;i++){
			if(this.grid[i]){
				curRow="";
				for(var j=0;j<this.grid[i].length;j++){
					curRow+=this.get(i,j);
				}
				if(this.debug){
					console.log(curRow);
				}
			}
		}
	}
	this.get = function(x,y){
		if(!this.grid[x]){ //first row doesn't exist.
			if(this.boolean){
				return false;
			}
			return 0; 
		}
		return this.grid[x][y];
	}
	this.set = function(x,y,value){
		this.grid[x]=this.grid[x]||[];
		this.grid[x][y]=value;
	}

	this.flip = function(){
		var newGrid=new Grid();
		for(var i=0;i<this.grid.length;i++){
			if(this.debug){
				console.log("Flipping row"+i);
			}
			newGrid.grid[i]=this.grid[i].slice(0).reverse();
		}
		return newGrid;
	}
	this.mirror = function(){
		var temp=new Grid();
		for(var i=0;i<this.grid.length;i++){
			for(var j=0;j<this.grid[i].length;j++){
				temp.set(j,i,this.get(i,j));
			}
		}
		return temp;
	}
	this.rotate = function(){
		var temp=this.mirror();
		return temp.flip();
	}

	this.neighborsOn = function(x,y){
		var count = 0;
		for(var i=x-1;i<=x+1;i++){
			for(var j=y-1;j<=y+1;j++){
				var cur = this.get(i,j);
				if(cur){
					count++;
				}
			}
		}
		if(this.get(x,y)){ // Could also implement this as an if statement inside
			// the four loop, but this is probably slightly faster.
			count--;
		}
		return count;
	}
	this.isEqual = function(otherSide){
		if(otherSide.getHeight()!==this.getHeight()){
			return false;
		}
		for(var i=0;i<otherSide.getHeight();i++){
			if(otherSide.getHeight()!==this.getHeight()){
				return false;
			}
			for(var j=0;j<otherSide.grid[i].length;j++){
				if(this.get(i,j)!==otherSide.get(i,j)){
					return false;
				}
			}
		}
		return true;
	}
}