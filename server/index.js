require('dotenv').config();
const {SERVER_PORT,CONNECTION_STRING,SESSION_SECRET} = process.env;

const express = require('express');
const session = require('express-session');
const massive = require('massive');

const authCtrl = require('./auth/authController');
const postCtrl = require('./posts/postsController');

// const pg = require('pg');
// const pgSession = require('connect-pg-simple')(session);

const app = express();
app.use(express.json());

// const pgPool = new pg.Pool({
//     connectionString:CONNECTION_STRING
// }) 

app.use(session({
    // store:new pgSession({
    //     pool:pgPool
    // }),
    secret:SESSION_SECRET,
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge:60000
    }
}))

massive(CONNECTION_STRING).then(db=>{
    app.set('db',db)
    console.log('db is running correctly')
    app.listen(SERVER_PORT,()=>console.log(
        `I am running on ${SERVER_PORT}`
    ))
})

//AUTH ENDPOINTS
app.post('/auth/register',authCtrl.register);
app.post('/auth/login',authCtrl.login);
app.post('/auth/current',authCtrl.current);
app.post('/auth/logout',authCtrl.logout);

//POST ENDPOINTS
app.get('/posts/getAll',postCtrl.getAllPosts);
app.get('/post/get/:postid',postCtrl.getPost);
app.post('/post/add',postCtrl.addPost);
app.get('/posts/getAllSearch',postCtrl.getAllSearch);
app.get('/posts/getUser/:id',postCtrl.getUser);
app.get('/posts/getNonUser',postCtrl.getNonUser);
