import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUser,clearUser} from '../../ducks/reducer';

class Auth extends Component {
    constructor(){
        super();
        this.state={
            username:'',
            password:''
        }
    }

    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
    }

    login=async()=>{
        const {username,password} = this.state;
        let user = await axios.post('/auth/login',{username,password});
        user = user.data;
        this.props.updateUser(user);
        this.props.history.push('/dashboard');
        this.setState({
            username:'',
            password:''
        })
    }

    register=async()=>{
        const {username,password} = this.state;
        let user = await axios.post('/auth/register',{username,password});
        console.log(user.data);
        user = user.data;
        this.props.updateUser(user);
        this.props.history.push('/dashboard');
        this.setState({
            username:'',
            password:''
        })
    }

    render(){
        const {username,password} = this.state;
        console.log(this.props)
        return(
            <div>
                <input value={username} type='text' placeholder="Username" onChange={e=>this.handleInput('username',e.target.value)}/>
                <input value={password} type='password' placeholder="Password" onChange={e=>this.handleInput('password',e.target.value)}/>
                <button onClick={this.login}>Login</button>
                <button onClick={this.register}>Register</button>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    const {username,pic,id} = reduxState;
    return {
        username,
        pic,
        id
    }
}

export default connect(mapStateToProps,{updateUser,clearUser})(Auth) 