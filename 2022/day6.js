input = document.body.innerText.split("\n");
input.pop();// remove the final html character.

testData1 = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb';
testData2 = 'bvwbjplbgvbhsrlpgdmjqwftvncz';
testData3 = 'nppdvjthqldpwncqszvftbrmjlhg';
testData4 = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg';
testData5 = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw';

function day01b(buffer){
    var prevcars = [];
    var doneLooking = false;

    buffer.split('').forEach(function(curChar,index) {
        if(!doneLooking){
            prevcars.push(curChar);
            if(prevcars.length==14){
                //console.log("Current Char: "+ curChar);
                //console.log("Prev Chars: "+prevcars);
                if(allCharsDifferent(prevcars)){
                    console.log(index+1); // the signal is 1 based
                    doneLooking = true;
                }
                prevcars.shift();
            }
            
        }
    });
}

Array.prototype.insert = function ( index, ...items ) {
    this.splice( index, 0, ...items );
};

function day01a(buffer){
    var prevcars = [];
    var doneLooking = false;

    buffer.split('').forEach(function(curChar,index) {
        if(!doneLooking){
            prevcars.push(curChar);
            if(prevcars.length==4){
                //console.log("Current Char: "+ curChar);
                //console.log("Prev Chars: "+prevcars);
                if(allCharsDifferent(prevcars)){
                    console.log(index+1); // the signal is 1 based
                    doneLooking = true;
                }
                prevcars.shift();
            }
            
        }
    });
}


function allCharsDifferent(charArray){
    for(var i=0;i<charArray.length;i++){
        for(var j=i+1;j<charArray.length;j++){
            if(charArray[i] == charArray[j]){
                return false;
            }
        }
    }
    return true;
}

console.log("Test Data");
day01a(testData1);
day01a(testData2);
day01a(testData3);
day01a(testData4);
day01a(testData5);
console.log("Test Part 2");
day01b(testData1);
day01b(testData2);
day01b(testData3);
day01b(testData4);
day01b(testData5);
console.log("Day 01 Part A");
day01a(input[0]);
console.log("Day 01 Part B");
day01b(input[0]);