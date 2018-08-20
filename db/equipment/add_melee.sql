INSERT INTO Char_melee ( char_id, weapon_id, alias, location )
    VALUES ( ${cid}, ${id}, ${alias}, 'self' );

UPDATE Characters
    SET credits = ${value}
        WHERE cid = ${cid};