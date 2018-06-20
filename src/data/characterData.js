export default {

    backgrounds: [
        '', 'Boxer', 'Trained Pilot', 'demo1', 'demo2'
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
            cost: 2
        }
    },

    karma: [
        '', 'Avoid Lock', 'Escape Death'
    ],

    karmaStats: {
        avoidLock: {

        },
        escapeDeath: {
            cost: 'all'
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