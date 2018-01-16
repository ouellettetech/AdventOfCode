var inputRecipies = ["Al => ThF",
	"Al => ThRnFAr",
	"B => BCa",
	"B => TiB",
	"B => TiRnFAr",
	"Ca => CaCa",
	"Ca => PB",
	"Ca => PRnFAr",
	"Ca => SiRnFYFAr",
	"Ca => SiRnMgAr",
	"Ca => SiTh",
	"F => CaF",
	"F => PMg",
	"F => SiAl",
	"H => CRnAlAr",
	"H => CRnFYFYFAr",
	"H => CRnFYMgAr",
	"H => CRnMgYFAr",
	"H => HCa",
	"H => NRnFYFAr",
	"H => NRnMgAr",
	"H => NTh",
	"H => OB",
	"H => ORnFAr",
	"Mg => BF",
	"Mg => TiMg",
	"N => CRnFAr",
	"N => HSi",
	"O => CRnFYFAr",
	"O => CRnMgAr",
	"O => HP",
	"O => NRnFAr",
	"O => OTi",
	"P => CaP",
	"P => PTi",
	"P => SiRnFAr",
	"Si => CaSi",
	"Th => ThCa",
	"Ti => BP",
	"Ti => TiTi",
	"e => HF",
	"e => NAl",
	"e => OMg"];

var initialString="CRnCaCaCaSiRnBPTiMgArSiRnSiRnMgArSiRnCaFArTiTiBSiThFYCaFArCaCaSiThCaPBSiThSiThCaCaPTiRnPBSiThRnFArArCaCaSiThCaSiThSiRnMgArCaPTiBPRnFArSiThCaSiRnFArBCaSiRnCaPRnFArPMgYCaFArCaPTiTiTiBPBSiThCaPTiBPBSiRnFArBPBSiRnCaFArBPRnSiRnFArRnSiRnBFArCaFArCaCaCaSiThSiThCaCaPBPTiTiRnFArCaPTiBSiAlArPBCaCaCaCaCaSiRnMgArCaSiThFArThCaSiThCaSiRnCaFYCaSiRnFYFArFArCaSiRnFYFArCaSiRnBPMgArSiThPRnFArCaSiRnFArTiRnSiRnFYFArCaSiRnBFArCaSiRnTiMgArSiThCaSiThCaFArPRnFArSiRnFArTiTiTiTiBCaCaSiRnCaCaFYFArSiThCaPTiBPTiBCaSiThSiRnMgArCaF";


function getComponents(recipe, startingString){
	var combos=[];
	var withSplits=startingString.split(recipe.find);
	//console.log(withSplits);
	//console.log(withSplits.length);
	//console.log(recipe);
	for(var i=1;i<withSplits.length;i++){
		//console.log("Checking "+i);
		var newArray = withSplits.slice();
		//console.log(newArray);
		var tempString = withSplits[i-1] + recipe.replacement + withSplits[i];
		//console.log(tempString);
		newArray.splice(i-1,2, tempString);
		//console.log(newArray);
		var newString = newArray.join(recipe.find);
		//console.log("New String :[" + newString + "]");
		combos.push(newString);
	}
	return combos;
}

function parseRecipes(recipesArray){
	var recipes = [];
	for(var i=0;i<recipesArray.length;i++){
		var newRecipe = {};
		var cur = recipesArray[i].split(" => ");
		newRecipe.find=cur[0];
		newRecipe.replacement=cur[1];
		recipes.push(newRecipe);
	}
	return recipes;
}

function testData(){
	var recipesArray = ["H => HO",
		"H => OH",
		"O => HH"]
	var startingString = "HOH";
	var combos = [];
	var recipies  = parseRecipes(recipesArray);
	console.log(recipies);
	for(var i=0;i<recipies.length;i++){
		var newCombos=getComponents(recipies[i], startingString);
		console.log(newCombos);
		combos = combos.concat(newCombos);
		console.log(combos);
	}
	console.log(combos);

	combos.sort();
	combos=combos.filter(
		function(value,index,array) {
			if(index===0){
				return true;
			}
			if(array[index] === array[index-1]){
				 return false;
			} 
			return true;
		});
	console.log(combos);
	console.log(combos.length);

	combos=[];
	startingString = "HOHOHO";

	for(var i=0;i<recipies.length;i++){
		var newCombos=getComponents(recipies[i], startingString);
		console.log(newCombos);
		combos = combos.concat(newCombos);
		console.log(combos);
	}
	console.log(combos);

	combos.sort();
	combos=combos.filter(
		function(value,index,array) {
			if(index===0){
				return true;
			}
			if(array[index] === array[index-1]){
				 return false;
			} 
			return true;
		});
	console.log(combos);
	console.log(combos.length);
}


function day19a(recipesArray, startingString){
	var combos = [];
	var recipies  = parseRecipes(recipesArray);
	for(var i=0;i<recipies.length;i++){
		var newCombos=getComponents(recipies[i], startingString);
		combos = combos.concat(newCombos);
	}

	combos.sort();
	combos=combos.filter(
		function(value,index,array) {
			if(index===0){
				return true;
			}
			if(array[index] === array[index-1]){
				return false;
			} 
			return true;
		});
	console.log(combos);
	console.log(combos.length);
}

function swapRecipes(recipes){
	for(var i=0;i<recipes.length;i++){
		var temp = recipes[i].find;
		recipes[i].find = recipes[i].replacement;
		recipes[i].replacement = temp;
	}
	return recipes;
}

function tryToReplaceFirstOccurance(recipes, currentString, currentSteps){
	if(currentString == "e"){
		console.log("Got to original molecule! In "+ currentSteps + "Steps!");
		return currentSteps;
	}
	var minSteps = -1;
	for(var i=0;i<recipes.length;i++){
		var newCombos=getComponents(recipes[i], currentString);
		if(newCombos !=[]){
			for(var j=0;j<newCombos.length;j++){
				var newsteps = tryToReplaceFirstOccurance(recipes, newCombos[j], currentSteps+1);
				if(newsteps !== -1){
					if(minSteps === -1 || newsteps<minSteps){
						minSteps = newsteps;
					}
				}
			}
		}
	}
	return minSteps;
}

// Brute Force, too slow though...
function day19b1(recipesArray, desiredMed){
	var finished = ["e"];
	var steps = 0;
	var recipes  = parseRecipes(recipesArray);
	while(combos.indexOf(desiredMed)===-1){
		var tempCombos = [];
		for(var j=0;j<combos.length;j++){
			var startingString = combos[j];
			for(var i=0;i<recipes.length;i++){
				var newCombos=getComponents(recipes[i], startingString);
				tempCombos = tempCombos.concat(newCombos);
			}

			tempCombos.sort();
			tempCombos=tempCombos.filter(
				function(value,index,array) {
					if(index===0){
						return true;
					}
					if(array[index] === array[index-1]){
						return false;
					} 
					return true;
				});
		}
		combos = tempCombos;
		steps++;
		console.log("Step : " + steps + "Combos : " + combos.length );
	}
	console.log("Number of steps :"+step);
}

function longest(a, b) {
	if (a.find.length > b.find.length) {
	  return -1;
	}
	if (a.find.length < b.find.length) {
	  return 1;
	}
	// a must be equal to b
	return 0;
}


// Still would take forever to finish, but should get the first answer in a reasonable? amount of time.
// I just killed it once I started to get results, if the first one wasn't the most optimal one, 
// I would have waited for a better one.
function day19b(recipesArray, desiredMed){
	var finished = ["e"];
	var recipes  = parseRecipes(recipesArray);
	swapRecipes(recipes);
	recipes.sort(longest);
	var steps = tryToReplaceFirstOccurance(recipes, desiredMed, 0);
	console.log("Number of steps :"+step);
}

testData();
console.log("Day 19 Part A");
day19a(inputRecipies, initialString);
console.log("Day 19 Part B");
day19b(inputRecipies, initialString);
