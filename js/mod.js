let modInfo = {
	name: "Tree, Inc.",
	id: "capitalism",
	author: "randomtuba",
	pointsName: "money",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (15), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.0.0",
	name: "Rows 1 & 2",
}

let changelog = `<h1>Changelog:</h1><br><br>
	<h3>v1.0.0: Rows 1 & 2</h3><br>
		- Added 4 layers (Workforce, Training, Morale, Investments)<br>
    - Added 9 employees (like buildings)<br>
    - Added 14 upgrades<br>`

let winText = `Congratulations! You have reached your quota and now that you've completed your 10-hour shift, you can go home, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
  gain = gain.add(buyableEffect("w",11)).add(buyableEffect("w",12)).add(buyableEffect("w",13)).add(buyableEffect("w",21)).add(buyableEffect("w",22)).add(buyableEffect("w",23)).add(buyableEffect("w",31)).add(buyableEffect("w",32)).add(buyableEffect("w",33))
  if(hasUpgrade("t",11)) gain = gain.mul(3)
  if(hasUpgrade("t",31)) gain = gain.mul(upgradeEffect("t",31))
  if(hasUpgrade("t",32)) gain = gain.mul(upgradeEffect("t",32))
  gain = gain.mul(new Decimal(4).pow(player.m.points))
  gain = gain.mul(new Decimal(4)
    .add(hasUpgrade("m",11) ? upgradeEffect("m",11) : 1)
    .add(hasUpgrade("m",14) ? upgradeEffect("m",14) : 1)
    .pow(player.m.points).pow(hasUpgrade("m",13)?1.25:1))
  gain = gain.mul(player.i.investmentPoints.pow(2).add(1))
  if(hasUpgrade("t",35)) gain = gain.mul(upgradeEffect("t",35))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = ["Quota: $1e140"
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1e140"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}