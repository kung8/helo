INSERT INTO posts (user_id,post,title,post_pic)
VALUES (${user_id},${post},${title},${post_pic});

SELECT posts.id, username,pic,title,post_pic  
FROM posts 
JOIN users ON users.id = posts.user_id
