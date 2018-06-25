DROP TABLE IF EXISTS Characters;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users
(
    id SERIAL PRIMARY KEY,
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
    id SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES Users(id),
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
    karmic_abilites TEXT[24],
    enhancements TEXT[24],
    ---- skills below
    personal SMALLINT[7],
    vehicle SMALLINT[7],
    intelligence SMALLINT[8],
    social SMALLINT[8],
    espionage SMALLINT[6]
    -- dodge SMALLINT,
    -- energy_weapons SMALLINT,
    -- fighting SMALLINT,
    -- grenade SMALLINT,
    -- heavy_weapons SMALLINT,
    -- melee_weapons SMALLINT,
    -- parry SMALLINT,
    -- navigation SMALLINT,
    -- repair SMALLINT,
    -- spaceship_piloting SMALLINT,
    -- spaceship_weapons SMALLINT,
    -- systems SMALLINT,
    -- vehicle_piloting SMALLINT,
    -- vehicle_weapons SMALLINT,
    -- computer SMALLINT,
    -- culture_and_law SMALLINT,
    -- cyber SMALLINT,
    -- medicine SMALLINT,
    -- planetary_knowledge SMALLINT,
    -- science SMALLINT,
    -- tactics SMALLINT,
    -- trading SMALLINT,
    -- bargain SMALLINT,
    -- bluff SMALLINT,
    -- charm SMALLINT,
    -- diplomacy SMALLINT,
    -- gambling SMALLINT,
    -- insight SMALLINT,
    -- intimidation SMALLINT,
    -- streetwise SMALLINT,
    -- athletics SMALLINT,
    -- perception SMALLINT,
    -- "security" SMALLINT,
    -- slight_of_hand SMALLINT,
    -- stealth SMALLINT,
    -- survival SMALLINT
);

INSERT INTO Characters
    ( userid, "name", "rank", rank_points, gender, age, height, "weight", max_karma, current_karma, max_endurance, current_endurance, backgrounds, karmic_abilites, enhancements, personal, vehicle, intelligence, social, espionage )
    VALUES
        ( 1, 'Garrett Fletcher', 'Harmless', 0, 'male', 24, '5.11', '160lbs', 10, 10, 20, 20, '{"pilotTrained", "highTechWorld", "vehicleNut", "corporateSecurity", "militaryCourier"}', '{"escapeDeath", "breakLeft", "burnout", "duck!"}', '{}', '{10, 11, 12, 13, 14, 15, 16}', '{20, 21, 22, 23, 24, 25, 26}', '{30, 31, 32, 33, 34, 35, 36, 37}', '{40, 41, 42, 43, 44, 45, 46, 47}', '{50, 51, 52, 53, 54, 55}' );