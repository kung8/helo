SELECT title,username,pic
FROM posts
JOIN users ON users.id = posts.user_id 
WHERE title ilike ${search} AND users.id != ${id}