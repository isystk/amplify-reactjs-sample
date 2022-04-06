import React, { useEffect, useReducer, useState, VFC } from 'react'
import Amplify from 'aws-amplify'
import API, { graphqlOperation } from '@aws-amplify/api'
import { createPost } from '@/services/graphql/mutations'
import { listPosts } from '@/services/graphql/queries'
import { onCreatePost } from '@/services/graphql/subscriptions'

// @ts-ignore
import awsconfig from '@/aws-exports'

import Layout from '@/components/Layout'
import MainService from '@/services/main'

Amplify.configure(awsconfig)

const GET = 'GET'
const CREATE = 'CREATE'

const initialState = {
  posts: [],
}

const reducer = (state: { posts: any }, action: { type: any; posts: any; post: any }) => {
  switch (action.type) {
    case GET:
      return { ...state, posts: action.posts }
    case CREATE:
      return { ...state, posts: [...state.posts, action.post] }
    default:
      return state
  }
}

type Post = {
  id: React.Key | null | undefined
  title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined
  description: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined
  userID: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined
  createdAt: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined
}

type Props = {
  appRoot: MainService
}

const Top: VFC<Props> = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [userID, setUserID] = useState<string>('')

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target === null) return
    if (e.target.id) {
      if (e.target.id === 'title') {
        setTitle(e.target.value)
      }
      if (e.target.id === 'description') {
        setDescription(e.target.value)
      }
      if (e.target.id === 'userID') {
        setUserID(e.target.value)
      }
    }
  }

  async function create(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setTitle('')
    setDescription('')
    setUserID('')
    const post = { title, description, userID }
    await API.graphql(graphqlOperation(createPost, { input: post }))
  }

  useEffect(() => {
    async function getData() {
      const postData = await API.graphql(graphqlOperation(listPosts))
      // @ts-ignore
      dispatch({ type: GET, posts: postData.data.listPosts.items })
    }

    getData()

    // @ts-ignore
    const subscription = API.graphql(graphqlOperation(onCreatePost)).subscribe({
      next: (eventData: { value: { data: { onCreatePost: any } } }) => {
        const post = eventData.value.data.onCreatePost
        // @ts-ignore
        dispatch({ type: CREATE, post })
      },
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <Layout>
      <div className="App">
        <div>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Description</th>
                <th>UserID</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td />
                <td>
                  <input id="title" type="text" onChange={onChange} value={title} />
                </td>
                <td>
                  <input id="description" type="text" onChange={onChange} value={description} />
                </td>
                <td>
                  <input id="userID" type="text" onChange={onChange} value={userID} />
                </td>
                <th>
                  <button onClick={create}>New</button>
                </th>
              </tr>
              {state.posts &&
                state.posts.map((post: Post, index: number) => (
                  <tr key={post.id}>
                    <td>{index + 1}</td>
                    <td>{post.title}</td>
                    <td>{post.description}</td>
                    <td>{post.userID}</td>
                    <td>{post.createdAt}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default Top
