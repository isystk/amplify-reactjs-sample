import React, { VFC } from 'react'
import { Button, Grid, Typography, Modal, Paper, TextField, Fade } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'

type Props = {
  open: boolean
  onClose: () => void
}

const PostRegistModal: VFC<Props> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Fade in={open}>
        <Paper style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <Typography style={{ marginLeft: 8 }}>タイトル</Typography>
          <TextField
            style={{ margin: 8, paddingBottom: 20 }}
            margin="normal"
            fullWidth
            variant="outlined"
            className="red-border"
          />
          <Typography style={{ marginLeft: 8 }}>コメント</Typography>
          <TextField
            style={{ margin: 8, paddingBottom: 20 }}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <Grid container style={{ paddingTop: 30 }} justify="flex-end" direction="row">
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  console.log('post')
                }}
                startIcon={<AddCircleIcon />}
              >
                投稿
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    </Modal>
  )
}

export default PostRegistModal
