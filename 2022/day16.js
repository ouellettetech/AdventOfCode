input = document.body.innerText.split("\n");
input.pop();// remove the final html character.

Array.prototype.insert = function ( index, ...items ) {
    this.splice( index, 0, ...items );
};

function compareNumbers(a, b) {
    return a - b;-++++++++++++
}

function compareArray(a,b){
    var typeA = typeof(a);
    var typeB = typeof(b);
    //console.log("A Type: " + typeA + " B Type: " + typeB);

    if((typeA == "number") && (typeB == "number")){
        //console.log("A : " + a + " B : " + b);
        if(a<b){
            return true;
        };
        if(a>b){
            return false;
        }
        return null;
    }
    if(typeA == "number"){
        return compareArray([a],b);
    }
    if(typeB == "number"){
        return compareArray(a,[b]);
    }
    //console.log(typeA);
    var result;
    for(var index=0;index<a.length && index < b.length;index++){
        var result = compareArray(a[index], b[index]);
        if(result != null){
            return result;
        }
    };
    if(a.length<b.length){
        return true;   
    }
    if(b.length<a.length){
        return false;
    }
    return null;
}

testData = [
    "Valve AA has flow rate=0; tunnels lead to valves DD, II, BB",
    "Valve BB has flow rate=13; tunnels lead to valves CC, AA",
    "Valve CC has flow rate=2; tunnels lead to valves DD, BB",
    "Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE",
    "Valve EE has flow rate=3; tunnels lead to valves FF, DD",
    "Valve FF has flow rate=0; tunnels lead to valves EE, GG",
    "Valve GG has flow rate=0; tunnels lead to valves FF, HH",
    "Valve HH has flow rate=22; tunnel leads to valve GG",
    "Valve II has flow rate=0; tunnels lead to valves AA, JJ",
    "Valve JJ has flow rate=21; tunnel leads to valve II""
];

function day01b(gridString ){
    var gridState = parseInput(gridString);
    var toVisit = []
    gridState.grid.forEach((row,yIndex) => row.forEach((currentLoc, xIndex)=> {
        if(currentLoc.level == 0){
            toVisit.push({x:xIndex,y:yIndex,distance:0});
        }
    }));
    //console.log(travelOptions(gridState.grid,toVisit[0]));
    //console.log("Following Graph...");
    while(gridState.grid[gridState.end.y][gridState.end.x].distance == Number.MAX_SAFE_INTEGER){
        var currentLocation = toVisit.shift();
        //console.log("Current Location Y: " + currentLocation.y + " X: " + currentLocation.x + " Distance : " + currentLocation.distance);
        //console.log("Previous Distance: " + gridState.grid[currentLocation.y][currentLocation.x].distance);
        if(currentLocation.distance<gridState.grid[currentLocation.y][currentLocation.x].distance){
            //console.log("getting new Locations...");
            gridState.grid[currentLocation.y][currentLocation.x].distance = currentLocation.distance;
            var newLocations = travelOptions(gridState.grid,currentLocation);
            //console.log(newLocations);
            toVisit = toVisit.concat(newLocations);
        }
        //console.log(toVisit);
    }
    console.log(gridState.grid[gridState.end.y][gridState.end.x].distance);
}


//dijkstra algorith.
function day01a(gridString ){
    // console.log(state.grid);
    // console.log(state.count);
    var gridState = parseInput(gridString);
    //console.log(gridState);
    var toVisit = [{x:gridState.start.x,y:gridState.start.y,distance:0}];
    //console.log(travelOptions(gridState.grid,toVisit[0]));
    //console.log("Following Graph...");
    while(gridState.grid[gridState.end.y][gridState.end.x].distance == Number.MAX_SAFE_INTEGER){
        var currentLocation = toVisit.shift();
        //console.log("Current Location Y: " + currentLocation.y + " X: " + currentLocation.x + " Distance : " + currentLocation.distance);
        //console.log("Previous Distance: " + gridState.grid[currentLocation.y][currentLocation.x].distance);
        if(currentLocation.distance<gridState.grid[currentLocation.y][currentLocation.x].distance){
            //console.log("getting new Locations...");
            gridState.grid[currentLocation.y][currentLocation.x].distance = currentLocation.distance;
            var newLocations = travelOptions(gridState.grid,currentLocation);
            //console.log(newLocations);
            toVisit = toVisit.concat(newLocations);
        }
        //console.log(toVisit);
    }
    console.log(gridState.grid[gridState.end.y][gridState.end.x].distance);
}

function canTravel(grid,curLevel,x,y){
    if(y<0){
        return false;
    }
    if(y>=grid.length){
        return false;
    }
    if(x<0){
        return false;
    }
    if(x>=grid[y].length){
        return false;
    }
    if(grid[y][x].level-1>curLevel){
        return false;
    }
    return true;
}

function travelOptions(grid,curLocation){
    var options = [];
    //console.log("Getting Travel Option X: "+curLocation.x + " Y: "+ curLocation.y);
    var possibleLocations = [
        {x:curLocation.x-1,y:curLocation.y,distance:curLocation.distance+1},
        {x:curLocation.x+1,y:curLocation.y,distance:curLocation.distance+1},
        {x:curLocation.x,y:curLocation.y-1,distance:curLocation.distance+1},
        {x:curLocation.x,y:curLocation.y+1,distance:curLocation.distance+1}];
    possibleLocations.forEach(newLocation => {
        if(canTravel(grid,grid[curLocation.y][curLocation.x].level,newLocation.x,newLocation.y)){
            options.push(newLocation);
        }
    });
    //console.log("Options..");
    //console.log(travelOptions);
    return options;
}

function parseInput(gridString){
    var state = {
        grid: [],
        start: {x:0, y:0},
        end: {x:0, y:0},
    }
    for(var curY=0;curY<gridString.length;curY++){
        state.grid.push(gridString[curY].split("").map((curLocation, curX) => {
            if(curLocation == 'S'){
                state.start.x = curX;
                state.start.y = curY;
                return {level: '0', distance: Number.MAX_SAFE_INTEGER};
            }
            if(curLocation == 'E'){
                state.end.x = curX;
                state.end.y = curY;
                return {level: '25', distance: Number.MAX_SAFE_INTEGER};
            }
            return {level: curLocation.charCodeAt()-'a'.charCodeAt(), distance: Number.MAX_SAFE_INTEGER};
        }));
    }
    return state;
}


console.log("Test Data");
day01a(testData);
console.log("Test Part 2");
//day01b(testData);
console.log("Day 01 Part A");
//day01a(input);
console.log("Day 01 Part B");
//day01b(input);


