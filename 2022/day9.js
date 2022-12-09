input = document.body.innerText.split("\n");
input.pop();// remove the final html character.

Array.prototype.insert = function ( index, ...items ) {
    this.splice( index, 0, ...items );
};

function compareNumbers(a, b) {
    return a - b;
}


testData = ['R 4',
'U 4',
'L 3',
'D 1',
'R 4',
'D 1',
'L 5',
'R 2'];

testData2 = ['R 5',
'U 8',
'L 8',
'D 3',
'R 17',
'D 10',
'L 25',
'U 20']


function day01b(path ){
    var state = {
        count:0,
        grid:[],
        knots:[{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    }
    state.tail = state.knots[9];
    updateGrid(state);
    path.forEach(movement => {
        curMove = movement.split(' ');
        switch(curMove[0]){
            case 'U':
                console.log("Moving Head UP.");
                for(var i=0;i<parseInt(curMove[1]);i++){
                    state.knots[0].y++;
                    printState(state);
                    for(var j=0;j<state.knots.length-1;j++){
                        updateTail({head:state.knots[j],tail:state.knots[j+1]});
                    }
                    updateGrid(state);
                }
                break;
            case 'D':
                console.log("Moving Head DOWN.");
                for(var i=0;i<parseInt(curMove[1]);i++){
                    state.knots[0].y--;
                    printState(state);
                    for(var j=0;j<state.knots.length-1;j++){
                        updateTail({head:state.knots[j],tail:state.knots[j+1]});
                    }
                    updateGrid(state);
                }
                break;
            case 'L':
                console.log("Moving Head LEFT.");
                for(var i=0;i<parseInt(curMove[1]);i++){
                    state.knots[0].x--;
                    printState(state);
                    for(var j=0;j<state.knots.length-1;j++){
                        updateTail({head:state.knots[j],tail:state.knots[j+1]});
                    }
                    updateGrid(state);
                }
                break;
            case 'R':
                console.log("Moving Head RIGHT.");
                for(var i=0;i<parseInt(curMove[1]);i++){
                    state.knots[0].x++;
                    printState(state);
                    for(var j=0;j<state.knots.length-1;j++){
                        updateTail({head:state.knots[j],tail:state.knots[j+1]});
                    }
                    updateGrid(state);
                }
                break;
        }
    });
    console.log(state.grid);
    console.log(state.count);
}



function day01a(path ){
    var state = {
        count:0,
        grid:[],
        head:{x:0,y:0},
        tail:{x:0,y:0},
    }
    updateGrid(state);
    path.forEach(movement => {
        curMove = movement.split(' ');
        switch(curMove[0]){
            case 'U':
                console.log("Moving Head UP.");
                for(var i=0;i<parseInt(curMove[1]);i++){
                    state.head.y++;
                    printState(state);
                    updateTail(state);
                    updateGrid(state);
                }
                break;
            case 'D':
                console.log("Moving Head DOWN.");
                for(var i=0;i<parseInt(curMove[1]);i++){
                    state.head.y--;
                    printState(state);
                    updateTail(state);
                    updateGrid(state);
                }
                break;
            case 'L':
                console.log("Moving Head LEFT.");
                for(var i=0;i<parseInt(curMove[1]);i++){
                    state.head.x--;
                    printState(state);
                    updateTail(state);
                    updateGrid(state);
                }
                break;
            case 'R':
                console.log("Moving Head RIGHT.");
                for(var i=0;i<parseInt(curMove[1]);i++){
                    state.head.x++;
                    printState(state);
                    updateTail(state);
                    updateGrid(state);
                }
                break;
        }
    });
    console.log(state.grid);
    console.log(state.count);
}

function printState(state){
    //console.log("Head X:"+ state.head.x + " Y:"+ state.head.y);
    //console.log("Tail X:"+ state.tail.x + " Y:"+ state.tail.y);
}

function updateTail(state){
    //console.log("Tail X: "+state.tail.x + " Y: "+ state.tail.y);
    var ydistance = state.head.y-state.tail.y;
    var xdistance = state.head.x-state.tail.x;
    if(Math.abs(ydistance) == 2){
        //Move Diagonly
        if(xdistance == 1){
            state.tail.x++;
        }
        if(xdistance == -1){
            state.tail.x--;
        }
        if(ydistance>0){
            state.tail.y++;
        }
        else {
            state.tail.y--;
        }
    }
    if(Math.abs(xdistance) == 2){
        //Move Diagonly
        if(ydistance == 1){
            state.tail.y++;
        }
        if(ydistance == -1){
            state.tail.y--;
        }
        if(xdistance>0){
            state.tail.x++;
        }
        else {
            state.tail.x--;
        }
    }
}
function updateGrid(state){
    //console.log("Grid Tail X: "+state.tail.x + " Y: "+ state.tail.y);
    //console.log(state.grid[state.tail.x] );
    if(!state.grid[state.tail.x]){
        //console.log("adding row...");
        state.grid[state.tail.x] = [];
    }
    if (!state.grid[state.tail.x][state.tail.y]){
        console.log("Updateing Grid Tail X: "+state.tail.x + " Y: "+ state.tail.y);
        state.grid[state.tail.x][state.tail.y] = true;
        state.count++;
    }
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
day01b(testData2);
console.log("Day 01 Part A");
day01a(input);
console.log("Day 01 Part B");
day01b(input);


