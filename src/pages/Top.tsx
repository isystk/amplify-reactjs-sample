import React, { useEffect, useState, VFC } from 'react'

import Layout from '@/components/Layout'
import MainService from '@/services/main'
import { Post } from '@/services/models'

type Props = {
  appRoot: MainService
}

const Top: VFC<Props> = ({ appRoot }) => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target === null) return
    if (e.target.id) {
      if (e.target.id === 'title') {
        setTitle(e.target.value)
      }
      if (e.target.id === 'description') {
        setDescription(e.target.value)
      }
    }
  }

  async function create(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setTitle('')
    setDescription('')

    // 投稿処理
    const post = { title, description, userID: appRoot.auth.id } as Post
    await appRoot.post.createPost(post)
  }

  useEffect(() => {
    // 投稿一覧を取得する
    appRoot.post.getPosts()
  }, [])

  return (
    <Layout>
      <div className="App">
        <div>
          <div>
            <input id="title" type="text" onChange={onChange} value={title} />
            <input id="description" type="text" onChange={onChange} value={description} />
            <button onClick={create}>New</button>
          </div>
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
              {appRoot.post &&
                appRoot.post.posts.map((post: Post, index: number) => (
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
