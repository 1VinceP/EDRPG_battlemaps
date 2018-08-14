-- select
-- c.cid, c.userid, c.name, c.rank, c.rank_points, c.gender, c.age, c.height, c.weight,c.current_karma, c.max_karma, c.current_endurance, c.max_endurance,
-- c.backgrounds, c.karmic_abilities, c.enhancements, c.personal, c.vehicle, c.intelligence, c.social, c.espionage, c.checked, c.credits, c.m_cr, c.units,
-- array_agg(json_build_object('name', r.name, 'kind', r.kind, 'type', r.type, 'sr', r.sr, 'mr', r.mr, 'lr', r.lr, 'sd', r.sd, 'md', r.md, 'ld', r.ld, 'damage', r.damage, 'ammo', r.ammo, 'kinetic', r.kinetic, 'energy', r.energy, 'heavy', r.heavy, 'bonus', r.bonus, 'notes', r.notes, 'cur_ammo', cr.weapon_ammo )) AS ranged_weapons,
-- array_agg(json_build_object('name', m.melee_weapons, 'type', m.type, 'finesse', m.finesse, 'damage', m.damage, 'melee', m.melee, 'parry', m.parry, 'one_handed', m.one_handed, 'notes', m.notes, 'cost', m.cost, 'rarity', m.rarity)) AS melee_weapons,
-- c.grenades, c.clothing, c.armor, c.equipment, c.notes
--     FROM characters c
--     JOIN char_ranged cr on c.cid = cr.char_id
--     JOIN ranged_stats r on cr.weapon_id = r.id

--     JOIN char_melee cm on c.cid = cm.char_id
--     JOIN melee_stats m on cm.weapon_id = m.id
-- WHERE c.cid = $1
-- GROUP BY c.cid;

SELECT *
    FROM Characters
        WHERE cid = $1 AND "name" = $2;