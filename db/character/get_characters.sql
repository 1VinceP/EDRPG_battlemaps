SELECT cid, "name", "rank"
    FROM Characters
        WHERE userid = $1
        ORDER BY "name";