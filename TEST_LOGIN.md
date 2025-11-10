# Login Testing Guide

## ✅ FIXED: Input Component Issue

**Problem:** Login form wasn't sending credentials because the Input component didn't forward refs from react-hook-form.

**Solution:** Updated `Input.jsx` to use `forwardRef` so it properly works with react-hook-form's `register()` function.

## Test Credentials

### Admin Account
- **Email:** `admin@oasisroyal.com`
- **Password:** `admin123`

### Customer Account
- **Email:** `customer@example.com`
- **Password:** `customer123`

## How to Test

1. **Start Backend Server** (Port 3000)
   ```bash
   cd OasisRoyalBack
   npm run dev
   ```

2. **Start Frontend Server** (Port 5174)
   ```bash
   cd OasisRoyalFront
   npm run dev
   ```

3. **Open Browser**
   - Go to: `http://localhost:5174/login`

4. **Test Login Flow**
   - Enter test credentials
   - Click "Sign In"
   - Check browser console for detailed logs:
     - 🔐 LOGIN: Sending credentials
     - 🔐 LOGIN: Raw API response
     - 🔐 LOGIN: Extracted user data
     - 🔐 LOGIN: Stored in localStorage

5. **Test Register Flow**
   - Click "Sign up" to switch to registration
   - Fill in the form with new user details
   - Check browser console for logs:
     - 📝 REGISTER: Sending user data
     - 📝 REGISTER: Raw API response
     - 📝 REGISTER: Extracted user data
     - 📝 REGISTER: Stored in localStorage

## Expected API Calls

### Login Request
```
POST http://localhost:3000/api/users/login
Body: {
  "email": "customer@example.com",
  "password": "customer123"
}
```

### Login Response
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Test Customer",
    "email": "customer@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

### Register Request
```
POST http://localhost:3000/api/users/register
Body: {
  "name": "New User",
  "email": "newuser@example.com",
  "password": "password123",
  "phone": "+216XXXXXXXX"
}
```

### Register Response
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "New User",
    "email": "newuser@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User registered successfully"
}
```

## Verification Checklist

- [ ] Backend server running on port 3000
- [ ] Frontend server running on port 5174
- [ ] Database seeded with test users
- [ ] Login page loads at /login
- [ ] Can switch between Login/Register forms
- [ ] Form validation works (try invalid email)
- [ ] Login with test credentials succeeds
- [ ] Toast notification shows "Welcome back"
- [ ] Token stored in localStorage
- [ ] User data stored in localStorage
- [ ] Redirects to home page after login
- [ ] Header shows user name after login
- [ ] Can logout from header menu
- [ ] Register new user works
- [ ] OAuth buttons display (Google/Facebook)

## Common Issues

1. **Port already in use**: Frontend will try 5174 if 5173 is busy
2. **CORS errors**: Backend should have CORS enabled for localhost:5174
3. **Token not stored**: Check browser console for errors
4. **401 Unauthorized**: Check if credentials are correct
5. **Database not seeded**: Run `npm run seed` in backend folder
