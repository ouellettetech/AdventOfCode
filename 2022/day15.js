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
    "Sensor at x=2, y=18: closest beacon is at x=-2, y=15",
    "Sensor at x=9, y=16: closest beacon is at x=10, y=16",
    "Sensor at x=13, y=2: closest beacon is at x=15, y=3",
    "Sensor at x=12, y=14: closest beacon is at x=10, y=16",
    "Sensor at x=10, y=20: closest beacon is at x=10, y=16",
    "Sensor at x=14, y=17: closest beacon is at x=10, y=16",
    "Sensor at x=8, y=7: closest beacon is at x=2, y=10",
    "Sensor at x=2, y=0: closest beacon is at x=2, y=10",
    "Sensor at x=0, y=11: closest beacon is at x=2, y=10",
    "Sensor at x=20, y=14: closest beacon is at x=25, y=17",
    "Sensor at x=17, y=20: closest beacon is at x=21, y=22",
    "Sensor at x=16, y=7: closest beacon is at x=15, y=3",
    "Sensor at x=14, y=3: closest beacon is at x=15, y=3",
    "Sensor at x=20, y=1: closest beacon is at x=15, y=3",
];

function day01b(sensorBeaconString,limit  ){
    var sensorBeacons = parseInput(sensorBeaconString);
    var foundX,foundY;
    foundX=foundY=-1;
    // for(let yValue=0;yValue<limit && foundY==-1;yValue++){
    //     console.log("Checking Row: " + yValue);
    //     }
    for(let currentLevel=0;currentLevel<limit;currentLevel++){
        var ranges = [];
        sensorBeacons.forEach(curSensor => {
            let curRange = getRangeAtLevel(curSensor,currentLevel, limit);
            if(curRange!= null){
                ranges.push(curRange);
            }
        });
        ranges.sort((a,b) => {
            return compareNumbers(a.min,b.min);
        })
        ranges = combineRanges(ranges);
        if((ranges[0].min != 0) || (ranges[0].max != limit)){
            console.log("X: "+ (ranges[0].max+1) + " Y: "+ currentLevel); // first number after the range...
            console.log("Frequency: "+ (4000000*(ranges[0].max+1) + currentLevel) );
            return;
        }
    }
}

function combineRanges(ranges){
    let combinedRange = [];
    let lastRange = ranges[0];
    combinedRange.push(lastRange);
    for(let index=1;index<ranges.length;index++){
        if(lastRange.max>= ranges[index].min){
            lastRange.max = Math.max(lastRange.max, ranges[index].max);
        }
        else {
            lastRange = ranges[index];
            combinedRange.push(lastRange);
        }
    }
    return combinedRange;
}

// function day01b(sensorBeaconString,limit  ){
//     var sensorBeacons = parseInput(sensorBeaconString);
//     var foundX,foundY;
//     foundX=foundY=-1;
//     for(let yValue=0;yValue<limit && foundY==-1;yValue++){
//         console.log("Checking Row: " + yValue);
//         grid = {array: []};
//         sensorBeacons.forEach(sbPair =>{
//             populateInvalid(grid,sbPair,yValue);
//         });
//         for(var xValue=0;xValue<limit && foundY== -1;xValue++){
//             if(getValue(grid,xValue,yValue) == '.'){
//                 console.log("Found X: "+ xValue + " Y: " + yValue);
//                 foundX = xValue;
//                 foundY = yValue;
//                 break;
//             }
//         }

//     }

//     console.log(sensorBeacons);
//     console.log(grid);
//     console.log(4000000 * foundX + foundY);
// }

function getRangeAtLevel(sensorBeacon, currentYValue, limit){
//    console.log("Sesnsor X:"+ sensorBeacon.sensor.x + " Y:"+ sensorBeacon.sensor.y + " MaxDistance: " + sensorBeacon.maxDistance);
    var remainder = sensorBeacon.maxDistance - Math.abs(sensorBeacon.sensor.y-currentYValue);
    if(remainder<0){

        return null;
    }
    var range = {min:sensorBeacon.sensor.x-remainder, max: sensorBeacon.sensor.x+remainder};
    if(range.min<0){
        if(range.max<0){
            //we are ignoring negative ranges
            return null;
        }
        range.min=0;
    }
    if(range.max>limit){
        if(range.min>limit){
            return null;
        }
        range.max=limit;
    }
//    console.log("Remainder: " + remainder + "Min X:"+ (sensorBeacon.sensor.x-remainder) + " Max:"+ (sensorBeacon.sensor.x+remainder));
    return range;
}

function populateInvalidP2(grid,sensorBeacon, limit){
    setValue(grid, sensorBeacon.sensor.x, sensorBeacon.sensor.y,'S');
    setValue(grid, sensorBeacon.beacon.x, sensorBeacon.beacon.y,'B');
    var maxDistance = getBeaconDistance(sensorBeacon);


    for(var yDiff=-maxDistance; yDiff<=maxDistance;yDiff++){
        var remainder = maxDistance-Math.abs(yDiff);
        //console.log("x Diff: " + xDiff + " remainder : " + remainder);
        yValue = sensorBeacon.sensor.y+yDiff;
        if(yValue >=0 && yValue < limit){ // limiting the area to look at
            for (var xDiff=-remainder; xDiff<=remainder;xDiff++){
                xValue = sensorBeacon.sensor.x+xDiff;
                if(xValue >=0 && xValue < limit){
                    if(getValue(grid, xValue, yValue) == '.'){
                        setValue(grid, xValue, yValue,'#');
                    }
                }
            }
        }
    }
}

function day01a(sensorBeaconString,checkRow ){
    var grid = {array: []};
    var sensorBeacons = parseInput(sensorBeaconString);
    sensorBeacons.forEach(sbPair =>{
        console.log("Populate Pair sensor X: "+ sbPair.sensor.x + " Y: " + sbPair.sensor.y + " Beacon X: " + sbPair.beacon.x + " Y: " + sbPair.beacon.y);
        populateInvalid(grid,sbPair,checkRow);
    });
    console.log(sensorBeacons);
    console.log(grid);
    
    invalidCount = 0;
    Object.keys(grid.array[checkRow]).forEach(currentX => {
        if(getValue(grid,currentX,checkRow) == '#'){
            invalidCount++;
        }
    });
    
    console.log(invalidCount);
}

function printState(state){
    //console.log("Head X:"+ state.head.x + " Y:"+ state.head.y);
    //console.log("Tail X:"+ state.tail.x + " Y:"+ state.tail.y);
}


function getBeaconDistance(sensorBeacon){
    var xdiff=Math.abs(sensorBeacon.sensor.x-sensorBeacon.beacon.x);
    var ydiff=Math.abs(sensorBeacon.sensor.y-sensorBeacon.beacon.y);
    return xdiff+ydiff;
}

function populateInvalid(grid,sensorBeacon, checkRow){
    setValue(grid, sensorBeacon.sensor.x, sensorBeacon.sensor.y,'S');
    setValue(grid, sensorBeacon.beacon.x, sensorBeacon.beacon.y,'B');
    var maxDistance = getBeaconDistance(sensorBeacon);


    for(var yDiff=-maxDistance; yDiff<=maxDistance;yDiff++){
        var remainder = maxDistance-Math.abs(yDiff);
        //console.log("x Diff: " + xDiff + " remainder : " + remainder);
        yValue = sensorBeacon.sensor.y+yDiff;
        if(yValue == checkRow){ // limiting to only the check row since we don't care about the others.
            for (var xDiff=-remainder; xDiff<=remainder;xDiff++){
                xValue = sensorBeacon.sensor.x+xDiff;
                if(getValue(grid, xValue, yValue) == '.'){
                    setValue(grid, xValue, yValue,'#');
                }
            }
        }
    }
}

function parseInput(sensorBeaconString ){
    var sensorBeacons = [];
    sensorBeaconString.forEach(currentSensorString => {
        var sensorSplit = currentSensorString.split(" ");
        let newBeacon = 
            {sensor: 
                {x: parseInt(sensorSplit[2].substring(2,sensorSplit[2].length)),
                 y: parseInt(sensorSplit[3].substring(2,sensorSplit[2].length))},
             beacon:
                {x: parseInt(sensorSplit[8].substring(2,sensorSplit[2].length)),
                 y: parseInt(sensorSplit[9].substring(2))}};
        newBeacon.maxDistance = getBeaconDistance(newBeacon);
        sensorBeacons.push(newBeacon);
    });
    return sensorBeacons;
}

function getValue(grid,x,y){
     // if(grid.maxDepth<y){
    //     return '#';
    // }
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
day01a(testData,10);
console.log("Test Part 2");
day01b(testData,20);
console.log("Day 01 Part A");
day01a(input,2000000);
console.log("Day 01 Part B");
day01b(input,4000000);


