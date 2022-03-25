import React, {useState, useEffect, useReducer } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import API, { graphqlOperation } from '@aws-amplify/api';
import { withAuthenticator } from 'aws-amplify-react'
import { createPost } from './graphql/mutations';
import { listPosts } from './graphql/queries';
import { onCreatePost } from './graphql/subscriptions';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const GET = 'GET';
const CREATE = 'CREATE';

const initialState = {
    posts: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case GET:
            return {...state, posts: action.posts};
        case CREATE:
            return {...state, posts:[...state.posts, action.post]}
        default:
            return state;
    }
};

function signOut(){
    Auth.signOut()
        .then()
        .catch();
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [userID, setUserID] = useState(null);

    function onChange(e){
        if(e.target.id === 'title'){
            setTitle(e.target.value);
        }
        if(e.target.id === 'description'){
            setDescription(e.target.value);
        }
        if(e.target.id === 'userID'){
            setUserID(e.target.value);
        }
    }

    async function create(e) {
        e.preventDefault();
        setTitle('')
        setDescription('')
        setUserID('')
        const post = { title:title, description:description, userID:userID };
        await API.graphql(graphqlOperation(createPost, { input: post }));
    }

    useEffect(() => {

        async function getUser(){
            const user = await Auth.currentUserInfo();
            setUser(user);
            return user
        }

        getUser();

        async function getData() {
            const postData = await API.graphql(graphqlOperation(listPosts));
            dispatch({ type: GET, posts: postData.data.listPosts.items });
        }

        getData();

        const subscription = API.graphql(graphqlOperation(onCreatePost)).subscribe({
            next: (eventData) => {
                const post = eventData.value.data.onCreatePost;
                dispatch({ type: CREATE, post });
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className="App">
            <p>user: {user!= null && user.username}</p>
            <button onClick={signOut}>Sign out</button>
            <div>
                <table border="1" style={{'border-collapse': 'collapse'}}>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>UserID</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td></td>
                        <td><input id='title' type='text' onChange={onChange} value={title}/></td>
                        <td><input id='description' type='text' onChange={onChange} value={description}/></td>
                        <td><input id='userID' type='text' onChange={onChange} value={userID}/></td>
                        <th><button onClick={create}>New</button></th>
                    </tr>
                    {state.posts && state.posts.map((post,index) => {
                        return(
                            <tr key={post.id}>
                                <td>{index + 1}</td>
                                <td>{post.title}</td>
                                <td>{post.description}</td>
                                <td>{post.userID}</td>
                                <td>{post.createdAt}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    );
}

const signUpConfig = {
    header: 'Sign Up',
    hideAllDefaults: true,
    defaultCountyCode: '1',
    signUpFields: [
        {
            label: 'User Name',
            key: 'username',
            required: true,
            displayOrder: 1,
            type: 'string'
        },
        {
            label: 'Email',
            key: 'email',
            required: true,
            displayOrder: 2,
            type: 'string'
        },
        {
            label: 'Password',
            key: 'password',
            required: true,
            displayOrder: 3,
            type: 'password'
        }
    ]
}

export default withAuthenticator(App, {
    signUpConfig: signUpConfig
});