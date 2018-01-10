var minimumPresents = 36000000 // Just ignore the 10 gifts per a house since doesn't change anything.

function fillArray(arrayLength,maxDeliverys){
	if(!maxDeliverys){
		maxDeliverys = arrayLength;
	}
	var myArray=[];
	for(var i=2;i<=arrayLength;i++){
		for(var j=1;((i*j)<=arrayLength )&& (j< maxDeliverys);j++){
			myArray[i*j] = myArray[i*j] || 1;
			myArray[i*j]+=i;
		}
	}
	return myArray;
}


function getDivisors(number){
	var divs=[];
	var sqrtValue = Math.sqrt(number);
	for(var i=1;i<=sqrtValue;i++){
		if(number%i===0){
			divs.push(i);
		}
	}
	return divs;
}

function addDivisors(number){
	var divValue=0;
	for(var i=1;i<=number;i++){
		if(number%i===0){
//			console.log("Found Divisor: "+i);
			divValue+=i;
		}
	}
	return divValue;
}

function testData(){
	for(var i=1;i<10;i++){
		console.log("Number of Presents: "+ addDivisors(i));
	}
}

function findMinimum(minimSum){
	var sum=0;
	var i=1;
	while(sum<minimSum){
		sum+=i;
		i++;
	}
	return i;
}

function day20a(minimumPresents){
	var lastPresent=0;
	var house = findMinimum(minimumPresents/10);
	while(lastPresent<minimumPresents/10){
		lastPresent = addDivisors(house++);
		if(house%1000===0){
			console.log(house);
		}
	}
	return house;
}

// Original Function was slow, so when I looked for a way to optomize the divisor functions, 
// noticed that people just populated the array, it was faster to code, and populate the array for 
// both parts than the original function running.
function day20aTake2(minimumPresents){
	var array=fillArray(minimumPresents/10);
	for(var i=0;i<array.length;i++){
		if(array[i]>=minimumPresents/10){
			console.log("First House: " +  i);
			return;
		}
	}
}

function day20b(recipesArray, desiredMed){
	var array=fillArray(minimumPresents/11, 50);
	for(var i=0;i<array.length;i++){
		if(array[i]>=minimumPresents/11){
			console.log("First House: " +  i);
			return;
		}
	}
}

testData();
console.log("Find good starting location");
console.log(findMinimum(minimumPresents));
console.log("Day 20 Part A");
day20aTake2(minimumPresents);
console.log("Day 20 Part B");
day20b(minimumPresents);
