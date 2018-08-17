UPDATE Char_ranged
    SET weapon_ammo = ${current_ammo}
    , alias = ${alias}
        WHERE id = ${id};