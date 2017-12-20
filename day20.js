function testData() {
	var particleString="p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>\np=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>";
	var particles=parseString(particleString);
	var minimumAccelerations=findMinByField(particles,"acceleration");
	var minimumVelocity=findMinByField(minimumAccelerations,"velocity");
	var minimumPosition=findMinByField(minimumVelocity,"position");
	return minimumPosition;
}


function testData2(){
	var particleString="p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>\np=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>\np=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>\np=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>";
	var particles=parseString(particleString);
	var sortedParticles=particles.sort(sortByPosition);
	var movesSinceCollision=0;

	sortedParticles=findCollisions(sortedParticles);
	console.log("New Particle Length: " + sortedParticles.length);
	for(var i=0;i<10000;i++){
		// number to decide how long to go, the particles should get farther away as the process goes.
		updateParticlePositions(sortedParticles);
		sortedParticles=sortedParticles.sort(sortByPosition);
			
		sortedParticles=findCollisions(sortedParticles);
		console.log("New Particle Length: " + sortedParticles.length);
	}
	return sortedParticles;
}

function updateParticlePositions(particles){
	for(var i=0;i<particles.length;i++){
		updatePositionVelocity(particles[i]);
	}
}

function day20a(inputString) {
	var particles=parseString(inputString);
	var minimumAccelerations=findMinByField(particles,"acceleration");
	var minimumVelocity=findMinByField(minimumAccelerations,"velocity");
	var minimumPosition=findMinByField(minimumVelocity,"position");
	return minimumPosition;
}


function parseString(inputString){
	var inputArray=inputString.split("\n");
	var particales=[];
	for(var i=0;i<inputArray.length;i++){
		var newParticle={};
		var particleSections=inputArray[i].split(", ");
		var positionArray=particleSections[0].replace("p=<","").replace(">","").split(",");
		var newPosition={
			x:parseInt(positionArray[0],10),
			y:parseInt(positionArray[1],10),
			z:parseInt(positionArray[2],10),
		};
		newPosition.value=getAbsoluteValue(newPosition);
		newParticle.position=newPosition;

		var velocityArray=particleSections[1].replace("v=<","").replace(">","").split(",");
		var newVelocity={
			x:parseInt(velocityArray[0],10),
			y:parseInt(velocityArray[1],10),
			z:parseInt(velocityArray[2],10),
		};
		newVelocity.value=getAbsoluteValue(newVelocity);
		newParticle.velocity=newVelocity;

		var accelerationArray=particleSections[2].replace("a=<","").replace(">","").split(",");
		var newAcceleration={
			x:parseInt(accelerationArray[0],10),
			y:parseInt(accelerationArray[1],10),
			z:parseInt(accelerationArray[2],10),
		};
		newAcceleration.value=getAbsoluteValue(newAcceleration);
		newParticle.acceleration=newAcceleration;
		newParticle.originalPlacement=i;
		console.log(newParticle);
		particales.push(newParticle);
	}
	return particales;
}

// A min heap is most efficient, but I'll just sort them to write this faster, and change it later if I'm bored.

function findMinByField(particles,field){

	var sortFunc=function (a,b){
		if(a[field].value > b[field].value){
			return 1;
		}
		if(b[field].value > a[field].value){
			return -1;
		}
		return 0;
	}
	var sorted=particles.sort(sortFunc);
	var numberOfDups=0;
	while(numberOfDups<sorted.length && sorted[numberOfDups][field].value===sorted[0][field].value){
		numberOfDups++;
	}
	console.log(numberOfDups);
	return sorted.slice(0,numberOfDups);
}

function getAbsoluteValue(coordinates){
	return Math.abs(coordinates.x) + Math.abs(coordinates.y) + Math.abs(coordinates.z);
}

function sortByPosition(a,b){
	if(a.position.x > b.position.x){
		return 1;
	}
	if(b.position.x > a.position.x){
		return -1;
	}
	if(a.position.y > b.position.y){
		return 1;
	}
	if(b.position.y > a.position.y){
		return -1;
	}
	if(a.position.z > b.position.z){
		return 1;
	}
	if(b.position.z > a.position.z){
		return -1;
	}
	return 0;
}



function day20b(inputString) {	
	var particles=parseString(inputString);
	var sortedParticles=particles.sort(sortByPosition);
	var movesSinceCollision=0;

	sortedParticles=findCollisions(sortedParticles);
	for(var i=0;i<100000;i++){
		// number to decide how long to go, the particles should get farther away as the process goes.
		updateParticlePositions(sortedParticles);
		sortedParticles=sortedParticles.sort(sortByPosition);
			
		sortedParticles=findCollisions(sortedParticles);
		console.log("New Particle Length: " + sortedParticles.length);
	}
	return sortedParticles;
}

function findCollisions(particles){	
	var newArray=[];
	// Javascript returns undefined if you walk off the end of an arry.

	for(var i=0;i<particles.length;i++){
		var collisionDetection=false;
		if(isCollided(particles[i],particles[i-1])){
			collisionDetection=true;
		}
		if(isCollided(particles[i],particles[i+1])){
			collisionDetection=true;
		}
		if(!collisionDetection){
			newArray.push(particles[i]);
		} else{
			console.log("Particle Collided!");
			console.log(particles[i])
		}
	}
	return newArray;
}

function updatePositionVelocity(particle){
	particle.velocity.x+=particle.acceleration.x;
	particle.velocity.y+=particle.acceleration.y;
	particle.velocity.z+=particle.acceleration.z;
	particle.position.x+=particle.velocity.x;
	particle.position.y+=particle.velocity.y;
	particle.position.z+=particle.velocity.z;
	
}

function isCollided(a,b){
	if(a===undefined || b === undefined){
		return false;
	}
	if(a.position.x!=b.position.x){
		return false;
	}
	if(a.position.y!=b.position.y){
		return false;
	}
	if(a.position.z!=b.position.z){
		return false;
	}
	console.log("Found Collision!");
	return true;
}