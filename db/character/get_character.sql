SELECT *
    FROM Characters
        WHERE cid = $1 AND "name" = $2
        ORDER BY "name";