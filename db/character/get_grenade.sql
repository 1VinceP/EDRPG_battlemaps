SELECT cg.id, g.id as stat_id, g.name, g.kind, g.type, g.damage, g.notes, g.cost, g.rarity, cg.location
    FROM characters c
    JOIN char_grenade cg ON c.cid = cg.char_id
    JOIN ranged_stats g ON cg.grenade_id = g.id
        WHERE c.cid = $1;