DELETE FROM Characters
    WHERE cid = ${cid};

DELETE FROM Char_ranged
    WHERE char_id = ${cid};

DELETE FROM Char_melee
    WHERE char_id = ${cid};

DELETE FROM Char_grenade
    WHERE char_id = ${cid};