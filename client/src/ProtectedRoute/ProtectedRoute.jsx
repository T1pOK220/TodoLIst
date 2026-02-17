
import { useAuth } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Завантаження...</div>
      </div>
    );
  }
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
  return children;
};