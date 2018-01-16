function testData() {
	var originalList = generateList(5);
	var swapList=[3, 4, 1, 5];
	var newList = swapItems(originalList, swapList);
	console.log("multiply First Two :" + (newList[0]*newList[1]));
	return newList;	
}

function day10a(){
	var originalList = generateList(256);
	var swapList = [83,0,193,1,254,237,187,40,88,27,2,255,149,29,42,100];
	var newList = swapItems(originalList, swapList);
	console.log("multiply First Two :" + (newList[0]*newList[1]));
	return newList;
}

function hashString(inputstring){
	var originalList = generateList(256);
	var swapList = getLengthArray(inputstring);
	var newList = swapItemsXTimes(originalList, swapList, 64);
	var dense=densePack(newList);
	return dense;
}

function densePack(newList){
	var xoredArray=[];
	for(var i=0;i<16;i++){
		for(var j=0;j<16;j++){
			xoredArray[i]=xorArray(newList.slice(i*16, ((i+1)*16)));
		}
	}
	return convertToHex(xoredArray);
}

function convertToHex(inputArray){
	var retString="";
	for(var i=0;i<inputArray.length;i++){
		retString=retString+decimalToHex(inputArray[i],2);
	}
	return retString;
}

function decimalToHex(d, padding) {
	var hex = Number(d).toString(16);
	padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

	while (hex.length < padding) {
		hex = "0" + hex;
	}

	return hex;
}

function xorArray(inputArray){
	var value=0;
	for(var i=0;i<inputArray.length;i++){
		value=value^inputArray[i];
	}
	return value;
}


function getAsciiArrayFromString(inputString){
	var stringArray=inputString.split("");
	for(var i=0;i<stringArray.length;i++){
		stringArray[i] = stringArray[i].charCodeAt(0);
	}
	return stringArray;
}

function getLengthArray(inputString){
	return getAsciiArrayFromString(inputString).concat([17, 31, 73, 47, 23]);
}

function generateList(size){
	var newArray = [];
	for(var i=0;i<size;i++){
		newArray[i]=i;
	}
	return newArray;
}

function swapItems(list,swaps){
	// console.log(list);
	var currentPos=0;
	var currentSwapSize;
	var skipSize=0;
	for (var i=0;i<swaps.length;i++){
		currentSwapSize=swaps[i];
		var unswapped;
		if(currentPos+currentSwapSize > list.length){
			// have to wrap around
			unswapped = list.slice(currentPos);
			unswapped = unswapped.concat(list.slice(0,currentPos+currentSwapSize-list.length));
		} else {
			unswapped = list.slice(currentPos, currentPos+currentSwapSize);
		}
		// console.log("Current Swap List");
		// console.log(unswapped);
		var reversed = unswapped.reverse();
		replaceArray(currentPos,list,reversed);
		currentPos=(currentPos+currentSwapSize+skipSize)%list.length;
		skipSize++;
		// console.log("NewList");
		// console.log(list);
		// console.log("Skip Size: " + skipSize);
		// console.log("CurrentPos :" + currentPos);
	}
	return list;
}

function swapItemsXTimes(list,swaps,numTimes){
	var currentPos=0;
	var currentSwapSize;
	var skipSize=0;

	for (var j=0;j<numTimes;j++){
		for (var i=0;i<swaps.length;i++){
			currentSwapSize=swaps[i];
			var unswapped;
			if(currentPos+currentSwapSize > list.length){
				// have to wrap around
				unswapped = list.slice(currentPos);
				unswapped = unswapped.concat(list.slice(0,currentPos+currentSwapSize-list.length));
			} else {
				unswapped = list.slice(currentPos, currentPos+currentSwapSize);
			}
			var reversed = unswapped.reverse();
			replaceArray(currentPos,list,reversed);
			currentPos=(currentPos+currentSwapSize+skipSize)%list.length;
			skipSize++;
		}
	}
	return list;
}

function replaceArray(currentPos,list,reversed){
	for(var i=0;i<reversed.length; i++) {
		list[(i+currentPos)%list.length] = reversed[i];
	}
}