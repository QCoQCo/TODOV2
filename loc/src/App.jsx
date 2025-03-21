import { Outlet, BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from './pages/main';
import { AuthProvider } from './data';
import { Header, Footer, Gnb } from './components/common';
import { AccountRoutes } from './routes';
import './App.css';

const LayOut = () => {
  return (
    <div id="wrapper">
      <Header />
      <Outlet />
      <Gnb />
    </div>
  )
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LayOut />}>
            <Route index element={<Main />} />
            <Route path='/account/*' element={<AccountRoutes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
};

export default App;
