INSERT INTO Characters
( userid, "name", "rank", rank_points, gender, age, height, "weight", max_karma, current_karma, max_endurance, current_endurance, backgrounds, karmic_abilities, enhancements, personal, vehicle, intelligence, social, espionage, ranged_weapons, melee_weapons, grenades, clothing, armor, equipment, checked, credits, m_cr, units, notes, speed, strong )
    VALUES
        ( ${userId}, ${cname}, ${crank}, ${rankPoints}, ${gender}, ${age}, ${height}, ${cweight}, ${karma}, ${karma}, ${endurance}, ${endurance}, ${backgroundsArr}, ${karmasArr}, ${enhancementsArr}, ${personalArr}, ${vehicleArr}, ${intelligenceArr}, ${socialArr}, ${espionageArr}, '{}', '{}', '{}', '{}', '{}', ${equipment}, '{}', 1000, 0, 0, '', ${speed}, ${strong} )
RETURNING cid;