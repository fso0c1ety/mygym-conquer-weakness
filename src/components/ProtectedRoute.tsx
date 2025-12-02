import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn !== 'true') {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const isLoggedIn = localStorage.getItem('isLoggedIn');
  
  if (isLoggedIn !== 'true') {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
