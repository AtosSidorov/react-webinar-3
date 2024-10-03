import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../page-layout';
import Head from '../head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import useTranslate from '../../hooks/use-translate'; 
import Spinner from '../spinner';
import UserMenu from '../user-menu'; 
import './style.css';

function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const token = data.result.token;
        const username = data.result.user.username; 
  
        localStorage.setItem('token', token); 
        localStorage.setItem('username', username); 
        navigate('/profile');
      } else {
        setError(data.message || 'Ошибка авторизации');
      }
    } catch (err) {
      setError('Ошибка соединения с сервером');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <UserMenu />  
      <Head title={t('title')}> 
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={loading}>
        <div className="login-form">
          <h1>{t('login.title')}</h1>  
          <form onSubmit={handleLogin}>
            <label htmlFor="login">{t('login.placeholder.username')}</label>
            <input
              id="login"
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder={t('login.placeholder.username')} 
              required
            />
            <label htmlFor="password">{t('login.placeholder.password')}</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('login.placeholder.password')} 
              required
            />
            <button type="submit">{t('login.button')}</button> 
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </Spinner>
    </PageLayout>
  );
}

export default LoginPage;
