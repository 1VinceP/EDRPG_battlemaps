DELETE FROM Char_grenade
    WHERE id = ${id};

UPDATE Characters
    SET credits = ${value}
        WHERE cid = ${cid};