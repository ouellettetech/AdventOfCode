input = document.body.innerText.split("\n");
input.pop();// remove the final html character.

Array.prototype.insert = function ( index, ...items ) {
    this.splice( index, 0, ...items );
};

function compareNumbers(a, b) {
    return a - b;
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
    "498,4 -> 498,6 -> 496,6",
    "503,4 -> 502,4 -> 502,9 -> 494,9"
];

function day01b(caveWallString ){
    var moves = 0;
    var grid = parseInput(caveWallString);
    
    while(dropOneUnitOfSandP2(grid,{x:500,y:0})){
        moves++;
    }
    console.log(grid);
    console.log(moves);
}

function dropOneUnitOfSandP2(grid,starting){
    //console.log("Dropping Sand...");
    if (getValue(grid,starting.x,starting.y) == 'O'){
        return false;
    }
    var sandComplete = false;
    var current = starting;
    while(!sandComplete){
        sandComplete = checkNextSandLocation(grid,current);
    }
    return true;
}

function day01a(caveWallString ){
    var moves = 0;
    var grid = parseInput(caveWallString);
    while(dropOneUnitOfSand(grid,{x:500,y:0})){
        moves++;
    }
    console.log(grid);
    console.log(moves);
}

function printState(state){
    //console.log("Head X:"+ state.head.x + " Y:"+ state.head.y);
    //console.log("Tail X:"+ state.tail.x + " Y:"+ state.tail.y);
}

function dropOneUnitOfSand(grid,starting){
    //console.log("Dropping Sand...");
    var sandComplete = false;
    var current = starting;
    //console.log("Off the Grid..." +isOffGrid(grid,current.y) );
    while(!(sandComplete || isOffGrid(grid,current.y))){
        sandComplete = checkNextSandLocation(grid,current);
    }
    //console.log("After While Loop...");
    return sandComplete;
}

function checkNextSandLocation(grid,current){
    //console.log("Current X: " + current.x + " Y: " + current.y);
    if(getValue(grid,current.x,current.y+1) == '.'){
        current.y++;
        return false;
    }
    if(getValue(grid,current.x-1,current.y+1) == '.'){
        current.x--;
        current.y++;
        return false;
    }
    if(getValue(grid,current.x+1,current.y+1) == '.'){
        current.x++;
        current.y++;
        return false;
    }
    setValue(grid,current.x,current.y,'O');
    return true;
}

function parseInput(caveWallString ){
    var grid = {};
    grid.array = [];
    caveWallString.forEach(oneLine => {
        drawOneLine(grid,oneLine);
    });
    grid.maxDepth = grid.array.length;
    return grid;
}

function drawOneLine(grid,oneLine){
    var path = oneLine.split(' -> ');
    //console.log(path);
    var splitPath = path[0].split(',');
    var last = {x:parseInt(splitPath[0]),y:parseInt(splitPath[1])};
    var current;
    for(var index=1;index<path.length;index++){
        //console.log("Drawing path at index : " + index);
        splitPath = path[index].split(',');
        var current = {x:parseInt(splitPath[0]),y:parseInt(splitPath[1])};
        //console.log("Last X: " + last.x + " Y: " + last.y + " Current X: " + current.x + " Y: " + current.y);
        var higher,lower;
        if(current.x == last.x){
            if(current.y<=last.y){
                lower = current;
                higher = last;
            } else {
                higher = current;
                lower = last;
            }
            //console.log("Y Lower X: " + lower.x + " Y: " + lower.y + " higher X: " + higher.x + " Y: " + higher.y);
            for(var yIndex = lower.y; yIndex <= higher.y; yIndex++){
                setValue(grid,current.x,yIndex,'#');
            }
        } else {
            if(current.y == last.y){
                if(current.x<=last.x){
                    lower = current;
                    higher = last;
                } else {
                    higher = current;
                    lower = last;
                }
                //console.log("X Lower X: " + lower.x + " Y: " + lower.y + " higher X: " + higher.x + " Y: " + higher.y);
                for(var xIndex = lower.x; xIndex <= higher.x; xIndex++){
                    //console.log("X moving: "+ xIndex);
                    setValue(grid,xIndex,current.y,'#');
                }
            }
        }
        last = current;
    }
}

function isOffGrid(grid,y){
    return grid.maxDepth<=y;
}

function getValue(grid,x,y){
    if(grid.maxDepth<y){
        return '#';
    }
    if(grid.array[y] == undefined){
        return '.';
    }
    var returnVal = grid.array[y][x];
    if(returnVal == undefined){
        return '.';
    }
    return returnVal;
}
function setValue(grid,x,y, newValue){
    if(grid.array[y] == undefined){
        grid.array[y] = [];
    }
    grid.array[y][x] = newValue;
}

console.log("Test Data");
day01a(testData);
console.log("Test Part 2");
day01b(testData);
console.log("Day 01 Part A");
day01a(input);
console.log("Day 01 Part B");
day01b(input);


