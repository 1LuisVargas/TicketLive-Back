# 🎟️ TicketLive — Backend

> A REST API built with **NestJS** and **TypeScript** that powers the **TicketLive** event ticketing platform. Handles authentication, event management, payments, orders, coupons, and more — with a modular architecture and PostgreSQL as the database.

---

## ✨ Features

- **Authentication** — JWT-based auth with Google OAuth support, role-based access control, and password reset via email
- **Event Management** — Create, update, and manage events and categories
- **Shopping Cart** — Server-side cart handling per user
- **Orders** — Order creation, editing, and auto-return logic
- **Payments** — Payment processing via **MercadoPago** with success, failure, and pending redirects
- **Coupons & Discounts** — Coupon creation, claiming, and validation
- **File Uploads** — Profile and event image uploads via **Cloudinary**
- **Email Notifications** — Transactional email via Gmail (Nodemailer)
- **Subscribers** — Newsletter / subscription management
- **Comments** — User comments on events
- **Database Seeding** — Seed scripts for initial data population
- **Modular Architecture** — Each domain is a self-contained NestJS module

---

## 🛠️ Tech Stack

| Layer | Technology |
|--------------|------------------------------------------------------|
| **Framework** | NestJS, TypeScript |
| **Auth** | Passport.js, JWT |
| **ORM** | TypeORM |
| **Database** | Supabase (PostgreSQL) |
| **Email** | Nodemailer (Gmail SMTP) |
| **Media** | Cloudinary |
| **Payments** | MercadoPago |
| **Secrets** | Infisical (Production) |
| **API Docs** | Swagger |
| **Deployment** | Render |
| **Monitoring** | UptimeRobot |

---

## 📁 Project Structure

```
TicketLive-Back/
├── src/
│   ├── @types/                  # Custom TypeScript type declarations
│   ├── DataSource/              # TypeORM DataSource configuration
│   ├── config/                  # App configuration (env, settings)
│   ├── database/                # Database setup & seeding
│   │   ├── seeds/               # Seed data files
│   │   ├── seed.module.ts
│   │   └── seed.ts
│   ├── decorators/              # Custom NestJS decorators
│   ├── entities/                # TypeORM entity definitions
│   ├── middlewares/             # HTTP middlewares
│   ├── migrations/              # Database migration files
│   ├── modules/                 # Feature modules
│   │   ├── auth/                # Auth (JWT, Google OAuth, guards, strategies)
│   │   ├── cart/                # Shopping cart
│   │   ├── categories/          # Event categories
│   │   ├── comments/            # Event comments
│   │   ├── coupons/             # Coupon & discount logic
│   │   ├── email/               # Email notifications
│   │   ├── event/               # Event management
│   │   ├── file-upload/         # File & image uploads
│   │   ├── orders/              # Order management
│   │   ├── payment/             # Payment processing
│   │   ├── subscribers/         # Newsletter subscribers
│   │   └── users/               # User management
│   ├── roles/                   # Role definitions & guards
│   ├── utils/                   # Utility functions
│   ├── app.module.ts            # Root application module
│   └── main.ts                  # Application entry point
│
└── test/                        # End-to-end test suite
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/1LuisVargas/TicketLive-Back.git
cd TicketLive-Back
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

This project uses [Infisical](https://infisical.com) for secrets management in production. For local development, create a `.env` file based on the provided template, and then fill in your own values:

```env
# Cloudinary
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=

# Frontend
FRONTEND_URL=
FRONT_CALLBACK=/

# Database
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
DATABASE_URL=
PORT=

# JWT
JWT_EXPIRES_IN=
JWT_SECRET=

# Google Auth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=

# MercadoPago
MP_ACCESS_TOKEN=
MP_SUCCESS_URL=FRONTEND_URL/payment-success
MP_FAILURE_URL=FRONTEND_URL/payment-failure
MP_PENDING_URL=FRONTEND_URL/payment-pending

# Gmail — Sending Email
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_gmail_address
MAIL_PASS=your_gmail_app_password  # 16-char app password — NOT your Gmail password
                                    # Generate one at: myaccount.google.com/apppasswords

# MapTiler
MAPTILER_API_KEY=

# TypeORM
TYPEORM_SYNC=true
```

---

### 4. Run Database Migrations

```bash
npm run migration:run
```

---

### 5. (Optional) Seed the Database

```bash
npm run seed
```

---

### 6. Start the Server

```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

The API will be available at `http://localhost:3000`.

> **Tip:** Make sure your PostgreSQL instance is running and the credentials in `.env` are correct before starting the server.

---

## 📖 API Documentation

Interactive API documentation is available via Swagger UI:

- **Production:** [https://ticketlive-back.onrender.com/api](https://ticketlive-back.onrender.com/api)
- **Local:** `http://localhost:3000/api`

---

## 🔌 API Endpoints

> Base URL: `http://localhost:3000`

### 🔐 Auth
| Method | Endpoint | Description |
|--------|-------------------------------|-------------------------------------|
| POST | `/auth/signup` | Register a new user |
| POST | `/auth/signin` | Log in and receive a JWT token |
| GET | `/auth/google` | Initiate Google OAuth login |
| GET | `/auth/google/callback` | Google OAuth callback |
| POST | `/auth/signout` | Log out and clear cookies |
| POST | `/auth/forgot-password` | Send a password reset email |
| POST | `/auth/reset-password` | Reset password using email token |
| POST | `/auth/change-password` | Change password from inside the app |

### 🎫 Events
| Method | Endpoint | Description |
|--------|-------------------------------|-------------------------------------|
| GET | `/events` | Get all events |
| GET | `/events/:id` | Get a single event by ID |
| POST | `/events` | Create a new event (admin) |
| PATCH | `/events/:id` | Update an event (admin) |
| DELETE | `/events/:id` | Delete an event (admin) |

### 🛒 Cart
| Method | Endpoint | Description |
|--------|-------------------------------|-------------------------------------|
| GET | `/cart` | Get the current user's cart |
| POST | `/cart/items` | Add an item to the cart |
| DELETE | `/cart/items/:cartItemId` | Remove an item from the cart |

### 📁 Categories
| Method | Endpoint | Description |
|--------|-------------------------------|-------------------------------------|
| GET | `/categories` | Get all categories |
| GET | `/categories/:id` | Get a single category by ID |
| POST | `/categories` | Create a new category |
| PATCH | `/categories/:id` | Update a category by ID |
| DELETE | `/categories/:id` | Delete a category by ID |

### 📦 Orders
| Method | Endpoint | Description |
|--------|-------------------------------|-------------------------------------|
| GET | `/orders` | Get orders for the current user |
| GET | `/orders/:id` | Get a single order by ID |
| POST | `/orders` | Place a new order |
| PATCH | `/orders/:id` | Update an order by ID |
| DELETE | `/orders/:id` | Delete an order by ID |

### 💳 Payments
| Method | Endpoint | Description |
|--------|-------------------------------|-------------------------------------|
| POST | `/checkout` | Process a payment |

### 🏷️ Coupons
| Method | Endpoint | Description |
|--------|-------------------------------|-------------------------------------|
| GET | `/coupons` | Get all coupons (admin) |
| POST | `/coupons` | Create a new coupon (admin) |
| PATCH | `/coupons/:id` | Update a coupon (admin) |
| DELETE | `/coupons/:id` | Delete a coupon (admin) |
| POST | `/coupons/claim` | Claim a coupon |
| POST | `/coupons/confirm` | Confirm a coupon has been used |

### 👤 Users
| Method | Endpoint | Description |
|--------|-------------------------------|-------------------------------------|
| GET | `/users` | Get all users (admin) |
| GET | `/users/:id` | Get a user by ID |
| PATCH | `/users/:id` | Update a user by ID |
| DELETE | `/users/:id` | Delete a user by ID (admin) |
| PATCH | `/users/:id/ban` | Ban a user (admin) |
| PATCH | `/users/:id/unban` | Unban a user (admin) |

### 📬 Subscribers
| Method | Endpoint | Description |
|--------|-------------------------------|-------------------------------------|
| POST | `/subscribers` | Subscribe to the newsletter |

### 💬 Comments
| Method | Endpoint | Description |
|--------|-------------------------------|-------------------------------------|
| GET | `/comments` | Get all comments |
| POST | `/comments` | Post a comment |

### 📧 Email
| Method | Endpoint | Description |
|--------|-------------------------------|-------------------------------------|
| GET | `/email/test` | Testing route |
| POST | `/email/successPurchase` | Send a purchase confirmation |

### 🗃️ File Upload
| Method | Endpoint | Description |
|--------|-------------------------------|-------------------------------------|
| POST | `/file-upload/profileImage/:id` | Upload a profile image |
| POST | `/file-upload/upload` | Upload an event image |

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov
```

---

## 👤 Authors

**Luis Vargas**
- GitHub: [@1LuisVargas](https://github.com/1LuisVargas)
- LinkedIn: [@1LuisVargas](https://www.linkedin.com/in/1luisvargas/)

**Laura Rojas**
- GitHub: [@LrojasOsorio](https://github.com/LrojasOsorio)

**Felipe Rosero**
- GitHub: [@FMRoseroPlua](https://github.com/FMRoseroPlua)
