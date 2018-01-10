var shop = {Weapons:   [
	{ name: "Dagger", Cost: 8, Damage: 4, Armor: 0},
	{ name: "Shortsword", Cost: 10, Damage: 5, Armor: 0},
	{ name: "Warhammer", Cost: 25, Damage: 6, Armor: 0},
	{ name: "Longsword", Cost: 40, Damage: 7, Armor: 0},
	{ name: "Greataxe", Cost: 74, Damage: 8, Armor: 0},],
	 Armor: [
	{ name: "Leather", Cost: 13, Damage: 0, Armor: 1},
	{ name: "Chainmail", Cost: 31, Damage: 0, Armor: 2},
	{ name: "Splintmail", Cost: 53, Damage: 0, Armor: 3},
	{ name: "Bandedmail", Cost: 75, Damage: 0, Armor: 4},
	{ name: "Platemail", Cost: 102, Damage: 0, Armor: 5},
	{ name: "None", Cost: 0, Damage: 0, Armor: 0},], 
	 Rings: [
	{ name: "Damage +1", Cost: 25, Damage: 1, Armor: 0},
	{ name: "Damage +2", Cost: 50, Damage: 2, Armor: 0},
	{ name: "Damage +3 ", Cost: 100, Damage: 3, Armor: 0},
	{ name: "Defense +1", Cost: 20, Damage: 0, Armor: 1},
	{ name: "Defense +2", Cost: 40, Damage: 0, Armor: 2},
	{ name: "Defense +3", Cost: 80, Damage: 0, Armor: 3},
	{ name: "None 1", Cost: 0, Damage: 0, Armor: 0},
	{ name: "None 2", Cost: 0, Damage: 0, Armor: 0},],
};

var Boss = {HP: 109, Damage: 8, Armor: 2};

function DoesPlayerWin(Boss,Player){
	var PlayerNetDamage = Player.Damage - Boss.Armor;
	if(PlayerNetDamage<1){
		PlayerNetDamage = 1;
	}
	var BossNetDamage = Boss.Damage - Player.Armor;
	if(BossNetDamage<1){
		BossNetDamage = 1;
	}
	var bossRounds = Math.ceil(Player.HP/BossNetDamage);
	var playerRounds = Math.ceil(Boss.HP/PlayerNetDamage);
	if(bossRounds>=playerRounds){
		return true;
	}
	return false;
}

function getAllOutfitCombos(curShop){
	var combos = [];
	for(var i=0;i<curShop.Weapons.length;i++){
		for(var j=0;j<curShop.Armor.length;j++){
			for(var k=0;k<curShop.Rings.length;k++){
				for(var l=k+1;l<curShop.Rings.length;l++){
					combos.push({
						Weapon: curShop.Weapons[i],
						Armor: curShop.Armor[j],
						Ring1: curShop.Rings[k],
						Ring2: curShop.Rings[l], })
				}
			}
		}
	}
	return combos;
}

function getPlayerStats(HP, weapon, armor, ring1, ring2){
	var playerStats = {HP: HP, Damage: 0, Armor: 0, Cost: 0};
	playerStats.Damage = weapon.Damage + armor.Damage + ring1.Damage + ring2.Damage;
	playerStats.Armor = weapon.Armor + armor.Armor + ring1.Armor + ring2.Armor;
	playerStats.Cost = weapon.Cost + armor.Cost + ring1.Cost + ring2.Cost;
	return playerStats;
}

function testData(){
	console.log(DoesPlayerWin({HP: 12, Damage: 7, Armor: 2},{HP: 8, Damage: 5, Armor: 5}));
	console.log(DoesPlayerWin({HP: 12, Damage: 7, Armor: 2},{HP: 6, Damage: 5, Armor: 5}));
}

// I was going to go through and check what the next best item is at each point, but easier to just calc each.
function day21a(curBoss, curShop){
	var combos = getAllOutfitCombos(curShop);
	console.log("After getting combinations!");
	var lowestCost = 400; // larger than largest purchase.
	for(var i=0;i<combos.length;i++){
		var pStat = getPlayerStats(100, combos[i].Weapon,  combos[i].Armor, combos[i].Ring1, combos[i].Ring2);
		if (DoesPlayerWin(curBoss, pStat)){
			if(lowestCost>pStat.Cost){
				lowestCost=pStat.Cost;
			}
		}
	}
	return lowestCost;
}

function day21b(curBoss, curShop){
	var combos = getAllOutfitCombos(curShop);
	console.log("After getting combinations!");
	var highestCost = 0; // larger than largest purchase.
	for(var i=0;i<combos.length;i++){
		var pStat = getPlayerStats(100, combos[i].Weapon,  combos[i].Armor, combos[i].Ring1, combos[i].Ring2);
		if (!DoesPlayerWin(curBoss, pStat)){
			if(highestCost<pStat.Cost){
				highestCost=pStat.Cost;
			}
		}
	}
	return highestCost;
}

testData();
console.log("Day 21 Part A");
console.log(day21a(Boss, shop));
console.log("Day 21 Part B");
console.log(day21b(Boss, shop));
