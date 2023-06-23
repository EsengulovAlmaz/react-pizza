import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Layout from './layouts/Layout';
import FullPizza from './pages/FullPizza';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import './scss/app.scss';

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
