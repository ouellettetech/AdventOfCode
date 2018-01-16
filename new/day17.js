var containersAvailable = [
	50,
	44,
	11,
	49,
	42,
	46,
	18,
	32,
	26,
	40,
	21,
	7,
	18,
	43,
	10,
	47,
	36,
	24,
	22,
	40,
]


function findCombinations(containers,containerSize){
//	console.log("Checking Containers: "+ containers);
//	console.log("Checking Size: " + containerSize);
	if(containerSize===0){
		return [[]]; //this is a good combination.
	}
	var combinations=[];
	for(var i=0;i<containers.length;i++){
		if(containers[i].value<=containerSize){
			var rest = containers.slice();
			rest.splice(i,1);
			var newCombos=findCombinations(rest,containerSize-containers[i].value);
			if(newCombos!== null){
				newCombos = newCombos.map(function(value,index,array){ return [containers[i].number].concat(value)});
				combinations=combinations.concat(newCombos);
//				console.log("Merging Combinations");
//				console.log(combinations);
			}
		}
	}
	if(combinations.length === 0 && containerSize!==0){
//		console.log("Couldn't Find Container: "+ containers);
//		console.log("Non Zero Size: " + containerSize);		
		return null; // couln't exactly fill.
	}
	return combinations;
}

function lessThan(a, b) {
	if (a.number < b.number) {
	  return -1;
	}
	if (a.number > b.number) {
	  return 1;
	}
	// a must be equal to b
	return 0;
}

function shortest(a, b) {
	if (a.length < b.length) {
	  return -1;
	}
	if (a.length > b.length) {
	  return 1;
	}
	// a must be equal to b
	return 0;
}

function equalArray(a,b){
	if(a.length!==b.length){
		return false;
	}
	for(var i=0;i<a.length;i++){
		if(a[i]!==b[i]){
			return false;
		}
	}
	return true;
}

function testData(){
	testContainers = [20, 15, 10, 5, 5];
	testContainers = testContainers.map(function(value,index,array) { return { number: index, value: value}});
//	console.log(testContainers);
	var combinations = findCombinations(testContainers,25);

	combinations.forEach(function(value,index,array) { value.sort()});
	combinations.sort();
	console.log(combinations);
	
	combinations=combinations.filter(
		function(value,index,array) {
			if(index===0){
				return true;
			}
			if(equalArray(array[index],array[index-1])){
				 return false;
			} 
			return true;
		});
	console.log(combinations);
	console.log(combinations.length);
}


function day17a(containers, size){
	containers = containers.map(function(value,index,array) { return { number: index, value: value}});
	var combinations = findCombinations(containers,size);

	combinations.forEach(function(value,index,array) { value.sort()});
	combinations.sort();
	console.log(combinations);
	
	combinations=combinations.filter(
		function(value,index,array) {
			if(index===0){
				return true;
			}
			if(equalArray(array[index],array[index-1])){
				 return false;
			} 
			return true;
		});
	console.log(combinations.length);
}


function day17b(containers, size) {
	containers = containers.map(function(value,index,array) { return { number: index, value: value}});
	var combinations = findCombinations(containers,size);

	combinations.forEach(function(value,index,array) { value.sort()});
	combinations.sort();
	console.log(combinations);
	
	combinations=combinations.filter(
		function(value,index,array) {
			if(index===0){
				return true;
			}
			if(equalArray(array[index],array[index-1])){
				 return false;
			} 
			return true;
		});

	combinations.sort(shortest);
	var minLength=combinations[0].length;
	console.log("Min Number of Containers:"+minLength);
	for(var i=0;i<combinations.length && combinations[i].length===minLength;i++);
	console.log("Number of combinations:"+i);
}

testData();
console.log("Day 17 Part A");
day17a(containersAvailable,150);
console.log("Day 17 Part B");
day17b(containersAvailable,150);
