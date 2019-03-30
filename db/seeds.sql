create table posts (
id SERIAL PRIMARY KEY,
post TEXT, 
user_id INT REFERENCES users(id),
title VARCHAR,
post_pic TEXT
);