import React from 'react';
import './App.css';
import Login from './pages/login';
import PrimarySearchAppBar from './components/header/Header';
import SlideBar from './components/slidebar/SlideBar';
import Header from './components/header/Header';
import Layout from './pages/login/layout/Layout';
function App() {
  return (
    <>
      <Header />
      <Layout />
    </>

  );
}

export default App;
