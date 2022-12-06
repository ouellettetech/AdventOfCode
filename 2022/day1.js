input = document.body.innerText.split("\n");
input.pop();// remove the final html character.

testData = ['1000',
'2000',
'3000',
'',
'4000',
'',
'5000',
'6000',
'',
'7000',
'8000',
'9000',
'',
'10000'];

function day01b(calories){
    var curCalorieCount=0;
    var curMaxCalorie=[0,0,0];

    calories.forEach(function(calorie) {
        if(calorie ==''){
            curMaxCalorie = insertCalorieIfTopThree(curMaxCalorie,curCalorieCount);
            curCalorieCount = 0;
        } else {
            curCalorieCount+=parseInt(calorie);
        }
        //console.log(curCalorieCount);
    });
//    console.log("Current Calorie Count:" + curCalorieCount);
    curMaxCalorie = insertCalorieIfTopThree(curMaxCalorie,curCalorieCount);
    console.log(curMaxCalorie[0] + curMaxCalorie[1] + curMaxCalorie[2]);
}

function insertCalorieIfTopThree(curMaxCalorie, curCalorieCount){
    //console.log("Current Calorie Count:" + curCalorieCount);
            var index = 3;
            if(curCalorieCount>curMaxCalorie[2]){
                if(curCalorieCount>curMaxCalorie[1]){
                    if(curCalorieCount>curMaxCalorie[0]){
                        index = 0;
                    } else {
                        index = 1;
                    }
                } else {
                    index = 2;
                }
                //console.log("Current index: "+ index);
                curMaxCalorie.insert(index, curCalorieCount);
                curMaxCalorie.pop();
                //console.log(curMaxCalorie);
            }
    return curMaxCalorie;
}

Array.prototype.insert = function ( index, ...items ) {
    this.splice( index, 0, ...items );
};

function day01a(calories){
    var curCalorieCount=0;
    var curMaxCalorie=0;

    calories.forEach(function(calorie) {
        if(calorie ==''){
//            console.log("Current Calorie Count:" + curCalorieCount);
            if(curCalorieCount>curMaxCalorie){
                curMaxCalorie = curCalorieCount;
//                console.log("Current Max Calorie :" + curMaxCalorie);
            }
            curCalorieCount = 0;
        } else {
            curCalorieCount+=parseInt(calorie);
        }
        //console.log(curCalorieCount);
    });
//    console.log("Current Calorie Count:" + curCalorieCount);
    if(curCalorieCount>curMaxCalorie){
        curMaxCalorie = curCalorieCount;
 //       console.log("Current Max Calorie After:" + curMaxCalorie);
    }
    console.log(curMaxCalorie);
}

console.log("Test Data");
day01a(testData);
day01b(testData);
console.log("Day 01 Part A");
day01a(input);
console.log("Day 01 Part B");
day01b(input);