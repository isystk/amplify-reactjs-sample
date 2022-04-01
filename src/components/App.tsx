import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import Top from '../components/pages/Top';
import Login from "../components/pages/Login";
import NotFound from "../components/pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Top />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App