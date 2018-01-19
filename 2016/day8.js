var File = require("fs");

function readFile(fileName){
	var inputContent = File.readFileSync(fileName, "utf-8").trim();
	var inputArray = inputContent.split("\n");
	inputArray = inputArray.map(parseCommand);
	console.log(inputArray);
	return inputArray;
}



function parseCommand(value){
	var cmdArray = value.split(" ");
	var newCommand = {};
	var parms;
	switch(cmdArray[0]){
		case "rect":
			newCommand.command = "rect";
			parms = cmdArray[1].split("x");
			newCommand.x = parms[0];
			newCommand.y = parms[1];
			break;
		case "rotate":
			switch(cmdArray[1]){
				case "column":
					newCommand.command = "rotateColumn";
					newCommand.x = parseInt(cmdArray[2].replace("x=",""));
					newCommand.y = parseInt(cmdArray[4]);		
					break;
				case "row":
					newCommand.command = "rotateRow";
					newCommand.y = parseInt(cmdArray[2].replace("y=",""));
					newCommand.x = parseInt(cmdArray[4]);		
					break;
			}
			break;
	}
	return newCommand;
}

function runOneCommand(curCommand, curGrid){
	switch(curCommand.command){
		case "rect":
			curGrid.toggleRangeOn(0,0,curCommand.y-1,curCommand.x-1);
			break;
		case "rotateColumn":
			curGrid.rotateCol(curCommand.x,curCommand.y);
			break;
		case "rotateRow":
			curGrid.rotateRow(curCommand.y,curCommand.x);
			break;
	}
}
 

function testData(){
	var Directions = [
		"rect 3x2",
		"rotate column x=1 by 1",
		"rotate row y=0 by 4",
		"rotate column x=1 by 1"
	];
	Directions = Directions.map(parseCommand);
	console.log(Directions);
	var lights = new Grid();
	lights.boolean = true;
	lights.toggleRangeOff(0,0,2,6);
	//lights.toggleRangeOff(0,0,5,49);
	console.log("Before Print");
	console.log(lights.toStringBool());
	console.log("After Print");
	for(var i=0;i<Directions.length;i++){
		console.log("Before Print");
		runOneCommand(Directions[i],lights);
		console.log(lights.toStringBool());
		console.log("After Print");
	}
}

function day8a(commands) {
	var lights = new Grid();
	lights.boolean = true;
	lights.toggleRangeOff(0,0,5,49);
	for(var i=0;i<commands.length;i++){
		runOneCommand(commands[i],lights);
	}
	console.log("Number of Lights: "+ lights.countTrue());
}

function day8b(commands) {
	var lights = new Grid();
	lights.boolean = true;
	lights.toggleRangeOff(0,0,5,49);
	for(var i=0;i<commands.length;i++){
		runOneCommand(commands[i],lights);
	}
	console.log(lights.toStringBool());
}

var commands = readFile("inputDay8.txt");
testData();
console.log("Day 8 Part A");
day8a(commands);
console.log("Day 8 Part B");
day8b(commands);


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