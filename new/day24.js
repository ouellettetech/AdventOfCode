var weights = [
	1,
	2,
	3,
	5,
	7,
	13,
	17,
	19,
	23,
	29,
	31,
	37,
	41,
	43,
	53,
	59,
	61,
	67,
	71,
	73,
	79,
	83,
	89,
	97,
	101,
	103,
	107,
	109,
	113,
];

function getGroupsWithTotalWeight(weights,targetWeight,justOne){
	runGC();
	if(targetWeight===0){
		return [];
	}
	var combos = [];
	for(var i=0;i<weights.length;i++){
		if(weights[i]===targetWeight){
			//console.log("Found a Combo!");
			var rest = weights.slice();
			rest.splice(i,1);
			return [{group1: [weights[i]], rest: rest}];
		}
		if(weights[i]<targetWeight){
			var newWeights = weights.slice();
			newWeights.splice(i,1);
			var newCombos = getGroupsWithTotalWeight(newWeights,targetWeight-weights[i],justOne);
			if(justOne && (newCombos.length!==0)){
				return newCombos; // We just care that there is a combo, not what it is.
			} else {
				newCombos = newCombos.map(function(value){ 
					var combinedGroup = [weights[i]].concat(value.group1);
					value.group1 = combinedGroup;
					return value;
				});
				//console.log("Adding Current Weight to combo");
				//console.log(newCombos);
				//console.log(weights[i]);
				combos = combos.concat(newCombos);
			}
		}
	}
	return combos;

}

function runGC(){
	if (global.gc) {
		global.gc();
	} else {
		console.log('Garbage collection unavailable.  Pass --expose-gc '
		  + 'when launching node to enable forced garbage collection.');
	}
}

function getTotalWeight(weights){
	var total = 0;
	for(var i=0;i<weights.length;i++){
		total += weights[i];
	}
	return total;
}

function sortByGroup1(a, b) {
	if (a.group1.length < b.group1.length) {
	  return -1;
	}
	if (a.group1.length > b.group1.length) {
	  return 1;
	}

	if(a.QE<b.QE){
		return -1;
	}
	if(a.QE>b.QE){
		return 1;
	}
	// for(var i=0;i<a.group1.length;i++){
	// 	if(a.group1[i]<b.group1[i]){
	// 		return -1;
	// 	}
	// 	if(a.group1[i]>b.group1[i]){
	// 		return 1;
	// 	}
	// }
	// a must be equal to b
	return 0;
}

function smallest(a, b) {
	if (a < b) {
	  return -1;
	}
	if (a > b) {
	  return 1;
	}
	// a must be equal to b
	return 0;
}

function getGroupsWithSmallestSize(groups){
	var minSize = groups[0].group1.length;
	return groups.filter(function(value){
		return (value.group1.length===minSize);
	});
}

function removeDuplicatesAndInvalid(groups,groupWeight){
	groups.forEach(function(value){
		value.QE = 1;
		for(var i=0;i<value.group1.length;i++){
			value.QE = value.QE * value.group1[i];
		}
	});
	
	groups.forEach(function(element){
		element.group1.sort(smallest);
	});

	groups.sort(sortByGroup1);
	groups = groups.filter(function(value,index,array){
		if(index !== 0){
			if(sortByGroup1(array[index],array[index-1])==0){
				return false;
			}
		}
		if(getGroupsWithTotalWeight(value.rest,groupWeight,true).length===0){
			console.log("Removing invalid grouping...");
			return false;
		}
		return true;
	});
	return groups;
}

function getGroupsWithSpecificSize(weights,targetWeight,groupSize){
	var combos = [];
	if(groupSize===1){
		if(weights.indexOf(targetWeight)!==-1){
			return [targetWeight];
		}
	} else {
		var passArray = weights.slice();
		weights.forEach(function (value,index,array) {
			if(value<targetWeight){
				//console.log("Value :"+value);
				passArray.splice(0,1);
				//console.log(passArray);
				var newCombos = getGroupsWithSpecificSize(passArray,targetWeight-value,groupSize-1);
				newCombos = newCombos.map(function(comboValue){
					return [value].concat(comboValue);
				});
				combos = combos.concat(newCombos);
			}
		});
	}
	return combos;
}

function testData(){
	var testWeights=[
		1,2,3,4,5,
		7,8,9,10,11
	] 
	var totalWeight = getTotalWeight(testWeights);
	var groupWeight = totalWeight/3;
	console.log(groupWeight);
	var groups = getGroupsWithTotalWeight(testWeights,groupWeight,false);
	groups = removeDuplicatesAndInvalid(groups,groupWeight);
	console.log(groups);
	var smallest=getGroupsWithSmallestSize(groups);
	console.log(smallest);
	return smallest;
}

function testData2(){
	var testWeights=[
		1,2,3,4,5,
		7,8,9,10,11
	] 
	var totalWeight = getTotalWeight(testWeights);
	var groupWeight = totalWeight/3;
	console.log(groupWeight);
	var groups = getGroupsWithSpecificSize(testWeights,groupWeight,1);
	console.log(groups);
	var groups = getGroupsWithSpecificSize(testWeights,groupWeight,2);
	console.log(groups);
}

function day24a(input){
	var totalWeight = getTotalWeight(input);
	var groupWeight = totalWeight/3;
	console.log(groupWeight);
	var groups = getGroupsWithTotalWeight(input,groupWeight,false);
	console.log("GeneratedAllGroups!");
	groups = removeDuplicatesAndInvalid(groups,groupWeight);
	console.log(groups);
	var smallest=getGroupsWithSmallestSize(groups);
	console.log(smallest);
	return smallest;
}

function day24aTry2(input){
	var totalWeight = getTotalWeight(input);
	var groupWeight = totalWeight/3;
	console.log(groupWeight);
	var i=1;
	var curGroups = getGroupsWithSpecificSize(input,groupWeight,i);
	while(curGroups.length===0){
		i++;
		console.log("Group Size: "+i);
		curGroups = getGroupsWithSpecificSize(input,groupWeight,i);
	}
	console.log(curGroups);
	var curQED = 1;
	curGroups[0].forEach(function(value){
		curQED=curQED*value;
	});
	minQED = curQED;
	for(var i=0;i<curGroups.length;i++){
		curQED = 1;
		curGroups[0].forEach(function(value){
			curQED=curQED*value;
		});
		if( minQED > curQED){
			minQED = curQED;
		}
	} 
	console.log("Minimum QED :"+ minQED);
	return minQED;
}

function day24b(input){
	var totalWeight = getTotalWeight(input);
	var groupWeight = totalWeight/4;
	console.log(groupWeight);
	var i=1;
	var curGroups = getGroupsWithSpecificSize(input,groupWeight,i);
	while(curGroups.length===0){
		i++;
		console.log("Group Size: "+i);
		curGroups = getGroupsWithSpecificSize(input,groupWeight,i);
	}
	console.log(curGroups);
	var curQED = 1;
	curGroups[0].forEach(function(value){
		curQED=curQED*value;
	});
	minQED = curQED;
	for(var i=0;i<curGroups.length;i++){
		curQED = 1;
		curGroups[0].forEach(function(value){
			curQED=curQED*value;
		});
		if( minQED > curQED){
			minQED = curQED;
		}
	} 
	console.log("Minimum QED :"+ minQED);
	return minQED;
}


//testData();
testData2();
console.log("Day 24 Part A");
//day24a(weights);
day24aTry2(weights);
console.log("Day 24 Part B");
day24b(weights);
