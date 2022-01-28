import './App.css';
import Layout from './theme/layout';

import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { Counter } from './features/counter/Counter';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
