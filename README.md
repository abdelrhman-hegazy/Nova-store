# 🛒 Nova-store - E-commerce Backend

Nova-store is a production-ready Node.js (TypeScript) e-commerce backend built with Express + MongoDB (Mongoose). It features email OTP authentication, role-based authorization, product/category management with Cloudinary uploads, shopping cart, orders, and multi-provider payments supporting Stripe Checkout & Paymob iframe with webhook-driven order finalization.


## 📚 Table of Contents

- [📮 Postman Collection](#-postman-collection)
- [✨ Key Features](#-key-features)
  - [🔐 Secure Authentication](#-secure-authentication)
  - [📦 Product & Category Management](#-product--category-management)
  - [🛒 Cart & Orders](#-cart--orders)
  - [💳 Multi-Provider Payments](#-multi-provider-payments)
  - [👤 Profile & Interaction](#-profile--interaction)
- [🛠 Technology Stack](#-technology-stack)
  - [Backend](#backend)
  - [Frontend / Mobile](#frontend--mobile)
- [🚀 Quick Start](#-quick-start)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#dotenv)


## 📮 Postman Collection

You can test all API endpoints directly using Postman.

### 🔽 Download
[Nova-store Postman Collection](./postman/Nova-store-Production.postman-collection.json)

### 🚀 How to use
1. Open Postman
2. Click **Import**
3. Select the downloaded JSON file
4. Set environment variables:
   ```bash
   URL: nova-store-chi.vercel.app/api/v1
   Postman scripts (verify & refresh-token requests):
          pm.environment.set("access_token", pm.response.json().tokens.accessToken); 
   ```
You're ready to test all endpoints.


## ✨ Key Features

### 🔐 Secure Authentication
- **User Registration & Login** with email OTP verification
- **JWT Token System** with access + refresh tokens
- Mobile vs Browser token delivery:
  - Mobile: JSON access + refresh tokens
  - Browser: refresh token in httpOnly cookie
- **Role-based Authorization**: customer vs vendor separation

### 📦 Product & Category Management
- **CRUD Products** with multiple image uploads using Cloudinary
- Pricing & discount logic with finalPrice calculation
- **Embedded Comments & Favourites** within products
- **CRUD Categories** with Cloudinary image upload

### 🛒 Cart & Orders
- Add/remove products to cart with stock validation
- Auto-create cart if not found
- Orders persist with provider (Stripe / Paymob) and status (pending/paid/failed)
- List orders with optional filtering

### 💳 Multi-Provider Payments
- Stripe Checkout Session integration
- Paymob iframe payments
- Webhook-driven order finalization
- Payment abstraction layer via `PaymentGateway` interface and provider factory

### 👤 Profile & Interaction
- Update & read profile
- Toggle favorites
- Add/list/delete comments

## 🛠 Technology Stack

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB + Mongoose** for database
- **JWT Authentication** with secure token rotation
- **Cloudinary** for image/media management
- **Stripe & Paymob** for payments
- **Nodemailer** for OTP email verification
- **Firebase Admin SDK** for push notifications
- **Joi** for input validation
- **Docker + Nginx** ready for production

### Frontend / Mobile
- Compatible with **React** web apps & **Flutter** mobile apps
- API-first design for seamless integration

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB (Atlas or local)
- Stripe & Paymob account for payments

### Installation
```bash
git clone https://github.com/abdelrhman-hegazy/Nova-store.git
cd Nova-store
npm install
npm run dev
```
### dotenv
```bash
NODE_ENV=
PORT=
MONGO_URI=
MONGO_USERNAME=
MONGO_PASSWORD=

EMAIL_PASSWORD=
EMAIL_USER=

HASHING_SECRET=
ACCESS_TOKEN_SECRET_CUSTOM=
REFRESH_TOKEN_SECRET_CUSTOM=
ACCESS_TOKEN_SECRET_VENDOR=
REFRESH_TOKEN_SECRET_VENDOR=

CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=

PAYMOP_API_KEY=
PAYMOP_INTEGRATION_ID=
PAYMOP_API_URL=
PAYMOB_IFRAME_ID=
PAYMOB_HMAC_SECRET=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

```

