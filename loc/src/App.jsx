import { useState } from 'react';
import { Outlet, BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from './pages/main';
import { AuthProvider, UseDbData } from './data';
import { Header, Footer, Gnb } from './components/common';
import { AccountRoutes, DbRoutes } from './routes';
import './App.css';

const LayOut = ({ title }) => {
  return (
    <div id="wrapper">
      <Header title={title} />
      <Outlet />
      <Gnb />
    </div>
  )
};

const App = () => {
  const [title, setTitle] = useState('');
  const getPageName = (name) => {
    setTitle(name);
  };
  return (
    <UseDbData>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LayOut title={title} />}>
            <Route index element={<Main title={getPageName} />} />
            <Route path='/account/*' element={<AccountRoutes />} />
            <Route path='/db/*' element={<DbRoutes title={getPageName} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UseDbData>
  )
};

export default App;
