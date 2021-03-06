DROP TABLE IF EXISTS plants CASCADE;
DROP TABLE IF EXISTS snacks CASCADE;
DROP TABLE IF EXISTS plants_snacks;

CREATE TABLE plants (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    location TEXT NOT NULL
);

CREATE TABLE snacks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE plants_snacks (
    plants_id BIGINT REFERENCES plants(id),
    snacks_id BIGINT REFERENCES snacks(id),
    PRIMARY KEY(plants_id, snacks_id)
);