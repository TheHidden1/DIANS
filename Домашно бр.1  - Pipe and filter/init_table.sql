-- Create a new database
CREATE DATABASE db;

-- Connect to the new database
\c db;

-- Create a new schema in the database (optional)
CREATE SCHEMA mht;

-- Create the 'places' table in the new schema
CREATE TABLE mht.places (
    id SERIAL PRIMARY KEY,
    osm_id TEXT,
    lat REAL,
    lng REAL,
    name TEXT,
    tourism TEXT
);
