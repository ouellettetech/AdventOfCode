var firstRow = "^.^^^..^^...^.^..^^^^^.....^...^^^..^^^^.^^.^^^^^^^^.^^.^^^^...^^...^^^^.^.^..^^..^..^.^^.^.^.......";

String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.split(search).join(replacement);
};

function TrapRoom(firstRow){
	this.traps = new Grid();
	var replaced = firstRow.replaceAll("^","#");
	//console.log(replaced);
	this.traps.setFromStringa([replaced]);
	this.toString = function(){
		return this.traps.toStringBool();
	}

	this.populateRows = function(numRows){
		for(var i=1;i<numRows;i++){
			for(var j=0;j<this.traps.grid[0].length;j++){
				this.traps.set(i,j,this.isTrap(j,i));
			}
		}
	}

	this.isTrap = function(x,y){
		var left = this.traps.get(y-1,x-1);
		var right = this.traps.get(y-1,x+1);
		var center = this.traps.get(y-1,x);
		return (left && center && !right) || 
			(!left && center && right) || 
			(left && !center && !right) || 
			(!left && !center && right);
	}

	this.safeTiles = function(){
		var height = this.traps.getHeight();
		var width = this.traps.grid[0].length;
		var total = height* width;
		var numberOfTraps = this.traps.countTrue();
		console.log("Height: "+ height +  " Width: "+width + " Total : "+ total + "Traps :"+numberOfTraps);
		return total-numberOfTraps;
	}
}
function testData(){
	var room = new TrapRoom("..^^.");
	room.populateRows(3);
	console.log(room.toString());
	console.log(room.safeTiles());
	room = new TrapRoom(".^^.^.^^^^");
	room.populateRows(10);
	console.log(room.toString());
	console.log(room.safeTiles());
}

function day18a(input){
	var room = new TrapRoom(input);
	room.populateRows(40);
	console.log(room.toString());
	console.log(room.safeTiles());
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
function day18b(input){
	var room = new TrapRoom(input);
	room.populateRows(400000); // I should modify the program to only keep the current row,
	// since that's all I need, but I have plenty of ram... --max-old-space-size=8192
	console.log(room.toString());
	console.log(room.safeTiles());	
}


testData();
console.log("Day 18 Part A");
day18a(firstRow);
console.log("Day 18 Part B");
day18b(firstRow);




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