INSERT INTO Characters
( userid, "name", "rank", rank_points, gender, age, height, "weight", max_karma, current_karma, max_endurance, current_endurance, backgrounds, karmic_abilites, enhancements, personal, vehicle, intelligence, social, espionage )
    VALUES
        ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $9, $10, $10, $11, $12, $13, $14, $15, $16, $17, $18 );