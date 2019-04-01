import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {updatePosts} from '../../ducks/reducer';
import Loader from '../Loader/Loader';

const image = {fontSize:25,background:'orange',height:30,width:25};
const myPost = {fontSize:20};
const check = {marginLeft:5,marginRight:10};
const map = {background:'white',width:'70%',marginTop:'5px',marginLeft:'15vw'};
const posts = {display:'flex',flexDirection:'column',width:'95%'};
const postDiv = {justifyContent:'space-between',display:'flex',border:'black solid',marginBottom:4,marginTop:5};
const title = {marginLeft:10};
const link = {textDecoration:'none',color:'black'};
const right = {display:'flex'};
const username = {display:'flex',alignItems:'center',marginRight:'10px',marginBottom:3};
const pic = {height:60,width:60,borderRadius:'50%',boxShadow:'2px 1px 5px 1px black',marginRight:10,marginTop:10};

class Dashboard extends Component {
    constructor(){
        super();

        this.state={
            search:'',
            unchecked:true,
            posts:[],
            isLoaded:false
        }
    }

    componentDidMount(){
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

    getAllPosts=async()=>{
        this.setState({
            isLoaded:false
        })
        let posts = await axios.get('/posts/getAll');
        console.log(posts.data);
        this.props.updatePosts(posts.data);
        this.setState({
            posts:posts.data,
            search:'',
            isLoaded:true
        })
    }
    
    searchPost=async()=>{
        const {search,unchecked} = this.state;
        const {id} =this.props;
        this.setState({
            isLoaded:false
        })
        if(!unchecked && search != ''){
            let posts = await axios.get(`/posts/getAllSearch?search=${search}`)
            console.log(444,posts.data)
            this.setState({
                posts:posts.data,
                search:'',
                isLoaded:true
            })
        } else if(!unchecked && search === ''){
            let posts = await axios.get(`/posts/getUser/${id}`)
            this.setState({
                posts:posts.data,
                search:'',
                isLoaded:true
            })
        } else if(unchecked && search !== ''){
            let posts = await axios.get(`/posts/getNonUser?search=${search}&id=${id}`)
            this.setState({
                posts:posts.data,
                search:'',
                isLoaded:true
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
                <div key={post.id} style={posts}>
                    <div style={postDiv}>
                        <div style={title}>
                            <Link to={`/post/${post.id}`} style={link}><h1>{post.title}</h1></Link>
                        </div>
                        <div style={right}>
                            <h1 style={username}>by {post.username}</h1>
                            <img style={pic} src={post.pic}/>
                        </div>
                    </div>
                </div>
            )
        })

        return(
            <div className="entire-dashboard-section-body">
                <div className="dashboard-search-section">
                    <div>
                        <div className="search-div">
                            <input 
                                value={search} 
                                placeholder="Search by Title" 
                                onChange={e=>this.handleInput('search',e.target.value)}
                                />
                            <i 
                                style={image} 
                                onClick={this.searchPost} 
                                class="fas fa-search"
                                />
                            <button onClick={this.getAllPosts}>Reset</button>
                        </div>
                        <div className="my-post-div">
                            <p style={myPost}>My Posts</p>
                            <input 
                            style={check} 
                            value={unchecked} 
                            type="checkbox" 
                            onChange={this.handleCheck}
                            />
                        </div>     
                    </div>
                </div>
                <div style={map}>
                    <Loader isLoaded={this.state.isLoaded}>
                        {mappedPost}
                    </Loader>
                </div>
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