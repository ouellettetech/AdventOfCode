input = document.body.innerText.split("\n");
input.pop();// remove the final html character.

Array.prototype.insert = function ( index, ...items ) {
    this.splice( index, 0, ...items );
};

function compareNumbers(a, b) {
    return a - b;
}


testData = ['$ cd /',
'$ ls',
'dir a',
'14848514 b.txt',
'8504156 c.dat',
'dir d',
'$ cd a',
'$ ls',
'dir e',
'29116 f',
'2557 g',
'62596 h.lst',
'$ cd e',
'$ ls',
'584 i',
'$ cd ..',
'$ cd ..',
'$ cd d',
'$ ls',
'4060174 j',
'8033020 d.log',
'5626152 d.ext',
'7214296 k'];


function day01b(commandLog ){
    var treeStructure = parseInput(commandLog);
    var targetSize = 30000000 - (70000000 - treeStructure.root.size);
    var minimumSize = treeStructure.root.size; // biggest Size possible;
    treeStructure.allDirectories.forEach(element => {
        if(element.size > targetSize){
            if(element.size < minimumSize){
                minimumSize = element.size;
            }
        }
    });
    console.log(minimumSize);
}



function day01a(commandLog ){
    var treeStructure = parseInput(commandLog);
    var total= 0;
    treeStructure.allDirectories.forEach(element => {
        if(element.size < 100000){
            total+=element.size;
        }
    });
    console.log(total);
}



function parseInput(stringCmds ){
    var rootNode = {name:'/',directories:{'..': null},files:{}, size: 0};
    var allDirectories = [];
    currentLineIndex = 0;
    currentDirectory = rootNode;
    //console.log(stringCmds.length);
    while(currentLineIndex<stringCmds.length){
        // console.log("Current Directory");
        // console.log(currentDirectory);
        var currentLineValue = stringCmds[currentLineIndex].split(" ");
        switch(currentLineValue[0]){
            case '$':
                // console.log("Command");
                // console.log(currentLineValue);
                switch(currentLineValue[1]){
                    case 'cd':
                        switch(currentLineValue[2]){
                            case '/':
                                currentLineIndex++;
                                currentDirectory = rootNode;
                                break;
                            default:
                                currentDirectory = currentDirectory.directories[currentLineValue[2]];
                                currentLineIndex++;
                        }
                        break;
                    case 'ls': // Ignore since I'm just treating all files listed as ls results.
                        currentLineIndex++;
                        break;
                }
                break;
            case 'dir':
                // console.log("dir");
                // console.log(currentLineValue);
                var newDirectory = {};
                newDirectory.name = currentLineValue[1];
                newDirectory.directories = {};
                newDirectory.directories['/'] = rootNode;
                newDirectory.directories['..'] = currentDirectory;
                newDirectory.files = {};
                newDirectory.size = 0;
                currentDirectory.directories[currentLineValue[1]] = newDirectory;
                currentLineIndex++;
                allDirectories.push(newDirectory);
                break;
            default:
                // console.log("file");
                // console.log(currentLineValue);
                var newFile = {};
                newFile.name = currentLineValue[1];
                newFile.size = parseInt(currentLineValue[0]);
                currentDirectory.files[newFile.name] = newFile;
                currentDirectory.size+=newFile.size;
                var updateParent = currentDirectory.directories['..'];
                while(updateParent != null){ // already at root.
                    updateParent.size += newFile.size;
                    updateParent = updateParent.directories['..'];
                }
                currentLineIndex++;
                break;
        }
    }
    //console.log(rootNode);
    return {root: rootNode, allDirectories: allDirectories};
}


console.log("Test Data");
day01a(testData);
console.log("Test Part 2");
day01b(testData);
console.log("Day 01 Part A");
day01a(input);
console.log("Day 01 Part B");
day01b(input);


