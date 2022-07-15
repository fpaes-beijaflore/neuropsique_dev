import Cookies from 'js-cookie';
import { Sign } from '../src/Components';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function Index() {
  const router = useRouter();
  const token = Cookies.get('x_access_token');

  useEffect(() => {
    if (token) {
      router.push('/pacientes');
    }
  }, []);
  return (
    <>
      {!token && <Sign />}
      {token && (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
}

export default Index;
