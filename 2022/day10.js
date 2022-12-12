input = document.body.innerText.split("\n");
input.pop();// remove the final html character.

Array.prototype.insert = function ( index, ...items ) {
    this.splice( index, 0, ...items );
};

function compareNumbers(a, b) {
    return a - b;
}

testData = ['noop',
'addx 3',
'addx -5'];

testData2 = ["addx 15",
"addx -11",
"addx 6",
"addx -3",
"addx 5",
"addx -1",
"addx -8",
"addx 13",
"addx 4",
"noop",
"addx -1",
"addx 5",
"addx -1",
"addx 5",
"addx -1",
"addx 5",
"addx -1",
"addx 5",
"addx -1",
"addx -35",
"addx 1",
"addx 24",
"addx -19",
"addx 1",
"addx 16",
"addx -11",
"noop",
"noop",
"addx 21",
"addx -15",
"noop",
"noop",
"addx -3",
"addx 9",
"addx 1",
"addx -3",
"addx 8",
"addx 1",
"addx 5",
"noop",
"noop",
"noop",
"noop",
"noop",
"addx -36",
"noop",
"addx 1",
"addx 7",
"noop",
"noop",
"noop",
"addx 2",
"addx 6",
"noop",
"noop",
"noop",
"noop",
"noop",
"addx 1",
"noop",
"noop",
"addx 7",
"addx 1",
"noop",
"addx -13",
"addx 13",
"addx 7",
"noop",
"addx 1",
"addx -33",
"noop",
"noop",
"noop",
"addx 2",
"noop",
"noop",
"noop",
"addx 8",
"noop",
"addx -1",
"addx 2",
"addx 1",
"noop",
"addx 17",
"addx -9",
"addx 1",
"addx 1",
"addx -3",
"addx 11",
"noop",
"noop",
"addx 1",
"noop",
"addx 1",
"noop",
"noop",
"addx -13",
"addx -19",
"addx 1",
"addx 3",
"addx 26",
"addx -30",
"addx 12",
"addx -1",
"addx 3",
"addx 1",
"noop",
"noop",
"noop",
"addx -9",
"addx 18",
"addx 1",
"addx 2",
"noop",
"noop",
"addx 9",
"noop",
"noop",
"noop",
"addx -1",
"addx 2",
"addx -37",
"addx 1",
"addx 3",
"noop",
"addx 15",
"addx -21",
"addx 22",
"addx -6",
"addx 1",
"noop",
"addx 2",
"addx 1",
"noop",
"addx -10",
"noop",
"noop",
"addx 20",
"addx 1",
"addx 2",
"addx 2",
"addx -6",
"addx -11",
"noop",
"noop",
"noop"];


function isImportantTime(currentTime){
    if(currentTime == 20){
        return true;
    }
    if(currentTime == 60){
        return true;
    }
    if(currentTime == 100){
        return true;
    }
    if(currentTime == 140){
        return true;
    }
    if(currentTime == 180){
        return true;
    }
    if(currentTime == 220){
        return true;
    }
    return false;
}
function day01b(instructions ){
    var curState = {
        pc:0,
        X:1,
        screen:[[],[],[],[],[],[]],
    }
    instructions.forEach(curInstruction => {
        parseOneInstruction(curInstruction,curState, true);
    })

    console.log(curState.screen);
    console.log(curState.screen[0].join(''));
    console.log(curState.screen[1].join(''));
    console.log(curState.screen[2].join(''));
    console.log(curState.screen[3].join(''));
    console.log(curState.screen[4].join(''));
    console.log(curState.screen[5].join(''));
}



function day01a(instructions ){
    var curState = {
        pc:1,
        X:1,
        total:0,
    }
    instructions.forEach(curInstruction => {
        parseOneInstruction(curInstruction,curState, false);
    })
    console.log(curState.total);
}

function printState(state){
    //console.log("Head X:"+ state.head.x + " Y:"+ state.head.y);
    //console.log("Tail X:"+ state.tail.x + " Y:"+ state.tail.y);
}

function checkState(curState){
    if(isImportantTime(curState.pc)){
        var strength = curState.pc * curState.X;
        console.log("Strength: "+strength);
        curState.total += strength;
    }
}

function checkStateP2(curState){
    console.log("check State P2");
    var sprite = '.';
    var curX = (curState.pc%40);
    var curY = Math.floor(curState.pc/40)
    if(curState.X == curX){
        sprite = '#'
    }
    if(curState.X-1 == curX){
        sprite = '#'
    }
    if(curState.X+1 == curX){
        sprite = '#'
    }
    curState.screen[curY][curX] = sprite;
}

function parseOneInstruction(instruction, curState,p2){
    var splitInstruction = instruction.split(" ");
    switch(splitInstruction[0]){
        case "noop":
            if(p2){
                checkStateP2(curState);
            }
            curState.pc++;
            if(!p2) {
                checkState(curState);
            }
            break;
        case "addx":
            if(p2){
                checkStateP2(curState);
            }
            curState.pc++;
            if(!p2) {
                checkState(curState);
            }
            if(p2){
                checkStateP2(curState);
            }
            curState.pc++;
            curState.X += parseInt(splitInstruction[1]);
            if(!p2){
                checkState(curState);
            }
            break;
    }
}


console.log("Test Data");
day01a(testData2);
console.log("Test Part 2");
day01b(testData2);
console.log("Day 01 Part A");
day01a(input);
console.log("Day 01 Part B");
day01b(input);


// ###..#....#..#.#....#..#.###..####.#..#.
// #..#.#....#..#.#....#.#..#..#....#.#..#.
// #..#.#....#..#.#....##...###....#..####.
// ###..#....#..#.#....#.#..#..#..#...#..#.
// #....#....#..#.#....#.#..#..#.#....#..#.
// #....####..##..####.#..#.###..####.#..#.

// PLULKBZH