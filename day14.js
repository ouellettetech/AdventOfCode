function testData() {
	var originalList = generateList(5);
	var swapList=[3, 4, 1, 5];
	var newList = swapItems(originalList, swapList);
	console.log("multiply First Two :" + (newList[0]*newList[1]));
	return newList;	
}

function day14a(){
	var originalString="jzgqcdpd-";
	var data=0;
	for(var i=0;i<128;i++){
		var hashed=hashString(originalString+i);
		var binary=convertHexToBinary(hashed);
		data=data+countData(binary);
	}
	return data;
}

function day14b(){
	var originalString="jzgqcdpd-";
	var data=0;
	var binaryArray=[];
	var groups=0;
	for(var i=0;i<128;i++){
		var hashed=hashString(originalString+i);
		var binary=convertHexToBinary(hashed);
		binaryArray[i]=binary.split("");
		for(var j=0;j<binaryArray[i].length;j++){
			if(binaryArray[i][j]=="1"){
				binaryArray[i][j]="X";	
			}
		}
	}
	for(var i=0;i<binaryArray.length;i++){
		for(var j=0;j<binaryArray[i].length;j++){
			if(binaryArray[i][j]=="X"){
				groups++;
				findCurrentGroup(binaryArray,i,j,groups);
			}
		}
	}
	return groups;
}

function findCurrentGroup(binaryArray,x,y,curGroup) {
	if(x<binaryArray.length && x>=0){
		if(y<binaryArray.length && y>=0){
			if(binaryArray[x][y]=="X"){
				binaryArray[x][y]=curGroup;
				findCurrentGroup(binaryArray,x,y+1,curGroup);
				findCurrentGroup(binaryArray,x+1,y,curGroup);
				findCurrentGroup(binaryArray,x,y-1,curGroup);
				findCurrentGroup(binaryArray,x-1,y,curGroup);
			}
		}
	}
}

function countData(binaryData){
	var nonZeroEntries=0;
	var binaryArray=binaryData.split("");
	for(var i=0;i<binaryArray.length;i++){
		if(binaryArray[i]!="0"){
			nonZeroEntries++;
		}
	}
	return nonZeroEntries;
}

function convertHexToBinary(hexString){
	var hexarray=hexString.split("");//convert to array
	var binString="";
	for(var i=0;i<hexarray.length;i++){
		var decimalString=parseInt(hexarray[i],16).toString(2);

		while (decimalString.length < 4) {
			decimalString = "0" + decimalString;
		}
		binString=binString+decimalString;
	}
	return binString;
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