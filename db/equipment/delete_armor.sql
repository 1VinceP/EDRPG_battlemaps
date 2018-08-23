DELETE FROM Char_armor
    WHERE id = ${id};

UPDATE Characters
    SET credits = ${value}
        WHERE cid = ${cid};