// hoc/withAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

const withAuth = (Component) => {
  return (props) => {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/');
      }
    }, [user, loading]);

    if (loading || error || !user) return null;

    return <Component {...props} />;
  }
}

export default withAuth;
