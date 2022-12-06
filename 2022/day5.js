input = document.body.innerText.split("\n");
input.pop();// remove the final html character.

Array.prototype.insert = function ( index, ...items ) {
    this.splice( index, 0, ...items );
};

function compareNumbers(a, b) {
    return a - b;
}


testData = ['    [D]    ',
'[N] [C]    ',
'[Z] [M] [P]',
' 1   2   3 ',
'',
'move 1 from 2 to 1',
'move 3 from 1 to 3',
'move 2 from 2 to 1',
'move 1 from 1 to 2'];


function day01b(stringContainers ){
    var containerWithInstructions = parseInput(stringContainers);
    //console.log(containerWithInstructions);
    var containers = runInstructionsP2(containerWithInstructions.containers, containerWithInstructions.instructions);
    var output = "";
    containers.forEach(stack => {
        output+=(stack.pop());
    });
    console.log(output);
}



function day01a(stringContainers ){
    var containerWithInstructions = parseInput(stringContainers);
    //console.log(containerWithInstructions);
    var containers = runInstructions(containerWithInstructions.containers, containerWithInstructions.instructions);
    var output = "";
    containers.forEach(stack => {
        output+=(stack.pop());
    });
    console.log(output);
}


function runInstructionsP2(containers, instructions){
    var newContainers = containers.slice();
    // console.log("Containers:");
    // console.log(newContainers);
    // console.log("instructions:");
    // console.log(instructions);

    instructions.forEach(curInstruction => {
        var tempStack = newContainers[curInstruction.from-1].slice(newContainers[curInstruction.from-1].length-curInstruction.number);
        // console.log("Running Instruction");
        // console.log(tempStack);
        // console.log(newContainers[curInstruction.from-1].slice());
        newContainers[curInstruction.from-1] = newContainers[curInstruction.from-1].slice(0, newContainers[curInstruction.from-1].length-curInstruction.number);
        // console.log(newContainers[curInstruction.from-1].slice());
        // console.log(newContainers[curInstruction.to-1].slice());
        newContainers[curInstruction.to-1] = newContainers[curInstruction.to-1].concat(tempStack);
        // console.log(newContainers[curInstruction.to-1].slice());
    });
    //console.log(newContainers);
    return newContainers;
}

function runInstructions(containers, instructions){
    var newContainers = containers.slice();
    // console.log("Containers:");
    // console.log(newContainers);
    // console.log("instructions:");
    // console.log(instructions);

    instructions.forEach(curInstruction => {
         for(var i=0; i<curInstruction.number;i++){
             newContainers[curInstruction.to-1].push(newContainers[curInstruction.from-1].pop());
         }
    });
    return newContainers;
}

function parseContainers(stringContainers){
     // we can ignore the labels since the input is just numerical 1 based
    stringContainers.pop(stringContainers);
    //var labels =    stringContainers.pop(stringContainers);
    //var length = parseInt(label.split(' ').filter(element => element != "").pop());
    var containers = [];
    stringContainers.forEach(row => {
        for(var i=0;i*4<row.length;i++){
            var currentContainer = row.substring((i*4)+1,(i*4)+2);
            if(currentContainer != ' '){
                containers[i] = containers[i] || [];
                containers[i].unshift(currentContainer);
            }
        }
    });
    
    // console.log("Parsed Containers");
    // console.log(containers);
    return containers;
}

function parseInstructions(stringInstructions){
    var instructions = [];
    stringInstructions.forEach(instruciton => {
        var instructionTemp = instruciton.split(" ");
        var cur = {};
        cur.number = parseInt(instructionTemp[1]);
        cur.from =  parseInt(instructionTemp[3]);
        cur.to =    parseInt(instructionTemp[5]);
        instructions.push(cur);
    });
    // console.log("Parsed Instructions");
    // console.log(instructions);
    return instructions;
}

function parseInput(stringContainers){
    var split = stringContainers.findIndex(element => element === '');
    //console.log("Split: "+split);
    var containers = parseContainers(stringContainers.slice(0, split));
    var instructions = parseInstructions(stringContainers.slice(split+1));
    return {containers: containers, instructions: instructions};
}


console.log("Test Data");
day01a(testData);
console.log("Test Part 2");
day01b(testData);
console.log("Day 01 Part A");
day01a(input);
console.log("Day 01 Part B");
day01b(input);


