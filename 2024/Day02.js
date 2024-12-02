input = document.body.innerText.split("\n");
input.pop();// remove the final html character.

testData = ['7 6 4 2 1',
    '1 2 7 8 9',
    '9 7 6 2 1',
    '1 3 2 4 5',
    '8 6 4 4 1',
    '1 3 6 7 9',
    '1 3 6 7 9 2',
    '9 11 11 13 14 14',
    '9 11 13 15 18 20 21 24',
    '12 15 16 15 17 18 22'];

function checkLine(input) {
    var curArray = input.split(' ');
    if (curArray.length == 1) {
        return 1;
    }
    var decrease = curArray[0] > curArray[1];
    var last = curArray[0]
    //console.log("Starting check")
    for (var i = 1; i < curArray.length; i++) {
        //        console.log(i)
        //        console.log(decrease)
        var diff = (curArray[i] * 1) - last
        //        console.log(diff)
        if (decrease) {
            diff = diff * -1;
        }
        if (diff <= 0 || diff > 3) {
            return 0
        }
        last = (curArray[i] * 1)
    }
    return 1
}

function checkLinePart2(input) {
    var curArray = input.split(' ').map(Number);
    var dampner = false
    if (curArray.length == 1) {
        return 1;
    }
    var decrease = curArray[0] > curArray[1];
    var last = curArray[0]
    //console.log("Starting check")
    for (var i = 1; i < curArray.length; i++) {
        //        console.log(i)
        //        console.log(decrease)
        var diff = (curArray[i] * 1) - last
        //        console.log(diff)
        if (decrease) {
            diff = diff * -1;
        }
        if (diff <= 0 || diff > 3) {
            if (dampner) {
                return 0
            }
            else {
                dampner = true
            }
        } else {
            last = curArray[i]
        }
    }
    return 1
}

function day02a(input) {
    var total = 0;
    input.forEach(line => {
        var current = checkLine(line)
        console.log(line)
        console.log(current)
        total = total + current
    })
    return total
}


function day02b(input) {
    var total = 0;
    input.forEach(line => {
        var current = checkLinePart2(line)
        if (current == 0) {
            var temp = line.split(" ")
            for (var i = 0; i < temp.length; i++) {
                var test = [...temp.slice(0, i), ...temp.slice(i + 1)];
                current = current || checkLine(test.join(" "))
            }
            if (current == 0) {
                temp = line.split(" ")
                var first = temp.shift()
                temp.shift()
                temp.unshift(first)
                current = checkLine(temp.join(" "))
            }
        }
        total = total + current
    })
    return total
}


console.log("Test Data");
console.log(day02a(testData));
console.log("Test Part 2");
day02b(testData);
console.log("Day 02 Part A");
day02a(input);
console.log("Day 02 Part B");
console.log(day02b(input));
