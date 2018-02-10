var numberOfSeats = 3014603;

String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.split(search).join(replacement);
};

function getLastSeat(numSeats){
	var seats = {};
	for(var i=0;i<numSeats;i++){
		seats[i+1]=1;
	}
	var curSeatIndex = 0;
	var curSeat;
	var stealSeat;
	var curKeys;
	curKeys = Object.keys(seats);
	while(curKeys.length >1){
		//console.log(seats);
		if(curSeatIndex>curKeys.length){
			curSeatIndex = 0;
			console.log("Length: "+curKeys.length);
		}
		curSeat = seats[curKeys[curSeatIndex]];
		stealSeat = curKeys[(curSeatIndex+1)% curKeys.length];// Get next Available seat;
		seats[curKeys[curSeatIndex]] +=  seats[stealSeat];
		delete seats[stealSeat];
		curSeatIndex++;
		curKeys = Object.keys(seats);
	}
	curKeys = Object.keys(seats);
	console.log(seats);
	return curKeys[0];
}

function getLastSeatv2(numSeats){
	var seats = [];
	for(var i=0;i<numSeats;i++){
		seats[i+1]=1;
	}
	var curSeatIndex = 0;
	var curSeat;
	var stealSeat;
	var curKeys;
	curKeys = Object.keys(seats);
	while(curKeys.length >1){
		console.log(seats.length);
		if(curSeatIndex>curKeys.length){
			curSeatIndex = 0;
			console.log("Length: "+curKeys.length);
		}
		curSeat = seats[curKeys[curSeatIndex]];
		stealSeat = curKeys[(curSeatIndex+1)% curKeys.length];// Get next Available seat;
		seats[curKeys[curSeatIndex]] +=  seats[stealSeat];
		delete seats[stealSeat];
		curSeatIndex++;
		curKeys = Object.keys(seats);
	}
	curKeys = Object.keys(seats);
	console.log(seats);
	return curKeys[0];
}

function getLastSeatSlowv1(numSeats){
	var seats = [];
	for(var i=0;i<numSeats;i++){
		seats[i]=i+1;
	}
	var curSeat = 1;
	var i=0;
	while(seats.length!==1){
		var ind = seats.indexOf(curSeat);
		var ind= (ind+1)%seats.length;
		seats.splice(ind,1);
		curSeat = seats[(ind)%seats.length];
		//console.log(seats);
		i++;
		if(i===1000){
			i=0;
			console.log("I: "+ i + "len: " + seats.length);
		}
	}
	console.log("Last Seat :"+ seats[0]);
	return seats[0];
}

function getLastSeatSlowB(numSeats){
	var seats = [];
	for(var i=0;i<numSeats;i++){
		seats[i]=i+1;
	}
	var curSeat = 1;
	var i=0;
	while(seats.length!==1){
		//console.log(curSeat);
		var ind = seats.indexOf(curSeat);
		var stealInd = (Math.floor(ind+(seats.length/2))%seats.length);
		seats.splice(stealInd,1);
		curSeat = seats[(seats.indexOf(curSeat)+1)%seats.length];
		//console.log(seats);
		i++;
		if(i%1000===0){
			i=0;
			console.log("I: "+ i + "len: " + seats.length);
		}
	}
	//console.log("Last Seat :"+ seats[0]);
	return seats[0];
}

function getLastSeatSlow(numSeats){
	var seats = [];
	for(var i=0;i<numSeats;i++){
		seats[i]=i+1;
	}
	var curSeat = 1;
	var i=0;
	var lastOffSet=0
	while(seats.length!==1){
		var newSeats = seats.filter(function(value,index){
			if((index+lastOffSet)%2==1){
				return false;
			}
			return true;
		});
		if((seats.length%2) ===1){
			lastOffSet = (lastOffSet+1)%2; //switch between 1 and 0;
		}
		seats = newSeats;
		//console.log(seats);
		i++;

		console.log("I: "+ i + "len: " + seats.length);
	}
	//console.log("Last Seat :"+ seats[0]);
	return seats[0];
}

function getLastSeatB(num){
	var cur=1;
	while((cur*3)<=num){
		cur= cur*3;
	}
//	console.log(cur);
	if(cur===num){
		return num;
	}
	else {
		var offset = num-cur;
		if(offset<=cur){
			return offset;
		} else{
			offset = offset-cur;
			return (offset*2)+cur;
		}
	}
	return cur;
}

function testData(){
	var numSeats = 5;
	console.log(getLastSeatSlow(numSeats));

	console.log(getLastSeatSlowB(8));
	for(var i=1;i<49;i++){
		console.log("For N: "+ i + " Last Standing: " + getLastSeatSlowB(i));
		console.log("Fast N: "+ i + " Last Standing: " + getLastSeatB(i));
	}


}

function day19a(input){
	console.log(getLastSeatSlow(input));
}

var sortFunc = function(a,b){
	if(a.x<b.x){
		return -1;
	}
	if(a.x>b.x){
		return 1;
	}
	if(a.y<b.y){
		return -1;
	}
	if(a.y>b.y){
		return 1;
	}
	return 0;
}
function day19b(input){
	console.log("Input N: "+ input + " Last Standing: " + getLastSeatB(input));
}


testData();
console.log("Day 19 Part A");
day19a(numberOfSeats);
console.log("Day 19 Part B");
day19b(numberOfSeats);
