DROP TABLE IF EXISTS Characters;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users
(
    userid SERIAL PRIMARY KEY,
    username TEXT,
    email TEXT,
    auth_id TEXT
);

INSERT INTO Users
( username, email, auth_id )
VALUES
    ( 'Vincent', 'me@email.com', '123456789000' );

CREATE TABLE Characters
(
    cid SERIAL PRIMARY KEY,
    userid INTEGER, -- REFERENCES Users(userid),
    "name" VARCHAR(60),
    "rank" TEXT,
    rank_points SMALLINT,
    gender VARCHAR(10),
    age SMALLINT,
    height VARCHAR(10),
    "weight" VARCHAR(20),
    current_karma SMALLINT,
    max_karma SMALLINT,
    current_endurance SMALLINT,
    max_endurance SMALLINT,
    backgrounds TEXT[5],
    karmic_abilities TEXT[24],
    enhancements TEXT[24],
    ---- skills below
    personal SMALLINT[7],
    vehicle SMALLINT[7],
    intelligence SMALLINT[8],
    social SMALLINT[8],
    espionage SMALLINT[6],
    checked TEXT[], -- This will be a list of all skills that have been checked for the adventure
    ---------------- Equipment/etc below ----------------
    credits BIGINT,
    m_cr BIGINT,
    units BIGINT,
    ranged_weapons TEXT[],
    melee_weapons TEXT[],
    grenades TEXT[],
    clothing TEXT[],
    armor TEXT[],
    equipment TEXT[],
    notes VARCHAR(10000)
);

INSERT INTO Characters
    ( userid, "name", "rank", rank_points, gender, age, height, "weight", max_karma, current_karma, max_endurance, current_endurance, backgrounds, karmic_abilities, enhancements, personal, vehicle, intelligence, social, espionage, credits, m_cr, units, ranged_weapons, melee_weapons, grenades, notes )
    VALUES
        ( 2, 'Garrett Fletcher', 'Harmless', 0, 'male', 24, '5.11', '160lbs', 10, 10, 20, 20, '{"pilotTrained", "highTechWorld", "vehicleNut", "corporateSecurity", "militaryCourier"}', '{"escapeDeath", "breakLeft", "burnout", "duck!"}', '{}', '{10, 11, 12, 13, 14, 15, 16}', '{20, 21, 22, 23, 24, 25, 26}', '{30, 31, 32, 33, 34, 35, 36, 37}', '{40, 41, 42, 43, 44, 45, 46, 47}', '{50, 51, 52, 53, 54, 55}', 10000, 500, 100, '{{autopistol, 3}, {autopistol, 3}}', '{fighting, sword}', '{"frag grenade"}', 'Garrett<br>Fletcher' );