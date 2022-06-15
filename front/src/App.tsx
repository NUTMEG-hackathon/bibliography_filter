import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import Home from './pages/home';
import After from './pages/after';
import NotFound from './pages/notfound';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/after/posts/:search' element={<After />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
