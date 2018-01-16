// Very similar to the traveling Salesman problem, just now each direction has a different Weight.
var seatingPrefs="Alice would lose 57 happiness units by sitting next to Bob.\nAlice would lose 62 happiness units by sitting next to Carol.\nAlice would lose 75 happiness units by sitting next to David.\nAlice would gain 71 happiness units by sitting next to Eric.\nAlice would lose 22 happiness units by sitting next to Frank.\nAlice would lose 23 happiness units by sitting next to George.\nAlice would lose 76 happiness units by sitting next to Mallory.\nBob would lose 14 happiness units by sitting next to Alice.\nBob would gain 48 happiness units by sitting next to Carol.\nBob would gain 89 happiness units by sitting next to David.\nBob would gain 86 happiness units by sitting next to Eric.\nBob would lose 2 happiness units by sitting next to Frank.\nBob would gain 27 happiness units by sitting next to George.\nBob would gain 19 happiness units by sitting next to Mallory.\nCarol would gain 37 happiness units by sitting next to Alice.\nCarol would gain 45 happiness units by sitting next to Bob.\nCarol would gain 24 happiness units by sitting next to David.\nCarol would gain 5 happiness units by sitting next to Eric.\nCarol would lose 68 happiness units by sitting next to Frank.\nCarol would lose 25 happiness units by sitting next to George.\nCarol would gain 30 happiness units by sitting next to Mallory.\nDavid would lose 51 happiness units by sitting next to Alice.\nDavid would gain 34 happiness units by sitting next to Bob.\nDavid would gain 99 happiness units by sitting next to Carol.\nDavid would gain 91 happiness units by sitting next to Eric.\nDavid would lose 38 happiness units by sitting next to Frank.\nDavid would gain 60 happiness units by sitting next to George.\nDavid would lose 63 happiness units by sitting next to Mallory.\nEric would gain 23 happiness units by sitting next to Alice.\nEric would lose 69 happiness units by sitting next to Bob.\nEric would lose 33 happiness units by sitting next to Carol.\nEric would lose 47 happiness units by sitting next to David.\nEric would gain 75 happiness units by sitting next to Frank.\nEric would gain 82 happiness units by sitting next to George.\nEric would gain 13 happiness units by sitting next to Mallory.\nFrank would gain 77 happiness units by sitting next to Alice.\nFrank would gain 27 happiness units by sitting next to Bob.\nFrank would lose 87 happiness units by sitting next to Carol.\nFrank would gain 74 happiness units by sitting next to David.\nFrank would lose 41 happiness units by sitting next to Eric.\nFrank would lose 99 happiness units by sitting next to George.\nFrank would gain 26 happiness units by sitting next to Mallory.\nGeorge would lose 63 happiness units by sitting next to Alice.\nGeorge would lose 51 happiness units by sitting next to Bob.\nGeorge would lose 60 happiness units by sitting next to Carol.\nGeorge would gain 30 happiness units by sitting next to David.\nGeorge would lose 100 happiness units by sitting next to Eric.\nGeorge would lose 63 happiness units by sitting next to Frank.\nGeorge would gain 57 happiness units by sitting next to Mallory.\nMallory would lose 71 happiness units by sitting next to Alice.\nMallory would lose 28 happiness units by sitting next to Bob.\nMallory would lose 10 happiness units by sitting next to Carol.\nMallory would gain 44 happiness units by sitting next to David.\nMallory would gain 22 happiness units by sitting next to Eric.\nMallory would gain 79 happiness units by sitting next to Frank.\nMallory would lose 16 happiness units by sitting next to George.";

function constructSeattingPrefsList(prefs){
	var prefObjs=[];
	for(var i=0; i<prefs.length;i++){
		//console.log("Current num: "+ i + "value :"+prefs[i]);
		var curPref = prefs[i].replace(".","").split(" ");
		var cur = {};
		cur.Name = curPref[0]; // first word is the person.
		cur.Happiness = parseInt(curPref[3],10); // name would gain/lose x happiness units by sitting next to other
		if(curPref[2]==="lose"){ // if lose than the happiness is negative.
			cur.Happiness=cur.Happiness*-1;
		}
		cur.Other = curPref[10];
		prefObjs.push(cur);
	}
	return prefObjs;
}

function getHappinessChange(table, prefs){
	var totalHapiness=0;
	var len=table.length;
	for(var i=0;i<table.length;i++){
		var previous=((i-1)+len)%len;
		var next=((i+1)+len)%len;
		//console.log("Current :" + table[i] + "previous :" + table[previous] + "Next :"+ table[next]);
		totalHapiness+=prefs[table[i]][table[previous]];
		totalHapiness+=prefs[table[i]][table[next]];
	}
	return totalHapiness; 
}

function constructSeattingPrefs(preferences){
	var seattingPrefs = {};
	for(var i=0;i<preferences.length;i++){
		var cur=preferences[i];
//		console.log(cur);
		seattingPrefs[cur.Name] = seattingPrefs[cur.Name] || {};
		seattingPrefs[cur.Name][cur.Other] = cur.Happiness;
	}
	return seattingPrefs;
}

function allSeatingLocs(people){
	var seatings=[];
	if(people.length===1){
		return [people];
	}
	for(var i=0;i<people.length;i++){
		//console.log("Checking people"+people+"i:"+i);
		var cur = people[i];
		var rest = people.slice()
		rest.splice(i,1);
		//console.log("Rest: "+rest);
		var newLocs=allSeatingLocs(rest);
		newLocs = newLocs.map(function(value,index,array){ return [cur].concat(value)});
		//console.log("After Map :"+newLocs);
		seatings=seatings.concat(newLocs);
	}
	return seatings;
}

function findOptimalSeating(prefs, people, compareFunc){
	var lowestHappiness = getHappinessChange(people,prefs);

	var allCombinations=allSeatingLocs(people);
	for (var i=0;i<allCombinations.length;i++){
		var newSeattingHappiness=getHappinessChange(allCombinations[i],prefs);
		if(compareFunc(newSeattingHappiness,lowestHappiness)){
			lowestHappiness=newSeattingHappiness;
		}
	}
	return lowestHappiness;
}

function lessThan(a,b){
	return a<b;
}

function greaterThan(a,b){
	return a>b;
}


function testData(){
	var testPrefs = "Alice would gain 54 happiness units by sitting next to Bob.\nAlice would lose 79 happiness units by sitting next to Carol.\nAlice would lose 2 happiness units by sitting next to David.\nBob would gain 83 happiness units by sitting next to Alice.\nBob would lose 7 happiness units by sitting next to Carol.\nBob would lose 63 happiness units by sitting next to David.\nCarol would lose 62 happiness units by sitting next to Alice.\nCarol would gain 60 happiness units by sitting next to Bob.\nCarol would gain 55 happiness units by sitting next to David.\nDavid would gain 46 happiness units by sitting next to Alice.\nDavid would lose 7 happiness units by sitting next to Bob.\nDavid would gain 41 happiness units by sitting next to Carol."
	var prefList = constructSeattingPrefsList(testPrefs.split("\n"));
	console.log(prefList);
	var seattingPrefs=constructSeattingPrefs(prefList);
	console.log(seattingPrefs);
	console.log(getHappinessChange(["Alice","David",],seattingPrefs));
	console.log(getHappinessChange(["Alice","David","Carol","Bob"],seattingPrefs));
	console.log(findOptimalSeating(seattingPrefs,["Carol","Alice","Bob","David"],lessThan));
	console.log(findOptimalSeating(seattingPrefs,["Carol","Alice","Bob","David"],greaterThan));
}


function day13a(input){
	var prefList = constructSeattingPrefsList(input.split("\n"));
	var seattingPrefs=constructSeattingPrefs(prefList);
	var people=Object.keys(seattingPrefs);
	console.log(findOptimalSeating(seattingPrefs,people,greaterThan));
}

function day13b(input) {
	var prefList = constructSeattingPrefsList(input.split("\n"));
	var prefs=constructSeattingPrefs(prefList);
	var myHappiness={};
	var people=Object.keys(prefs);
	console.log(people);
	for(var i=0;i<people.length;i++){
		prefs[people[i]]["me"]=0;
		myHappiness[people[i]]=0;
	}
	prefs["me"]=myHappiness;
	people.push("me");
	console.log(findOptimalSeating(prefs,people,greaterThan));
}

testData();
console.log("Day 13 Part A");
day13a(seatingPrefs);
console.log("Day 13 Part B");
day13b(seatingPrefs);
