function day3a(cell) {

	var spiral = getSpiral(cell);
	var offset = cell - (spiral * spiral);
	var startOffset = (spiral-1)/2;
	var sidelen = (spiral+1);
	var x =0;
	if(offset == 0){
		return startOffset*2;
	}
	if(offset <= sidelen){
		// RightSide
		x = startOffset +1;
		console.log("sidelen: "+sidelen);
		y = offset - (sidelen/2);
		console.log("x: "+x);
		console.log("y: "+y);
	} else {
		offset = offset - sidelen;
		if(offset <= sidelen){
			// Top
			y = startOffset +1;
			console.log("sidelen: "+sidelen);
			x = offset - (sidelen/2);
			console.log("x: "+x);
			console.log("y: "+y);
		} else {
			offset = offset - sidelen;
			if(offset <= sidelen){
				// LeftSide
				x = (startOffset +1) * -1;
				console.log("sidelen: "+sidelen);
				y = offset - (sidelen/2);
				console.log("x: "+x);
				console.log("y: "+y);
			} else {
				offset = offset - sidelen;
				if(offset <= sidelen){
					// Bottom side
					y = (startOffset +1) * -1;
					console.log("sidelen: "+sidelen);
					x = offset - (sidelen/2);
					console.log("x: "+x);
					console.log("y: "+y);
				}
			}
		}
	}
	return getDistance(x,y);
}

function getSpiral(input){
	var sqrt = Math.floor(Math.sqrt(input));
	sqrt = ( sqrt & 1 ) ? sqrt : (sqrt - 1);
	return sqrt;
}

function getDistance(x, y){
	return Math.abs(x) + Math.abs(y);
}

function day3b(findValue) {
	var size = 100;
	var myarray = new Array(size);
	for(var i = 0; i < size; i++ ){
		myarray[i] = new Array(size);
		for(var j=0; j< size; j++ ){
			myarray[i][j] = 0;
		}
	}
	var x;
	var y;
	var lastVal=1;
	x = size/2;
	y = size/2;
	myarray[x][y] = 1;
	var currentSpiral=0;
	console.log("Current x:"+x+ "Current y:"+y);
	while(lastVal<findValue && x < 100 && y < 100){
		currentSpiral = currentSpiral+1;
		x=x+1;
		y = y +1;
		for(var i = 0; i < currentSpiral*2 && lastVal<findValue; i ++){
			y = y - 1;
			lastVal = calculateValue(x,y, myarray);
			myarray[x][y]= lastVal;
		}
		for(var i = 0; i < currentSpiral*2 && lastVal<findValue; i ++){
			x = x - 1;
			lastVal = calculateValue(x,y, myarray);
			myarray[x][y]= lastVal;
		}
		for(var i = 0; i < currentSpiral*2 && lastVal<findValue; i ++){
			y = y + 1;
			lastVal = calculateValue(x,y, myarray);
			myarray[x][y]= lastVal;
		}
		for(var i = 0; i < currentSpiral*2 && lastVal<findValue; i ++){
			x = x + 1;
			lastVal = calculateValue(x,y, myarray);
			myarray[x][y]= lastVal;		
		}
	}
	return lastVal;
}

function calculateValue(x,y, curArray){
	console.log("Current x:"+x+ "Current y:"+y);
	var result = curArray[x-1][y] + 
	curArray[x+1][y] +
	curArray[x-1][y-1] +
	curArray[x+1][y-1] +
	curArray[x-1][y+1] +
	curArray[x+1][y+1] +
	curArray[x][y-1] +
	curArray[x][y+1];
	console.log("New Value: " + result);
	return result;
	
}