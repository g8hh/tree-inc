addLayer("w", {
    name: "workforce", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    tabFormat: [
    ["infobox","intro"],
    "buyables",
    ],
    tooltip: "Welcome to Tree, Inc.!",
    color: "#808080",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "boot-strap grit", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    automate(){
      if (player.w.auto) {
        setBuyableAmount("w",11,tmp.w.buyables[11].canAfford?player.points.div(15).log(1.15).floor().add(1):getBuyableAmount("w",11))
        setBuyableAmount("w",12,tmp.w.buyables[12].canAfford?player.points.div(100).log(1.15).floor().add(1):getBuyableAmount("w",12))
        setBuyableAmount("w",13,tmp.w.buyables[13].canAfford?player.points.div(1200).log(1.15).floor().add(1):getBuyableAmount("w",13))
        setBuyableAmount("w",21,tmp.w.buyables[21].canAfford?player.points.div(18000).log(1.15).floor().add(1):getBuyableAmount("w",21))
        setBuyableAmount("w",22,tmp.w.buyables[22].canAfford?player.points.div(350000).log(1.15).floor().add(1):getBuyableAmount("w",22))
        setBuyableAmount("w",23,tmp.w.buyables[23].canAfford?player.points.div(6500000).log(1.15).floor().add(1):getBuyableAmount("w",23))
        setBuyableAmount("w",31,tmp.w.buyables[31].canAfford?player.points.div(120000000).log(1.15).floor().add(1):getBuyableAmount("w",31))
        setBuyableAmount("w",32,tmp.w.buyables[32].canAfford?player.points.div(4e9).log(1.15).floor().add(1):getBuyableAmount("w",32))
        setBuyableAmount("w",33,tmp.w.buyables[33].canAfford?player.points.div(8e10).log(1.15).floor().add(1):getBuyableAmount("w",33))
      }
    },
    layerShown(){return true},
    buyables: {
      11: {
        title: "Intern",
        cost(x) {return new Decimal(15).mul(new Decimal(1.15).pow(x)).floor()},
        canAfford() { return player.points.gte(this.cost())},
        buy() {
           player.points = player.points.sub(this.cost())
           setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        display() {return `The humble Intern forms the backbone of any savvy business, paid in experience and eager to please as they pad their resumes in hopes of a better tomorrow.\nAmount Hired: ${format(getBuyableAmount(this.layer, this.id))}\nCost: $${format(this.cost())}\nBase Effect: +$${format(this.effect())}/sec`},
        effect(x) { 
          mult2 = new Decimal(x)
          if(hasUpgrade("t",21)) mult2 = mult2.mul(4)
          return new Decimal(mult2)}
      },
      12: {
        title: "Wage Slave",
        cost(x) {return new Decimal(100).mul(new Decimal(1.15).pow(x)).floor()},
        canAfford() { return player.points.gte(this.cost())},
        buy() {
           player.points = player.points.sub(this.cost())
           setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        display() {return `The solemn Wage Slave is essential to the success of any growing business, dedicated to their work and trapped in an unbreakable cycle of poverty and obligation.\nAmount Hired: ${format(getBuyableAmount(this.layer, this.id))}\nCost: $${format(this.cost())}\nBase Effect: +$${format(this.effect())}/sec`},
        unlocked() {return player.w.buyables[11] >= 5},
        effect(x) { 
          mult2 = new Decimal(x).mul(8)
          if(hasUpgrade("t",21)) mult2 = mult2.mul(4)
          return new Decimal(mult2)}
      },
      13: {
        title: "Salesman",
        cost(x) {return new Decimal(1200).mul(new Decimal(1.15).pow(x)).floor()},
        canAfford() { return player.points.gte(this.cost())},
        buy() {
           player.points = player.points.sub(this.cost())
           setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        display() {return `The confident Salesman is the engine of your business, bringing your valuable products to your cash-laden customers, whether they want them or not.\nAmount Hired: ${format(getBuyableAmount(this.layer, this.id))}\nCost: $${format(this.cost())}\nBase Effect: +$${format(this.effect())}/sec`},
        unlocked() {return player.w.buyables[12] >= 5},
        effect(x) { 
          mult2 = new Decimal(x).mul(75)
          if(hasUpgrade("t",21)) mult2 = mult2.mul(4)
          return new Decimal(mult2)}
      },
      21: {
        title: "Middle Manager",
        cost(x) {return new Decimal(18000).mul(new Decimal(1.15).pow(x)).floor()},
        canAfford() { return player.points.gte(this.cost())},
        buy() {
           player.points = player.points.sub(this.cost())
           setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        display() {return `The ambitious Middle Manager is loyal to your business, striving each day to dominate your lower employees, lest they wither from a lack of motivating leadership.\nAmount Hired: ${format(getBuyableAmount(this.layer, this.id))}\nCost: $${format(this.cost())}\nBase Effect: +$${format(this.effect())}/sec`},
        unlocked() {return player.w.buyables[13] >= 5},
        effect(x) { 
          mult2 = new Decimal(x).mul(660)
          if(hasUpgrade("t",22)) mult2 = mult2.mul(6)
          return new Decimal(mult2)}
      },
      22: {
        title: "C-Level",
        cost(x) {return new Decimal(350000).mul(new Decimal(1.15).pow(x)).floor()},
        canAfford() { return player.points.gte(this.cost())},
        buy() {
           player.points = player.points.sub(this.cost())
           setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        display() {return `The wise C-Level is the conductor of your business, always thinking of innovative and inspiring ways to appear to meet shareholder expectations or inflate valuations.\nAmount Hired: ${format(getBuyableAmount(this.layer, this.id))}\nCost: $${format(this.cost())}\nBase Effect: +$${format(this.effect())}/sec`},
        unlocked() {return player.w.buyables[21] >= 5},
        effect(x) { 
          mult2 = new Decimal(x).mul(8200)
          if(hasUpgrade("t",22)) mult2 = mult2.mul(6)
          return new Decimal(mult2)}
      },
      23: {
        title: "Privatized Cop",
        cost(x) {return new Decimal(6500000).mul(new Decimal(1.15).pow(x)).floor()},
        canAfford() { return player.points.gte(this.cost())},
        buy() {
           player.points = player.points.sub(this.cost())
           setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        display() {return `The brave Privatized Cop is the defender of your business, decked out in riot gear and gas masks as the last line of defense between bricks and your windows.\nAmount Hired: ${format(getBuyableAmount(this.layer, this.id))}\nCost: $${format(this.cost())}\nBase Effect: +$${format(this.effect())}/sec`},
        unlocked() {return player.w.buyables[22] >= 5},
        effect(x) { 
          mult2 = new Decimal(x).mul(114500)
          if(hasUpgrade("t",22)) mult2 = mult2.mul(6)
          return new Decimal(mult2)}
      },
      31: {
        title: "Pocket Politician",
        cost(x) {return new Decimal(120000000).mul(new Decimal(1.15).pow(x)).floor()},
        canAfford() { return player.points.gte(this.cost())},
        buy() {
           player.points = player.points.sub(this.cost())
           setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        display() {return `The dignified Pocket Politician allows your business to thrive unburdened by certain regulations, which would otherwise choke the life from it like a worker getting too close to the conveyor belt.\nAmount Hired: ${format(getBuyableAmount(this.layer, this.id))}\nCost: $${format(this.cost())}\nBase Effect: +$${format(this.effect())}/sec`},
        unlocked() {return player.w.buyables[23] >= 5},
        effect(x) { 
          mult2 = new Decimal(x).mul(1800000)
          if(hasUpgrade("t",23)) mult2 = mult2.mul(8)
          return new Decimal(mult2)}
      },
      32: {
        title: "Shadow Government",
        cost(x) {return new Decimal(4000000000).mul(new Decimal(1.15).pow(x)).floor()},
        canAfford() { return player.points.gte(this.cost())},
        buy() {
           player.points = player.points.sub(this.cost())
           setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        display() {return `The mysterious Shadow Government is the secret benefactor of your business, encouraging social discord and diminishing cultures as they please.\nAmount Hired: ${format(getBuyableAmount(this.layer, this.id))}\nCost: $${format(this.cost())}\nBase Effect: +$${format(this.effect())}/sec`},
        unlocked() {return player.w.buyables[31] >= 5},
        effect(x) { 
          mult2 = new Decimal(x).mul(35500000)
          if(hasUpgrade("t",23)) mult2 = mult2.mul(8)
          return new Decimal(mult2)}
      },
      33: {
        title: "Overseer",
        cost(x) {return new Decimal(80000000000).mul(new Decimal(1.15).pow(x)).floor()},
        canAfford() { return player.points.gte(this.cost())},
        buy() {
           player.points = player.points.sub(this.cost())
           setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        display() {return `The omniscient Overseer is the primordial employee of your business, part of an elusive council unspeakably powerful, hailing from a time beyond memory.\nAmount Hired: ${format(getBuyableAmount(this.layer, this.id))}\nCost: $${format(this.cost())}\nBase Effect: +$${format(this.effect())}/sec`},
        unlocked() {return player.w.buyables[32] >= 5},
        effect(x) { 
          mult2 = new Decimal(x).mul(680000000)
          if(hasUpgrade("t",23)) mult2 = mult2.mul(8)
          return new Decimal(mult2)}
      },
    },
    infoboxes: {
    intro: {
        title: "Workforce",
        body() { return "You've decided to begin your very own company, to try and make some money. However, you're going to need some help to start production. Why don't you start with hiring that Intern?" },
    },
}
})

addLayer("t", {
    name: "training", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#009419",
    requires: new Decimal(50000000), // Can be a function that takes requirement increases into account
    resource: "training seminars", // Name of prestige currency
    baseResource: "money", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Reset for training seminars", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ["w"],
    layerShown(){return player.points.gte(1000000) || player.t.total.gte(1)},
  infoboxes: {
    seminars: {
        title: "Training",
        body() { return "Your employees just aren't working hard enough. This means that you have to go back to the drawing board! It's time for you to teach your workforce a few things about hard work, dedication, and cooperation." },
    },
},
  upgrades: {
      11: {
        title: "Dedication",
        description: "Triple money gain.",
        cost: new Decimal(1),
      },
      21: {
        title: "Longer Work Weeks",
        description: "Workers, Wage Slaves, and Salesmen are 4x as effective.",
        cost: new Decimal(2),
        unlocked() {return hasUpgrade("t",11)}
      },
      22: {
        title: "Promotion",
        description: "Middle Managers, C-Levels, and Privatized Cops are 6x as effective.",
        cost: new Decimal(2),
        unlocked() {return hasUpgrade("t",11)}
      },
      23: {
        title: "Government Bribing",
        description: "Pocket Politicians, Shadow Governments, and Overseers are 8x as effective.",
        cost: new Decimal(2),
        unlocked() {return hasUpgrade("t",11)}
      },
      31: {
        title: "Cooperative Effort",
        description: "Gain more money based on total employees hired.",
        cost: new Decimal(50),
        unlocked() {return hasMilestone("t",0)},
        effect(){return player.w.buyables[11].add(player.w.buyables[12]).add(player.w.buyables[13]).add(player.w.buyables[21]).add(player.w.buyables[22]).add(player.w.buyables[23]).add(player.w.buyables[31]).add(player.w.buyables[32]).add(player.w.buyables[33]).sqrt()},
        effectDisplay(){return `x${format(this.effect())}`}
      },
      32: {
        title: "Innovation",
        description: "Gain more money based on training seminars.",
        cost: new Decimal(300),
        unlocked() {return hasUpgrade("t",31)},
        effect(){return player.t.points.sqrt().add(1)},
        effectDisplay(){return `x${format(this.effect())}`}
      },
      33: {
        title: "Expansion",
        description: "Unlock 2 new layers.",
        cost: new Decimal(1500),
        unlocked() {return hasUpgrade("t",31)},
      },
      34: {
        title: "Stability",
        description: "Investment points decay slower.",
        cost: new Decimal(1e9),
        unlocked() {return hasUpgrade("i",11)},
      },
      35: {
        title: "Synergy",
        description: "Gain more money based on money.",
        cost: new Decimal(1e16),
        unlocked() {return hasUpgrade("i",11)},
        effect(){return player.points.pow(0.05).add(1)},
        effectDisplay(){return `x${format(this.effect())}`}
      },
    },
  milestones: {
    0: {
        requirementDescription: "20 training seminars",
        effectDescription: "Automate the hiring of your employees without having to spend any money.",
        done() { return player.t.points.gte(20) },
        toggles: [
          ["w","auto"]
        ]
    },
  },
})

addLayer("m", {
    name: "morale", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    tabFormat: [
    ["infobox","morale"],
    ["display-text", () => `You have <h2 style="color: #BEFFB8; text-shadow: 0px 0px 10px #BEFFB8">${format(player.m.points)}</h2> morale, multiplying money gain by <h2 style="color: #BEFFB8; text-shadow: 0px 0px 10px #BEFFB8">${format(new Decimal(4)
    .add(hasUpgrade("m",11) ? upgradeEffect("m",11) : 0)
    .add(hasUpgrade("m",14) ? upgradeEffect("m",14) : 0)
    .pow(player.m.points).pow(hasUpgrade("m",13)?1.25:1))}</h2>x`],
    "prestige-button",
    ["display-text", () => `You have ${format(player.points)} points<br><br>`],
    "milestones",
    "buyables",
    "upgrades",
    ],
    color: "#BEFFB8",
    requires: new Decimal("1e16"), // Can be a function that takes requirement increases into account
    resource: "morale", // Name of prestige currency
    baseResource: "money", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base() {
      return new Decimal(10)
    },
    exponent: new Decimal(1.5),
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade("m",12)) mult = mult.div(1e6)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for morale", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("t",33) || player.m.total.gte(1)},
    branches: ["w"],
  infoboxes: {
    morale: {
        title: "Morale",
        body() { return "Sometimes your employees aren't happy (for those that slack on work when unhappy, they are fired immediately). That's okay! However, making your employees happier can increase their productivity. So try to spread a little joy!" },
    },
},
  upgrades: {
      11: {
        title: "Pep Talks",
        description: "Training seminars add to the morale base at a reduced rate.",
        cost: new Decimal(2),
        effect(){return player.t.points.add(1).log10().add(1)},
        effectDisplay(){return `+${format(this.effect())}`}
      },
      12: {
        title: "Holiday Vacations",
        description: "Divide the cost of morale by 1,000,000.",
        cost: new Decimal(8),
        unlocked() {return hasUpgrade("m",11)}
      },
      13: {
        title: "Slightly Higher Wages",
        description: "The morale effect is exponentiated by 1.25.",
        cost: new Decimal(12),
        unlocked() {return hasUpgrade("m",11)}
      },
      14: {
        title: "Overtime Opportunities",
        description: "Morale adds to the morale base.",
        cost: new Decimal(20),
        unlocked() {return hasUpgrade("m",13)},
        effect(){return player.m.points.pow(1.1).add(1)},
        effectDisplay(){return `+${format(this.effect())}`}
      },
  },
})

addLayer("i", {
    name: "investments", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    investmentPoints: new Decimal(0),
    }},
    tabFormat: [
    ["infobox","stonks"],
    "main-display",
    "prestige-button",
    ["display-text", () => `You have ${format(player.points)} points<br><br>`],
    "clickables",
    ["display-text", () => `You have <h2 style="color: #FF8800; text-shadow: 0px 0px 10px #FF8800">${format(player.i.investmentPoints)}</h2> investment points, multiplying money gain by <h2 style="color: #FF8800; text-shadow: 0px 0px 10px #FF8800">${format(player.i.investmentPoints.gte(10000000) ? new Decimal(1e7).add(1).mul(player.i.investmentPoints.add(1)) : player.i.investmentPoints.pow(2).add(1))}</h2>x<br><br>`],
    "upgrades",
    ],
    color: "#FF8800",
    requires: new Decimal("1e25"), // Can be a function that takes requirement increases into account
    resource: "stocks", // Name of prestige currency
    baseResource: "money", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for stocks", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("t",33) || player.i.total.gte(1)},
    branches: ["w"],
  infoboxes: {
    stonks: {
        title: "Investments",
        body() { return "As your business grows, you see other companies rise and fall. Why not invest in these growing corporations? You can use your stocks to invest in other companies, gaining investment points (IP). IP gives a big multiplier, but it decays over time." },
    },
},
    clickables: {
    11: {
        display() {return "Invest 1"},
        onClick() {player.i.points = player.i.points.sub(1); player.i.investmentPoints = player.i.investmentPoints.add(new Decimal(Math.random()).mul(10))},
        canClick() {return player.i.points.gte(1)},
    },
    12: {
        display() {return "Invest all"},
        onClick() {player.i.investmentPoints = player.i.investmentPoints.add(new Decimal(Math.random()).mul(10).mul(player.i.points)); player.i.points = new Decimal(0)},
        canClick() {return true},
    },
  },
  upgrades: {
      11: {
        title: "Brainstorm Session",
        description: "Unlock 2 new Training Upgrades.",
        cost: new Decimal(100),
      },
  },
  update(diff) {
      player.i.investmentPoints = player.i.investmentPoints.div(hasUpgrade("t",34) ? 1.015 : 1.02)
    },
})