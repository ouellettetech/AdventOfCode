var File = require("fs");

function forceGC() {
	if(global.gc) {
		global.gc();
	} else {
		console.warn('No GC hook! Start your program as `node --expose-gc file.js`.');
	}
}

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
	return inputArray;
}


function setVisited(room, distance, x,y){
	room.get(x, y).curDistance = distance;
}


function getCurAvailableMoves(room, x,y){
	var options = [
		{x: x-1,y: y},
		{x: x,y: y-1},
		{x: x,y: y+1},
		{x: x+1,y: y}
	];
	//console.log("Before Filter");
	//console.log(options);
	options = options.filter(function(value){
		var cur = room.get(value.x,value.y);
		return (cur && cur.curDistance === null && !cur.isWall);
	});
	//console.log("After Filter");
	//console.log(options);
	return options;
}

function MapNode(){
	this.isWall = false;
	this.curDistance = null;
	this.pointOfInterest = null;
}

function getInterests(room){
	var interests = [];
	var testNode;
	for(var y=0;y<room.getHeight();y++){
		for(var x=0;x<room.grid[0].length;x++){
			var curVal = room.get(x,y);
			if(x===1 && y===1){
				console.log("SHould be 0 :"+ curVal);
			}
			switch(curVal){
				case "#":
					testNode = new MapNode();
					testNode.isWall = true;
					break;
				case ".":
					testNode = new MapNode();
					break;
				default:
					testNode = new MapNode();
					testNode.pointOfInterest = true;
					console.log("Current Val: "+curVal);
					interests[curVal] = {x: x, y: y};
					break;
			}
			room.set(x,y,testNode);
		}
	}

	console.log(interests);
	console.log("First Entry: "+interests[0]);
	return interests;
}
function getDistances(room, interests){
	var distances = [];

	for(var i=0;i<interests.length-1;i++){
		room.forEach(function(value){
			value.curDistance = null;
		});
		var ix = interests[i].x;
		var iy = interests[i].y;
		//console.log(printRoom(room));
		var start = {x: ix, y: iy};
		fillPath(room, start);
		//console.log(printRoom(room));
		for(var j=i+1;j<interests.length;j++){
			var jx = interests[j].x;
			var jy = interests[j].y;
			//console.log("Current first x: "+ ix  + " y: " + iy + " Second x: " + jx + " y: "+ jy);
			distances[i] = distances[i] || [];
			distances[j] = distances[j] || [];
			distances[i][j] = distances[j][i] = room.get(jx,jy).curDistance;
		}
	}
	return distances;
	
}

function fillPath(map, startingStates){
	//console.log("Running Fill!");
	//console.log("Starting at : ");
	//console.log(startingStates);
	var curStep = 0;
	var curStates = [startingStates];

	while(curStates.length>0){
		forceGC();
		var newSteps = [];
		for(var i=0;i<curStates.length;i++){
			//console.log(curStates[i]);
			if(map.get(curStates[i].x, curStates[i].y).curDistance==null){
				setVisited(map,curStep, curStates[i].x, curStates[i].y);
				var temp = getCurAvailableMoves(map, curStates[i].x, curStates[i].y);
				newSteps = newSteps.concat(temp);
			}
		}
		curStep++;
		console.log("Steps : "+curStep+ " Number of Elements to Check :"+ newSteps.length);
		curStates = newSteps;
	}	
	return curStates;
}

function getShortest(distances,lastSpot){
	var minDistance = Number.MAX_SAFE_INTEGER;
	var curPath = [];
	var cur;
	var empty = true;
	for(var i=0;i<distances.length;i++){
		cur = distances[i];
		if(cur){
			empty = false;
			var dup = distances.slice();
			dup[i]=null;
			var distAndPath = getShortest(dup, i);
			distAndPath.dist+=distances[i][lastSpot];
			if(distAndPath.dist< minDistance){
				minDistance = distAndPath.dist;
				distAndPath.path.push(i);
				curPath = distAndPath.path;
			}
		}
	}
	if(empty){
		return {dist: 0, path: []};
	}
	//console.log("Current minDistance = " + minDistance);
	//console.log("Current Path: ");
	//console.log(curPath);
	return {dist: minDistance, path: curPath};
}

function getShortestWithReturn(distances,lastSpot,zeroDists){
	var minDistance = Number.MAX_SAFE_INTEGER;
	var curPath = [];
	var cur;
	var empty = true;
	for(var i=0;i<distances.length;i++){
		cur = distances[i];
		if(cur){
			empty = false;
			var dup = distances.slice();
			dup[i]=null;
			var distAndPath = getShortestWithReturn(dup, i, zeroDists);
			distAndPath.dist+=distances[i][lastSpot];
			if(distAndPath.dist< minDistance){
				minDistance = distAndPath.dist;
				distAndPath.path.push(i);
				curPath = distAndPath.path;
			}
		}
	}
	if(empty){
		return {dist: zeroDists[lastSpot], path: [0]};
	}
	//console.log("Current minDistance = " + minDistance);
	//console.log("Current Path: ");
	//console.log(curPath);
	return {dist: minDistance, path: curPath};
}

function printRoom(room){
	var str = "";
	var cur;
	for(var i=0;i<room.grid.length;i++){
		for(var j=0;j<room.grid[i].length;j++){
			cur = room.grid[i][j];
			if(cur.isWall){
				str+="#";
			} else {
				str+=cur.curDistance || ".";
			}
		}
		str+="\n";
	}
	return str;
}
function testData(){
	var testRoom = [
		"###########",
		"#0.1.....2#",
		"#.#######.#",
		"#4.......3#",
		"###########"];
	var myRoom = new Grid();
	myRoom.setFromStringb(testRoom);
	console.log(myRoom.toStringValue());
	var interests = getInterests(myRoom);
	var dists = getDistances(myRoom,interests);
	console.log(dists);
	console.log(printRoom(myRoom));
	dists[0]=null;
	console.log(getShortest(dists,0));
}

function day24a(roomString) {
	var myRoom = new Grid();
	myRoom.setFromStringb(roomString);
	console.log(myRoom.toStringValue());
	var interests = getInterests(myRoom);
	var dists = getDistances(myRoom,interests);
	console.log(dists);
	console.log(printRoom(myRoom));
	dists[0]=null;
	console.log(getShortest(dists,0));
}

function day24b(roomString) {
	var myRoom = new Grid();
	myRoom.setFromStringb(roomString);
	console.log(myRoom.toStringValue());
	var interests = getInterests(myRoom);
	var dists = getDistances(myRoom,interests);
	console.log(dists);
	console.log(printRoom(myRoom));
	var zero = dists[0];
	dists[0]=null;
	console.log(getShortestWithReturn(dists,0, zero));
}

var roomStrings = readFile("inputDay24.txt");
testData();
console.log("Day 24 Part A");
day24a(roomStrings);
console.log("Day 24 Part B");
day24b(roomStrings);


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

	this.duplicate = function(){
		var dupGrid = new Grid();
		for(var i=0;i<this.grid.length;i++){
			dupGrid.grid[i] = this.grid[i].slice();
		}
		return dupGrid;
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
					callback( this.get(j,i), {x:j,y:i}, this);
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