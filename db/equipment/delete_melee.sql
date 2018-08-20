DELETE FROM Char_melee
    WHERE id = ${id};

UPDATE CHARACTERS
    SET credits = ${value}
        WHERE cid = ${cid};