addLayer("cg", {
    name: "copmany goals", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CG", // This appears on the layer's node. Default is the id with the first letter capitalized
    color: "#CCCCCC",
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    tooltip:"Company Goals",
    resource: "goals", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
tabFormat: [
    ["display-text", () => `You have ${player.cg.achievements.length}/18 goals (${format(new Decimal(player.cg.achievements.length).div(18).mul(100))}%)<br><br>`],
    "achievements"
],
    layerShown(){return true},
  achievements: {
    11: {
        name: "Unpaid Assistant",
      done(){return player.w.buyables[11] >= 1},
      tooltip:"Hire an Intern."
    },
    12: {
        name: "Office Drone",
      done(){return player.w.buyables[12] >= 1},
      tooltip:"Hire a Wage Slave."
    },
    13: {
        name: "Door-to-Door Charlatan",
      done(){return player.w.buyables[13] >= 1},
      tooltip:"Hire a Salesman."
    },
    14: {
        name: "Corporate Loyalist",
      done(){return player.w.buyables[21] >= 1},
      tooltip:"Hire a Middle Manager."
    },
    15: {
        name: "Thought Leader",
      done(){return player.w.buyables[22] >= 1},
      tooltip:"Hire a C-Level."
    },
    16: {
        name: "Officer Friendly",
      done(){return player.w.buyables[23] >= 1},
      tooltip:"Hire a Privatized Cop."
    },
    21: {
        name: "Elected Official",
      done(){return player.w.buyables[31] >= 1},
      tooltip:"Hire a Pocket Politician."
    },
    22: {
        name: "New World Order",
      done(){return player.w.buyables[32] >= 1},
      tooltip:"Hire a Shadow Government."
    },
    23: {
        name: "All-Knowing",
      done(){return player.w.buyables[33] >= 1},
      tooltip:"Hire an Overseer."
    },
    24: {
        name: "Preparation",
      done(){return player.t.points.gte(1)},
      tooltip:"Gain 1 training seminar."
    },
    25: {
        name: "Technique",
      done(){return hasUpgrade("t",21) && hasUpgrade("t",22) && hasUpgrade("t",23)},
      tooltip:"Buy the 3 second-row Training Upgrades."
    },
    26: {
        name: "Skeleton Crew",
      done(){return player.points.gte(1e6) && player.w.buyables[12] == 0 && player.w.buyables[13] == 0 && player.w.buyables[21] == 0 && player.w.buyables[22] == 0 && player.w.buyables[23] == 0 && player.w.buyables[31] == 0 && player.w.buyables[32] == 0 && player.w.buyables[33] == 0},
      tooltip:"Reach 1,000,000 points with only Interns."
    },
    31: {
        name: "Employers",
      done(){return hasMilestone("t",0)},
      tooltip:"Automate the hiring of employees."
    },
    32: {
        name: "Joy To The World",
      done(){return player.m.points.gte(1)},
      tooltip:"Gain 1 morale."
    },
    33: {
        name: "Profits",
      done(){return player.i.investmentPoints.gte(1)},
      tooltip:"Invest with your stocks for the first time."
    },
    34: {
        name: "False Happiness",
      done(){return player.m.points.gte(10)},
      tooltip:"Have at least 10 morale."
    },
    35: {
        name: "Dried-Out Economy",
      done(){return player.points.gte(1e75)},
      tooltip:"Reach 1e75 points."
    },
    36: {
        name: "Daddy Warbucks",
      done(){return player.points.gte(1e100)},
      tooltip:"Reach 1e100 points."
    },
},
})