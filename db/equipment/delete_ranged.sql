DELETE FROM Char_ranged
    WHERE id = ${id};

UPDATE Characters
    SET credits = ${value}
        WHERE cid = ${cid};