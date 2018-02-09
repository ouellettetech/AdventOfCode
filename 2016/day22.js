var File = require("fs");

String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.split(search).join(replacement);
};

String.prototype.removeDups = function(search) {
	var target = this;
	while(target.indexOf(search+search)!==-1){
		target=target.split(search+search).join(search);
	}
	return target;
};

function readFile(fileName){
	var inputContent = File.readFileSync(fileName, "utf-8").trim();
	var inputArray = inputContent.split("\n");
	return parseDFResults(inputArray);
}

function parseDFResults(inputArray){
	inputArray.shift();
	inputArray.shift();
	inputArray = inputArray.map(parseLine);
	console.log(inputArray);
	return inputArray;
}

function Drive(driveString){
	//Filesystem              Size  Used  Avail  Use%
//    /dev/grid/node-x0-y0     93T   71T    22T   76%
	var tempArray = driveString.removeDups(" ").split(" ");
	var dims = tempArray[0].split("-x")[1];
	dims = dims.split("-y");
	this.x = parseInt(dims[0]);
	this.y = parseInt(dims[1]);
	this.size = parseInt(tempArray[1].replace("T",""));
	this.used = parseInt(tempArray[2].replace("T",""));
	this.avail = parseInt(tempArray[3].replace("T",""));
	this.usage = parseInt(tempArray[4].replace("%",""));
}


function sortUsed(a,b){
	if(a.used<b.used){
		return -1;
	}
	if(a.used>b.used){
		return 1;
	}
	return 0;
}

function largestFree(a,b){
	if(a.avail>b.avail){
		return -1;
	}
	if(a.avail<b.avail){
		return 1;
	}
	return 0;
}


function parseLine(value){
	return new Drive(value);
}

function testData(){
	var testDF = ["Filesystem            Size  Used  Avail  Use%",
		"sdfadsf",
		"/dev/grid/node-x0-y0   10T    8T     2T   80%",
		"/dev/grid/node-x0-y1   11T    6T     5T   54%",
		"/dev/grid/node-x0-y2   32T   28T     4T   87%",
		"/dev/grid/node-x1-y0    9T    7T     2T   77%",
		"/dev/grid/node-x1-y1    8T    0T     8T    0%",
		"/dev/grid/node-x1-y2   11T    7T     4T   63%",
		"/dev/grid/node-x2-y0   10T    6T     4T   60%",
		"/dev/grid/node-x2-y1    9T    8T     1T   88%",
		"/dev/grid/node-x2-y2    9T    6T     3T   66%"];
	var dfList = parseDFResults(testDF);
	console.log(dfList);
	dfList.sort(largestFree);
	console.log("Max Available: "+dfList[0].avail);
	var myGrid = new Grid();
	var maxAvail = dfList[0].avail;
	dfList.forEach(function(value){
		curVal = ".";
		if(value.used>maxAvail){
			curVal = "#";
		}
		if(value.used === 0){
			curVal = "-";
		}
		myGrid.set(value.x,value.y,curVal);
	});
	console.log(myGrid.toStringValue());
}

//function getShortestPath(curRoom,start,end){
//
//}

function day22a(diskStatus) {
	//console.log(diskStatus);
	var count = 0;
	var bySize=diskStatus.sort(sortUsed);
	var byFree=diskStatus.sort(largestFree);

	for(var i=0;i<diskStatus.length;i++){
		for(var j=i+1;j<diskStatus.length;j++){
			if(diskStatus[i].used !== 0 && (diskStatus[i].used<=diskStatus[j].avail)){
				//console.log("Used: "+diskStatus[i].used);
				//console.log("Available: "+diskStatus[j].avail);
				count++;
			} else {
				if(diskStatus[j].used<=diskStatus[i].avail){
					count++;
				}
			}
		}
	}
	console.log(count);
}

// The Problem says to look at the layout, and it has a wall,
// so I'm just going to program to go around the wall...
function day22b(dfList) {
	dfList.sort(largestFree);
	console.log("Max Available: "+dfList[0].avail);
	var myGrid = new Grid();
	var maxAvail = dfList[0].avail;
	var emptyGrid = {x: 0, y:0};
	var startOfWall = {x: 100, y:100};
	dfList.forEach(function(value){
		curVal = (value.x)%10;
		if(value.used>maxAvail){
			curVal = "#";
			if(startOfWall.x>value.x){
				startOfWall.y = value.y;
				startOfWall.x = value.x;
			}
		}
		if(value.used === 0){
			curVal = "-";
			emptyGrid.x = value.x;
			emptyGrid.y = value.y;
		}
		myGrid.set(value.x,value.y,curVal);
	});
	console.log(myGrid.toStringValue());
	console.log(emptyGrid);
	console.log(startOfWall);
	var aroundWall = (emptyGrid.x-startOfWall.x)+1;
	console.log(aroundWall);
	var width= myGrid.grid[0].length;
	aroundWall+=emptyGrid.y-startOfWall.y; // get to side of wall.
	console.log(aroundWall);
	aroundWall+=startOfWall.y; // get to top.
	console.log(aroundWall);
	aroundWall+=(width-startOfWall.x)-1; // get to upper corner.
	console.log(aroundWall);
	aroundWall+=5*(width-2);
	console.log(aroundWall);
	aroundWall++;
	console.log(aroundWall);
}

var dfResults = readFile("inputDay22.txt");
testData();
console.log("Day 22 Part A");
day22a(dfResults);
console.log("Day 22 Part B");
day22b(dfResults);


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
				this.set(j,i,curRow[j]);
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
		var output="";
		for(var i=0;i<this.grid.length;i++){
			if(this.grid[i]){
				for(var j=0;j<this.grid[i].length;j++){
					output+=this.get(j,i);
				}
				if(this.debug){
					console.log(output);
				}
			}
			output+="\n";
		}
		return output;
	}
	this.get = function(x,y){
		if(!this.grid[y]){ //first row doesn't exist.
			if(this.boolean){
				return false;
			}
			return 0; 
		}
		return this.grid[y][x];
	}

	this.isEmpty = function(x,y){
		if(!this.grid[y]){ //first row doesn't exist. 
			return true;
		}
		return (Object.keys(this.grid[y]).indexOf(""+x)===-1);
	}

	this.set = function(x,y,value){
		this.grid[y]=this.grid[y]||[];
		this.grid[y][x]=value;
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