SELECT cid, "name", "rank"
    FROM Characters
        WHERE userid = $1;