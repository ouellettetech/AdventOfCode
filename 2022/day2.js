input = document.body.innerText.split("\n");
input.pop();// remove the final html character.

testData = ['A Y','B X','C Z'];

function day01b(strategy){
    var currentScore = 0;

    strategy.forEach(game => {
        currentScore+=gameResult2(game);
    });
    console.log(currentScore);
}

Array.prototype.insert = function ( index, ...items ) {
    this.splice( index, 0, ...items );
};

function day01a(strategy){
    var currentScore = 0;

    strategy.forEach(game => {
        currentScore+=gameResult(game);
    });
    console.log(currentScore);
}



// Rock = 1;
// Paper = 2;
// Scissors = 3;
function gameResult2(game){
    gameInput=game.split(' ');
    switch(gameInput[0]){
        case 'A': // Rock
            switch(gameInput[1]){
                case 'X': // Lose
                    return 3 + 0;
                case 'Y': // Draw
                    return 1 + 3;
                case 'Z': // Win
                    return 2 + 6;
            }
            break;
        case 'B': // Paper
            switch(gameInput[1]){
                case 'X': // Lose
                    return 1 + 0;
                case 'Y': // Draw
                    return 2 + 3;
                case 'Z': // Win
                    return 3 + 6;
            }
            break;
        case 'C': //Scissors
            switch(gameInput[1]){
                case 'X': // Lose
                    return 2 + 0;
                case 'Y': // Draw
                    return 3 + 3;
                case 'Z': // Win
                    return 1 + 6;
            }
    }

}

function gameResult(game){
    gameInput=game.split(' ');
    switch(gameInput[0]){
        case 'A': // Rock
            switch(gameInput[1]){
                case 'X': // Rock
                    return 1 + 3;
                case 'Y': // Paper
                    return 2 + 6;
                case 'Z': // Scissors
                    return 3 + 0;
            }
            break;
        case 'B': // Paper
            switch(gameInput[1]){
                case 'X': // Rock
                    return 1 + 0;
                case 'Y': // Paper
                    return 2 + 3;
                case 'Z': // Scissors
                    return 3 + 6;
            }
            break;
        case 'C': //Scissors
            switch(gameInput[1]){
                case 'X': // Rock
                    return 1 + 6;
                case 'Y': // Paper
                    return 2 + 0;
                case 'Z': // Scissors
                    return 3 + 3;
            }
    }

}
console.log("Test Data");
day01a(testData);
console.log("Test Part 2");
day01b(testData);
console.log("Day 01 Part A");
day01a(input);
console.log("Day 01 Part B");
day01b(input);