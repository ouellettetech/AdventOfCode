var ingredientString="Frosting: capacity 4, durability -2, flavor 0, texture 0, calories 5\nCandy: capacity 0, durability 5, flavor -1, texture 0, calories 8\nButterscotch: capacity -1, durability 0, flavor 5, texture 0, calories 6\nSugar: capacity 0, durability 0, flavor -2, texture 2, calories 1"

function objectifyIngredients(inputString){
	var ingredient = {};
	var inputArray = inputString.split(" ");
	ingredient.name = inputArray[0].replace(":","");
	ingredient.capacity = parseInt(inputArray[2].replace(",",""));
	ingredient.durability = parseInt(inputArray[4].replace(",",""));
	ingredient.flavor = parseInt(inputArray[6].replace(",",""));
	ingredient.texture = parseInt(inputArray[8].replace(",",""));
	ingredient.calories = parseInt(inputArray[10].replace(",",""));
	return ingredient;
}

function getIngredientCombinations(ingredients,remainingSize){
//	console.log(ingredients);
	var combinations=[];
	if(ingredients.length===1){
//		console.log("Only one ingredient");
		return [remainingSize];
	}
//	console.log("More than one ingredients");
	for(var i=0;i<=remainingSize;i++){
		var rest = ingredients.slice()
		rest.splice(0,1);
		var newCombos=getIngredientCombinations(rest,remainingSize-i);
		newCombos = newCombos.map(function(value,index,array){ return [i].concat(value)});
		combinations=combinations.concat(newCombos);
	}
	return combinations;
}

function getIngredientValue(ingredients,quantity, calorieLimit){
	if(ingredients.length!==quantity.length){
		console.log("Arrays don't match!!!!");
		return null;
	}
	var capacity = 0;
	var durability = 0;
	var flavor = 0;
	var texture = 0;
	var calories = 0;
	for(var i=0;i<ingredients.length;i++){
		capacity+=ingredients[i].capacity*quantity[i];
		durability+=ingredients[i].durability*quantity[i];
		flavor+=ingredients[i].flavor*quantity[i];
		texture+=ingredients[i].texture*quantity[i];
		calories+=ingredients[i].calories*quantity[i];
	}
	capacity = capacity < 0 ? 0 : capacity;
	durability = durability < 0 ? 0 : durability;
	flavor = flavor < 0 ? 0 : flavor;
	texture = texture < 0 ? 0 : texture;
	
	var total=capacity*durability*flavor*texture;
	
	if(calorieLimit && (calories !== calorieLimit)){
		total = 0;
	}
	return total > 0 ? total : 0;
}

function testData(){
	var ingredientString = "Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8\nCinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3"
	var inputArray = ingredientString.split("\n");
	ingredients=[];
	for(var i=0;i<inputArray.length;i++){
		ingredients.push(objectifyIngredients(inputArray[i]));
	}
	console.log(ingredients);
	console.log(getIngredientValue(ingredients,[44,56]));

	console.log("Finding Largest Value");
	var combos = getIngredientCombinations(ingredients,100);
//	console.log(combos);
	var max=0;
	for(var i=0;i<combos.length;i++){
		var newValue=getIngredientValue(ingredients,combos[i]);
		if(newValue>max){
//			console.log("Found Larger: "+newValue);
//			console.log("Current Combo");
//			console.log(combos[i]);
			max=newValue;
		}
	}
	console.log("Found Max Value: " + max);
}


function day15a(input){
	var inputArray = input.split("\n");
	ingredients=[];
	for(var i=0;i<inputArray.length;i++){
		ingredients.push(objectifyIngredients(inputArray[i]));
	}
	console.log("Finding Largest Value for Part A");
	var combos = getIngredientCombinations(ingredients,100);
	var max=0;
	for(var i=0;i<combos.length;i++){
		var newValue=getIngredientValue(ingredients,combos[i]);
		if(newValue>max){
			max=newValue;
		}
	}
	console.log("Found Max Value: " + max);	
}


function day15b(input) {
	var inputArray = input.split("\n");
	ingredients=[];
	for(var i=0;i<inputArray.length;i++){
		ingredients.push(objectifyIngredients(inputArray[i]));
	}
	console.log("Finding Largest Value for Part A");
	var combos = getIngredientCombinations(ingredients,100);
	var max=0;
	for(var i=0;i<combos.length;i++){
		var newValue=getIngredientValue(ingredients,combos[i], 500);
		if(newValue>max){
			max=newValue;
		}
	}
	console.log("Found Max Value: " + max);	
}

testData();
console.log("Day 15 Part A");
day15a(ingredientString);
console.log("Day 15 Part B");
day15b(ingredientString);
