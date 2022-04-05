import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { URL } from '../common/constants/url'
import Top from './pages/Top'
import SignIn from './pages/SignIn'
import NotFound from './pages/NotFound'
import useAppRoot from '../store/useAppRoot'
import { RouteAuthGuard } from '../auth/RouteAuthGuard'
import Member from './pages/Member'

function App() {
  const appRoot = useAppRoot()

  useEffect(() => {
    if (!appRoot) return
    if (appRoot.self.name) return
    ;(async () => {
      // ログインチェック
      await appRoot.signCheck()
    })()
  }, [appRoot])

  if (!appRoot) return <></>

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Top appRoot={appRoot} />} />
        <Route path={URL.SignIn} element={<SignIn appRoot={appRoot} />} />

        {/* ★ログインユーザー専用ここから */}
        <Route
          path={URL.Member}
          element={<RouteAuthGuard component={<Member appRoot={appRoot} />} redirect={URL.SignIn} />}
        />
        {/* ★ログインユーザー専用ここまで */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
