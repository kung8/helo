import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {clearUser} from '../../ducks/reducer';
import {withRouter} from 'react-router-dom';

class Nav extends Component {

    logout = async () => {
        await axios.post('/auth/logout');
        this.props.clearUser();
        this.props.history.push('/')
      }

    render(){
        console.log(this.props)
        if(this.props.location.pathname !== '/'){
            return (
                <div>
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
        pic:reduxState.pic
    }
}



export default withRouter(connect(mapStateToProps,{clearUser})(Nav)) 