UPDATE characters
    SET locked = $1
        WHERE cid = $2;