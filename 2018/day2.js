input = document.body.innerText.split("\n");
input.pop();// remove the final html character.
console.log(input);


function createLetterDictionary(currentString){ // We actually only care if there is exactly 2, or 3 for part A, but usually Part B is easier if you create the Data Objects.
    var letterDict = {};
    currentString.split("").forEach(function(curLetter) {
        if(Object.keys(letterDict).includes(curLetter)){
            letterDict[curLetter]+=1;
        } else {
            letterDict[curLetter]=1;
        }
    });
    return letterDict;
}

function checkIfClose(firstBox, secondBox){
    var currentDif=0;
    var arrayBox1 = firstBox.split("");
    var arrayBox2 = secondBox.split("");
    for(var i=0;i<arrayBox1.length && currentDif <= 1;i++){// assuming the same size since we control input
        //console.log("Comparing "+arrayBox1[i] + "And "+ arrayBox2[i]);
        if(arrayBox1[i]!=arrayBox2[i]){
            currentDif++;
        }
    }
    return (currentDif<=1);
}

function testData(){
    var test1 = "abcdef" //  contains no letters that appear exactly two or three times.
    var test2 = "bababc" //contains two a and three b, so it counts for both.
    var test3 = "abbcde" //contains two b, but no letter appears exactly three times.
    var test4 = "abcccd" //contains three c, but no letter appears exactly two times.
    var test5 = "aabcdd" //contains two a and two d, but it only counts once.
    var test6 = "abcdee" //contains two e.
    var test7 = "ababab" //contains three a and three b, but it only counts once.
    console.log(createLetterDictionary(test1));
    console.log(createLetterDictionary(test2));
    console.log(createLetterDictionary(test3));
    console.log(createLetterDictionary(test4));
    console.log(createLetterDictionary(test5));
    console.log(createLetterDictionary(test6));
    console.log(createLetterDictionary(test7));
    console.log(checkIfClose("fghij","fguij"));
    console.log(checkIfClose("abcde","axcye"));


}
function day02a(boxes){
    var twos = 0;
    var threes = 0;
    boxes.forEach(function(element){
       if(Object.values(createLetterDictionary(element)).includes(2)){
           twos++;
       }
       if(Object.values(createLetterDictionary(element)).includes(3)){
        threes++;
       }
    });
    return twos * threes;

}
function day02b(boxes){
    var found=false;
    var box1;
    var box2;
    for(var i=0;i<boxes.length && !found;i++){
        for(var j=i+1;j<boxes.length && !found; j++){
            if(checkIfClose(boxes[i],boxes[j])){
                found = true;
                box1 = boxes[i];
                box2 = boxes[j];
            }
        }
    }
    return box1 + " " + box2;
}

testData();
console.log("Day 02 Part A");
console.log(day02a(input));
console.log("Day 02 Part B");
console.log(day02b(input));