import React, { useEffect, VFC } from 'react'

import Layout from '@/components/Layout'
import MainService from '@/services/main'
import { Post } from '@/services/models'
import PostCard from '@/components/PostCard'
import { Grid } from '@material-ui/core'
import * as _ from 'lodash'

type Props = {
  appRoot: MainService
}

const Top: VFC<Props> = ({ appRoot }) => {
  useEffect(() => {
    // 投稿一覧を取得する
    appRoot.post.listPosts()
  }, [])

  if (!appRoot.post) return <></>

  return (
    <Layout title="TOP">
      <Grid container spacing={0}>
        {_.map(appRoot.post.posts, (post: Post, index: number) => (
          <Grid item xs={12} md={3} key={index}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

export default Top
