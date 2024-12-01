input = document.body.innerText.split("\n");
input.pop();// remove the final html character.

testData = ['3   4', '4   3', '2   5', '1   3', '3   9', '3   3']

function day01a(input) {
    listA = []
    listB = []
    input.forEach(line => {
        curLine = line.split(" ")
        listA.push(curLine[0])
        listB.push(curLine[3])
    })
    listA.sort()
    listB.sort()
    console.log(listA)
    console.log(listB)
    var total = 0

    for (var i = 0; i < listA.length; i++) {
        total = total + Math.abs(listA[i] - listB[i])
    }
    return total
}


function day01b(input) {
    listA = []
    listB = []
    input.forEach(line => {
        curLine = line.split(" ")
        listA.push(curLine[0])
        listB.push(curLine[3])
    })
    var total = 0
    listA.forEach(lineAItem => {
        var current = 0
        listB.forEach(lineBItem => { // Would be faster to sort both lists, 
            // and then walk the lists so that it's O(N) instead of O(N^2)
            // The sample data is only 1000 items so fast enough.
            if (lineAItem == lineBItem) {
                current = current + (lineAItem * 1)
            }
        })
        console.log(current)
        total = total + current
    })
    return total
}


console.log("Test Data");
day01a(testData);
console.log("Test Part 2");
day01b(testData);
console.log("Day 01 Part A");
day01a(input);
console.log("Day 01 Part B");
day01b(input);