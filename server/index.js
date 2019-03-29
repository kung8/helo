require('dotenv').config();
const express = require('express');
const ctrl = require('./controller');
const session = require('express-session');
const massive = require('massive');
const {SERVER_PORT,CONNECTION_STRING,SESSION_SECRET} = process.env;

const app = express();
app.use(express.json());

app.use(session({
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

//ENDPOINTS
app.post('/auth/register',ctrl.register);
app.post('/auth/login',ctrl.login);
app.post('/auth/current',ctrl.current);
app.post('/auth/logout',ctrl.logout);


