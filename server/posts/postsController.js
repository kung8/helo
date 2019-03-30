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
    
    getAllSearch:async(req,res)=>{
        const db = req.app.get('db');
        let {search} = req.query;
        console.log(2222,search)
        search = `%${search}%`
        console.log(111,search)
        let posts = await db.post.get_all_search({search});
        console.log(posts)
        res.status(200).send(posts) 
    },

    getUser: async(req,res)=>{
        const db = req.app.get('db');
        let {id} = req.params;
        let posts = await db.post.get_user({user_id:id}) 
        res.status(200).send(posts)
    },

    getNonUser:async(req,res)=>{
        const db = req.app.get('db');
        console.log(req.query)
        let {search,id} = req.query;
        console.log(search,id)
        // let {id} = req.params;
        search = `%${search}%`
        // id = +id
        let posts = await db.post.get_non_user({search,id}) 
        console.log(posts) 
        res.status(200).send(posts)
    }
}