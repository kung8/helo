SELECT posts.id, username,pic,title,post_pic 
FROM posts
JOIN users ON users.id = posts.user_id