import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/reducer';

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
        return(
            <div className="entire-auth-section-body">
                <div className="entire-auth-center-box">
                    <div className="auth-content-holder">
                        <div className="auth-logo-name-holder">
                            <i className="far fa-smile-wink"/>
                            <h1>Helo</h1>
                            <div className="auth-input-holder">
                                <p>Username:</p>
                                <input 
                                    value={username} type='text' placeholder="Username" onChange={e=>this.handleInput('username',e.target.value)}/>
                            </div>
                            <div className="auth-input-holder">
                                <p>Password:</p>
                                <input 
                                    value={password} type='password' placeholder="Password" onChange={e=>this.handleInput('password',e.target.value)}/>
                            </div>
                            <div className="auth-button-holder">
                                <button onClick={this.login}>Login</button>
                                <button onClick={this.register}>Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect('',{updateUser})(Auth) 