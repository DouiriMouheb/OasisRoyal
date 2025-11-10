# 🏗️ Oasis Royal E-Commerce Project – AI Reference

**Version:** 1.0  
**Created by:** Douiri Labs  
**Goal:** Modern, multilingual e-commerce platform for selling premium date products.

---

## 🚀 Project Overview

Oasis Royal is an online platform for selling date-based products (dates, gift boxes, derivatives).  
It includes:
- Customer-facing store (React)
- Admin dashboard (React)
- Secure backend API (Node.js / Express)
- MongoDB Atlas database
- Cloudinary image storage
- Stripe / PayPal payment integration

---

## 🧩 Tech Stack

### **Frontend**
- **Framework:** React + Vite  
- **Language:** JavaScript (ES2020+)  
- **UI:** Tailwind CSS + Shadcn/UI  
- **Routing:** React Router DOM  
- **State Management:** Redux Toolkit  
- **i18n:** react-i18next (French, Arabic, English)  
- **API Requests:** Axios  
- **Charts:** Recharts (for admin stats)  

### **Backend**
- **Runtime:** Node.js (v20+)  
- **Framework:** Express.js  
- **Auth:** JWT (access + refresh tokens)  
- **Database:** MongoDB Atlas via Mongoose  
- **Payments:** Stripe + PayPal SDK  
- **File Uploads:** Multer + Cloudinary  
- **Email Service:** Nodemailer  
- **Security:** Helmet, express-validator, bcrypt, cors  
- **Logging:** Winston  

### **DevOps / Deployment**
- **Server:** DigitalOcean Droplet (Ubuntu 24.04, 2GB RAM)  
- **Reverse Proxy:** NGINX  
- **Process Manager:** PM2  
- **SSL:** Let’s Encrypt  
- **Database:** MongoDB Atlas (cloud)  
- **File Storage:** Cloudinary  

---

## 🧱 Folder Structure (MERN)

```
/OasisRoyal
│
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── hooks/
│   │   ├── i18n/
│   │   └── utils/
│   └── vite.config.js
│
├── server/                  # Express backend
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── server.js
│
├── .env.example
├── docker-compose.yml
├── PROJECT_CONTEXT.md       # ← this file
└── README.md
```

---

## 🔐 Environment Variables (`.env.example`)
```
PORT=5000
MONGODB_URI=
JWT_SECRET=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
STRIPE_SECRET_KEY=
PAYPAL_CLIENT_ID=
EMAIL_USER=
EMAIL_PASS=
```

---

## ⚙️ API Design Guidelines

### **Naming**
- RESTful routes: `/api/products`, `/api/orders`, `/api/users`
- Use plural nouns for resources
- Return JSON responses with:
  ```json
  { "success": true, "data": {}, "message": "" }
  ```

### **Example Routes**
| Feature | Method | Route | Auth |
|----------|---------|-------|------|
| Register | POST | `/api/users/register` | Public |
| Login | POST | `/api/users/login` | Public |
| Product CRUD | GET/POST/PUT/DELETE | `/api/products` | Admin |
| Upload Image | POST | `/api/upload` | Admin |
| Checkout | POST | `/api/orders/checkout` | Auth |
| Order History | GET | `/api/orders/me` | Auth |

---

## 🖼️ Image Handling (Cloudinary)
- Use `multer-storage-cloudinary`
- Store only image URLs in MongoDB
- Folder: `OasisRoyal/products`
- Optimize with parameters: `f_auto,q_auto,w_400`

---

## 💳 Payment Flow
1. User selects products → cart → checkout  
2. API calls Stripe or PayPal for payment intent/session  
3. Upon success, API:
   - Creates order in MongoDB  
   - Generates PDF invoice  
   - Sends email confirmation  

---

## 📊 Admin Dashboard Features
- Product management (CRUD)
- Orders & customers overview
- Sales statistics (Recharts)
- Multilingual support (i18n)

---

## 🧠 Coding Rules for AI Agents (Copilot / Chat)
- Always use **async/await** for async operations  
- Use **try/catch** with meaningful error messages  
- Validate all inputs using **express-validator**  
- Never store passwords in plain text (use bcrypt)  
- Prefer **functional components** with hooks in React  
- Always use **Tailwind classes** for styling  
- Ensure full **i18n** coverage (Arabic, French, English)
- Keep **file names lowercase with hyphens**

---

## 🚢 Deployment Summary
- Frontend build → `/dist` served by NGINX  
- Backend runs under PM2 (port 5000)  
- NGINX proxies:
  - `/api/*` → backend  
  - `/*` → frontend build  
- SSL via Let’s Encrypt

---

## 🧾 Future Extensions
- Coupon / discount system  
- Inventory synchronization  
- Email marketing integration  
- AI-based product recommendation  
- Progressive Web App (PWA) version

---

## 🔨 Scaffold notes (automatically added)

- Date: 2025-11-10
- Initial scaffolding created for the approved stack: Backend = Node.js + Express, Frontend = React + Vite.
- Created folders:
  - `OasisRoyalBack/` — minimal Express server (`index.js`) and `package.json`.
  - `OasisRoyalFront/` — Vite + React starter (`index.html`, `src/`, `package.json`, `vite.config.js`).

How to try the starters (Windows / PowerShell):

```powershell
# Backend
cd c:\WEB\OasisRoyal\OasisRoyalBack
npm install
npm start

# Frontend (in a separate terminal)
cd c:\WEB\OasisRoyal\OasisRoyalFront
npm install
npm run dev
```

The Vite dev server proxies `/api` to `http://localhost:3000` so the frontend can call the backend during development.

