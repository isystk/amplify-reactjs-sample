import React, { useEffect, VFC } from 'react'

import Layout from '@/components/Layout'
import MainService from '@/services/main'
import { Grid } from '@material-ui/core'
import { useParams } from 'react-router-dom'

type Props = {
  appRoot: MainService
}

const PostIndex: VFC<Props> = ({ appRoot }) => {
  const { postId } = useParams()

  useEffect(() => {
    if (!postId) {
      return
    }
    // 投稿を取得する
    appRoot.post.getPost(postId)
  }, [postId])

  if (!appRoot.post) return <></>

  return (
    <Layout>
      <Grid container spacing={0}></Grid>
    </Layout>
  )
}

export default PostIndex
