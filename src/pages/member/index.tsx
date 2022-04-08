import React, { useEffect, useState, VFC } from 'react'
import Layout from '@/components/Layout'
import MainService from '@/services/main'
import { Post } from '@/services/models'
import {
  Button,
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

type Props = {
  appRoot: MainService
}

const Index: VFC<Props> = ({ appRoot }) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // 投稿一覧を取得する
    appRoot.post.getPosts()
  }, [])

  return (
    <Layout>
      <Grid container justify="space-between">
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>パンくず</Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button color="primary" type="button" variant="contained" onClick={() => setOpen(true)}>
            新規登録
          </Button>
          {/* Modal */}
          <PostRegistModal open={open} onClose={() => setOpen(false)} />
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper} style={{ marginBottom: 30 }}>
            {/* componentにライブラリのPaperをつけることで立体感がでてよくなります */}
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: '#F2F2F2' }}>
                  <TableCell>ID</TableCell>
                  <TableCell>タイトル</TableCell>
                  <TableCell>本文</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appRoot.post &&
                  appRoot.post.posts.map((row: Post) => (
                    //ページ切り替えの要素を取得
                    <TableRow hover key={row.id}>
                      {/* hoverを入れることでマウスポイントが表の上に乗った時に色が変わるアクションがつきます */}
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.description}</TableCell>
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
