function testData() {
	var testString="0: 3\n1: 2\n4: 4\n6: 4";
	var firewallArray = constructArray(testString);
	console.log(firewallArray);
	var alarms = findAlarm(firewallArray);
	console.log(alarms);
	return alarms;
}

function constructArray(testString){ // with Javascript its easier to parse it all into a datastructure 
	//and then analyze it, if I were worried about performace I'd parse it when analyzing it.
	var lines = testString.split("\n");
	firewallArray={};
	for(var i=0;i<lines.length; i++){
		var cur = lines[i].split(": ");
		firewallArray[parseInt(cur[0])]=parseInt(cur[1]);
	}
	return firewallArray;
}

function day13a(inputString) {
	var firewallArray = constructArray(inputString);
	console.log(firewallArray);
	var alarms = findAlarm(firewallArray);
	console.log(alarms);
	return alarms;
}

function day13b(inputString){
	var firewallArray = constructArray(inputString);
	console.log(firewallArray);
	var currentDelay=0;
	var alarms = findAlarm(firewallArray,currentDelay);
	console.log(alarms);
	while(alarms.length!=0){
		currentDelay++;
		alarms = findAlarm(firewallArray,currentDelay);
	}
	console.log(currentDelay);
	return alarms;
}


function findAlarm(firewallArray,delay) {
	var startDelay=delay || 0;
	var alarms=[];
	var keys = Object.keys(firewallArray);
	for(var i=0; i<keys.length;i++){
		if(getAlarmHeight(parseInt(keys[i])+startDelay, firewallArray[keys[i]])==0){
			alarms.push(keys[i]);
		}
	}
	return alarms;
}

function getAlarmHeight(currentPico, height){
	where = currentPico%((height-1)*2);
	return where;
}
