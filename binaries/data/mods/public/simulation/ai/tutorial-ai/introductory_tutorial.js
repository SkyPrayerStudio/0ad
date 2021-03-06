var introductoryTutorial = [
//Tutorial starts with a Civil Centre, 3 female citizens, and 1 skirmisher. The civ is Sparta. 2 AI players - One for attacking, one for base defending(?).
{
	"instructions": "Welcome to the 0 A.D. tutorial. First left-click on a female citizen, then Right-click on a berry bush nearby to make the unit collect food. Female citizens gather food faster than other units."
},
{
	"instructions": "Select the citizen-soldier, Right-click on a tree near the Civil Centre to begin collecting wood. Citizen-soldiers gather wood faster than female citizens.",
	"trigger": "food_gathered"
},
{
	"instructions": "Select the Civil Centre building, and shift-click on the Hoplite icon (2nd in the row) once to begin training 5 Hoplites.",
	"trigger": "wood_gathered"
},
{
	"instructions": "Select the two idle female citizens and build a house nearby by selecting the house icon. Place the house by left-clicking on a piece of land.",
	"trigger": "training_start",
	"template": "units/spart_infantry_spearman_b",
	"count": 5
},
{
	"instructions": "Select the newly trained Hoplites and assign them to build a storehouse beside some nearby trees. They will begin to gather wood when it's constructed.",
	"trigger": "entity_count",
	"template": "structures/spart_house",
	"count": 1
},
{
	"instructions": "Build a set of 5 skirmishers by shift-clicking on the skirmisher icon (3rd in the row) in the Civil Centre.",
	"trigger": "entity_count",
	"template": "structures/spart_storehouse",
	"count": 1
},
{
	"instructions": "Build a farmstead in an open space beside the Civil Centre using any idle builders.",
	"trigger": "training_start",
	"template": "units/spart_infantry_javelinist_b",
	"count": 5
},
{
	"instructions": "Once the farmstead is constructed, its builders will automatically begin gathering food if there is any nearby. Select the builders and instead make them construct a field beside the farmstead.",
	"trigger": "entity_count",
	"template": "structures/spart_farmstead",
	"count": 1
},
{
	"instructions": "The field's builders will now automatically begin collecting food from the field. Using the newly created group of skirmishers, get them to build another house nearby.",
	"trigger": "entity_count",
	"template": "structures/spart_field",
	"count": 1
},
{
	"instructions": "Train 5 Hoplites from the Civil Centre. Select the Civil Centre and with it selected right click on a tree nearby. Units from the Civil Centre will now automatically gather wood.",
	"trigger": "entity_count",
	"template": "structures/spart_house",
	"count": 2
},
{
	"instructions": "Order the idle Skirmishers to build an outpost to the north east at the edge of your territory.  This will be the fifth Village Phase structure that you have built, allowing you to advance to the Town Phase.",
	"trigger": "entity_count",
	"template": "units/spart_infantry_spearman_b",
	"count": 10
},
{
	"instructions": "Select the Civil Centre again and advance to Town Phase by clicking on the 'II' icon. This will allow Town Phase buildings to be constructed.",
	"trigger": "entity_count",
	"template": "structures/spart_outpost",
	"count": 1
},
{
	"instructions": "Start building 5 female citizens in the Civil Centre and set its rally point to the farm (right click on it)",
	"trigger": "relative_time",
	"time": 34 //TODO: This is a hack, should be when town phase is researched
},
{
	"instructions": "Build a barracks nearby. Whenever your population limit is reached, build an extra house using any available builder units.",
	"trigger": "entity_count",
	"template": "units/spart_support_female_citizen",
	"count": 8
},
{
	"instructions": "Prepare for an attack by an enemy player. Build more soldiers using the Barracks, and get idle soldiers to build a Defense Tower near your Outpost.",
	"trigger": "entity_count",
	"template": "structures/spart_barracks",
	"count": 1
},
{
	"instructions": "Select the Barracks and research the Infantry Training technology (sword icon) to improve infantry hack attack",
	"action": introductory_tutorial_attack,
	"trigger": "entity_count",
	"template": "structures/spart_defense_tower",
	"count": 1
},
{
	"instructions": "The enemy's attack has been defeated. Now build a market and temple while assigning new units to gather any required resources.",
	"trigger": "dead_enemy_units",
	"collectionId": "intro_tutorial_attackers"
},
{
	"instructions": "Now that City Phase requirements have been reached, select your Civil Centre and advance to City Phase.",
	"trigger": "entity_counts",
	"templates": ["structures/spart_market", "structures/spart_temple"],
	"counts": [1,1]
},
{
	"instructions": "Now that you are in City Phase, build a fortress nearby and use it to build 2 Battering Rams",
	"trigger": "relative_time",
	"time": 65 //TODO: This is a hack, should be when city phase is researched
},
{
	"instructions": "Stop all your soldiers gathering resources and instead task small groups to find the enemy Civil Centre on the map. Female citizens should continue to gather resources.",
	"action": introductory_tutorial_remove_champions,
	"trigger": "entity_count",
	"template": "units/spart_mechanical_siege_ram",
	"count": 2
},
{
	"instructions": "The enemy's base has been spotted, send your siege weapons and all remaining soldiers to destroy it.",
	"trigger": "near_cc"
},
{
	"instructions": "The enemy has been defeated. All tutorial tasks are now completed...",
	"trigger": "dead_enemy_units",
	"collectionId": "intro_tutorial_cc"
}
];

function introductory_tutorial_attack(gameState) {
	var units = gameState.updatingCollection(
		"intro_tutorial_attackers", 
		Filters.or(
			Filters.byType("units/athen_infantry_spearman_b"), 
			Filters.byType("units/athen_infantry_javelinist_b")
		),
		gameState.getOwnEntities()
	);
	var towers = gameState.updatingCollection(
		"players_towers", 
		Filters.byType("structures/spart_defense_tower"),
		gameState.getEnemyEntities()
	);
	var towerPos = towers.toEntityArray()[0].position();
	units.move(towerPos[0]+5, towerPos[1]+15);
}

function introductory_tutorial_remove_champions(gameState) {
	var units = gameState.updatingCollection(
		"intro_tutorial_champions", 
		Filters.or(
			Filters.byType("units/athen_champion_infantry"), 
			Filters.or(
				Filters.byType("units/athen_champion_marine"), 
				Filters.byType("units/athen_champion_ranged")
			)
		),
		gameState.getOwnEntities()
	);
	var cc = gameState.updatingCollection(
		"intro_tutorial_cc", 
		Filters.byType("structures/athen_civil_centre"),
		gameState.getOwnEntities()
	);

	units.destroy();
}
