import React, { VFC } from 'react'
import { Button, Grid, Typography, Modal, Paper, TextField, Fade, FormGroup } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import ImageFile from "@/components/Input/ImageFile";

type Props = {
  open: boolean
  onClose: () => void
}

type Form = {
  title: string
  description: string
  photo: string
}

const PostRegistModal: VFC<Props> = ({ open, onClose }) => {
  // フォームの初期値
  const initialValues = {
    title: '',
    description: '',
    photo: ''
  }
  // フォームのバリデーション
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('タイトルを入力してください。'),
    description: Yup.string().required('本文を入力してください。'),
    photo: Yup.string().required('写真を選択してください。'),
  })
  // フォームの送信
  const onSubmit = async (values: Form) => {
    console.log(values)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Fade in={open}>
        <Paper
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '450px',
          }}
        >
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Grid container spacing={3} justifyContent="center">
                  <Grid item xs={12} sm={12} md={12}>
                    <FormGroup style={{ margin: 8 }}>
                      <Typography style={{ marginLeft: 8 }}>タイトル</Typography>
                      <TextField
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        className="red-border"
                        type="text"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!(touched.title && errors.title)}
                        helperText={errors.title}
                      />
                      <Typography style={{ marginLeft: 8 }}>本文</Typography>
                      <TextField
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        type="text"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!(touched.description && errors.description)}
                        helperText={errors.description}
                      />
                      <ImageFile label="写真" name="photo" />
                      <Grid container style={{ paddingTop: 30 }} justify="center" direction="row">
                        <Grid item>
                          <Button variant="contained" color="secondary" type="submit" startIcon={<AddCircleIcon />}>
                            投稿
                          </Button>
                        </Grid>
                      </Grid>
                    </FormGroup>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Paper>
      </Fade>
    </Modal>
  )
}

export default PostRegistModal
