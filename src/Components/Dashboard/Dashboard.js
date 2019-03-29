import React, {Component} from 'react';
import {connect} from 'react-redux';

class Dashboard extends Component {
    render(){
        return(
            <div>Dashboard</div>
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