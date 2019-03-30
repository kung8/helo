import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Post from '../Post/Post';
import {Link} from 'react-router-dom';
import {updatePosts} from '../../ducks/reducer';

class Dashboard extends Component {
    constructor(){
        super();

        this.state={
            search:'',
            unchecked:true,
            posts:[]
        }
    }

    componentDidMount(){
        this.current();
        this.getAllPosts();
    }

    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
    }

    handleCheck=()=>{
        this.setState({
            unchecked:!this.state.unchecked
        })
    }

    current=async()=>{
        if(!this.props.id){
            let user = await axios.post('/auth/current');
            this.props.updateUser(user.data);
        } 
    }

    getAllPosts=async()=>{
        let posts = await axios.get('/posts/getAll');
        console.log(posts.data);
        this.props.updatePosts(posts.data);
        this.setState({
            posts:posts.data,
            search:''
        })
    }
    
    searchPost=async()=>{
        const {search,unchecked} = this.state;
        const {id} =this.props;
        if(!unchecked && search != ''){
            let posts = await axios.get(`/posts/getAllSearch?search=${search}`)
            console.log(444,posts.data)
            this.setState({
                posts:posts.data,
                search:''
            })
        } else if(!unchecked && search === ''){
            let posts = await axios.get(`/posts/getUser/${id}`)
            this.setState({
                posts:posts.data,
                search:''
            })
        } else if(unchecked && search !== ''){
            let posts = await axios.get(`/posts/getNonUser?search=${search}&id=${id}`)
            this.setState({
                posts:posts.data,
                search:''
            })
        } else {
            this.getAllPosts();
        }
    }

    render(){
        const {unchecked,search} = this.state;
        console.log(this.state,this.props)
        let mappedPost = this.state.posts.map(post =>{
            return (
                <div key={post.id}>
                    <Link to={`/post/${post.id}`}><h1>{post.title}</h1></Link>
                    <h1>{post.username}</h1>
                    <img style={{height:200,width:200}} src={post.pic}/>
                </div>
            )
        })
        return(
            <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>     
                <input value={search} onChange={e=>this.handleInput('search',e.target.value)}/>
                <button onClick={this.searchPost}>Search</button>
                <button onClick={this.getAllPosts}>Reset</button>
                <p>Include My Posts</p>
                <input value={unchecked} type="checkbox" onClick={this.handleCheck}/>
                {mappedPost}
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

export default connect(mapStateToProps,{updatePosts})(Dashboard) 