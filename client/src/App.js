import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import { Container } from 'react-bootstrap';
import AdPage from './components/pages/AdPage/AdPage';
import AddAdPage from './components/pages/AddAdPage/AddAdPage';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import { useDispatch } from 'react-redux';
import { API_URL } from './config';
import { useEffect } from 'react';
import { logIn } from './redux/userRedux';
import Logout from './components/pages/Logout/Logout';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const options = {
      method: 'GET',
      credentials: 'include',
    };

    fetch(`${API_URL}/auth/user`, options)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 401) {
          throw new Error('Not authenticated');
        }
      })
      .then((data) => {
        if (data && data.login) {
          dispatch(logIn({ login: data.login }));
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ad/:id' element={<AdPage />} />
        <Route path='/ad/add' element={<AddAdPage />} />
        {/* <Route path='/ad/edit/:id' element={<EditAd />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;
