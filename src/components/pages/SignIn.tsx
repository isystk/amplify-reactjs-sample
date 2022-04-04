import React, {
  VFC, useCallback, useEffect, useState, useContext,
} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  Button, FormGroup, Input, InputLabel,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { URL } from '../../common/constants/url';
import AppRoot from '../../utilities/AppRoot';
import Layout from '../Layout';

type Props = {
  appRoot: AppRoot
}

type Form = {
  email: string
  password: string
}

const SignIn: VFC<Props> = ({ appRoot }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (appRoot.self.name) {
      navigate(URL.Top);
    }
  }, [appRoot.self.name]);

  // フォームの初期値
  const initialValues = {
    email: '',
    password: '',
  };
  // フォームのバリデーション
  const validationSchema = Yup.object().shape({
    email: Yup.string().required(
      'メールアドレスを入力してください。',
    ),
    password: Yup.string().required(
      'パスワードを入力してください。',
    ),
  });
  // フォームの送信
  const onSubmit = async (values: Form) => {
    const { email, password } = values;
    await appRoot.signIn(email, password);
  };

  return (
    <Layout>
      <section>
        <div>
          <h1>ログイン</h1>
        </div>
        <div>
          <Grid container justifyContent="center" spacing={1}>
            <Grid item md={12}>
              <Card>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({
                    setFieldValue,
                    dirty,
                    isValid,
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                  }) => (
                    <Form>
                      <CardContent>
                        <Grid
                          item
                          container
                          spacing={3}
                          justifyContent="center"
                        >
                          <Grid item xs={12} sm={12} md={12}>
                            <FormGroup>
                              <InputLabel required>メールアドレス</InputLabel>
                              <TextField
                                type="text"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!(touched.email && errors.email)}
                                helperText={errors.email}
                                margin="dense"
                              />
                            </FormGroup>
                          </Grid>
                          <Grid item xs={12} sm={12} md={12}>
                            <FormGroup>
                              <InputLabel required>パスワード</InputLabel>
                              <TextField
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!(touched.password && errors.password)}
                                helperText={errors.password}
                                margin="dense"
                              />
                            </FormGroup>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardActions>
                        <Grid item xs={12} sm={12} md={12}>
                          <Button
                            color="primary"
                            disabled={!isValid}
                            fullWidth
                            type="submit"
                            variant="contained"
                          >
                            ログインする
                          </Button>
                        </Grid>
                      </CardActions>
                    </Form>
                  )}
                </Formik>
                <CardContent>
                  <Grid item container spacing={1}>
                    <Grid item xs={12} sm={12} md={12}>
                      <Link to={URL.SignUp}>
                        会員登録はこちら
                      </Link>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </section>
    </Layout>
  );
};

export default SignIn;
