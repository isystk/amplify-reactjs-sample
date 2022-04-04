import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import {URL} from '../common/constants/url'
import Top from '../components/pages/Top';
import SignIn from "../components/pages/SignIn";
import NotFound from "../components/pages/NotFound";
import useAppRoot from "../store/useAppRoot";

const App = () => {
  const appRoot = useAppRoot()
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Top appRoot={appRoot} />} />
        <Route path={URL.SignIn} element={<SignIn appRoot={appRoot} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App