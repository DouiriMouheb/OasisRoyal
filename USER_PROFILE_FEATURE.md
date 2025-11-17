# User Profile Feature Documentation

## Overview
The user profile feature allows authenticated users to view and update their personal information, including profile picture, contact details, and address information.

## Features Implemented

### 1. Profile Page (`/profile`)
- **Location**: `src/pages/UserProfile.jsx`
- **Access**: Protected route (requires authentication)
- **Features**:
  - Tabbed interface with "Profile Information" and "Settings" tabs
  - Profile picture upload and management
  - Personal information form
  - Email preferences settings (UI ready)
  - Account deletion option (UI ready, disabled)

### 2. Profile Components

#### ProfileForm Component
- **Location**: `src/components/profile/ProfileForm.jsx`
- **Features**:
  - Update name, email, phone
  - Update address (street, city, postal code, country)
  - Real-time validation
  - Success/error message display
  - Auto-populated with current user data

#### ProfileImageUpload Component
- **Location**: `src/components/profile/ProfileImageUpload.jsx`
- **Features**:
  - Image preview with initials fallback
  - File validation (type and size - max 5MB)
  - Upload to Cloudinary via `/api/upload` endpoint
  - Remove profile picture option
  - Loading states during upload
  - Success/error message display

### 3. Backend Updates

#### User Controller
- **File**: `OasisRoyalBack/controllers/userController.js`
- **Changes**:
  - `updateProfile()`: Added support for `avatar` field
  - `updateUser()`: Added support for `avatar` field (admin route)

#### User Model
- **File**: `OasisRoyalBack/models/User.js`
- **Existing Fields Used**:
  - `avatar`: String field for profile picture URL

#### API Routes
- **File**: `OasisRoyalBack/routes/userRoutes.js`
- **Updated Swagger Documentation**:
  - Added `avatar` field to PUT `/api/users/profile` endpoint
  - Added `avatar` field to PUT `/api/users/:id` endpoint (admin)

### 4. Navigation
- Profile link added to Header dropdown menu
- Available for both regular users and admins
- Mobile-responsive navigation included

## API Endpoints

### User Profile Update
```http
PUT /api/users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "phone": "string",
  "avatar": "string (URL)",
  "address": {
    "street": "string",
    "city": "string",
    "postalCode": "string",
    "country": "string"
  }
}
```

### Admin User Update
```http
PUT /api/users/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "phone": "string",
  "role": "user|admin",
  "isActive": boolean,
  "avatar": "string (URL)",
  "address": {
    "street": "string",
    "city": "string",
    "postalCode": "string",
    "country": "string"
  }
}
```

### Image Upload
```http
POST /api/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
  image: File
```

## State Management

### Redux Slice
- **File**: `src/store/slices/authSlice.js`
- **Actions**:
  - `getUserProfile`: Fetch current user profile
  - `updateUserProfile`: Update user profile data
- **State**:
  - User data automatically synced with localStorage
  - Loading states for async operations
  - Error handling

## Usage Flow

### For Regular Users:
1. Click on user icon in header
2. Select "My Profile" from dropdown
3. Upload/update profile picture
4. Update personal information
5. Save changes

### For Admins:
1. Click on shield icon in header
2. Select "My Profile" from admin dropdown
3. Same profile update capabilities as regular users
4. Can also manage other users via Admin panel

## Components Structure
```
pages/
  └── UserProfile.jsx (Main page with tabs)

components/
  └── profile/
      ├── ProfileForm.jsx (Personal info form)
      └── ProfileImageUpload.jsx (Avatar upload)
```

## Security
- Profile route protected with `AuthGuard` component
- Authentication required to access `/profile` page
- Backend API endpoints protected with JWT authentication
- File upload validation (type and size)

## Styling
- Tailwind CSS for responsive design
- Consistent with existing design system
- Mobile-first approach
- Gradient avatar fallback with user initials

## Future Enhancements (Not Implemented)
- Email preferences functionality
- Account deletion functionality
- Password change feature
- Two-factor authentication
- Profile completion progress indicator
- Activity log/history

## Testing Recommendations
1. Test profile picture upload with various file types
2. Test file size validation (>5MB)
3. Test form validation for required fields
4. Test address update with partial data
5. Test unauthorized access to `/profile` route
6. Test admin updating other users' profiles
7. Test responsive design on mobile devices
8. Test error handling for failed API calls

## Dependencies
- Redux Toolkit for state management
- React Router for navigation
- Cloudinary for image storage (via existing upload endpoint)
- Lucide React for icons
- Tailwind CSS for styling
