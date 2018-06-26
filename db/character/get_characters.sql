SELECT id, "name", "rank"
    FROM Characters
        WHERE userid = $1;