import React, { useEffect, VFC } from 'react'

import Layout from '@/components/Layout'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import MainService from '@/services/main'
import { Card, CardContent, CardMedia, Grid, Typography } from '@material-ui/core'
import NoImage from '@/assets/images/no_image.png'

const useStyles = makeStyles(() => ({
  main: {},
  root: {},
  media: {
    backgroundImage: `url(${NoImage})`,
    height: '50vh',
    display: 'flex',
  },
}))

type Props = {
  appRoot: MainService
}

const PostIndex: VFC<Props> = ({ appRoot }) => {
  const classes = useStyles()
  const { postId } = useParams()

  useEffect(() => {
    if (!postId) {
      return
    }
    // 投稿を取得する
    appRoot.post.getPost(postId)
  }, [postId])

  if (!appRoot.post) return <></>

  const post = appRoot.post.posts[postId + '']
  if (!post) return <></>

  return (
    <Layout>
      <Grid container spacing={0} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card className={classes.root}>
            <CardMedia className={classes.media} image={post.photo || NoImage} title="Contemplative Reptile" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {post.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {post.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default PostIndex
