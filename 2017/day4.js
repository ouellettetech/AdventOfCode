function day4a(passphrases) {
	var phraseArray = passphrases.split("\n");
	var sum = 0;
	for(var i=0; i < phraseArray.length; i++){
		if(isValid(phraseArray[i])){
			sum = sum + 1;
		}
	}
	return sum;
}

function isValid(passphrase){
	console.log("Checking :"+passphrase);
	var passwords=passphrase.split(" ");
	var valid=true;
	for(var i=0;i<passwords.length && valid;i++){
		for(var j=i+1;j<passwords.length && valid;j++){
			if(passwords[i] === passwords[j]){
				valid=false;
			}
		}
	}
	return valid;
}

function day4b(passphrases) {
	var phraseArray = passphrases.split("\n");
	var sum = 0;
	for(var i=0; i < phraseArray.length; i++){
		if(isValidAnagram(phraseArray[i])){
			sum = sum + 1;
		}
	}
	return sum;
}

function isValidAnagram(passphrase){
	console.log("Checking :"+passphrase);
	var passwords=passphrase.split(" ");
	var valid=true;
	for(var i=0;i<passwords.length && valid;i++){
		for(var j=i+1;j<passwords.length && valid;j++){
			if(isAnagram(passwords[i], passwords[j])){
				valid=false;
			}
		}
	}
	return valid;
}

function isAnagram(password1, password2){
	var sarray1=password1.split("").sort();
	var sarray2=password2.split("").sort();
	return arrayEqual(sarray1,sarray2);
}

function arrayEqual(array1, array2){
	if(array1.length != array2.length)
	{
		return false;
	}
	for(var i=0; i < array1.length; i++){
		if (array1[i] != array2[i])
		{
			return false;
		}
	}
	return true;
}