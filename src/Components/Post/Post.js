import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

const body = {width:'90vw',height:'100vh',background:'#f2f2f2',marginLeft:'10vw',position:'relative'};
const content = {position:'absolute',top:'5%', display:'flex',flexDirection:'column',background:'white',width:'80%',marginLeft:'10%',maxHeight:'75%'};


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
            <div style={body}>
                <div style={content}>
                    <div style={{display:'flex', alignItems:'center',justifyContent:'space-between',width:'94%',marginLeft:'3%'}}>
                        <p style={{color:'#ff9770',fontSize:50}}>{post.title}</p>
                        <div style={{display:'flex'}}>
                            <p style={{fontSize:35,marginRight:5}}>{post.username}</p>
                            <img style={{width:75,height:75,borderRadius:'50%'}} src={post.pic}/>
                        </div>
                    </div>
                    <div style={{marginTop:'0', marginBottom:20,display:'flex',width:'94%',marginLeft:'3%'}}>
                        <img style={{width:'45%',height:'100%'}}src={post.post_pic}/>
                        <p style={{fontSize:25,marginLeft:'5%'}}>{post.post}</p>
                    </div>
                </div>
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