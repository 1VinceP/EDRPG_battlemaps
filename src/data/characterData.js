export default {

    backgrounds: [
        '', 'Accountant', 'Anarchist', 'Army Trained', 'Borderland Homeworld', 'Born on the Streets', 'Boxer', 'Cheerleader', 'Child Actor', 'Community Youth Worker', 'Computer Game Designer', 'Criminal Family', 'Cyborg', 'Docking Bay Operative', 'Engineer', 'Explorer Corp', 'Fighter Pilot', 'Freedom Fighter', 'Frontier Trader', 'Fuel Rat', 'Gene Mod Baby', 'Gym Freak', 'Hacker', 'High Tech Homeworld', 'Hoopy Casino Croupier', 'Lave Radio Host', 'Martial Artist', 'Mercenary', 'Mining Engineer', 'Minor Politician', 'Monk or Nun', 'Navy Trained', 'Officer', 'Partner', 'Petty Criminal', 'Pilot Trained', 'Police Officer', 'Private Detective', 'Ran Away from Home', 'Scientist', 'Scout Leader', 'Second Hand Spaceship Dealer', 'Secret Agent', 'Self Taught', 'Ship Hand', 'Sports College', 'Stock Broker', 'Teacher', 'Trained Doctor', 'Treasure Hunter', 'Trucker', 'University Graduate', 'Vehicle Nut', 'Wise Guy',
        // ESPIONAGE SUPPLEMENT
        'Insurgent'
    ],

    backgroundStats: {
        accountant: {
            cost: 1,
            bonuses: {
                20: [ 'cultureAndLaw' ],
                10: [ 'bluff', 'computer', 'dodge' ]
            }
        },
        anarchist: {
            cost: 1,
            bonuses: {
                20: [ 'grenade' ],
                10: [ 'dodge', 'fighting', 'intimidate' ]
            }
        },
        armyTrained: {
            cost: 2,
            bonuses: {
                20: [ 'energyWeapons', 'kineticWeapons' ],
                10: [ 'dodge', 'fighting', 'grenade', 'heavyWeapons', 'medicine', 'vehicleWeapons' ]
            }
        },
        borderlandHomeworld: {
            cost: 1,
            bonuses: {
                20: [  ],
                10: [ 'dodge', 'fighting', 'kineticWeapons', 'repair', 'survival' ]
            }
        },
        bornOnTheStreets: {
            cost: 1,
            bonuses: {
                20: [ 'streetwise' ],
                10: [ 'stealth' ]
            },
            enhancements: [ 'tough' ]
        },
        boxer: {
            cost: 1,
            bonuses: {
                20: [ 'fighting' ],
                10: [ 'parry' ]
            },
            enhancements: [ 'quickRunner', 'strong' ]
        },
        cheerleader: {
            cost: 1,
            bonuses: {
                20: [ 'athletics' ],
                10: [ 'charm', 'sleightOfHand', 'stealth' ]
            }
        },
        childActor: {
            cost: 1,
            bonuses: {
                20: [ 'bluff', 'diplomacy' ],
                10: [ 'meleeWeapons' ]
            }
        },
        communityYouthWorker: {
            cost: 1,
            bonuses: {
                20: [ 'insight' ],
                10: [ 'kineticWeapons', 'parry', 'streetwise' ]
            }
        },
        computerGameDesigner: {
            cost: 1,
            bonuses: {
                20: [ 'computer' ],
                10: [ 'spaceshipPiloting', 'tactics', 'vehiclePiloting' ]
            }
        },
        criminalFamily: {
            cost: 1,
            bonuses: {
                20: [  ],
                10: [ 'bluff', 'charm', 'gambling', 'security', 'stealth' ]
            }
        },
        cyborg: {
            cost: 1,
            bonuses: {
                20: [],
                10: []
            }
        },
        dockingBayOperative: {
            cost: 1,
            bonuses: {
                20: [  ],
                10: [ 'navigation', 'planetaryKnowledge', 'repair', 'security', 'trading' ]
            }
        },
        engineer: {
            cost: 1,
            bonuses: {
                20: [ 'repair' ],
                10: [ 'cyber', 'computer', 'energyWeapons' ]
            }
        },
        explorerCorp: {
            cost: 1,
            bonuses: {
                20: [ 'navigation' ],
                10: [ 'planetaryKnowledge', 'survival', 'vehiclePiloting' ]
            }
        },
        fighterPilot: {
            cost: 1,
            bonuses: {
                20: [ 'systems' ],
                10: [ 'spaceshipPiloting', 'spaceshipWeapons', 'tactics' ]
            }
        },
        freedomFighter: {
            cost: 1,
            bonuses: {
                20: [  ],
                10: [ 'dodge', 'energyWeapons', 'grenade', 'stealth', 'vehiclePiloting' ]
            }
        },
        frontierTrader: {
            cost: 1,
            bonuses: {
                20: [ 'trading' ],
                10: [ 'bargain', 'dodge', 'kineticWeapons' ]
            }
        },
        fuelRat: {
            cost: 1,
            bonuses: {
                20: [ 'navigation' ],
                10: [ 'planetaryKnowledge', 'spaceshipPiloting', 'trading' ]
            }
        },
        geneModBaby: {
            cost: 1,
            bonuses: {
                20: [  ],
                10: [  ]
            }
        },
        gymFreak: {
            cost: 1,
            bonuses: {
                20: [  ],
                10: [ 'athletics' ]
            },
            enhancements: [ 'quickRunner', 'strong' ]
        },
        hacker: {
            cost: 1,
            bonuses: {
                20: [ 'computer' ],
                10: [ 'security' ]
            },
            enhancements: [ 'naturalGenius (computer)' ]
        },
        highTechHomeworld: {
            cost: 1,
            bonuses: {
                20: [  ],
                10: [ 'computer', 'cyber', 'energyWeapons', 'science', 'systems' ]
            }
        },
        hoopyCasinoCroupier: {
            cost: 1,
            bonuses: {
                20: [ 'gambling', 'sleightOfHand' ],
                10: [ 'perception' ]
            }
        },
        laveRadioHost: {
            cost: 1,
            bonuses: {
                20: [ 'bluff', 'insight' ],
                10: [ 'charm' ]
            }
        },
        martialArtist: {
            cost: 2,
            bonuses: {
                20: [ 'athletics', 'dodge', 'fighting', 'meleeWeapons', 'parry' ],
                10: [  ]
            }
        },
        mercenary: {
            cost: 2,
            bonuses: {
                20: [ 'dodge', 'heavyWeapons' ],
                10: [ 'fighting', 'kineticWeapons', 'tactics', 'vehicleWeapons' ]
            },
            enhancements: [ 'tough' ]
        },
        miningEngineer: {
            cost: 1,
            bonuses: {
                20: [ 'heavyWeapons' ],
                10: [ 'grenade', 'repair', 'systems' ]
            }
        },
        minorPolitician: {
            cost: 1,
            bonuses: {
                20: [  ],
                10: [ 'bargain', 'cultureAndLaw', 'diplomacy', 'perception', 'tactics' ]
            }
        },
        monkOrNun: {
            cost: 1,
            bonuses: {
                20: [ 'insight' ],
                10: [ 'fighting', 'medicine', 'stealth' ]
            }
        },
        navyTrained: {
            cost: 2,
            bonuses: {
                20: [ 'repair', 'systems' ],
                10: [ 'dodge', 'energyWeapons', 'fighting', 'security', 'spaceshipPiloting', 'spaceshipWeapons' ]
            }
        },
        officer: {
            cost: 1,
            bonuses: {
                20: [ 'tactics' ],
                10: [ 'diplomacy', 'intimidate', 'perception' ]
            }
        },
        partner: {
            cost: 1,
            bonuses: {
                20: [  ],
                10: [  ]
            }
        },
        pettyCriminal: {
            cost: 1,
            bonuses: {
                20: [  ],
                10: [ 'fighting', 'kineticWeapons', 'parry', 'sleightOfHand', 'streetwise' ]
            }
        },
        pilotTrained: {
            cost: 1,
            bonuses: {
                20: [ 'spaceshipPiloting', 'spaceshipWeapons' ],
                10: [ 'systems' ]
            }
        },
        policeOfficer: {
            cost: 2,
            bonuses: {
                20: [ 'energyWeapons', 'perception' ],
                10: [ 'cultureAndLaw', 'diplomacy', 'dodge', 'fighting', 'spaceshipPiloting', 'spaceshipWeapons' ]
            }
        },
        privateDetective: {
            cost: 1,
            bonuses: {
                20: [  ],
                10: [ 'energyWeapons', 'insight', 'perception', 'security', 'stealth' ]
            }
        },
        ranAwayFromHome: {
            cost: 1,
            bonuses: {
                20: [  ],
                10: [ 'dodge', 'perception', 'sleightOfHand', 'streetwise', 'survival' ]
            }
        },
        scientist: {
            cost: 1,
            bonuses: {
                20: [ 'science' ],
                10: [ 'computer' ]
            },
            enhancements: [ 'naturalGenius (science)' ]
        },
        scoutLeader: {
            cost: 1,
            bonuses: {
                20: [  ],
                10: [ 'athletics', 'charm', 'kineticWeapons', 'navigation', 'survival' ]
            }
        },
        secondHandSpaceshipDealer: {
            cost: 1,
            bonuses: {
                20: [ 'bargain' ],
                10: [ 'planetaryKnowledge', 'repair', 'trading' ]
            }
        },
        secretAgent: {
            cost: 2,
            bonuses: {
                20: [ 'security', 'stealth' ],
                10: [ 'bluff', 'charm', 'computer', 'dodge', 'energyWeapons', 'insight' ]
            }
        },
        selfTaught: {
            cost: 1,
            bonuses: {
                20: [  ],
                10: [  ]
            }
        },
        shipHand: {
            cost: 1,
            bonuses: {
                20: [ 'systems' ],
                10: [ 'kineticWeapons', 'repair', 'spaceshipWeapons' ]
            }
        },
        sportsCollege: {
            cost: 1,
            bonuses: {
                20: [ 'athletics' ],
                10: [ 'dodge' ]
            },
            enhancements: [ 'quickRunner' ]
        },
        stockBroker: {
            cost: 1,
            bonuses: {
                20: [ 'trading' ],
                10: [ 'bluff', 'fighting', 'intimidate' ]
            }
        },
        teacher: {
            cost: 1,
            bonuses: {
                20: [  ],
                10: [ 'cultureAndLaw', 'diplomacy', 'intimidate', 'perception', 'science' ]
            }
        },
        trainedDoctor: {
            cost: 1,
            bonuses: {
                20: [ 'cyber', 'medicine' ],
                10: [ 'science' ]
            }
        },
        treasureHunter: {
            cost: 1,
            bonuses: {
                20: [  ],
                10: [ 'fighting', 'kineticWeapons', 'navigation', 'planetaryKnowledge', 'vehiclePiloting' ]
            }
        },
        trucker: {
            cost: 1,
            bonuses: {
                20: [  ],
                10: [ 'trading', 'vehiclePiloting', 'vehicleWeapons' ]
            },
            enhancements: [ 'tough' ]
        },
        universityGraduate: {
            cost: 1,
            bonuses: {
                20: [  ],
                10: [  ]
            }
        },
        vehicleNut: {
            cost: 1,
            bonuses: {
                20: [ 'vehiclePiloting', 'vehicleWeapons' ],
                10: [ 'repair' ]
            }
        },
        wiseGuy: {
            cost: 2,
            bonuses: {
                20: [ 'streetwise' ],
                10: [ 'dodge', 'gambling', 'heavyWeapons', 'kineticWeapons', 'medicine', 'meleeWeapons', 'tactics', 'vehicleWeapons' ]
            }
        },

        /////////////////// ESPIONAGE SUPPLEMENT
        insurgent: {
            cost: 1,
            bonuses: {
                20: [ 'bluff' ],
                10: [ 'fighting', 'security', 'stealth' ]
            }
        }
    },

    skills: [
        '',
        'Dodge', 'Energy Weapons', 'Fighting', 'Grenade', 'Heavy Weapons', 'Melee Weapons', 'Parry',
        'Navigation', 'Repair', 'Spaceship Piloting', 'Spaceship Weapons', 'Systems', 'Vehicle Piloting', 'Vehicle Weapons',
        'Computer', 'Culture and Law', 'Cyber', 'Medicine', 'Planetary Knowledge', 'Science', 'Tactics', 'Trading',
        'Bargain', 'Bluff', 'Charm', 'Diplomacy', 'Gambling', 'Insight', 'Intimidation', 'Streetwise',
        'Athletics', 'Perception', 'Security', 'Sleight of Hand', 'Stealth', 'Survival'
    ]
}