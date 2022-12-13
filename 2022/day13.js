input = document.body.innerText.split("\n");
input.pop();// remove the final html character.

Array.prototype.insert = function ( index, ...items ) {
    this.splice( index, 0, ...items );
};

function compareNumbers(a, b) {
    return a - b;
}

function compareArray(a,b){
    var typeA = typeof(a);
    var typeB = typeof(b);
    //console.log("A Type: " + typeA + " B Type: " + typeB);

    if((typeA == "number") && (typeB == "number")){
        //console.log("A : " + a + " B : " + b);
        if(a<b){
            return true;
        };
        if(a>b){
            return false;
        }
        return null;
    }
    if(typeA == "number"){
        return compareArray([a],b);
    }
    if(typeB == "number"){
        return compareArray(a,[b]);
    }
    //console.log(typeA);
    var result;
    for(var index=0;index<a.length && index < b.length;index++){
        var result = compareArray(a[index], b[index]);
        if(result != null){
            return result;
        }
    };
    if(a.length<b.length){
        return true;   
    }
    if(b.length<a.length){
        return false;
    }
    return null;
}

testData = [
    "[1,1,3,1,1]",
    "[1,1,5,1,1]",
    "",
    "[[1],[2,3,4]]",
    "[[1],4]",
    "",
    "[9]",
    "[[8,7,6]]",
    "",
    "[[4,4],4,4]",
    "[[4,4],4,4,4]",
    "",
    "[7,7,7,7]",
    "[7,7,7]",
    "",
    "[]",
    "[3]",
    "",
    "[[[]]]",
    "[[]]",
    "",
    "[1,[2,[3,[4,[5,6,7]]]],8,9]",
    "[1,[2,[3,[4,[5,6,0]]]],8,9]",
    // "",
    // "[[10],[],[[[6,5,2]],[6,1,4,2,2],2,1],[],[2,2,[[10,8,5],5,[5]]]]",
    // "[[6],[],[10,3,[4],9,[[10,0,9,5]]],[[[3,10],[10,2,8,5],0,7],1,[[],4,3],2,6]]",
    // "",
    // "[[],[[],3,[]],[]]",
    // "[[4,1,[3,5,1]]]"
];

function day01b(distressMessage ){
    var total = 1;
    var parsedMessages = parseInput(distressMessage);
    var messages = [];
    messages = messages.concat(parsedMessages.first);
    messages = messages.concat(parsedMessages.second);
    messages.push([[2]]);
    messages.push([[6]]);
    messages.sort((a,b) => {
        var result = compareArray(a,b);
        if(result == null){
            return 0;
        }
        if(result){
            return -1;
        }
        return 1;
    });
    messages.forEach((element,index) => {
        if((JSON.stringify(element) == '[[2]]') || (JSON.stringify(element) == '[[6]]')){
            total=total*(index+1);
        } 
    });
    console.log(total);

}



function day01a(distressMessage ){
    var total = 0;
    var messages = parseInput(distressMessage);
    console.log(messages);
    for(var i=0;i<messages.first.length;i++){
        if(compareArray(messages.first[i],messages.second[i])){
            //console.log("Paid " + i + " is in correct order");
            total = total + i + 1;
        }
    }
    console.log(total);
}

function printState(state){
    //console.log("Head X:"+ state.head.x + " Y:"+ state.head.y);
    //console.log("Tail X:"+ state.tail.x + " Y:"+ state.tail.y);
}


function parseInput(distressMessage ){
    messages = {first: [], second: []};
    for(var i=0;i<distressMessage.length;i+=3){
        messages.first.push(parseOneLine(distressMessage[i]));
        messages.second.push(parseOneLine(distressMessage[i+1]));
    }
    return messages;
}

function parseOneLine(messagString){
    return JSON.parse(messagString);
}

function compareOnePair(first, second){
    return (compareArray(first,second)<=0);
}

console.log("Test Data");
day01a(testData);
console.log("Test Part 2");
day01b(testData);
console.log("Day 01 Part A");
day01a(input);
console.log("Day 01 Part B");
day01b(input);


