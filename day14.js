var reindeerString="Vixen can fly 19 km/s for 7 seconds, but then must rest for 124 seconds.\nRudolph can fly 3 km/s for 15 seconds, but then must rest for 28 seconds.\nDonner can fly 19 km/s for 9 seconds, but then must rest for 164 seconds.\nBlitzen can fly 19 km/s for 9 seconds, but then must rest for 158 seconds.\nComet can fly 13 km/s for 7 seconds, but then must rest for 82 seconds.\nCupid can fly 25 km/s for 6 seconds, but then must rest for 145 seconds.\nDasher can fly 14 km/s for 3 seconds, but then must rest for 38 seconds.\nDancer can fly 3 km/s for 16 seconds, but then must rest for 37 seconds.\nPrancer can fly 25 km/s for 6 seconds, but then must rest for 143 seconds."

function objectifyReindeer(inputString){
	var reindeer = {};
	var inputArray = inputString.split(" ");
	reindeer.name = inputArray[0];
	reindeer.speed = parseInt(inputArray[3]);
	reindeer.duration = parseInt(inputArray[6]);
	reindeer.rest = parseInt(inputArray[13]);
	return reindeer;
}

function getDistance(reindeer,time){
	//console.log(reindeer);
	var cycle=reindeer.duration+reindeer.rest;
	var fullDistance=reindeer.speed * reindeer.duration;
	var distance=fullDistance * Math.floor(time/cycle); //In a full cycle the reindeer goes the entire distance.
	var extra=time%cycle;
	if(extra>reindeer.duration){
		extra = reindeer.duration; // anything more than the duration is just ending while its resting.
	}
	distance+=extra*reindeer.speed;
	return distance;
}

function testData(){
	var inputSpeeds="Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.\nDancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds."
	var inputArray = inputSpeeds.split("\n");
	reindeer=[];
	for(var i=0;i<inputArray.length;i++){
		reindeer.push(objectifyReindeer(inputArray[i]));
	}
	console.log(reindeer);
	console.log("Comet expected to have gone 14 km, actual: " + getDistance(reindeer[0],1));
	console.log("Dancer expected to have gone 16 km, actual: " + getDistance(reindeer[1],1));
	console.log("Comet expected to have gone 140 km, actual: " + getDistance(reindeer[0],10));
	console.log("Dancer expected to have gone 160 km, actual: " + getDistance(reindeer[1],10));
	console.log("Comet expected to have gone 140 km, actual: " + getDistance(reindeer[0],11));
	console.log("Dancer expected to have gone 176 km, actual: " + getDistance(reindeer[1],11));
	console.log("Comet expected to have gone 1120 km, actual: " + getDistance(reindeer[0],1000));
	console.log("Dancer expected to have gone 1056 km, actual: " + getDistance(reindeer[1],1000));
}


function day14a(input, time){
	var inputArray = input.split("\n");
	reindeerList=[];
	for(var i=0;i<inputArray.length;i++){
		reindeerList.push(objectifyReindeer(inputArray[i]));
	}
	var furthestDist=0;
	var furthestReindeer = null;
	for(var j=0;j<reindeerList.length;j++){
		var dist=getDistance(reindeerList[j],time);
		if(dist>furthestDist){
			furthestDist = dist;
			furthestReindeer = reindeerList[j];
		}
	}
	console.log(furthestReindeer.name + " Won at " + furthestDist + " km");
}


function day14b(input, time) {
	var inputArray = input.split("\n");
	reindeerList=[];
	for(var i=0;i<inputArray.length;i++){
		reindeerList.push(objectifyReindeer(inputArray[i]));
	}
	for(var i=1;i<=time;i++){
		var furthestDist=0;
		var furthestReindeer = [];
		for(var j=0;j<reindeerList.length;j++){
			var dist=getDistance(reindeerList[j],i);
			if(dist>furthestDist){
				furthestDist = dist;
				furthestReindeer = [reindeerList[j]];
			} else {
				if(dist===furthestDist){
					furthestReindeer.push(reindeerList[j]);
				}
			}
		}
		for(var l=0;l<furthestReindeer.length;l++){
			console.log(furthestReindeer[l].name + " Won and is at  " + furthestReindeer[l].won + " points at Time: "+ i);
			furthestReindeer[l].won = furthestReindeer[l].won || 0;
			furthestReindeer[l].won++;
		}
	}
	var mostWins=0;
	var mostWinsReindeer=null;
	for(var k=0;k<reindeerList.length;k++){
		if(reindeerList[k].won>mostWins){
			mostWins = reindeerList[k].won;
			mostWinsReindeer = reindeerList[k];
		}
	}
	console.log(mostWinsReindeer.name + " Won with " + mostWins + " points!");

}

testData();
console.log("Day 14 Part A");
day14a(reindeerString, 2503);
console.log("Day 14 Part B");
day14b(reindeerString, 2503);
