import React, { VFC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import { Post } from '@/services/models'
import NoImage from '@/assets/images/no_image.png'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  main: {},
  root: {},
  media: {
    backgroundImage: `url(${NoImage})`,
    height: '25vh',
    borderRadius: 8,
    display: 'flex',
    marginLeft: '10px',
    marginTop: '10px',
  },
}))

type Props = {
  post: Post
}

const PostCard: VFC<Props> = ({ post }) => {
  const classes = useStyles()

  return (
    <Link className={classes.main} to={`/post/${post.id}`}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={post.photo || NoImage} title="Contemplative Reptile" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {post.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            詳しくはこちら
          </Button>
        </CardActions>
      </Card>
    </Link>
  )
}

export default PostCard
