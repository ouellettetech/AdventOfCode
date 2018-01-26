var specialNumber = 1364;

function isWall(x,y, specialNum){
	var result=x*x + 3*x + 2*x*y + y + y*y;
	result+=specialNum;
	var binary = result.toString(2);
	binary = binary.split("");
	var wall = false;
	binary.forEach(function(val){
		if(val==="1"){
			wall = !wall;
		}
	});
	return wall;
}

function foundDestination(posList,target){
	var found = false;
	for(var i=0;i<posList.length && !found; i++){
		if(posList[i].x === target.x && posList[i].y === target.y) {
			found = true;
		}
	}
	return found;
}
function getStepsBetween(curGrid,curPos,targetPos, secret){
	var currentStep = 0;
	lastList = [curPos];
	while( !foundDestination(lastList,targetPos) && (lastList.length !== 0)){
		var newPos = [];
		lastList.forEach(function(val){
			curGrid.set(val.x,val.y,true);
			newPos=newPos.concat(getPossibleMoves(curGrid,val, secret));
		});
		lastList = newPos;
		//console.log(lastList);
		currentStep++;
		console.log("Running: " + currentStep);
	}
	console.log("Queue: "+lastList.length);
	return currentStep;
}

function getLocations(curGrid,curPos,numSteps, secret){
	var previousLocs = [curPos];
	var lastList = [curPos];
	for(var i=1;i<=numSteps;i++){
		var newPos = [];
		lastList.forEach(function(val){
			curGrid.set(val.x,val.y,true);
			newPos=newPos.concat(getPossibleMoves(curGrid,val, secret));
		});
		lastList = newPos;
		previousLocs = previousLocs.concat(newPos);
	}
	return previousLocs;
}

function getPossibleMoves(curGrid,curPos, secret){
	var newPositions = [];
	var checkValues = [
		{x:curPos.x-1,y:curPos.y},
		{x:curPos.x,y:curPos.y-1},
		{x:curPos.x+1,y:curPos.y},
		{x:curPos.x,y:curPos.y+1}];
	checkValues.forEach(function(val){
		if(val.x>=0 && val.y>=0){ // ignore if less than 
			if(curGrid.isEmpty(val.x,val.y)){
				curGrid.set(val.x,val.y,isWall(val.x,val.y,secret));
			}
			if(!curGrid.get(val.x,val.y)){
				newPositions.push(val);
			}
		}
	});
	return newPositions;
}

function testData(){
	var room = new Grid();
	room.boolean = true;
	for(var x=0;x<10;x++){
		for(var y=0;y<7;y++){
			room.set(y,x,isWall(x,y,10));
		}
	}
	console.log(room.toStringBool());

	console.log("checking is empty function");
	console.log(room.isEmpty(0,0));
	console.log(room.isEmpty(1,4));
	console.log(room.isEmpty(12,0));
	console.log(room.isEmpty(0,12));

	console.log(getPossibleMoves(room,{x:1,y:1}));
	console.log("Get Steps");
	console.log(getStepsBetween(room,{x:1,y:1},{x:4,y:7},10));

	

	room = new Grid();
	room.boolean = true;
	var possibleLocs = getLocations(room,{x:1,y:1},10,10);
	possibleLocs.sort(sortFunc);
	possibleLocs = possibleLocs.filter(function(val,index,array){
		if(index===0){
			return true;
		}
		if((val.x === array[index-1].x) && (val.y === array[index-1].y)){
			return false;
		}
		return true;
	})
	console.log(possibleLocs);

}

function day13a(input){
	var room = new Grid();
	room.boolean = true;
	console.log(getStepsBetween(room,{x:1,y:1},{x:31,y:39},1364));
}

var sortFunc = function(a,b){
	if(a.x<b.x){
		return -1;
	}
	if(a.x>b.x){
		return 1;
	}
	if(a.y<b.y){
		return -1;
	}
	if(a.y>b.y){
		return 1;
	}
	return 0;
}
function day13b(input){
	var room = new Grid();
	room.boolean = true;
	var possibleLocs = getLocations(room,{x:1,y:1},50,1364);
	possibleLocs.sort(sortFunc);
	possibleLocs = possibleLocs.filter(function(val,index,array){
		if(index===0){
			return true;
		}
		if((val.x === array[index-1].x) && (val.y === array[index-1].y)){
			return false;
		}
		return true;
	})
	console.log(possibleLocs.length);

}


testData();
console.log("Day 13 Part A");
day13a(specialNumber);
console.log("Day 13 Part B");
day13b(specialNumber);




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

	this.rotateRow = function(rowNumber,times){
		var curRow = this.grid[rowNumber];
		var begining = curRow.slice(curRow.length - times);
		var ending = curRow.slice(0, curRow.length - times);
		this.grid[rowNumber] = begining.concat(ending);
	}

	this.rotateCol = function(colNumber,times){
		var curCol = [];
		for(var i=0;i<this.grid.length;i++){
			curCol[i] = this.get(i,colNumber);
		}
		var begining = curCol.slice(curCol.length - times);
		var ending = curCol.slice(0, curCol.length - times);
		curCol = begining.concat(ending);
		for(var i=0;i<this.grid.length;i++){
			this.set(i,colNumber, curCol[i]);
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

	this.isEmpty = function(x,y){
		if(!this.grid[x]){ //first row doesn't exist. 
			return true;
		}
		return (Object.keys(this.grid[x]).indexOf(""+y)===-1);
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