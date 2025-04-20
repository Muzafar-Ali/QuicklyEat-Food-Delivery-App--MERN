# QuicklyEat - Food Delivery App

---

## Overview

QuicklyEat is a food delivery platform built using the **MERN stack** (MongoDB, Express, React, Node.js) that enables users to search for local restaurants, view detailed restaurant menus, and place orders online. The application is designed with an intuitive user interface to provide a seamless and efficient food ordering experience, making it easy for users to find their favorite restaurants and quickly place orders for delivery.

The app is deployed with:
- **Frontend**: [QuicklyEat Frontend](https://quickly-eat-frontend-deploy.vercel.app/) (Vercel)
- **Backend**: Hosted on [Render](https://render.com/)

## 🛠️ Tech Stack
* React.js
* Vite
* TypeScript
* Tailwind CSS
* ShadCN UI
* Axios
* React Router DOM
* Zustand
  
* Backend (QuicklyEat Backend)
* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Tokens)
* Cloudinary
* Stripe
* Nodemon
* Bcrypt.js & Bcrypt
* Mailtrap
* Multer 
* Rate Limiting (express-rate-limit)
* Zod
---
## ⭐ Features

✅ Authenticated User Routes:
Certain routes are accessible only for authenticated users:
/login: User login functionality.
/signup: User signup functionality.
/forgot-password: User password reset functionality.

✅ Restaurant Search : Find your favorite restaurants by name, cuisine, or location.
✅ Restaurant Profiles : Browse detailed menus, hours, and delivery options.
✅ Restaurant Details: View restaurant profiles with detailed information, including menus, hours, and delivery options.
✅ Order Management : Add, edit, and remove items in your cart before checkout.
✅ Secure Payments : Integrated with Stripe for fast and secure payment processing.
✅ Notifications : Stay updated with real-time order status notifications.
✅ Rate Limiting : Utilized express-rate-limit to prevent brute-force attacks and excessive requests, user login and signup.
✅ User Profile : Manage your personal profile with secure authentication routes.
✅ Access & Refresh Tokens : Easy and secure logins with access and refresh tokens for lasting sessions.
✅ Wishlist / Favorites : Save your go-to restaurants for quicker access next time.
✅ Consumer Reviews : Read and write reviews to help others find the best spots.
✅ Data vakidation & sanitization using zod : ensuring that all incoming request body data is properly validated for type safety and integrity.
✅ Protected Routes : Ensures only authenticated & verified users access app features, redirecting others to login/verification. 
✅ Admin routes : add stricter checks, allowing only users with admin rights to access restricted sections.
✅ Responsive Design : Full mobile and desktop support for on-the-go convenience.
---
