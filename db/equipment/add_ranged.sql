INSERT INTO Char_ranged ( char_id, weapon_id, weapon_ammo, alias, location )
    VALUES ( ${cid}, ${id}, ${ammo}, ${alias}, 'Self (equipped)' );

Update Characters
    SET credits = ${value}
        WHERE cid = ${cid};