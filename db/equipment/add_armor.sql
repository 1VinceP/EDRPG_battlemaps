INSERT INTO Char_armor ( char_id, armor_id, location )
    VALUES ( ${cid}, ${id}, 'Self (equipped)' );

UPDATE Characters
    SET credits = ${value}
        WHERE cid = ${cid};