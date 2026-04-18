import { useEffect, useState, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import Toast, { useToast } from '../components/Toast';

export default function CallbackPage() {
  const { user, isAuthenticated, isLoading, error } = useAuth0();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const hasAttempted = useRef(false);
  
  // ✅ Use custom toast hook
  const { toast, showToast } = useToast();

  useEffect(() => {
    const syncUserToBackend = async () => {
      if (isLoading || processing || hasAttempted.current) return;

      if (error) {
        showToast('error', 'Authentication failed. Please try again.');
        setTimeout(() => navigate('/auth', { replace: true }), 2000);
        return;
      }

      if (isAuthenticated && user) {
        hasAttempted.current = true;
        setProcessing(true);

        try {
          const payload = {
            sub: user.sub,
            email: user.email,
            name: user.name || user.nickname || user.email.split('@')[0],
            picture: user.picture || null
          };

          const response = await fetch('http://localhost:5000/api/auth/auth0/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Sync failed');
          }

          if (data.success && data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            showToast('success', 'Login successful!');
            
            setTimeout(() => {
              navigate('/', { replace: true });
              window.location.reload();
            }, 1500);
          }
        } catch (err) {
          showToast('error', err.message || 'Something went wrong');
          setTimeout(() => navigate('/auth', { replace: true }), 2500);
        } finally {
          setProcessing(false);
        }
      }
    };

    syncUserToBackend();
  }, [isAuthenticated, isLoading, error, user, navigate, processing, showToast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* ✅ Use Toast component */}
      <Toast toast={toast} />

      {/* Loading Spinner */}
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg font-medium">
          {error 
            ? 'Authentication failed...' 
            : processing 
            ? 'Saving to database...' 
            : 'Completing authentication...'}
        </p>
        {processing && (
          <p className="text-orange-500 text-sm mt-2 animate-pulse">
            Please wait, syncing with server...
          </p>
        )}
      </div>
    </div>
  );
}
