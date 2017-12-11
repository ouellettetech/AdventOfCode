function day2a(inputString) {
	var lines = inputString.split("\n");
	var sum = 0;
	for(var i=0;i<lines.length;i++){
		var entries = lines[i].split("\t");
		var max = entries[0];
		var min = entries[0];
		for(var j=0;j<entries.length;j++){
			
			var cur= parseInt(entries[j]);
			if(cur>max) {
				max=cur;
			}
			if(cur<min) {
				min=cur;
			}
		}
		sum = max-min+sum;
	}
	console.log(sum);
}

function day2b(inputString) {
	var lines = inputString.split("\n");
	var sum = 0;
	for(var i=0;i<lines.length;i++){
		var entries = lines[i].split("\t");
		var division=0;
		for(var j=0;j<entries.length;j++){
			for(var k=0;k<entries.length;k++){
				if(j!==k ) {
					var first = parseInt(entries[j]);
					var second = parseInt(entries[k]);
					var result = first/second;
					if (result === Math.floor(result)){
						division = result;
					}
				}
			}
		}
		
		sum = division+sum;
	}
	console.log(sum);
}