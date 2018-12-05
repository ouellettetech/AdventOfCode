input = document.body.innerText.split("\n");
input.pop();// remove the final html character.


function day01b(adjustments){
    var found=false;
    var seenValues=[];
    var curValue=0;
    while(!found){
        adjustments.forEach(function(element) {
            if(!found){ // JavaScript doesn't support break, and the performance hit from looping through one isn't a concern. (vs, a for loop with two conditions)
                if(seenValues.includes(curValue)){
                    console.log("found dup");
                    console.log(curValue);
                    found=true;
                } else {
                    seenValues.push(curValue);
                    curValue+=parseInt(element);
                }
            }
        });
    }
}

function day01a(adjustments){
    var curValue=0;
    // I first solved Part A, by just pasting all the values into the developer console, since it just requires adding all the values.
    adjustments.forEach(function(element) {

        //console.log(parseInt(element));
        curValue+=parseInt(element);
    });
    console.log(curValue);
}

//testData();
console.log("Day 01 Part A");
day01a(input);
console.log("Day 01 Part B");
day01b(input);