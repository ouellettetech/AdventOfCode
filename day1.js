function day1a(inputString) {
	var newArray=inputString.split("");
	var sum = 0;
	var second =0;
	for(var i=0;i<newArray.length;i++){
		var second= (i + 1) %newArray.length;
		if(newArray[i] ===  newArray[second]){
			sum=sum+parseInt(newArray[i]);
		}
	}
	console.log(sum);
}

function day1b(inputString) {
	var newArray=inputString.split("");
	var sum = 0;
	var second =0;
	for(var i=0;i<newArray.length;i++){
		var second= (i + (newArray.length/2)) %newArray.length;
		if(newArray[i] ===  newArray[second]){
			sum=sum+parseInt(newArray[i]);
		}
	}
	console.log(sum);
}