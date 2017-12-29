var testStart="..#\n#..\n..."


var virusStart="..#..##...##.######.##...\n..#...#####..#.#####..#..\n...##.#..##.#.##....#...#\n#.#.#.#..###...#....##..#\n..#..#####.....##..#.#..#\n.##.#####.#.....###.#..#.\n##..####...#.##.#...##...\n###.#.#####...##.#.##..#.\n#.##..##.#....#.#..#.##..\n###.######......####..#.#\n###.....#.##.##.######..#\n...####.###.#....#..##.##\n#..####.#.....#....###.#.\n#..##..#.####.#.##..#.#..\n#..#.#.##...#...#####.##.\n#.###..#.##.#..##.#######\n...###..#..####.####.#.#.\n.#..###..###.#....#######\n.####..##.#####.#.#..#.#.\n#.#....##.....##.##.....#\n....####.....#..#.##..##.\n######..##..#.###...###..\n..##...##.....#..###.###.\n##.#.#..##.#.#.##....##.#\n.#.###..##..#....#...##.#";

function testData() {
	var testStart="..#\n#..\n..."
	var defaultSize=9;
	var smallMap=constructBasicGrid(testStart);
	var largeMap=constructLargeMap(smallMap,defaultSize);
	fillLargeMap(largeMap,defaultSize);
	var status={};
	status.y=Math.ceil(defaultSize/2);
	status.x=Math.ceil(defaultSize/2);
	status.direction = new Direction();
	status.direction.current = status.direction.UP;
	status.count=0;
	for(var i=0;i<70;i++){
		largeMap.toStringa();
		burstVirus(largeMap,status);			
	}
	console.log("Infections :"+ status.count);
}

function day22a() {
	var defaultSize=1000;
	var smallMap=constructBasicGrid(virusStart);
	var largeMap=constructLargeMap(smallMap,defaultSize);
	fillLargeMap(largeMap,defaultSize);
	var status={};
	status.y=Math.ceil(defaultSize/2);
	status.x=Math.ceil(defaultSize/2);
	status.direction = new Direction();
	status.direction.current = status.direction.UP;
	status.count=0;
	for(var i=0;i<10000;i++){
//		largeMap.toStringa();
		burstVirus(largeMap,status);			
	}
	console.log("Infections :"+ status.count);
}

function day22b() {
	var defaultSize=1000;
	var smallMap=constructBasicGridb(virusStart);
	var largeMap=constructLargeMap(smallMap,defaultSize);
	fillLargeMapb(largeMap,defaultSize);
	var status={};
	status.y=Math.ceil(defaultSize/2);
	status.x=Math.ceil(defaultSize/2);
	status.direction = new Direction();
	status.direction.current = status.direction.UP;
	status.count=0;
	for(var i=0;i<10000000;i++){
//		largeMap.toStringb();
		burstVirusb(largeMap,status);
		if(i%1000===0){
			console.log("Tick :"+i);
		}			
	}
	console.log("Infections :"+ status.count);
}


function testData2() {
	var defaultSize=9;
	var smallMap=constructBasicGridb(testStart);
	var largeMap=constructLargeMap(smallMap,defaultSize);
	fillLargeMapb(largeMap,defaultSize);
	var status={};
	status.y=Math.ceil(defaultSize/2);
	status.x=Math.ceil(defaultSize/2);
	status.direction = new Direction();
	status.direction.current = status.direction.UP;
	status.count=0;
	for(var i=0;i<100;i++){
		largeMap.toStringb();
		burstVirusb(largeMap,status);
		if(i%1000===0){
			console.log("Tick :"+i);
		}			
	}
	console.log("Infections :"+ status.count);
}

function fillLargeMap(largeMap,size){
	for(var i=0;i<size;i++){
		for(var j=0;j<size;j++){
			largeMap.set(i,j,largeMap.get(i,j));			
		}
	}
}
function fillLargeMapb(largeMap,size){
	for(var i=0;i<size;i++){
		for(var j=0;j<size;j++){
			largeMap.set(i,j,largeMap.get(i,j) || ".");			
		}
	}
}

function constructBasicGrid(inputString){
	var rows=inputString.split("\n");
	var mygrid = new Grid();
	mygrid.setFromStringa(rows);
	mygrid.toStringa();
	return mygrid;
}

function constructBasicGridb(inputString){
	var rows=inputString.split("\n");
	var mygrid = new Grid();
	mygrid.setFromStringb(rows);
	mygrid.toStringb();
	return mygrid;
}

function Direction(){
	this.UP = {value: 0, name: "Up", xChange: 0, yChange: -1}; // Down is positive since the top row starts at 0
	this.RIGHT = {value: 1, name: "Right", xChange: 1, yChange: 0};
	this.DOWN = {value: 2, name: "Down", xChange: 0, yChange: 1};
	this.LEFT =  {value: 3, name: "Left", xChange: -1, yChange: 0};

	this.current=this.UP;
	this.turnRight = function(){
		var currentDir=(this.current.value+1)%4;
//		console.log("Current Direction Value: "+currentDir);
		this.changeDirection(currentDir);
//		console.log("New Direction(right): "+this.current.name);
	}
	this.turnLeft = function(){
		var currentDir=(this.current.value+3)%4;
//		console.log("Current Direction Value: "+currentDir);
		this.changeDirection(currentDir);
//		console.log("New Direction (left): "+this.current.name);
	}

	this.changeDirection = function(newDirection){
		switch(newDirection){
			case 0:
				this.current=this.UP;
				break;
			case 1:
				this.current=this.RIGHT;
				break;
			case 2:
				this.current=this.DOWN;
				break;
			case 3:
				this.current=this.LEFT;
				break;
		}
	}
}

function burstVirus(curGrid,status){
	var infected=!!curGrid.get(status.y,status.x);
	if(infected){
		status.direction.turnRight();
	} else {
		status.direction.turnLeft();
	}
	if(!infected){
		status.count++;
	}
//	console.log("Setting x:"+ status.x + "Setting y: "+status.y," to :"+!infected + " direction :"+status.direction.current.name);
	curGrid.set(status.y,status.x,!infected);
	status.x+=status.direction.current.xChange;
	status.y+=status.direction.current.yChange;
}

function burstVirusb(curGrid,status){
	var infected=curGrid.get(status.y,status.x);
	var newState;
	switch(infected){
		case "#":
			status.direction.turnRight();
			newState="F";
			break;
		case ".":
			status.direction.turnLeft();
			newState="W";
			break;
		case "W":
			newState="#";//stay same direction.
			status.count++;
			break;
		case "F":
			status.direction.turnLeft(); // Turn around.
			status.direction.turnLeft();
			newState=".";
			break;
	}
//	console.log("Setting x:"+ status.x + "Setting y: "+status.y," to :"+newState + " direction :"+status.direction.current.name);
	curGrid.set(status.y,status.x,newState);
	status.x+=status.direction.current.xChange;
	status.y+=status.direction.current.yChange;
}


function constructLargeMap(smallMap, defaultSize){
	var center=Math.ceil(defaultSize/2);
	var smHeight=smallMap.getHeight();
	var smCenter=Math.floor(smHeight/2);
	var largeGrid = new Grid();
	for(var i=0;i<smHeight;i++){
		for(var j=0;j<smHeight;j++){
			var offset = center-smCenter;
//			console.log("x: "+j+offset + " y: "+  i+offset);
			largeGrid.set(i+offset,j+offset,smallMap.get(i,j));
		}
	}
	return largeGrid;
}


function Grid(){
	this.grid=[];

	this.onCount = function(){
		var count=0;
		for(var i=0;i<this.grid.length;i++){
			for(var j=0;j<this.grid[i].length;j++){
				if(this.get(i,j)){
					count++;
				}
			}
		}
		return count;
	}

	this.getHeight = function(){
		return this.grid.length;
	}

 	this.setFromStringa = function(inputStringArray){
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
//				console.log("Setting: "+curRow[j]);
				this.set(i,j,curRow[j]);
			}
		}
	};

	this.toStringa = function(){
		var curRow;
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
//				console.log(curRow);
			}
		}
	}
	 
	this.toStringb = function(){
		var curRow;
		for(var i=0;i<this.grid.length;i++){
			if(this.grid[i]){
				curRow="";
				for(var j=0;j<this.grid[i].length;j++){
					curRow+=this.get(i,j);
				}
//				console.log(curRow);
			}
		}
	}
	this.get = function(x,y){
		if(!this.grid[x]){
			return "."; //first row doesn't exist.
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
			// console.log("Flipping row"+i);
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


//day21a(virusStart);
//testData();
day22b();
//testData2();