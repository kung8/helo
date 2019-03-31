import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updatePosts} from '../../ducks/reducer';

class Form extends Component {
    constructor(){
        super();

        this.state={
            title:'',
            pic:'',
            post:''
        }
    }
    
    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
    }

    addPost = async()=>{
        const {title,pic,post} = this.state;
        const {id} = this.props;
        if(title !=='' && pic !=='' && post !==''){
            let newPost = await axios.post('/post/add',{title,pic,post,id})
            console.log(newPost.data)
            this.props.updatePosts(newPost.data)
            this.props.history.push('/dashboard');
            this.setState({
                title:'',
                pic:'',
                post:''
            })
        } else {
            alert('please complete all the boxes')
        }
    }

    render(){

        return(
            <div style={{background:'red',marginLeft:'300px'}}>
                <h1>New Post</h1>
                <h3>Title:</h3>
                <input onChange={e=>this.handleInput('title',e.target.value)}/>
                <h3>Image URL:</h3>
                <input onChange={e=>this.handleInput('pic',e.target.value)}/>
                <h3>Content:</h3>
                <textarea onChange={e=>this.handleInput('post',e.target.value)}></textarea>
                <br/>
                <button onClick={this.addPost}>Post</button>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    const {id} = reduxState
    console.log(id)
    return{
        id
    }
}

export default connect(mapStateToProps, {updatePosts})(Form) 