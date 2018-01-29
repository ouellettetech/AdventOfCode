var md5 = require('md5');

var puzzleInput="qzthpkfp";

function Room(secret,currentX,currentY,path){
	this.currentPath = path || "";
	this.x = currentX || 1;
	this.y = currentY || 1;
	
	this.duplicate = function(){
		var dup = new Room(secret,this.x,this.y,this.currentPath);
		return dup;
	}
	this.isOpen = function(char){
		return (char>"a" && char<"g");
	}
	this.getAvailableDoors = function(){
		var newPaths = [];
		var temp;
		var hash=md5(secret+this.currentPath).split("");
		//UP
		if((this.x-1)>0 && this.isOpen(hash[0])){
			temp = this.duplicate();
			temp.currentPath = temp.currentPath+"U";
			temp.x = this.x-1;
			newPaths.push(temp);
		}
		//DOWN
		if((this.x+1)<5 && this.isOpen(hash[1])){
			temp = this.duplicate();
			temp.currentPath = temp.currentPath+"D";
			temp.x = this.x+1;
			newPaths.push(temp);
		}
		//LEFT
		if((this.y-1)>0 && this.isOpen(hash[2])){
			temp = this.duplicate();
			temp.currentPath = temp.currentPath+"L";
			temp.y = this.y-1;
			newPaths.push(temp);
		}
		//RIGHT
		if((this.y+1)<5 && this.isOpen(hash[3])){
			temp = this.duplicate();
			temp.currentPath = temp.currentPath+"R";
			temp.y = this.y+1;
			newPaths.push(temp);
		}
		return newPaths;
	}
	this.isAtVault = function(){
		return this.x === 4  && this.y === 4; 
	}
}

function findShortestPath(startingRoom){
	var currentOptions = [startingRoom];
	var found = false;
	while(currentOptions.length!==0 && !found){
		var newOptions = [];
		for(var i=0;i<currentOptions.length && !found;i++){
			//console.log(currentOptions[i]);
			if(currentOptions[i].isAtVault()){
				found = true;
				console.log("Found Path!" + currentOptions[i].currentPath);
			} else {
				var temprooms = currentOptions[i].getAvailableDoors();
				//console.log("found rooms")
				//console.log(temprooms);
				newOptions = newOptions.concat(temprooms);
			}
		}
		//console.log(newOptions);
		currentOptions = newOptions;
	}
}

function findAllPath(startingRoom){
	var currentOptions = [startingRoom];
	while(currentOptions.length!==0){
		var newOptions = [];
		for(var i=0;i<currentOptions.length;i++){
			if(currentOptions[i].isAtVault()){
				console.log("Found Path! " + currentOptions[i].currentPath.length);
			} else {
				var temprooms = currentOptions[i].getAvailableDoors();
				newOptions = newOptions.concat(temprooms);
			}
		}
		//console.log(newOptions);
		currentOptions = newOptions;
	}
}

function testData(){
	findShortestPath(new Room("ihgpwlah",1,1,""));
	findShortestPath(new Room("kglvqrro",1,1,""));
	findShortestPath(new Room("ulqzkmiv",1,1,""));
}

function day17a(input){
	findShortestPath(new Room(input,1,1,""));

}

function day17b(input){
	findAllPath(new Room(input,1,1,""));
}

testData();
console.log("Day 17 Part A");
day17a(puzzleInput);
console.log("Day 17 Part B");
day17b(puzzleInput);