import React from 'react';
import injectSheet from 'react-jss';

import styles from './tipsStyles';

function Tips({ classes }) {
   const {
      tipsBox, tipsCol,
      green, periwinkle, magenta, cyan, orange, red,
   } = classes;

    return (
        <div className={tipsBox}>
            <section className={tipsCol}>
                <h1>Personal Combat</h1>
                <div className={`tip ${green}`}>
                    <h2>Actions</h2>
                    <h3>Movement</h3>
                    <p>You may move a certain distance equal to your speed</p>

                    <h3>Ranged Attack</h3>
                    <p>Make a kinetic, energy, or heavy weapons skill check against the Difficulty to Hit of a target you can see. NOTE: You cannot fire a heavy weapon and move in the same turn</p>

                    <h3>Melee or Fighting Attack</h3>
                    <p>Pick a target next to you and make a melee or fighting skill check against their Difficulty to Hit. NOTE: An even number on the damage die for a fighting attack also disarms the target</p>

                    <h3>Draw a Weapon</h3>
                    <p>Draw out and ready a weapon. If it is a one-handed weapon, you can draw and attack with it in the same turn</p>

                    <h3>Run</h3>
                    <p>Instead of attacking, take another move action</p>

                    <h3>Interact</h3>
                    <p>Use your action to interact with an object such as a computer, manual door, pick up an object, or take an object being offered to you. In all cases, you must be adjacent to the object you wish to interact with</p>

                    <h3>Reload</h3>
                    <p>Reload a weapon. You must have a free hand, but can stow a one-handed weapon to do this. If you reload a heavy weapon, you may not reload and move in the same turn</p>
                </div>
                <div className={`tip ${periwinkle}`}>
                    <h2>Other Actions</h2>
                    <h3>Aiming</h3>
                    <p>Instead of moving and attacking, you may take aim. Declare your target. If you maintain aim through your next turn (keep line of sight, don't take damage, etc), gain +5 to hit</p>

                    <h3>Drawing a Weapon</h3>
                    <p>A one handed weapon may be drawn and fired. A two handed weapon may be drawn</p>

                    <h3>Delay</h3>
                    <p>Instead of acting now, choose to move your initiative to be after a certain person. This doesn't change back</p>

                    <h3>Escaping</h3>
                    <p>If you are grabbed, you may make an athletics check vs theirs to escape. If you escape, the opponent cannot make a free attack against your move</p>

                    <h3>Grabbing</h3>
                    <p>You can only grab a target that is about your size or smaller. Make a fighting attack, but instead of doing damage on a hit, make an athletics check against the target. If you win, you grab them. If you lose or tie, they escape</p>

                    <h3>Being Grabbed</h3>
                    <p>Both people have defence of 0. Grabee can only make escape action and can't move. You can let go or maintain hold and move up to 4m</p>

                    <h3>Melee with Ranged Weapon</h3>
                    <p>SMG sized weapon or larger: treat it as a club. Pistol sized weapon: normal fighting attack</p>

                    <h3>Stabilizing Someone</h3>
                    <p>See "Being Stabilized" in the Death and Dying section</p>

                    <h3>Using Two Weapons at Once</h3>
                    <p>If you have two one handed weapons equipped, both may be used in the same turn, either at the same target or at two different ones. -2 To Hit for each weapon</p>

                    <h3>Zero-G Rush</h3>
                    <p>Turn off Magboots and travel 16m in one direction. Attacks have -1 To Hit. At the end of your turn, decide to gain control or keep drifting. Gain control: Difficulty 10 (12 if no magboots or flying). If you succeed, you stop. If you fail, keep drifting, or crash and spin if you run into anything. If you keep drifting, move another 16m at the start of your next turn. If you crash and spin, take 1D10 damage and lose next turn. If you hit an enemy, they also take 1D10 damage and are knocked over if they are the same size or smaller. You must attempt to regain control at the end of each turn, or keep spinning</p>
                </div>
                <div className={`tip ${orange}`}>
                    <h2>Damage</h2>
                    <h3>Being Knocked Over</h3>
                    <p>Except for energy weapons, a damage roll of 10 will knock the target over. Starting your turn knocked over means you can move half your speed, or spend all your movement speed standing up. Attack bonuses are not applied this turn</p>

                    <h3>Burst Damage</h3>
                    <p>Kinetic Weapons deal an extra 1D10 for each point over the Difficulty to Hit. Energy Weapons deal 5 extra damage for each point over</p>

                    <h3>Heavy Burst</h3>
                    <p>Same as burst, but deals an extra 2D10 for each point over Difficulty</p>

                    <h3>Destroy Cover</h3>
                    <p>If target is missed only because of cover bonus, destroy the cover</p>

                    <h3>Divide Fire</h3>
                    <p>Optional. Choose a target at least 8m away. Roll to hit applies to all targets (friend or foe) within 6m of target. Damage is halved against all targets hit</p>
                </div>
                <div className={`tip ${red}`}>
                    <h2>Death and Dying</h2>
                    <h3>Summary</h3>
                    <p>If your endurance is less than or equal to 0, you become unconscious and drop anything you are holding. You die when your endurance becomes a negative number equal to half your total endurance. If you are at 0 or were knocked out by a fighting attack, you are not bleeding out. Otherwise, you are</p>

                    <h3>Bleeding Out</h3>
                    <p>Lost 1D10 endurance per turn until stabilized. If you lose an odd amount of endurance, you become stabilized</p>

                    <h3>Energy Weapons and Dying</h3>
                    <p>Energy weapons cauterize wounds. You stabilize immediately unless you roll a 10 on bleeding out. Otherwise you continue to bleed</p>

                    <h3>Being Stabilized</h3>
                    <p>An ally can use their action to stabilize you. If cauterized, a Difficulty 8 Medicine check must be passed. Otherwise it is a Difficulty 10 check. This attempt may be made once per turn by each person.</p>

                    <h3>Recovering Endurance</h3>
                    <p>Recover 5 Endurance per day through natural healing. You may be healed every 6 hours by yourself or another person. A medpack must be used, and the amount healed is equal to the Medicine skill check made. Sleeping through your main rest in a Regeneration Chamber heals you completely</p>
                </div>
            </section>

            <section className={tipsCol}>
                <h1>Vehicle Combat</h1>
                <div className='tip'>
                    {/* <h2></h2> */}
                </div>
            </section>

            <section className={tipsCol}>
                <h1>Spaceship Combat</h1>
                <div className={`tip ${green}`}>
                    <h2>Equipment Actions</h2>
                    <h3>Activate Shield Cell Bank</h3>
                    <p>
                        Once activated, it will run for a specified number of turns, providing a boost to your shields during their recharge. You may only have one active at a time
                    </p>

                    <h3>Assign Floating Bonus</h3>
                    <p>
                        Higher grade Power Distributors allow you to assign floating bonuses to either your engines, weapons, or shields. Only one floating bonus may be applied to a single area
                    </p>

                    <h3>Deploy Chaff</h3>
                    <p>
                        Once activated, all gimballed weapons and automated turrets suffer -4 To Hit until the start of your next turn
                    </p>

                    <h3>Deploy Mines</h3>
                    <p>When deploying mines, enemy ships that dogfight you will risk taking damage until the start of your next turn</p>
                </div>
                <div className={`tip ${periwinkle}`}>
                    <h2>Recharge Shields</h2>
                    <h3>Shield is active</h3>
                    <p>Shield normally recharges at 5 points per turn. Shield Cell Banks and floating bonuses may increase this rate</p>

                    <h3>Shield is inactive</h3>
                    <p>Shields recharge at the same rate, but don't provide any protection until turned back on. This does not happen until they charge up to 50% of it's starting value</p>
                </div>
                <div className={`tip ${magenta}`}>
                    <h2>Combat Actions</h2>
                    <h3>Broadsides - Up Close -> Up Close</h3>
                    <p>Chose a target in the Up Close zone. Fire a turret. On a hit, fire another turret at it or choose another target. On a miss, you must select another target. Continue this pattern until all your turrets have been fired or you have run out of targets</p>

                    <h3>Chicken - At Distance -> Any</h3>
                    <p>You must have a higher pursuit score than your target, and they may not be disengaging. Both ships choose "impact" or "evade". If both chose "impact", there is a head on collision. If both chose "evade", roll a die: even number is a head on collision, odd number you get a chance to dogfight with a +2 bonus. One of each, impacting player attempts to dogfight with +2 bonus. HEAD ON COLLISION: Both players inflict damage based on their ship size - small = 25, medium = 50, large = 75. Both ships are moved up close</p>

                    <h3>Disengage - Up Close</h3>
                    <p>Attempt to leave the Up Close zone to be At a Distance. If no one dogfights you, you succeed at the start of your next turn. Otherwise, a pursuit occurs and you must win. If you lose, you remain Up Close</p>

                    <h3>Dogfight - Up Close -> Up Close</h3>
                    <p>Choose an enemy ship, roll a D10, and add it to your defence score. The enemy does the same. The winner gets behind the loser and can fire at them. The loser can fire one turret in response. On a tie, both ships may fire a single turret at each other</p>

                    <h3>Flee - At Distance</h3>
                    <p>Attempt to leave the battle. You cannot flee on your first turn. If you are not jousted, you escape at the start of your next turn. If you are, a pursuit occurs. If you win, you get away, if you lose you remain At a Distance</p>

                    <h3>Flight Assist Off - Up Close -> Up Close</h3>
                    <p>Choose a target and fire a weapon. If you hit, fire another. If you miss, your turn ends. Continue this until you miss or use all of your weapons. Until your next turn starts, you cannot add your ship's agility score to your defence. If you do this in atmospheric combat, your ship crashes at the end of your turn and is destroyed</p>

                    <h3>Joust - At Distance -> Any</h3>
                    <p>Attack any ship. You are brought Up Close. If your target is sniping, they are brought Up Close as well</p>


                    <h3>Pass - Any</h3>
                    <p>No other action this turn. Until the end of your next turn, you may reroll any one die roll, and must accept the result</p>

                    <h3>Ram - Up Close -> Up Close</h3>
                    <p>Roll a D10 and add your defence score. Your target may roll a D10 and add their pursuit or defence score. If you win, deal damage based on your size: small = 10, medium = 20, large = 30. You take half this damage. If it's a tie, you both take 5 damage. If you lose, you miss and no one takes damage. A ship struck by another ship the same size or larger cannot initiate a dogfight their next turn</p>

                    <h3>Snipe - At Distance -> Up Close</h3>
                    <p>You gain +1 To Hit until the end of your next turn, but your defence also becomes 0 until the start of your next turn</p>

                    <h3>Strafe - At Distance -> Any</h3>
                    <p>Choose a target that is not disengaging or fleeing. Fire all your weapons one at a time. If you miss with a weapon you cannot attack anymore. After attacking you move Up Close but immediately begin a disengage action</p>
                </div>
                <div className={`tip ${cyan}`}>
                    <h2>Other Effects/actions</h2>
                    <h3>Dodging Mines</h3>
                    <p>When rolling to dogfight, you must exceed the difficulty of the mine launcher, or hit a mine. If you lose, you also the dogfight and take damage from the mine</p>

                    <h3>Pursuits</h3>
                    <p>Both ships roll a D10 and add their pursuit score. If they tie, both ships move to At a Distance and do not fire. A fleeing ship that wins can continue to flee. A fleeing ship that loses is attacked by the jouster and both ships are moved Up Close. A disengaging ship that wins continues to disengage. A disengaging ship that loses stops disengaging and immediately loses the dogfight</p>

                    <h3>Targeting Components</h3>
                    <p>Target shields must be down. Both you and enemy must be Up Close. You must be firing a gimballed weapon. The target gains +4 to defence, and all the damage goes to the component, none to the hull</p>

                    <h3>Abandoning Ship</h3>
                    <p>All crew and yourself pile into escape pods. There are only enough pods for you and the total crew compliment. Other people must be left behind. If the ship is still intact on your next turn, other passengers eject themselves wearing only their spacesuits</p>
                </div>
                <div className={`tip ${orange}`}>
                    <h2>Damage</h2>
                    <h3>Taking Damage</h3>
                    <p>All damage is first applied to shields, then the hull once the shields are down. Burst weapons deal an extra 5 damage for each point they exceed the target's defence score</p>

                    <h3>Energy Weapons Collapsing Shields</h3>
                    <p>Energy weapons get a damage bonus against shields. If this takes the shields down, the extra damage still carries over to the hull</p>

                    <h3>Damaging Components</h3>
                    <p>If your To Hit roll results in a 10 while attacking the hull, you score a critical hit. In addition to damaging the hull, you also damage a component. Roll on the special table for this (pg. 69 of the Core Rulebook) to determine what you hit. If the components strength is reduced to 0, it ceases to function and all bonuses/effects are lost</p>
                </div>
                <div className={`tip ${red}`}>
                    <h2>Ship Destruction</h2>
                    <h3>Cargo Ejection</h3>
                    <p>A small ship scatters 1D10 cargo, a medium ship 2D10, a large ship 3D10 - up to the max cargo aboard the ship</p>

                    <h3>Occupants</h3>
                    <p>A systems check of 12 is required to blow the canopy and eject into space in time. Crew members must use an Escape Death karma capability to escape in time</p>

                    <h3>Escape Pods</h3>
                    <p>Travel to the nearest star port, or puts itself in orbit of the nearest star if there isn't one. This may be overridden by the crew. Escape pods have a defence and pursuit score of 8, and 1 point of hull. Escape pods can be collected by a cargo scoop or collector drone.</p>
                </div>
            </section>
        </div>
    )
}

export default injectSheet(styles)(Tips);