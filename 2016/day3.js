var File = require("fs");

function readFile(fileName){
	var inputContent = File.readFileSync(fileName, "utf-8").trim();
	var inputArray = inputContent.split("\n");
	inputArray = inputArray.map(function(value){
		var tempArray = value.trim().split(/ +/);
		return tempArray.map(function(val){
			return parseInt(val);
		})
	});
	return inputArray;
}
 
function checkValidSides(trig){
	if(trig[2] >= trig[0] + trig[1] ){
		return false;
	}
	if(trig[1] >= trig[0] + trig[2] ){
		return false;
	}
	if(trig[0] >= trig[1] + trig[2] ){
		return false;
	}
	return true;
}

function transposeTriangles(inTris){
	var newTris = [];
	for(var i=0;i<inTris.length;i+=3){
		for(var j=0;j<3;j++){
			newTris.push([inTris[i][j],inTris[i+1][j], inTris[i+2][j]]);
		}
	}
	return newTris;
}

function testData(){
	var testTriangle = [5,10,25];
	console.log(checkValidSides(testTriangle));
	var testTriangle2 = [5,10,14];
	console.log(checkValidSides(testTriangle2));	
}

function day3a(inTriangles) {
	var valid = 0;
	console.log("Total Triangles :"+inTriangles.length);
	for(var i=0;i<inTriangles.length;i++){
		if(checkValidSides(inTriangles[i])){
			valid++;
		}
	}
	console.log("Found Triangles: "+ valid);
}

function day3b(inTriangles) {
	var valid = 0;
	inTriangles = transposeTriangles(inTriangles);
	console.log("Total Triangles :"+inTriangles.length);
	for(var i=0;i<inTriangles.length;i++){
		if(checkValidSides(inTriangles[i])){
			valid++;
		}
	}
	console.log("Found Triangles: "+ valid);
}

var triangles = readFile("inputDay3.txt");
testData();
console.log("Day 1 Part A");
day3a(triangles);
console.log("Day 1 Part B");
day3b(triangles);
