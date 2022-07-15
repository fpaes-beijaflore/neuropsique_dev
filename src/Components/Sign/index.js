import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { Login } from '../';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { useRouter } from 'next/router';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(Cookies.get('username'));
  const [password, setPassword] = useState('');
  const [isRememberChecked, setIsRememberChecked] = useState(Cookies.get('isRememberChecked'));

  const router = useRouter();

  const setAccessCookie = () => {
    Cookies.set('username', username, { expires: 365, sameSite: 'None', secure: true });
    Cookies.set('isRememberChecked', isRememberChecked, {
      expires: 365,
      sameSite: 'None',
      secure: true,
    });
  };

  const deleteAccessCookie = () => {
    Cookies.remove('username');
    Cookies.remove('isRememberChecked');
  };

  useEffect(() => {
    const jwtToken = Cookies.get('x_access_token');
    const auth = Cookies.get('auth');

    if (jwtToken && auth) {
      router.push('/pacientes');
    }
  }, []);

  const inTenHours = new Date(new Date().getTime() + 10 * 60 * 60 * 1000);

  const setToken = (token) => {
    Cookies.set('x_access_token', token, { expires: inTenHours, sameSite: 'None', secure: true });
    Cookies.set('auth', true, { expires: inTenHours, sameSite: 'None', secure: true });
  };

  const authenticate = (token) => {
    setToken(token);
    router.push({ pathname: '/pacientes', param: { logged: true } });
  };

  useEffect(() => {
    isRememberChecked ? setAccessCookie() : deleteAccessCookie();
  }, [username, password, isRememberChecked]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post('/api/authenticate', { username, password })
      .then((res) => {
        res.data.success === false
          ? toastr.error('Erro', res.data.error)
          : authenticate(res.data.token);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Login
        onSubmit={onSubmit}
        loading={loading}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        isRememberChecked={isRememberChecked}
        setIsRememberChecked={setIsRememberChecked}
      />
    </div>
  );
}
