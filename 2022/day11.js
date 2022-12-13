input = document.body.innerText.split("\n");
input.pop();// remove the final html character.

Array.prototype.insert = function ( index, ...items ) {
    this.splice( index, 0, ...items );
};

function compareNumbers(a, b) {
    return a - b;
}


testData = [
"Monkey 0:",
"  Starting items: 79, 98",
"  Operation: new = old * 19",
"  Test: divisible by 23",
"    If true: throw to monkey 2",
"    If false: throw to monkey 3",
"",
"Monkey 1:",
"  Starting items: 54, 65, 75, 74",
"  Operation: new = old + 6",
"  Test: divisible by 19",
"    If true: throw to monkey 2",
"    If false: throw to monkey 0",
"",
"Monkey 2:",
"  Starting items: 79, 60, 97",
"  Operation: new = old * old",
"  Test: divisible by 13",
"    If true: throw to monkey 1",
"    If false: throw to monkey 3",
"",
"Monkey 3:",
"  Starting items: 74",
"  Operation: new = old + 3",
"  Test: divisible by 17",
"    If true: throw to monkey 0",
"    If false: throw to monkey 1"];

function day01b(monkeyString ){
    var monkeys = parseInput(monkeyString);
    var lcd = 1; // Least Common Multiple Since all the numers are prime, just mult.
    monkeys.forEach(monkey=> lcd = monkey.Test.divisible*lcd);
    console.log(lcd);
    monkeys.forEach(monkey=> monkey.divider = lcd);
    console.log(monkeys);
    for(var i=0;i<10000;i++){
        playOneRound(monkeys);
    }
    monkeys.sort((monkey1, monkey2) => compareNumbers(monkey2.inspected,monkey1.inspected));
    console.log(monkeys);
    console.log(lcd);
    console.log(monkeys[0].inspected* monkeys[1].inspected);
}



function day01a(monkeyString ){
    var state = {
        count:0,
        grid:[],
        head:{x:0,y:0},
        tail:{x:0,y:0},
    }
    
    var monkeys = parseInput(monkeyString);
    monkeys.forEach(monkey=> monkey.divider = 3);
    console.log(monkeys);
    for(var i=0;i<20;i++){
        playOneRound(monkeys);
    }
    monkeys.sort((monkey1, monkey2) => compareNumbers(monkey2.inspected,monkey1.inspected));
    console.log(monkeys);
    console.log(monkeys[0].inspected* monkeys[1].inspected);
    // console.log(state.grid);
    // console.log(state.count);
}

function printState(state){
    //console.log("Head X:"+ state.head.x + " Y:"+ state.head.y);
    //console.log("Tail X:"+ state.tail.x + " Y:"+ state.tail.y);
}

function playOneRound(monkeys){
    monkeys.forEach(curMonkey => {
        var operation;
        switch(curMonkey.New.op){
            case '*':
                if(curMonkey.New.arg == 'old'){
                    operation = function(worryLevel){
                        return worryLevel*worryLevel;
                    }    
                } else {
                    operation = function(worryLevel){
                        return worryLevel*curMonkey.New.arg;
                    }
                }
                break;
            case '+':
                if(curMonkey.New.arg == 'old'){
                    operation = function(worryLevel){
                        return worryLevel+worryLevel;
                    }    
                } else {
                    operation = function(worryLevel){
                        return worryLevel+curMonkey.New.arg;
                    }
                }
                break;
        }
        curMonkey.items.forEach(curItem => {
            curMonkey.inspected++;
            var newWorry = operation(curItem);
            if(curMonkey.divider == 3){
                newWorry = Math.floor(newWorry/curMonkey.divider);
            } else {
                newWorry = newWorry%curMonkey.divider;
            }
            if((newWorry%curMonkey.Test.divisible) == 0){
                monkeys[curMonkey.Test.True].items.push(newWorry);
            } else {
                monkeys[curMonkey.Test.False].items.push(newWorry);
            }
        }); 
        curMonkey.items = [];
    });
    //console.log(monkeys);
}

function parseInput(monkeyString ){
    var monkeys = [];
    monkeyString.forEach((element, index) => {
        line = index%7;
        monkeyNum = Math.floor(index/7);
        switch(line){
            case 0:
                monkeys[monkeyNum] = {id: parseInt(element.split(' ')[1].split(':')), inspected: 0};
                break;
            case 1:
                monkeys[monkeyNum].items = element.split(": ")[1].split(", ").map(item => {
                    return parseInt(item);
                });         
                break;
            case 2:
                var parts = element.split(' ');
                monkeys[monkeyNum].New = {op: parts[6], arg: (parts[7] == 'old') ? 'old' : parseInt(parts[7])};
                break;
            case 3:
                monkeys[monkeyNum].Test = {divisible: parseInt(element.split(' ')[5])};
                break;
            case 4:
                monkeys[monkeyNum].Test.True = parseInt(element.split(' ')[9]);
                break;
            case 5:
                monkeys[monkeyNum].Test.False = parseInt(element.split(' ')[9]);
                break;
        }
    });
    //console.log(monkeys);
    return monkeys;
}


console.log("Test Data");
day01a(testData);
console.log("Test Part 2");
day01b(testData);
console.log("Day 01 Part A");
day01a(input);
console.log("Day 01 Part B");
day01b(input);


