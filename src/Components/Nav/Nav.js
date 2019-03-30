import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {clearUser,updateUser} from '../../ducks/reducer';
import {withRouter} from 'react-router-dom';

class Nav extends Component {
    constructor(){
        super()

    }

    componentDidMount(){
        this.current();
    }

    current=async()=>{
        if(!this.props.id){
            let user = await axios.post('/auth/current');
            this.props.updateUser(user.data);
        } 
    }

    logout = async () => {
        await axios.post('/auth/logout');
        this.props.clearUser();
        this.props.history.push('/')
      }

    render(){
        console.log(this.props)
        const {username,pic} = this.props;
        if(this.props.location.pathname !== '/'){
            return (
                <div>
                    <h1>{username}</h1>
                    <img style={{height:100,width:100,borderRadius:'50%'}} src={pic} alt="profile pic"/>
                    <Link to='/dashboard'>
                        <button>Home</button>
                    </Link>
                    <Link to='/new'>
                        <button>New Post</button>
                    </Link>
                    <button onClick={this.logout}>Logout</button>
                </div>
            )
        }
        return null    
        
    }
    
}

function mapStateToProps(reduxState){
    return{
        username:reduxState.username,
        pic:reduxState.pic,
        id:reduxState.id
    }
}



export default withRouter(connect(mapStateToProps,{clearUser,updateUser})(Nav)) 