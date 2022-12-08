input = document.body.innerText.split("\n");
input.pop();// remove the final html character.

Array.prototype.insert = function ( index, ...items ) {
    this.splice( index, 0, ...items );
};

function compareNumbers(a, b) {
    return a - b;
}


testData = ['30373',
'25512',
'65332',
'33549',
'35390'];


function day01b(forest ){
    var trees = parseInput(forest);
    var currentMax = 0;
    for(var i=0;i<trees.length;i++){
        for(var j=0;j<trees[i].length;j++){
            var scenicValue = findScenicValue(i,j, trees);
            if(scenicValue>currentMax){
                currentMax = scenicValue;
            }
        }
    }
    console.log(currentMax);
}

function findScenicValue(y,x, trees){
    var curTreeHeight = trees[y][x].size;
    var total = 1;
    //console.log("X: " + x + " Y: " + y);
    //look up
    var treesSeen=0;
    var done = false;
    for(i=y-1;i>=0 && !done; i--){
        if(trees[i][x].size>=curTreeHeight){
            done = true;
        }
        treesSeen++;
    };
    //console.log(treesSeen);
    total = total * treesSeen;
    //look down
    treesSeen=0;
    done = false;
    for(i=y+1;i<trees.length && !done; i++){
        if(trees[i][x].size>=curTreeHeight){
            done = true;
        }
        treesSeen++;
    };
    //console.log(treesSeen);
    total = total * treesSeen;
    //look left
    treesSeen=0;
    done = false;
    for(i=x-1;i>=0 && !done; i--){
        if(trees[y][i].size>=curTreeHeight){
            done = true;
        }
        treesSeen++;
    };
    //console.log(treesSeen);
    total = total * treesSeen;
    //look right
    treesSeen=0;
    done = false;
    for(i=x+1;i<trees[y].length && !done ; i++){
        if(trees[y][i].size>=curTreeHeight){
            done = true;
        }
        treesSeen++;
    };
    //console.log(treesSeen);
    total = total * treesSeen;
    return total;
}


function day01a(forest ){
    var trees = parseInput(forest);
    var total= 0;
    total+=lookUp(trees);
    total+=lookDown(trees);
    total+=lookLeft(trees);
    total+=lookRight(trees);
    console.log(total);
}

function lookLeft(trees){
    var numVisible = 0;
    for(var i=0;i<trees.length;i++){
        var maxHeight = -1;
        for(var j=0;j<trees.length;j++){
            var currentTree = trees[i][j];
            if(currentTree.size>maxHeight){
                maxHeight = currentTree.size;
                if(!currentTree.visible){
                    currentTree.visible = true;
                    numVisible++;
                }
            }
        };
    };
    return numVisible;
}


function lookRight(trees){
    var numVisible = 0;
    for(var i=0;i<trees.length;i++){
        var maxHeight = -1;
        for(var j=trees[i].length-1;j>=0;j--){
            var currentTree = trees[i][j];
            if(currentTree.size>maxHeight){
                maxHeight = currentTree.size;
                if(!currentTree.visible){
                    currentTree.visible = true;
                    numVisible++;
                }
            }
        }
    };
    return numVisible;
}

function lookDown(trees){
    var numVisible = 0;
    for(var i=0;i<trees[0].length;i++){
        var maxHeight = -1;
        for(var j=0;j<trees.length;j++){
            //console.log(""+ j + " x " + i);
            var currentTree = trees[j][i];
            if(currentTree.size>maxHeight){
                maxHeight = currentTree.size;
                if(!currentTree.visible){
                    currentTree.visible = true;
                    numVisible++;
                }
            }
        }
    };
    return numVisible;
}

function lookUp(trees){
    var numVisible = 0;
    for(var i=0;i<trees[0].length;i++){
        var maxHeight = -1;
        for(var j=trees.length-1;j>=0;j--){
            //console.log(""+ j + " x " + i);
            var currentTree = trees[j][i];
            if(currentTree.size>maxHeight){
                maxHeight = currentTree.size;
                if(!currentTree.visible){
                    currentTree.visible = true;
                    numVisible++;
                }
            }
        }
    };
    return numVisible;
}

function parseInput(stringTrees ){
    var trees = [];
    stringTrees.forEach(element => {
        trees.push(element.split('').map((element) => {
            return {size: parseInt(element), visited: false, visible: false}
        }));
    });


    console.log(trees);
    return trees;
}


console.log("Test Data");
day01a(testData);
console.log("Test Part 2");
day01b(testData);
console.log("Day 01 Part A");
day01a(input);
console.log("Day 01 Part B");
day01b(input);


