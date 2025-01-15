# QuicklyEat - Food Delivery App

---

## Overview

QuicklyEat is a food delivery platform built using the **MERN stack** (MongoDB, Express, React, Node.js) that enables users to search for local restaurants, view detailed restaurant menus, and place orders online. The application is designed with an intuitive user interface to provide a seamless and efficient food ordering experience, making it easy for users to find their favorite restaurants and quickly place orders for delivery.

Whether you’re a busy professional, a student, or just someone who enjoys the convenience of food delivery, QuicklyEat ensures that the ordering process is fast, easy, and secure.

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

- **Rate Limiting:
Implemented rate limiting during user login and signup to prevent brute-force attacks and ensure stability. This helps protect user accounts and reduce server load during high traffic times.

- **Data Validation with Zod:
Integrated Zod for comprehensive data validation, ensuring that all incoming request body data is properly validated for type safety and integrity.

- **Protected Routes:
Several app routes are protected, ensuring only authorized users can access them. The following routes require authentication:
/profile: View and edit user profile information.
/search/:text: Search for restaurants by name or category.
/restaurant/:id: View restaurant details.
/cart: Manage the user's order cart.

- **Authenticated User Routes:
Certain routes are accessible only for authenticated users:
/login: User login functionality.
/signup: User signup functionality.
/forgot-password: User password reset functionality.


- **Restaurant Search**: Easily search for restaurants by name, cuisine, or location.
- **Restaurant Details**: View restaurant profiles with menus, hours, and delivery options.
- **Order Management**: Add, edit, and remove items from your cart before checkout.
- **Secure Payments**: Fast and secure payment processing.
- **Notifications**: Receive real-time notifications for order updates.
- **Responsive Design**: Works seamlessly on both mobile and desktop devices.

---
