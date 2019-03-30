SELECT title,username,pic
FROM posts
JOIN users ON users.id = posts.user_id 
WHERE user_id = ${user_id}