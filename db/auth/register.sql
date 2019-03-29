INSERT INTO users (username, password, pic)
VALUES (${username},${password},${pic})
RETURNING id,username,pic