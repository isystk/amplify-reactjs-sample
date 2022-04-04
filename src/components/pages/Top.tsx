import React, {useEffect, useReducer, useState, VFC} from 'react';
import Amplify, {Auth} from 'aws-amplify';
import API, {graphqlOperation} from '@aws-amplify/api';
import {withAuthenticator} from 'aws-amplify-react'
import {createPost} from '../../graphql/mutations';
import {listPosts} from '../../graphql/queries';
import {onCreatePost} from '../../graphql/subscriptions';

import awsconfig from '../../aws-exports';

import Layout from "../Layout";
import AppRoot from "../../utilities/AppRoot";

Amplify.configure(awsconfig);

const GET = 'GET';
const CREATE = 'CREATE';

const initialState = {
  posts: [],
};

const reducer = (state: { posts: any; }, action: { type: any; posts: any; post: any; }) => {
  switch (action.type) {
    case GET:
      return {...state, posts: action.posts};
    case CREATE:
      return {...state, posts: [...state.posts, action.post]}
    default:
      return state;
  }
};

function signOut() {
  Auth.signOut()
    .then()
    .catch();
}

type Post = {
  id: React.Key | null | undefined;
  title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
  description: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
  userID: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
  createdAt: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
}
type User = {
  username: ''
}
type Props = {
  appRoot: AppRoot
}

const Top: VFC<Props> = ({appRoot}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [userID, setUserID] = useState<string>('');

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target === null) return;
    if (e.target.id) {
      if (e.target.id === 'title') {
        setTitle(e.target.value);
      }
      if (e.target.id === 'description') {
        setDescription(e.target.value);
      }
      if (e.target.id === 'userID') {
        setUserID(e.target.value);
      }
    }
  }

  async function create(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setTitle('')
    setDescription('')
    setUserID('')
    const post = {title: title, description: description, userID: userID};
    await API.graphql(graphqlOperation(createPost, {input: post}));
  }

  useEffect(() => {

    async function getUser() {
      const user = await Auth.currentUserInfo();
      setUser(user);
      return user
    }

    getUser();

    async function getData() {
      const postData = await API.graphql(graphqlOperation(listPosts));
      // @ts-ignore
      dispatch({type: GET, posts: postData.data.listPosts.items});
    }

    getData();

    // @ts-ignore
    const subscription = API.graphql(graphqlOperation(onCreatePost)).subscribe({
      next: (eventData: { value: { data: { onCreatePost: any; }; }; }) => {
        const post = eventData.value.data.onCreatePost;
        // @ts-ignore
        dispatch({type: CREATE, post});
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // @ts-ignore
  return (
    <Layout>
      <div className="App">
        <p>user: {user != null && user.username}</p>
        <button onClick={signOut}>Sign out</button>
        <div>
          <table>
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
              <th>
                <button onClick={create}>New</button>
              </th>
            </tr>
            {state.posts && state.posts.map((post: Post, index: number) => {
              return (
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
    </Layout>
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

// @ts-ignore
export default withAuthenticator(Top, {
  signUpConfig: signUpConfig
});
