import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {updatePosts} from '../../ducks/reducer';
import Loader from '../Loader/Loader';

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
                <div key={post.id} style={{display:'flex',flexDirection:'column',width:'95%'}}>
                    <div style={{justifyContent:'space-between',display:'flex',border:'black solid',marginBottom:4,marginTop:5}}>
                        <div style={{marginLeft:10}}>
                            <Link to={`/post/${post.id}`} style={{textDecoration:'none',color:'black'}}><h1>{post.title}</h1></Link>
                        </div>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <h1 style={{marginRight:5}}>by {post.username}</h1>
                            <img style={{height:60,width:60,borderRadius:'50%',boxShadow:'2px 1px 5px 1px black',marginRight:10}} src={post.pic}/>
                        </div>
                    </div>
                </div>
            )
        })

        return(
            <div style={{width:'90vw',marginLeft:'10vw',height:'100vh',background:'lightgrey',overflowY:'scroll'}}>
                <div style={{background:'white',width:'70%',marginTop:'5vh',marginLeft:'15vw'}}>
                    <div style={{display:'flex', alignItems:'center',justifyContent:'space-between'}}>
                        <div style={{width:'80%'}}>
                            <input style={{width:'85%',height:25,fontSize:20,marginLeft:10}} value={search} placeholder="Search by Title" onChange={e=>this.handleInput('search',e.target.value)}/>
                            <i style={{fontSize:25,background:'orange',height:30,width:25}} onClick={this.searchPost} class="fas fa-search"></i>
                            <button style={{height:30,fontSize:20,background:'black',color:'white'}}onClick={this.getAllPosts}>Reset</button>
                        </div>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <p style={{fontSize:20}}>My Posts</p>
                            <input style={{marginLeft:5,marginRight:10}} value={unchecked} type="checkbox" onClick={this.handleCheck}/>
                        </div>     
                    </div>
                </div>
                <div style={{background:'white',width:'70%',marginTop:'5px',marginLeft:'15vw'}}>
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