SELECT ca.id, a.id as stat_id, a.armour as "name", a.kinetic, a.energy, a.explosive, a.melee, a.fighting, a.toxic, a.social_factor, a.hardened, a.hardened, a.intimidate, a.athletics, a.notes, a.cost, a.rarity, ca.location
    FROM Characters c
    JOIN Char_armor ca ON c.cid = ca.char_id
    JOIN armor_stats a ON ca.armor_id = a.id
        WHERE c.cid = $1
        ORDER BY a.id;