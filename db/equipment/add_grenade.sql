-- Grenade IDs = 54 -> 58
INSERT INTO Char_grenade ( char_id, grenade_id, location )
    VALUES ( ${cid}, ${id}, 'Self (equipped)' );

UPDATE Characters
    SET credits = ${value}
        WHERE cid = ${cid};