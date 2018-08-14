SELECT cr.id, r.id as stat_id, r.name, cr.alias, r.kind, r.type, r.sr, r.mr, r.lr, r.sd, r.md, r.ld, r.damage, r.ammo, r.kinetic, r.energy, r.heavy, r.bonus, r.notes, r.cost, r.rarity, cr.weapon_ammo as current_ammo, cr.location
    FROM characters c
    JOIN char_ranged cr ON c.cid = cr.char_id
    JOIN ranged_stats r ON cr.weapon_id = r.id
        WHERE c.cid = $1;