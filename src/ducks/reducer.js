const initialState = {
    id: 0,
    username:'',
    pic:'',
    posts:[],
    // selectedId:0
}

const UPDATE_USER = 'UPDATE_USER';
const CLEAR_USER = 'CLEAR_USER';
const UPDATE_POSTS = 'UPDATE_POSTS';
// const SELECT_ID = 'SELECT_ID';

export function updateUser(user){
    return{
        type:UPDATE_USER,
        payload:user
    }
}

export function clearUser(){
    return{
        type:CLEAR_USER
    }
}

export function updatePosts(posts){
    return{
        type:UPDATE_POSTS,
        payload:posts
    }
}

// export function selectId(id){
//     return{
//         type:SELECT_ID,
//         payload:id
//     }
// }

export default function reducer (state=initialState,action){
    switch(action.type){
        case UPDATE_USER:
            const {id,username,pic} = action.payload
            return {...state,id,username,pic};
        case CLEAR_USER:
            return {...state,id:0,username:'',pic:''};
        case UPDATE_POSTS:
            return {...state,posts:action.payload};
        // case SELECT_ID:
        //     return {...state,selectId:action.payload}
        default: 
            return state
    }
}