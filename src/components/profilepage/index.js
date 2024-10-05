import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../page-layout'; 
import Head from '../head'; 
import Navigation from '../../containers/navigation'; 
import BasketTotal from '../basket-total'; 
import UserMenu from '../user-menu'; 
import LocaleSelect from '../../containers/locale-select'; 
import Spinner from '../spinner'; 
import useTranslate from '../../hooks/use-translate'; 
import './style.css';

function ProfilePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetch('/api/v1/users/self?fields=*', {
        headers: {
          'X-Token': token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data.result);
          setLoading(false); 
        })
        .catch((error) => {
          setLoading(false); 
        });
    }
  }, [navigate]);

  if (loading) {
    return <Spinner active={true} />;
  }

  if (!userData || !userData.profile) {
    return <div>{t('profile.loadingError')}</div>;
  }

  return (
    <PageLayout>
      <UserMenu /> 
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <div className="profile-content">
        <h2>{t('profile.title')}</h2>
        <p className="username">
          {t('profile.username')}: <strong>{userData.username}</strong>
        </p>
        <p className="phone">
          {t('profile.phone')}: <strong>{userData.profile.phone}</strong>
        </p>
        <p className="email">
          {t('profile.email')}: <strong>{userData.email}</strong>
        </p>
      </div>
    </PageLayout>
  );
}

export default ProfilePage;
