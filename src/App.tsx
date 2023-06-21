import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Layout from './layouts/Layout';

import './scss/app.scss';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */"./pages/Cart"));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */"./pages/FullPizza"));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */"./pages/NotFound"));

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
