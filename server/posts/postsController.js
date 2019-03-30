module.exports={
    getAllPosts:async(req,res)=>{
        const db = req.app.get('db');
        const posts = await db.post.get_all_posts();
        res.status(200).send(posts)
    },

    
    getPost:async(req,res)=>{
        const db = req.app.get('db');
        const {postid} = req.params;
        let post = await db.post.get_post({id:postid})
        res.status(200).send(post) 
    },
    
    addPost:async(req,res)=>{
        const db = req.app.get('db');
        const {id:user_id,title,pic:post_pic,post} = req.body;
        let newPost = await db.post.add_post({user_id,title,post_pic,post})
        console.log(newPost);
        res.status(200).send(newPost)
    },
    
    getUserPosts:async(req,res)=>{
        const db = req.app.get('db');
        const {post} = req.body;
        const {id} = req.session.user;
    },
}