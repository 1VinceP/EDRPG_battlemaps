SELECT cm.id, m.id as stat_id, cm.alias, m.melee_weapons as "name", m.type, m.finesse, m.damage, m.melee, m.parry, m.one_handed, m.notes, m.cost, m.rarity, cm.location
    FROM characters c
    JOIN char_melee cm ON c.cid = cm.char_id
    JOIN melee_stats m ON cm.weapon_id = m.id
        WHERE c.cid = $1
        ORDER BY m.id;