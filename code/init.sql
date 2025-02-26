-- Create database
CREATE DATABASE myProperty;

-- Connect to the database
\c myProperty;

-- Create profile table
CREATE TABLE profile (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);
