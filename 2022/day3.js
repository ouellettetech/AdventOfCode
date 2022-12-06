input = document.body.innerText.split("\n");
input.pop();// remove the final html character.

testData = ['vJrwpWtwJgWrhcsFMMfFFhFp',
    'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
    'PmmdzqPrVvPwwTWBwg',
    'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
    'ttgJtRGJQctTZtZT',
    'CrZsJsPPZsGzwwsLwLmpwMDw'];


function day01b(rucksacks){
    var totalValue = 0;
    for(var i=0;i<rucksacks.length;i+=3){
        totalValue += getRuckSackGroupValue(rucksacks[i],rucksacks[i+1],rucksacks[i+2]);
    }
    console.log(totalValue);
}

Array.prototype.insert = function ( index, ...items ) {
    this.splice( index, 0, ...items );
};

function day01a(rucksacks ){
    var totalValue = 0;
    rucksacks.forEach(curSack => {
        totalValue += getRuckSackValue(curSack);
       // console.log("New Sack Value: "+ getRuckSackValue(curSack));
    });
    console.log(totalValue);
}

function getRuckSackGroupValue(sack1, sack2, sack3){
    var firstSack = sack1.split('').map(element => convertToInt(element)).sort(compareNumbers);
    var secondSack = sack2.split('').map(element => convertToInt(element)).sort(compareNumbers);
    var thirdSack = sack3.split('').map(element => convertToInt(element)).sort(compareNumbers);
    // console.log("Current Sack Values: ");
    // console.log(firstSack);
    // console.log(secondSack);
    // console.log(thirdSack);
    var firstSackIndex = 0;
    var secondSackIndex = 0;
    var thirdSackIndex = 0;
    while((firstSackIndex<firstSack.length) && (secondSackIndex<secondSack.length) && (thirdSackIndex<thirdSack.length)){
        // console.log("Current Value: ");
        // console.log(firstSack[firstSackIndex]);
        // console.log(secondSack[secondSackIndex]);
        // console.log(thirdSack[thirdSackIndex]);
        if((firstSack[firstSackIndex] == secondSack[secondSackIndex]) && 
        (secondSack[secondSackIndex] == thirdSack[thirdSackIndex])){
            return firstSack[firstSackIndex];
        } else {
            if((firstSack[firstSackIndex] < secondSack[secondSackIndex]) || 
            (firstSack[firstSackIndex] < thirdSack[thirdSackIndex])){
                firstSackIndex++;
            } else {
                if((secondSack[secondSackIndex] < firstSack[firstSackIndex]) || 
                (secondSack[secondSackIndex] < thirdSack[thirdSackIndex])) {
                    secondSackIndex++;
                } else {
                    thirdSackIndex++;
                }
            }
        }
    }
    return 0;
}

function getRuckSackValue(curSack){
    var sacks = splitRuckSacks(curSack);
    //console.log("Ruck Sack Value: ");
    //console.log(sacks);
    var firstSackIndex = 0;
    var secondSackIndex = 0;
    while((firstSackIndex<sacks[0].length) && (secondSackIndex<sacks[1].length)){
        if(sacks[0][firstSackIndex] == sacks[1][secondSackIndex]){
            return sacks[0][firstSackIndex];
        } else {
            if(sacks[0][firstSackIndex] > sacks[1][secondSackIndex]){
                secondSackIndex++;
            } else {
                firstSackIndex++;
            }
        }
    }
    return 0;
}

function splitRuckSacks(curSack){
    var first = curSack.substring(0, curSack.length/2).split('').map(element => convertToInt(element));
    var second = curSack.substring(curSack.length/2).split('').map(element => convertToInt(element));
    first.sort(compareNumbers);
    second.sort(compareNumbers);
    return [first,second];
}

function compareNumbers(a, b) {
    return a - b;
  }

function convertToInt(character){
    var Avalue = 'A'.charCodeAt();
    var avalue = 'a'.charCodeAt();
    var curCode = character.charCodeAt() - Avalue;
    if(curCode > 26 ){
        return curCode - (avalue - Avalue) + 1;
    } else {
        return curCode + 27;
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


