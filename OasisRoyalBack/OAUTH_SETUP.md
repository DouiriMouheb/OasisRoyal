# OAuth Implementation Guide - Oasis Royal

## 🔐 Social Authentication (Google & Facebook)

This guide explains how to set up and use OAuth authentication with Google and Facebook.

---

## 📋 Table of Contents
1. [How It Works](#how-it-works)
2. [Setup Instructions](#setup-instructions)
3. [Frontend Implementation](#frontend-implementation)
4. [API Endpoints](#api-endpoints)
5. [Testing](#testing)

---

## 🔄 How It Works

### Flow Diagram
```
1. User clicks "Login with Google/Facebook" on frontend
   ↓
2. Frontend redirects to: GET /api/auth/google or /api/auth/facebook
   ↓
3. Backend redirects to Google/Facebook login page
   ↓
4. User authenticates with Google/Facebook
   ↓
5. Google/Facebook redirects back to: /api/auth/google/callback or /api/auth/facebook/callback
   ↓
6. Backend receives user profile from Google/Facebook
   ↓
7. Backend checks if user exists (by email)
   - If exists: Link OAuth ID and log in
   - If new: Create new user account
   ↓
8. Backend generates JWT token
   ↓
9. Backend redirects to frontend: /auth/callback?token=xxx&provider=google
   ↓
10. Frontend stores token and redirects to dashboard
```

---

## 🛠 Setup Instructions

### Step 1: Get Google OAuth Credentials

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create a New Project**
   - Click "Select a project" → "New Project"
   - Name: "Oasis Royal"

3. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it

4. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Name: "Oasis Royal Web Client"
   
5. **Configure Authorized Redirect URIs**
   - Add these URLs:
     ```
     http://localhost:3000/api/auth/google/callback
     https://yourdomain.com/api/auth/google/callback (for production)
     ```

6. **Copy Credentials**
   - Copy `Client ID` and `Client Secret`
   - Add to `.env`:
     ```
     GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
     GOOGLE_CLIENT_SECRET=your_client_secret_here
     ```

---

### Step 2: Get Facebook OAuth Credentials

1. **Go to Facebook Developers**
   - Visit: https://developers.facebook.com/

2. **Create a New App**
   - Click "Create App"
   - Select "Consumer" → Continue
   - Display Name: "Oasis Royal"
   - Contact Email: your@email.com

3. **Add Facebook Login Product**
   - In your app dashboard, click "Add Product"
   - Find "Facebook Login" and click "Set Up"

4. **Configure OAuth Settings**
   - Go to "Facebook Login" → "Settings"
   - Add Valid OAuth Redirect URIs:
     ```
     http://localhost:3000/api/auth/facebook/callback
     https://yourdomain.com/api/auth/facebook/callback (for production)
     ```

5. **Copy Credentials**
   - Go to "Settings" → "Basic"
   - Copy `App ID` and `App Secret`
   - Add to `.env`:
     ```
     FACEBOOK_APP_ID=your_app_id_here
     FACEBOOK_APP_SECRET=your_app_secret_here
     ```

6. **Make App Live**
   - Toggle "In Development" to "Live" in the top bar
   - Add Privacy Policy URL (required for production)

---

## 💻 Frontend Implementation

### React Example - Login Page

```jsx
// src/pages/Login.jsx
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    // Handle OAuth callback
    const token = searchParams.get('token')
    const provider = searchParams.get('provider')
    
    if (token) {
      // Store token
      localStorage.setItem('token', token)
      
      // Redirect to dashboard
      navigate('/dashboard')
      
      // Optional: Show success message
      console.log(`Logged in successfully with ${provider}`)
    }
  }, [searchParams, navigate])

  const handleGoogleLogin = () => {
    // Redirect to backend OAuth endpoint
    window.location.href = 'http://localhost:3000/api/auth/google'
  }

  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/facebook'
  }

  return (
    <div className="login-page">
      <h1>Login to Oasis Royal</h1>
      
      {/* Traditional Login Form */}
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>

      {/* Divider */}
      <div className="divider">OR</div>

      {/* OAuth Buttons */}
      <button onClick={handleGoogleLogin} className="btn-google">
        <img src="/google-icon.svg" alt="Google" />
        Continue with Google
      </button>

      <button onClick={handleFacebookLogin} className="btn-facebook">
        <img src="/facebook-icon.svg" alt="Facebook" />
        Continue with Facebook
      </button>
    </div>
  )
}

export default Login
```

### OAuth Callback Handler

```jsx
// src/pages/AuthCallback.jsx
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

function AuthCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    const provider = searchParams.get('provider')
    const error = searchParams.get('error')

    if (error) {
      // Handle error
      navigate('/login?error=' + error)
      return
    }

    if (token) {
      // Store token
      localStorage.setItem('token', token)
      
      // Fetch user profile
      fetch('http://localhost:3000/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        // Store user data
        localStorage.setItem('user', JSON.stringify(data.data))
        
        // Redirect to dashboard
        navigate('/dashboard')
      })
      .catch(err => {
        console.error('Failed to fetch user:', err)
        navigate('/login?error=auth_failed')
      })
    }
  }, [searchParams, navigate])

  return (
    <div className="auth-callback">
      <p>Completing authentication...</p>
    </div>
  )
}

export default AuthCallback
```

### Update Routes

```jsx
// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import AuthCallback from './pages/AuthCallback'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
```

---

## 🔌 API Endpoints

### OAuth Login URLs

| Provider | Endpoint | Description |
|----------|----------|-------------|
| Google | `GET /api/auth/google` | Initiate Google OAuth |
| Facebook | `GET /api/auth/facebook` | Initiate Facebook OAuth |

### OAuth Callbacks (Automatic)

| Provider | Endpoint | Description |
|----------|----------|-------------|
| Google | `GET /api/auth/google/callback` | Google OAuth callback |
| Facebook | `GET /api/auth/facebook/callback` | Facebook OAuth callback |

### Error Handling

- `GET /api/auth/failure` - OAuth failure redirect

---

## 🧪 Testing

### Test OAuth Locally

1. **Start the backend**
   ```bash
   npm run dev
   ```

2. **Open browser and navigate to**
   ```
   http://localhost:3000/api/auth/google
   ```
   or
   ```
   http://localhost:3000/api/auth/facebook
   ```

3. **You should be redirected to Google/Facebook login**

4. **After login, you'll be redirected to**
   ```
   http://localhost:5173/auth/callback?token=xxx&provider=google
   ```

5. **Token will be in the URL**

---

## 🔒 Security Notes

### 1. **HTTPS Required in Production**
- OAuth providers require HTTPS for production
- Use Let's Encrypt for free SSL certificates

### 2. **Secure Token Storage**
- Use `httpOnly` cookies instead of localStorage for better security
- Or use secure session storage

### 3. **CORS Configuration**
- Ensure `FRONTEND_URL` is correctly set in `.env`
- Update CORS settings in `server.js`

### 4. **Environment Variables**
- Never commit `.env` file to Git
- Keep OAuth credentials secret
- Use different credentials for development and production

---

## 📱 Mobile App Integration

For React Native or mobile apps:

1. **Use Deep Links**
   ```javascript
   // Instead of redirecting to URL
   res.redirect(`myapp://auth/callback?token=${token}`)
   ```

2. **Or Return JSON**
   ```javascript
   // In authController.js
   res.json({
     success: true,
     data: { token, user: req.user }
   })
   ```

---

## 🐛 Common Issues

### Issue 1: Redirect URI Mismatch
**Error**: "redirect_uri_mismatch"
**Solution**: Ensure the callback URL in Google/Facebook console exactly matches your backend URL

### Issue 2: Invalid Client
**Error**: "invalid_client"
**Solution**: Double-check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`

### Issue 3: Email Not Provided
**Error**: Cannot read property 'value' of undefined
**Solution**: Request email scope explicitly and ensure user grants email permission

### Issue 4: User Already Exists
**Behavior**: Existing users can still login with OAuth
**How it works**: We check by email - if email exists, we link the OAuth ID

---

## 🎨 UI Components

### Google Button Styling
```css
.btn-google {
  background: white;
  border: 1px solid #dadce0;
  color: #3c4043;
  font-family: 'Google Sans', Arial, sans-serif;
}

.btn-google:hover {
  background: #f8f9fa;
}
```

### Facebook Button Styling
```css
.btn-facebook {
  background: #1877f2;
  color: white;
  border: none;
}

.btn-facebook:hover {
  background: #166fe5;
}
```

---

## 📚 Additional Resources

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)
- [Passport.js Documentation](http://www.passportjs.org/)

---

## ✅ Checklist

Before going to production:

- [ ] Set up Google OAuth credentials
- [ ] Set up Facebook OAuth credentials
- [ ] Update `.env` with real credentials
- [ ] Configure authorized redirect URIs for production domain
- [ ] Enable HTTPS on production server
- [ ] Test OAuth flow on staging environment
- [ ] Add privacy policy page (required by Facebook)
- [ ] Add terms of service page
- [ ] Configure proper CORS settings
- [ ] Set up error monitoring for OAuth failures
