import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {clearUser,updateUser} from '../../ducks/reducer';
import {withRouter} from 'react-router-dom';

const image = {fontSize:60,color:'white'}
const logout = {display:'flex',flexDirection:'column',alignItems:'center',marginBottom:10}
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
        const {username,pic} = this.props;
        if(this.props.location.pathname !== '/'){
            return (
                <div className="entire-nav-bar">
                    <div className="nav-bar-content-holder">
                        <div className="nav-bar-image-username-holder">
                            <img src={pic} alt="profile pic"/>
                            <h1>{username}</h1>
                        </div>
                        <div className="nav-bar-routing-buttons-holder">
                            <div className="nav-bar-dashboard-form-routing-button-holder">
                                <Link to='/dashboard'><i style={image} className="fas fa-home"/></Link>
                                <Link to='/new'><i style={image} className="far fa-file-alt"/></Link>
                            </div>
                            <div style={logout}>
                                <i style={image} onClick={this.logout} className="fas fa-power-off"/>
                            </div>
                        </div>
                    </div>
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