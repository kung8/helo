import React, {Component} from 'react';
import {connect} from 'react-redux';

class Dashboard extends Component {
    render(){
        console.log(this.props)
        const {pic,username,id} = this.props
        return(
            <div style={{marginTop:20}}>
                <h1>{username}</h1>
                <img style={{height:200,width:200}} src={pic} alt="profile pic"/>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    const {id,pic,username} = reduxState
    return{
        id,
        pic,
        username
    }
}

export default connect(mapStateToProps)(Dashboard) 