import React from 'react';
import { Route, Routes } from 'react-router-dom';


import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import Layout from './layouts/Layout';

import './scss/app.scss';
import FullPizza from './pages/FullPizza';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
