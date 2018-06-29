UPDATE Characters
    SET rank_points = ${rank_points}
    ,   gender = ${gender}
    ,   age = ${age}
    ,   height = ${height}
    ,   "weight" = ${cweight}
    ,   current_endurance = ${current_endurance}
    ,   current_karma = ${current_karma}
    ,   checked = ${checked}
        WHERE cid = ${cid}