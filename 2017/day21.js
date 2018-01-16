var startingGrid=[".#.","..#","###"];

var inputString="../.. => ..#/.#./...\n#./.. => .../#../.##\n##/.. => .##/###/##.\n.#/#. => #.#/..#/#.#\n##/#. => .../.##/...\n##/## => ##./..#/..#\n.../.../... => ##../..../##../.###\n#../.../... => ...#/.#.#/.#../.#.#\n.#./.../... => #.#./...#/#.#./.##.\n##./.../... => ..#./#.##/#.../.###\n#.#/.../... => ##../##.#/..#./#.##\n###/.../... => ..../.#.#/.###/#..#\n.#./#../... => #..#/#.../.##./....\n##./#../... => #.##/..##/####/.###\n..#/#../... => ..#./#.##/####/####\n#.#/#../... => .##./#.##/#.#./##.#\n.##/#../... => #.##/####/.###/...#\n###/#../... => ..../#.#./##.#/..##\n.../.#./... => .###/.##./##../.##.\n#../.#./... => ..../#.##/...#/#.#.\n.#./.#./... => ...#/####/.##./#...\n##./.#./... => .###/#.##/###./....\n#.#/.#./... => #.##/###./..../..#.\n###/.#./... => .#../#.#./#.##/#.##\n.#./##./... => .###/##../..##/#..#\n##./##./... => ..#./#.#./.#.#/##.#\n..#/##./... => .#../####/...#/..##\n#.#/##./... => ..../##.#/.##./....\n.##/##./... => .#.#/.#.#/.##./####\n###/##./... => ##.#/..../..../....\n.../#.#/... => ..##/##../##.#/###.\n#../#.#/... => ####/#.##/#.../###.\n.#./#.#/... => ..../#..#/..##/.#..\n##./#.#/... => #.../..##/##../..#.\n#.#/#.#/... => ...#/#.#./#.#./#...\n###/#.#/... => ###./###./##.#/###.\n.../###/... => ..#./###./##.#/####\n#../###/... => ##.#/..#./##../..##\n.#./###/... => #.../#.##/##../....\n##./###/... => ..##/.#.#/#..#/#.##\n#.#/###/... => #.##/..#./.#../..##\n###/###/... => ..#./#..#/####/.##.\n..#/.../#.. => ##.#/#.##/...#/###.\n#.#/.../#.. => #..#/..#./##../###.\n.##/.../#.. => ..#./.#../###./#.#.\n###/.../#.. => ...#/...#/.#.#/.##.\n.##/#../#.. => ##../#.#./#..#/##..\n###/#../#.. => ##../.#.#/##../#..#\n..#/.#./#.. => ##.#/##.#/...#/.#..\n#.#/.#./#.. => .###/.#.#/###./....\n.##/.#./#.. => #..#/###./####/..#.\n###/.#./#.. => ..#./.###/.###/...#\n.##/##./#.. => #.##/..##/...#/.###\n###/##./#.. => ####/##.#/#.##/#..#\n#../..#/#.. => ..../.##./#.##/#...\n.#./..#/#.. => #..#/##../...#/#...\n##./..#/#.. => ..#./.###/..##/.#.#\n#.#/..#/#.. => .##./..##/..#./#..#\n.##/..#/#.. => ####/.#.#/#.../.#.#\n###/..#/#.. => ..../..##/#.##/###.\n#../#.#/#.. => #.##/.#.#/.#../.##.\n.#./#.#/#.. => ..##/###./.###/###.\n##./#.#/#.. => ##.#/##.#/#.#./##..\n..#/#.#/#.. => ###./###./.#.#/.#..\n#.#/#.#/#.. => ##../..#./##../....\n.##/#.#/#.. => .###/#.#./##.#/##..\n###/#.#/#.. => ##.#/#.#./.#.#/#...\n#../.##/#.. => .#.#/...#/.#.#/..#.\n.#./.##/#.. => ###./##../##.#/....\n##./.##/#.. => ..##/###./#.#./#.#.\n#.#/.##/#.. => ##.#/..##/#..#/####\n.##/.##/#.. => ..../####/..#./##..\n###/.##/#.. => .###/#..#/..../.#..\n#../###/#.. => #..#/.#../.#.#/#...\n.#./###/#.. => .#../..../.##./.###\n##./###/#.. => ##.#/.#../.#.#/#..#\n..#/###/#.. => #.##/##../..##/#...\n#.#/###/#.. => ####/..##/.#../##.#\n.##/###/#.. => .###/#..#/.###/#.##\n###/###/#.. => ..##/.##./##../#..#\n.#./#.#/.#. => ..##/.##./.##./.###\n##./#.#/.#. => ..##/...#/.##./####\n#.#/#.#/.#. => .###/.###/#.#./.#..\n###/#.#/.#. => ##.#/###./##.#/####\n.#./###/.#. => ...#/..#./.#.#/.#..\n##./###/.#. => ###./##.#/#.../#.#.\n#.#/###/.#. => .##./#.#./...#/..#.\n###/###/.#. => .#.#/.#../..##/####\n#.#/..#/##. => .##./...#/#..#/.###\n###/..#/##. => #.##/.#.#/...#/..##\n.##/#.#/##. => ###./.###/...#/....\n###/#.#/##. => .##./.##./#.#./#...\n#.#/.##/##. => #.#./.##./.#.#/.###\n###/.##/##. => ..../####/.#.#/#.##\n.##/###/##. => .##./.###/###./.#..\n###/###/##. => #.../###./.##./##.#\n#.#/.../#.# => #.#./..../#.##/###.\n###/.../#.# => .#../.#.#/#.../.###\n###/#../#.# => ###./#..#/####/##..\n#.#/.#./#.# => ###./##.#/..../.#..\n###/.#./#.# => ####/.#.#/.#../..##\n###/##./#.# => #.#./####/..##/#...\n#.#/#.#/#.# => #.#./#.#./#.../#.##\n###/#.#/#.# => #.##/.#../..#./.##.\n#.#/###/#.# => .###/..##/####/#..#\n###/###/#.# => #.../..#./..#./#.##\n###/#.#/### => .#.#/.###/#.##/..##\n###/###/### => #.#./...#/.#../.#.#";

function day21a(ruleInput) {
	var ruleArray=ruleInput.split("\n");
	var ruleBook= new RuleBook();
	for(var i=0;i<ruleArray.length;i++){
		ruleBook.add(ruleArray[i]);
	}
	var curGrid= new Grid();
	curGrid.setFromString(startingGrid);
	curGrid.toString();
	for(var i=0;i<5;i++){
		var tempGrid=splitGrid(curGrid);
		for(var j=0;j<tempGrid.getHeight();j++){
			for(var k=0;k<tempGrid.getHeight();k++){
				var newRule=ruleBook.findRule(tempGrid.get(j,k));
				tempGrid.set(j,k,newRule.endPart);
			}
		}
		curGrid=restoreGrid(tempGrid);
		curGrid.toString();
	}
	var count = curGrid.onCount();
	console.log(count);
	return count;
}

function day21b(ruleInput) {
	var ruleArray=ruleInput.split("\n");
	var ruleBook= new RuleBook();
	for(var i=0;i<ruleArray.length;i++){
		ruleBook.add(ruleArray[i]);
	}
	var curGrid= new Grid();
	curGrid.setFromString(startingGrid);
	curGrid.toString();
	for(var i=0;i<18;i++){
		var tempGrid=splitGrid(curGrid);
		for(var j=0;j<tempGrid.getHeight();j++){
			for(var k=0;k<tempGrid.getHeight();k++){
				var newRule=ruleBook.findRule(tempGrid.get(j,k));
				tempGrid.set(j,k,newRule.endPart);
			}
		}
		curGrid=restoreGrid(tempGrid);
		curGrid.toString();
	}
	var count = curGrid.onCount();
	console.log(count);
	return count;
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

 	this.setFromString = function(inputStringArray){
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

	this.toString = function(){
		var curRow;
		for(var i=0;i<this.grid.length;i++){
			curRow="";
			for(var j=0;j<this.grid[i].length;j++){
				if(this.get(i,j)){
					curRow+="#";
				} else {
					curRow+=".";
				}
			}
			console.log(curRow);
		}
	}
	 
	this.get = function(x,y){
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

function splitGrid(inputPicture){
	var newGrid = new Grid();
	var splitSize=3; // default to 3
	var height=inputPicture.getHeight();
	if(inputPicture.getHeight()%2==0){
		splitSize=2;
	}
	console.log("Split Size"+splitSize+"Length: " + height);
	for(var i=0;i<inputPicture.grid.length/splitSize;i++){
		for(var j=0;j<inputPicture.grid[i*splitSize].length/splitSize;j++){
			var currentSquare = new Grid();
			for(var k=0;k<splitSize;k++){
				for(var l=0;l<splitSize;l++){
					currentSquare.set(k,l,inputPicture.get(i*splitSize+k,j*splitSize+l));
				}
			}
			currentSquare.toString();
			newGrid.set(i,j,currentSquare);
		}
	}
	return newGrid;
}

function restoreGrid(origGrid){
	var numberOfSections=origGrid.getHeight();
	var sectionSize=origGrid.grid[0][0].getHeight();
	var restoredGrid = new Grid();
	
	for(var i=0;i<numberOfSections;i++){
		for(var j=0;j<numberOfSections;j++){
			for(var k=0;k<sectionSize;k++){
				for(var l=0;l<sectionSize;l++){
					var x=i*sectionSize+k;
					var y=j*sectionSize+l
					//					console.log("x: "+x+"y: "+y);
					restoredGrid.set(i*sectionSize+k,j*sectionSize+l,origGrid.get(i,j).get(k,l));
				}
			}
		}
	}
	return restoredGrid;
}

function testData() {
	var ruleString="../.# => ##./#../...\n.#./..#/### => #..#/..../..../#..#";
	var ruleArray=ruleString.split("\n");
	var ruleBook= new RuleBook();
	for(var i=0;i<ruleArray.length;i++){
		ruleBook.add(ruleArray[i]);
	}
	var curGrid= new Grid();
	curGrid.setFromString(startingGrid);
	curGrid.toString();
	for(var i=0;i<2;i++){
		var tempGrid=splitGrid(curGrid);
		for(var j=0;j<tempGrid.getHeight();j++){
			for(var k=0;k<tempGrid.getHeight();k++){
				var newRule=ruleBook.findRule(tempGrid.get(j,k));
				tempGrid.set(j,k,newRule.endPart);
			}
		}
		curGrid=restoreGrid(tempGrid);
		curGrid.toString();
	}
	var count = curGrid.onCount();
	console.log(count);
	return count;
}

function RuleBook() {
	this.add = function(newRule){
		var ruleParts = newRule.split(" => ");
		var newRule = {};
		newRule.startPart = new Grid();
		newRule.startPart.setFromString(ruleParts[0].split("/"));
		newRule.endPart = new Grid();
		newRule.endPart.setFromString(ruleParts[1].split("/"));
		if(newRule.startPart.getHeight===2){
			this.twoByTwoRules.push(newRule);
		} else {
			this.threeByThreeRules.push(newRule);
		}
	}
	this.twoByTwoRules=[];
	this.threeByThreeRules=[];

	this.findRule = function(square){
		var curRuleArray;
		if(square.getHeight===2){
			curRuleArray=this.twoByTwoRules;
		} else {
			curRuleArray=this.threeByThreeRules;
		}
		return this.checkComparisons(square,curRuleArray);
	}

	this.checkComparisons = function(firstSquare, rules){
		var curSquare=firstSquare;

		var returnedRule=this.checkIfSquareInRules(curSquare,rules);
		if(returnedRule){
			return returnedRule;
		}

		var flipped=curSquare.flip();
		var returnedRule=this.checkIfSquareInRules(flipped,rules);
		if(returnedRule){
			return returnedRule;
		}

		for(var i=0;i<3;i++){
			curSquare=curSquare.mirror();
			var returnedRule=this.checkIfSquareInRules(curSquare,rules);
			if(returnedRule){
				return returnedRule;
			}

			curSquare=curSquare.flip();
			returnedRule=this.checkIfSquareInRules(curSquare,rules);
			
			if(returnedRule){
				return returnedRule;
			}
		}
		console.log("ERROR couldn't find rule");
		return null;

	}


	this.checkIfSquareInRules = function(firstSquare, rules){
		var foundRule;
		for(var i=0;i<rules.length && !foundRule;i++){
			if(firstSquare.isEqual(rules[i].startPart)){
				foundRule=rules[i];
			}
		}
		return foundRule;
	}

}

day21b(inputString);