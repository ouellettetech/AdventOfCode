// This is the traditional Traveling Salesman problem, so there isn't a "good" solution, so I'm stuck brute forcing.

var locations="Tristram to AlphaCentauri = 34\nTristram to Snowdin = 100\nTristram to Tambi = 63\nTristram to Faerun = 108\nTristram to Norrath = 111\nTristram to Straylight = 89\nTristram to Arbre = 132\nAlphaCentauri to Snowdin = 4\nAlphaCentauri to Tambi = 79\nAlphaCentauri to Faerun = 44\nAlphaCentauri to Norrath = 147\nAlphaCentauri to Straylight = 133\nAlphaCentauri to Arbre = 74\nSnowdin to Tambi = 105\nSnowdin to Faerun = 95\nSnowdin to Norrath = 48\nSnowdin to Straylight = 88\nSnowdin to Arbre = 7\nTambi to Faerun = 68\nTambi to Norrath = 134\nTambi to Straylight = 107\nTambi to Arbre = 40\nFaerun to Norrath = 11\nFaerun to Straylight = 66\nFaerun to Arbre = 144\nNorrath to Straylight = 115\nNorrath to Arbre = 135\nStraylight to Arbre = 127";

function getDistances(locs){
	var distance = [];
	for(var i=0;i<locs.length;i++){
		var cur = {};
		cur.distance = parseInt(locs[i].split(" = ")[1]);
		var cities = locs[i].split(" ");
		cur.city1=cities[0];
		cur.city2=cities[2]; // [1] is the to string.
		distance.push(cur);
	}
	return distance;
}

function createMap(distances){
	var locationsMap={};
	for(var i=0;i<distances.length;i++){
		var curDist=distances[i];
		locationsMap[curDist.city1] = locationsMap[curDist.city1] || {};
		locationsMap[curDist.city2] = locationsMap[curDist.city2] || {};
		locationsMap[curDist.city1][curDist.city2] = curDist.distance;
		locationsMap[curDist.city2][curDist.city1] = curDist.distance; // distances in both directions.
	}
	return locationsMap;
}

function findPath(map, locationsLeft, compareFunc, currentLocation){
	if(locationsLeft.length===0){
		return {dist: 0, path: []};
	}
	var addedDistance=currentLocation ? map[currentLocation][locationsLeft[0]] : 0;// so it works on first call.
	var tempArray=locationsLeft.slice();

	tempArray.splice(0,1);
	var currentLoc=locationsLeft[0];
	var newDistance=findPath(
		map,
		tempArray,
		compareFunc,
		currentLoc);
	newDistance.dist += addedDistance;
	var shortestDistance = newDistance;
	for(var i=1;i<locationsLeft.length;i++){
		addedDistance=currentLocation ? map[currentLocation][locationsLeft[i]] : 0;// so it works on first call.
		var tempArray=locationsLeft.slice();
		tempArray.splice(i,1);
		var newDistance=findPath(
			map,
			tempArray,
			compareFunc,
			locationsLeft[i]);
		newDistance.dist += addedDistance;
		if(compareFunc(newDistance.dist, shortestDistance.dist)){
			currentLoc=locationsLeft[i];
			shortestDistance=newDistance;
		}
	}
	var path=[currentLoc];
	console.log(shortestDistance.path);
	path=path.concat(shortestDistance.path);
	return {dist: shortestDistance.dist, path: path};
}

function lessThan(a,b){
	return a<b;
}

function greaterThan(a,b){
	return a>b;
}

function testData(){
	var testLocs = "London to Dublin = 464\nLondon to Belfast = 518\nDublin to Belfast = 141";
	var dists=getDistances(testLocs.split("\n"));
	var maps=createMap(dists);
	console.log(findPath(maps,Object.keys(maps), lessThan));
}


function day9a(input){
	var dists=getDistances(input.split("\n"));
	var maps=createMap(dists);
	var results=findPath(maps,Object.keys(maps), lessThan);
	console.log(results);
	return results;
}

function day9b(input) {
	var dists=getDistances(input.split("\n"));
	var maps=createMap(dists);
	var results=findPath(maps,Object.keys(maps), greaterThan);
	console.log(results);
	return results;
}

//testData();
day9b(locations);
