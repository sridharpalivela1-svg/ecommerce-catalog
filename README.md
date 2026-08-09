# 🛍️ NexusStore — E-Commerce Catalog with Cart & Admin Panel

[![React](https://img.shields.io/badge/Frontend-React_19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS_v4-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![PHP](https://img.shields.io/badge/Backend-PHP_8.x_REST_API-777BB4?style=for-the-badge&logo=php)](https://www.php.net/)
[![MySQL](https://img.shields.io/badge/Database-MySQL_PDO-4479A1?style=for-the-badge&logo=mysql)](https://www.mysql.com/)
[![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

A full-stack, production-ready **E-Commerce Product Catalog with Cart and Admin Panel**. Built using a modern **React + Tailwind CSS** frontend and a modular **PHP / MySQL REST API** backend leveraging PDO prepared statements for enterprise security.

This repository is structured as a **Resume & Portfolio Showcase Project** highlighting full-stack engineering proficiency across component architecture, global state management, RESTful API design, database normalization, and SQL injection prevention.

---

## 🌟 Key Features

### 🛒 Storefront & Customer Experience
- **Dynamic Catalog View**: Responsive grid view with quick-view modal detail previews.
- **Search & Multi-Facet Filters**: Instant keyword search across product titles & descriptions, category selection, price range filter slider, and sorting (Price, Ratings, Newest).
- **Slide-out Cart Drawer**: Item quantity modifiers (+ / -), promo code validation system (`RESUME10` for 10% off), subtotal calculation, tax, shipping, and grand total breakdown.
- **Express Checkout Simulation**: Interactive multi-step checkout with address validation, simulated order placement, stock decrementing, and receipt confirmation.

### 🛡️ Admin Management Panel (Full CRUD)
- **Executive Metrics Dashboard**: Real-time stats showing Total Products, Low Stock Alerts, Total Orders, and Total Sales Revenue.
- **Product Inventory Management**: Searchable tabular data view with stock indicator badges.
- **Create / Edit / Delete Actions**: Add new product records or edit price/stock levels with instantaneous modal forms.

### ⚡ Technical Architecture & Dual-Mode API
- **PHP 8.x PDO REST API**: Object-Oriented PHP backend utilizing PDO prepared statements for protection against SQL injection attacks.
- **Hybrid Storage Layer (`src/services/api.js`)**:
  - **Offline / Local Demo Mode**: Uses persistent browser `localStorage` out-of-the-box so you can run `npm run dev` immediately without needing a database server running.
  - **Live PHP/MySQL Mode**: Toggle `VITE_USE_REAL_BACKEND=true` to seamlessly connect to Apache/XAMPP or standalone PHP API servers.

---

## 🏗️ Project Directory Structure

```
ecommerce-catalog/
├── backend/                        # PHP / MySQL Backend API
│   ├── config/
│   │   ├── db.php                  # Secure PDO Database Connection class
│   │   └── headers.php             # REST API CORS & JSON response headers
│   ├── database/
│   │   ├── schema.sql              # Database schema (products, categories, orders, order_items)
│   │   └── seed.sql                # Initial realistic sample dataset
│   └── api/
│       ├── products/
│       │   ├── read.php            # GET /api/products/read.php (Filter, Search, Sort)
│       │   ├── read_single.php     # GET /api/products/read_single.php?id=X
│       │   ├── create.php          # POST /api/products/create.php (Admin Add)
│       │   ├── update.php          # PUT /api/products/update.php (Admin Edit)
│       │   └── delete.php          # DELETE /api/products/delete.php (Admin Delete)
│       ├── categories/
│       │   └── read.php            # GET /api/categories/read.php
│       ├── orders/
│       │   └── create.php          # POST /api/orders/create.php (Checkout Transaction)
│       └── stats/
│           └── dashboard.php       # GET /api/stats/dashboard.php (Admin metrics)
│
├── src/                            # React 19 Frontend Codebase
│   ├── components/
│   │   ├── admin/                  # Admin Dashboard, ProductTable, ProductFormModal
│   │   ├── cart/                   # CartDrawer, CheckoutModal
│   │   ├── catalog/                # ProductGrid, ProductCard, ProductModal, FilterSidebar
│   │   └── layout/                 # Navbar, Footer, Toast Notification System
│   ├── context/
│   │   ├── CartContext.jsx         # Global cart state & calculations
│   │   └── ProductContext.jsx      # Product state & CRUD handlers
│   ├── services/
│   │   ├── api.js                  # Hybrid API client abstraction
│   │   └── mockData.js             # Initial dataset for standalone execution
│   ├── App.jsx                     # View Switcher (Storefront vs. Admin Panel)
│   ├── index.css                   # Custom Tailwind utilities & glassmorphic styling
│   └── main.jsx
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Local Frontend Setup (Immediate Interactive Demo)

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/ecommerce-catalog.git
cd ecommerce-catalog

# Install dependencies
npm install

# Start Vite Development Server
npm run dev
```

Open your browser at `http://localhost:5173`. You can immediately test adding items to cart, using promo codes, completing checkouts, and managing inventory in the **Admin Panel**!

---

### 2. PHP REST API & MySQL Setup (Optional Backend Integration)

If you have **XAMPP**, **WAMP**, **Laragon**, or **PHP/MySQL** installed locally:

1. **Import Database Schema**:
   - Open phpMyAdmin or MySQL CLI.
   - Run the SQL scripts in order:
     ```sql
     source backend/database/schema.sql;
     source backend/database/seed.sql;
     ```

2. **Start PHP Built-In Web Server**:
   ```bash
   cd backend
   php -S localhost:8000
   ```

3. **Enable Backend Connection in React**:
   - Create a `.env` file in the root directory:
     ```env
     VITE_API_URL=http://localhost:8000/api
     VITE_USE_REAL_BACKEND=true
     ```
   - Restart the React dev server (`npm run dev`).

---

## 🚀 Commands to Push this Project to GitHub

Follow these steps to publish this complete project to your personal GitHub portfolio:

```bash
# 1. Initialize git repository (if not already done)
git init

# 2. Add all files
git add .

# 3. Commit changes
git commit -m "Initial commit: Full-stack E-commerce product catalog with React, Tailwind, PHP REST API, and MySQL schema"

# 4. Set main branch
git branch -M main

# 5. Connect your remote GitHub repository
# (Create a new repository on github.com first, then replace the URL below)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/ecommerce-catalog.git

# 6. Push code to GitHub
git push -u origin main
```

---

## 💼 Resume & Interview Q&A Talking Points

When presenting this project during technical interviews for internship or full-stack software engineer roles:

- **Frontend Architecture**: Explain how React Context API was leveraged for decoupled state management (`CartContext` and `ProductContext`), preventing unnecessary re-renders.
- **Backend Security**: Highlight the use of **PHP PDO with prepared statements** (`$stmt->bindParam()`) to prevent SQL Injection, HTML input sanitization (`htmlspecialchars`), and proper CORS headers handling.
- **Database Transaction Management**: Point out that the `orders/create.php` API endpoint wraps order insertion and stock decrement operations in a **database transaction** (`$db->beginTransaction()` and `$db->commit()`), ensuring atomic consistency.
- **Hybrid API Layer**: Discuss building a resilient API service wrapper that gracefully degrades to local storage during server downtime while supporting real RESTful backend API calls seamlessly.

---

## 📜 License

Distributed under the **MIT License**. Free to use for personal portfolio and educational purposes.
