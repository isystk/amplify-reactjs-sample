import React, { useEffect, useState, VFC } from 'react'
import Layout from '@/components/Layout'
import MainService from '@/services/main'
import { Post } from '@/services/models'
import {
  Breadcrumbs,
  Button,
  CardMedia,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core'
import PostRegistModal from '@/components/PostRegistModal'
import * as _ from 'lodash'
import NoImage from '@/assets/images/no_image.png'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { Link } from 'react-router-dom'
import { Url } from '@/constants/url'

type Props = {
  appRoot: MainService
}

const Index: VFC<Props> = ({ appRoot }) => {
  const [open, setOpen] = useState(false)
  const [selectPost, setSelectPost] = useState<Post | null>(null)

  useEffect(() => {
    // 投稿一覧を取得する
    appRoot.post.listPosts()
  }, [])

  // 投稿の削除
  const onDeleteSubmit = async (post: Post) => {
    await appRoot.post.deletePost(post.id)
  }

  return (
    <Layout title="マイページ">
      <Grid container style={{ padding: '20px' }}>
        <Grid item xs={12} style={{ marginBottom: '20px' }}>
          <Grid container justify="space-between">
            <Grid item>
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" to={Url.Top}>
                  TOP
                </Link>
                <Typography color="primary">マイページ</Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                type="button"
                variant="contained"
                startIcon={<AddCircleIcon />}
                onClick={() => setOpen(true)}
              >
                新規登録
              </Button>
              {/* Modal */}
              <PostRegistModal
                open={open}
                onClose={() => {
                  setSelectPost(null)
                  setOpen(false)
                }}
                appRoot={appRoot}
                post={selectPost}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper} style={{ marginBottom: 30 }}>
            {/* componentにライブラリのPaperをつけることで立体感がでてよくなります */}
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: '#F2F2F2' }}>
                  <TableCell align="center">タイトル</TableCell>
                  <TableCell align="center">本文</TableCell>
                  <TableCell align="center">写真</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appRoot.post &&
                  _.map(appRoot.post.listMyPosts(), (row: Post) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell align="center">
                        <CardMedia
                          style={{ width: 100, height: 100, display: 'flex' }}
                          image={row.photo || NoImage}
                          title="Contemplative Reptile"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                              startIcon={<EditIcon />}
                              onClick={() => {
                                setSelectPost(row)
                                setOpen(true)
                              }}
                            >
                              変更
                            </Button>
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              variant="contained"
                              color="secondary"
                              type="submit"
                              startIcon={<DeleteIcon />}
                              onClick={async () => {
                                if (confirm('削除します。よろしいですか？')) await onDeleteSubmit(row)
                              }}
                            >
                              削除
                            </Button>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Index
