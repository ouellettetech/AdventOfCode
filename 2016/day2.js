var bathRoomDirection = ["RLRLLLULULULUUDUULULRDDLURURDDLDUUDDLRDDUUUDDRUDLRRDDUDUUDULUDRDULRUDRULRDRUDLDDULRRDLDRLUDDLLDRDDDUDDLUDUDULDRLLDRLULRLURDLULRUUUDRULLUUDLRDLDDUDRRRLDLRUUURRLDDRRRURLLULDUULLDRLRDLLDURDLDDULLDDLDLUURRRURLRURLLRRDURLDUDDLULUUULULLLDRRRRRLULRDUDURURLULRURRRLLUURDURULRRUULDRDLULDLLUDLUDRLUDLRRLDLLDLDUDDLULLDRULRLRULDURRDLDLLUDRLLDRRDLDUDUURUURDUUDDDLDLDDRDLUDLDUUUUDLDRLRURDLURURDLLLUURURDRDLUDLLRUDULLLDLULLULLDLDDRDRRRUDDDUDDDDRULLLLRLDDLLRDRLLLRRLDRRUDRUUURLLLRULRRDURDLDRLDDUUDUUURRLRRUDLDLDDRUDLULLUUDUUUDLUDDRUULLLURUDDDDLRUDDLLLRUR",
"LDLRLDDDLUDRDRRUDUURLRULLUDDRLURLUULDLLRLLUDLRLRUDLULRLRRLRURLDDDURUDUUURDRLDDLUUUDRUDUDDDLLURLLULRUULLUDRULUDDULDUDUDULLDRUUUULRDUUDLUDURDLLRLLRLUUDUUDRLLLRULUURUDLDRLLDUDLDDRULDULDURRLDDDUDUDDRUDUDRDURLLLLLULDRDDLLUDULLLUDRURLDLDLDULLDDRURRLUDDRLURLULRLDDDUUUURLRDLRURDDURLDLRRLLRLRLUURRLLDDLDRLRDUDDLLDDDURUUDURLRRDUULRRDDRRUULDRLRUDRRLDDRLDRULLDLDURRULDURRRDLRRLRLLLRLDRLLULRRLLLLLDLDDULDLLDLLDUUDDRLURUUUUULRDDLRDLRDRDRDLUDDLDDRULLUDDRLDLLUDRLUURRLUDURURLLRURRURRLRLLRLURURDDDDRRLURDUULLUU",
"LLRRDURRDLDULRDUDLRDRDRURULDURUDRRURDDDRLDLDRDRDRDRULDUURLULDDUURUULUDULLDUDLLLLDLLLDRLUUULLULDDRRUDDULLLULRDRULDDULDUDRDDLUUURULDLLUDUUUUURUDLLDRDULLRULLDURDRLLDLDRDDURUULUDURRRUULLDUUDDURDURLDLRRLLDURDDLRRRUDLRRRDLDRLUDLUDRDRLDDLLLRLLRURDLRDUUUURRLULDDLDLLLUDRDRLRRDURDDLURDLDDDULLLRRLDDDRULDDDLRRDULUUUDRRULDDLLLURDRRLLLUULDRRRUURRDDLULDRLULDDDLDULDRRRULRULLURLURULLLLRUDRRRDRDRDLDULURLRRRRLRUDDRRRUURUURLLRURURUURRURRDLDLLUDRRRDUDDRDURLLRLRRULD",
"DULRRDRLRLUDLLURURLLRLRDLLDLLDRDUURLRUUUDLLDUUDDUULDUULLRUDRURLUDRDLRUDDDLULUDLLDRULULLLDRRULDLLUURLRRRLDRDLDRURRRRDLRUUDULLRLLLDLRUDLDUUDRLDLRDRLRDLDDDUDLRUDLDDLLLDRLLRRUUDRDDUUURURRRUUDLRRDDRUDLDDULULDLRRLRDDUDRUURRUULURLURUDRRURRRULDDDDURDLUUULUULULRDLRRRRRURURRLRUULDUUURRDRRDLDUUUULLULLLLUDLUUDUURRDLDLRRRLUUURULDULDLDRLLURDRUULLLLLULLLDRURURRUDRRRRUDUDUDRUDUDRDRULUUDRURDDUUDLDLDUURUDURLRLRRDRDRDLLDUDDULLRDLDDRLLDLRDURDDULLLDLLLULDLUUUDLDRDLURUURDDLRDLLLLLRLURDLLLULLRRLU",
"DUULULUUDUDLLRLRURULLDLRRLURDLLDUDUDDRURRLUDULULDRRDRLUULUDDLUURURDLDDDRDRUDURLDDLUDUURULRRUUDRLURRLRLDURRRULRLDDDRUDDDDDUDDULLLRRLLDULDRULUDLRRDLLUDRDLDULRLLLUULLRULRLLLLUDDRRDRLULDLDLURDDRUDDLDLDLDRULDLLDDUUDULUULULLURDURRLLUDRULLRDUDRDRURDRDRDURUUDULDDRURUDLLUUDUUDURDLRDRURUDRUURLUUURLRLUDRUDRUURLLUDRLURDDURRUDRDRLRRLDDDRDDLUUUDDLULDUURUDUDLLDRURDURRDULRLURRDLDDRLUDRLDLRLDDUURRULDDLDUDDLRDULLDDDLDUUUUDLRUDUDLDRDLRDDLDLRLLUDDRRLUDLDUUULLDDRLRRDLRRRRUDDLRLLULRLRDURDUDDRRULLDDLDLRRDLLULDURURDDURLRLULULURRUDUDRDLURULDUDLUULDUUURLLRUDLLRDLRUDRLULDUDRRDUUDUUULUUUDDRUD"]



function testData(){
	var Directions = ["ULL",
		"RRDDD",
		"LURDL",
		"UUUUD"]
	var curPad = new KeyPad();
	for(var i=0;i<Directions.length;i++){
		curPad.followDirections(Directions[i]);
		console.log("Button " + i + " : " + curPad.getCurrentKey());
	}

	console.log("Part B tests");
	curPad = new KeyPadB();
	console.log("Starting Position "+ curPad.getCurrentKey());
	for(var i=0;i<Directions.length;i++){
		curPad.followDirections(Directions[i]);
		console.log("Button " + i + " : " + curPad.getCurrentKey());
	}
}

function day2a(inputPath) {
	var curPad = new KeyPad();
	for(var i=0;i<inputPath.length;i++){
		curPad.followDirections(inputPath[i]);
		console.log("Button " + i + " : " + curPad.getCurrentKey());
	}
}

function day2b(inputPath) {
	var curPad = new KeyPadB();
	for(var i=0;i<inputPath.length;i++){
		curPad.followDirections(inputPath[i]);
		console.log("Button " + i + " : " + curPad.getCurrentKey());
	}
}

testData();
console.log("Day 2 Part A");
day2a(bathRoomDirection);
console.log("Day 2 Part B");
day2b(bathRoomDirection);

function KeyPadB(){
	this.keys = new Grid();
	this.curpos = {x: 0,y:2};
	
	this.keys.set(2,0,"1");
	this.keys.set(1,1,"2");
	this.keys.set(2,1,"3");
	this.keys.set(3,1,"4");
	this.keys.set(0,2,"5");
	this.keys.set(1,2,"6");
	this.keys.set(2,2,"7");
	this.keys.set(3,2,"8");
	this.keys.set(4,2,"9");
	this.keys.set(1,3,"A");
	this.keys.set(2,3,"B");
	this.keys.set(3,3,"C");
	this.keys.set(2,4,"D");

	this.moveLeft = function(){
		var newPosX = this.curpos.x - 1;
		// console.log("New Position X: " + newPosX);
		if(!!this.keys.get(newPosX,this.curpos.y)){
			// console.log("Setting X Position");
			this.curpos.x=newPosX;
		} else {
			// console.log("Not setting X");
		}
	}
	
	this.moveRight = function(){
		var newPosX = this.curpos.x + 1;
		// console.log("New Position X: " + newPosX);
		if(!!this.keys.get(newPosX,this.curpos.y)){
			// console.log("Setting X Position");
			this.curpos.x=newPosX;
		} else {
			// console.log("Not setting X");
		}
	}

	this.moveUp = function(){
		var newPosY = this.curpos.y - 1;
		// console.log("New Position Y: " + newPosY);
		if(!!this.keys.get(this.curpos.x,newPosY)){
			// console.log("Setting Y Position");
			this.curpos.y=newPosY;
		} else {
			// console.log("Not setting Y");
		}
	}

	this.moveDown = function(){
		var newPosY = this.curpos.y + 1;
		// console.log("New Position Y: " + newPosY);
		if(!!this.keys.get(this.curpos.x,newPosY)){
			// console.log("Setting Y Position");
			this.curpos.y=newPosY;
		} else {
			// console.log("Not setting Y");
		}
	}

	this.getCurrentKey = function(){
		return this.keys.get(this.curpos.x,this.curpos.y);
	}
	this.followDirections = function(input){
		var inArray = input.split("");
		for(var i=0;i<inArray.length;i++){
			switch(inArray[i]){
				case "U":
					this.moveUp();
					break;
				case "L":
					this.moveLeft();
					break;
				case "R":
					this.moveRight();
					break;
				case "D":
					this.moveDown();
					break;
			}
		}
	}
}


function KeyPad(){
	this.keys = new Grid();
	this.curpos = {x: 1,y:1};
	this.keys.setFromStringb(["789","456","123"]);
	
	this.moveUp = function(){
		this.curpos.x++;
		if(this.curpos.x>2){
			this.curpos.x=2;
		}
	}
	
	this.moveDown = function(){
		this.curpos.x--;
		if(this.curpos.x<0){
			this.curpos.x=0;
		}
	}

	this.moveLeft = function(){
		this.curpos.y--;
		if(this.curpos.y<0){
			this.curpos.y=0;
		}
	}

	this.moveRight = function(){
		this.curpos.y++;
		if(this.curpos.y>2){
			this.curpos.y=2;
		}
	}

	this.getCurrentKey = function(){
		return this.keys.get(this.curpos.x,this.curpos.y);
	}
	this.followDirections = function(input){
		var inArray = input.split("");
		for(var i=0;i<inArray.length;i++){
			switch(inArray[i]){
				case "U":
					this.moveUp();
					break;
				case "L":
					this.moveLeft();
					break;
				case "R":
					this.moveRight();
					break;
				case "D":
					this.moveDown();
					break;
			}
		}
	}
}

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