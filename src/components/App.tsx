import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';

import {URL} from '../common/constants/url'
import Top from '../components/pages/Top';
import SignIn from "../components/pages/SignIn";
import NotFound from "../components/pages/NotFound";
import useAppRoot from "../store/useAppRoot";
import AuthCheck from "../auth/AuthCheck";
import Member from "./pages/Member";
import {Auth} from "aws-amplify";

const App = () => {
  const appRoot = useAppRoot()

  useEffect(() => {
    if (!appRoot) return
    if (appRoot.self.name) return
    (async () => {
      // ログインチェック
      await appRoot.signCheck()
    })()
  }, [appRoot])

  if (!appRoot) return <></>

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Top appRoot={appRoot}/>}/>
        <Route path={URL.SignIn} element={<SignIn appRoot={appRoot}/>}/>

        {/* ★ログインユーザー専用ここから */}
            <Route path={URL.Member} element={<Member appRoot={appRoot}/>}/>
        {/* ★ログインユーザー専用ここまで */}

        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App