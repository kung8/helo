SELECT title,post,username,pic,post_pic,posts.id
FROM posts
JOIN users ON users.id = posts.user_id
WHERE posts.id = ${id}