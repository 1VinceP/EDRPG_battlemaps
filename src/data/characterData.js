export default {

    backgrounds: [
        '', 'Boxer', 'Trained Pilot', 'demo1', 'demo2', 'demo3'
    ],

    backgroundStats: {
        boxer: {
            cost: 1,
            bonuses: {
                20: [ 'fighting' ],
                10: [ 'parry' ]
            },
            enhancements: [ 'Strong', 'Quick Runner' ]
        },
        trainedPilot: {
            cost: 1,
            bonuses: {
                20: [ 'spaceshipPiloting', 'spaceshipWeapons' ],
                10: [ 'systems' ]
            }
        },
        demo1: {
            cost: 1,
            bonuses: {
                20: [ 'dodge', 'tactics' ],
                10: [ 'parry' ]
            }
        },
        demo2: {
            cost: 2,
            bonuses: {
                20: [ 'stealth' ],
                10: [ 'security' ]
            },
            enhancements: [ 'Tall' ]
        },
        demo3: {
            cost: 2,
            bonuses: {
                10: [ 'computer', 'cyber', 'medicine', 'science', 'tactics' ],
                20: []
            }
        }
    },

    karma: [
        '', 'Avoid Lock', 'Break Right', 'Escape Death', 'Ninja Roll'
    ],

    karmaStats: {
        avoidLock: {
            cost: 2
        },
        breakRight: {
            cost: 4
        },
        escapeDeath: {
            cost: 'all'
        },
        ninjaRoll: {
            cost: 6
        }

    },

    skills: [
        '',
        'Dodge', 'Energy Weapons', 'Fighting', 'Grenade', 'Heavy Weapons', 'Melee Weapons', 'Parry',
        'Navigation', 'Repair', 'Spaceship Piloting', 'Spaceship Weapons', 'Systems', 'Vehicle Piloting', 'Vehicle Weapons',
        'Computer', 'Culture and Law', 'Cyber', 'Medicine', 'Planetary Knowledge', 'Science', 'Tactics', 'Trading',
        'Bargain', 'Bluff', 'Charm', 'Diplomacy', 'Gambling', 'Insight', 'Intimidation', 'Streetwise',
        'Athletics', 'Perception', 'Security', 'Slight of Hand', 'Stealth', 'Survival'
    ]
}