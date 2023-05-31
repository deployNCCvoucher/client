
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Login from './pages/login';
import { PrivateRoutes } from './routes/PrivateRoutes';
function App() {
  const tokenLogin = localStorage.getItem("token");
  return (
    <>
      <Routes>
        <Route path='app/*' element={<Layout />} />
        <Route path='/login' element={<Login />} />
      </Routes>

    </>

  );
}

export default App;
