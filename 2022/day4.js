input = document.body.innerText.split("\n");
input.pop();// remove the final html character.

Array.prototype.insert = function ( index, ...items ) {
    this.splice( index, 0, ...items );
};

function compareNumbers(a, b) {
    return a - b;
}


testData = ['2-4,6-8',
    '2-3,4-5',
    '5-7,7-9',
    '2-8,3-7',
    '6-6,4-6',
    '2-6,4-8'];


function day01b(pairs){
    var subsetPair = 0;
    pairs.forEach(curPair => {
        if(containsOverlap(curPair)){
            //console.log("Contains a Pair: ");
            //console.log(curPair);
            subsetPair++;
        }
    });
    console.log(subsetPair);
}



function day01a(pairs ){
    var subsetPair = 0;
    pairs.forEach(curPair => {
        if(containsPair(curPair)){
            //console.log("Contains a Pair: ");
            //console.log(curPair);
            subsetPair++;
        }
    });
    console.log(subsetPair);
}

function containsOverlap(stringPair){
    var curPair = parsePair(stringPair);
    return checkOverlap(curPair.pair1,curPair.pair2);
}

function containsPair(stringPair){
    var curPair = parsePair(stringPair);
    return checkContains(curPair.pair1,curPair.pair2);
}

function parsePair(stringPair){
    var result = {};
    var ranges = stringPair.split(',');
    var firstPair = ranges[0].split('-');
    var secondPair = ranges[1].split('-');
    result.pair1 = {};
    result.pair2 = {};
    result.pair1.start = parseInt(firstPair[0]);
    result.pair1.end = parseInt(firstPair[1]);
    result.pair2.start = parseInt(secondPair[0]);
    result.pair2.end = parseInt(secondPair[1]);
    return result;
}

function checkContains(pair1, pair2){
    if((pair1.start>=pair2.start) && (pair1.end<=pair2.end)){
        return true;
    }
    if((pair2.start>=pair1.start) && (pair2.end<=pair1.end)){
        return true;
    }
    return false;
}


function checkOverlap(pair1, pair2){
    if((pair1.start>=pair2.start) && (pair1.start<=pair2.end)){
        return true;
    }
    if((pair2.start>=pair1.start) && (pair2.start<=pair1.end)){
        return true;
    }
    if((pair1.end>=pair2.start) && (pair1.end<=pair2.end)){
        return true;
    }
    if((pair2.end>=pair1.start) && (pair2.end<=pair1.end)){
        return true;
    }
    return false;
}



console.log("Test Data");
day01a(testData);
console.log("Test Part 2");
day01b(testData);
console.log("Day 01 Part A");
day01a(input);
console.log("Day 01 Part B");
day01b(input);


