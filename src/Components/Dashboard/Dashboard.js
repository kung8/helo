import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class Dashboard extends Component {
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
    
    render(){
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