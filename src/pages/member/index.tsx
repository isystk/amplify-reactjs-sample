import React, { useEffect, useState, VFC } from 'react'
import Layout from '@/components/Layout'
import MainService from '@/services/main'
import { Post } from '@/services/models'
import {
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
} from '@material-ui/core'
import PostRegistModal from '@/components/PostRegistModal'
import * as _ from 'lodash'
import NoImage from '@/assets/images/no_image.png'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

type Props = {
  appRoot: MainService
}

const Index: VFC<Props> = ({ appRoot }) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // 投稿一覧を取得する
    appRoot.post.getPosts()
  }, [])

  // 投稿の削除
  const onDeleteSubmit = async (post: Post) => {
    console.log(post)
  }

  return (
    <Layout>
      <Grid container justify="space-between">
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>パンくず</Grid>
          </Grid>
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
          <PostRegistModal open={open} onClose={() => setOpen(false)} appRoot={appRoot} />
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper} style={{ marginBottom: 30 }}>
            {/* componentにライブラリのPaperをつけることで立体感がでてよくなります */}
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: '#F2F2F2' }}>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">タイトル</TableCell>
                  <TableCell align="center">本文</TableCell>
                  <TableCell align="center">写真</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appRoot.post &&
                  _.map(appRoot.post.posts, (row: Post) => (
                    //ページ切り替えの要素を取得
                    <TableRow hover key={row.id}>
                      {/* hoverを入れることでマウスポイントが表の上に乗った時に色が変わるアクションがつきます */}
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
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
                            <Button variant="contained" color="primary" type="submit" startIcon={<EditIcon />}>
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
