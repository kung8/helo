import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class Post extends Component {
    constructor(props){
        super(props)
        this.state={
           post:[]
        }
    }

    componentDidMount(){
        this.getPost()
    }

    getPost=async()=>{
        let post = await axios.get(`/post/get/${this.props.match.params.postid}`)
        post = post.data[0]
        this.setState({
            post:post
        })

    }

    render(){
        console.log(this.props)
        const {post} = this.state
        return(
            <div style={{display:'flex'}}>
                <p>{post.username}</p>
                <img style={{width:200,height:200}} src={post.pic}/>
                <p>{post.title}</p>
                <img style={{width:200,height:200}}src={post.post_pic}/>
                <p>{post.post}</p>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    const {username,pic,posts} = reduxState
    console.log(reduxState)
    return{
        username,
        pic,
        posts    
    }
}

export default connect(mapStateToProps)(Post) 