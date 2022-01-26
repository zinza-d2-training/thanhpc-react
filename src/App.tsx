import React from 'react';
import './App.css';
import { CssBaseline, Typography } from '@mui/material';
import Layout from './theme/layout';

import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  

  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>

      <Routes>
            <Route path="/login" element={<Login />}>
            </Route>
            <Route path="/" element={<Home />}>
            </Route>
      </Routes>
    </>
  );
}

export default App;
