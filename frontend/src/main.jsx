import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import './index.css'  // ✅ Added CSS import
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>  {/* ✅ Added StrictMode wrapper */}
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin + '/callback'  // ✅ CRITICAL FIX!
      }}
      cacheLocation="localstorage"  // ✅ NEW: Remember user login
      useRefreshTokens={true}       // ✅ NEW: Auto-refresh tokens
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
)
