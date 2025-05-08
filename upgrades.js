// Upgrade definitions
const upgrades = {
    autoPibble: {
        name: "Auto Pibble Generator",
        description: "Automatically generates 1 pibble per second",
        baseCost: 10,
        baseProduction: 1,
        costMultiplier: 1.15,
        icon: "🐕",
        emoji: "🤖"
    },
    pibbleFarm: {
        name: "Pibble Farm",
        description: "Generates 5 pibbles per second",
        baseCost: 100,
        baseProduction: 5,
        costMultiplier: 1.15,
        icon: "🏡",
        emoji: "🌾"
    },
    pibbleMansion: {
        name: "Pibble Mansion",
        description: "Generates 20 pibbles per second",
        baseCost: 1000,
        baseProduction: 20,
        costMultiplier: 1.15,
        icon: "🏰",
        emoji: "💎"
    }
};

// Booster definitions
const boosters = {
    autoPibbleBoost: {
        name: "Auto Pibble Booster",
        description: "Doubles the production of Auto Pibble Generators",
        baseCost: 1000,
        targetUpgrade: "autoPibble",
        multiplier: 2,
        costMultiplier: 2,
        icon: "⚡",
        emoji: "🚀"
    },
    pibbleFarmBoost: {
        name: "Pibble Farm Booster",
        description: "Doubles the production of Pibble Farms",
        baseCost: 5000,
        targetUpgrade: "pibbleFarm",
        multiplier: 2,
        costMultiplier: 2,
        icon: "⚡",
        emoji: "🌪️"
    },
    pibbleMansionBoost: {
        name: "Pibble Mansion Booster",
        description: "Doubles the production of Pibble Mansions",
        baseCost: 20000,
        targetUpgrade: "pibbleMansion",
        multiplier: 2,
        costMultiplier: 2,
        icon: "⚡",
        emoji: "✨"
    }
};
