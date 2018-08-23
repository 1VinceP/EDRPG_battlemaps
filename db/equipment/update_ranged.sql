UPDATE Char_ranged
    SET weapon_ammo = ${current_ammo}
    , alias = ${alias}
    , location = ${location}
        WHERE id = ${id};