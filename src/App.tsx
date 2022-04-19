import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Url } from '@/constants/url'
import Top from '@/pages/Top'
import PostIndex from '@/pages/post/[id]'
import SignIn from '@/pages/signin'
import SignUp from '@/pages/signup'
import Member from '@/pages/member'
import NotFound from '@/pages/NotFound'
import useAppRoot from '@/stores/useAppRoot'
import { RouteAuthGuard } from '@/auth/RouteAuthGuard'
import { Amplify } from 'aws-amplify'

function App() {
  const appRoot = useAppRoot()

  useEffect(() => {
    if (!appRoot) return
    ;(async () => {
      // ログインチェック
      await appRoot.auth.signCheck()
    })()
  }, [appRoot])

  if (!appRoot) return <></>

  // See: https://zenn.dev/hatti/articles/619352f7193c8d
  if (appRoot.auth.name !== '') {
    Amplify.configure({
      aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
    })
  } else {
    Amplify.configure({
      aws_appsync_authenticationType: 'API_KEY',
    })
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Top appRoot={appRoot} />} />
        <Route path="/post/:postId" element={<PostIndex appRoot={appRoot} />} />
        <Route path={Url.SignIn} element={<SignIn appRoot={appRoot} />} />
        <Route path={Url.SignUp} element={<SignUp appRoot={appRoot} />} />

        {/* ★ログインユーザー専用ここから */}
        <Route
          path={Url.Member}
          element={<RouteAuthGuard component={<Member appRoot={appRoot} />} redirect={Url.SignIn} />}
        />
        {/* ★ログインユーザー専用ここまで */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
