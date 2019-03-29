const bcrypt = require('bcryptjs')

module.exports={
    register: async (req,res) => {
        const db = req.app.get('db');
        const {username,password} = req.body;
        let user = await db.auth.check_user({username});
        // console.log(user)
        user = user[0];
        if(user){
            res.sendStatus(409)
        } 
        let pic = "https://www.superherodb.com/pictures2/portraits/10/100/639.jpg"
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password,salt);
        let newUser = await db.auth.register({username,password:hash,pic});
        console.log('before',newUser);
        newUser = newUser[0];
        console.log('after',newUser);
        req.session.user = newUser;
        console.log(req.session.user)
        res.status(200).send(newUser)
    },

    login: async(req,res)=>{
        const db = req.app.get('db')
        const {username,password} = req.body;
        let user = await db.auth.login({username});
        console.log(user)
        user = user[0];
        if(!user){
            return res.status(401).send('email not found')
        } 
        let authenticated = bcrypt.compareSync(password,user.password);
        if(authenticated){
            delete user.password;
            req.session.user = user;
            res.status(200).send(req.session.user);
        } else {
            res.status(401).send('password is incorrect');
        }
    },

    current: async (req,res) =>{
        const db = req.app.get('db');
        if(req.session.user){
            res.status(200).send(req.session.user);
        } else {
            res.sendStatus(401);
        }
    },

    logout:(req,res)=>{
        req.session.destroy(function(){
            res.status(200).send('Log out successful!')
        })
    }
}