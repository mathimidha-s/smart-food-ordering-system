# 🍛 TanjoreEats – Smart Food Ordering & Delivery System

A full-stack Zomato-like food ordering and delivery management system built with **React**, **Node.js**, and **MongoDB**, featuring restaurants from **Thanjavur, Tamil Nadu**.

---

## ✨ Features

- **Authentication** – Register/Login with JWT-based auth
- **Restaurant Listing** – 6 real Thanjavur restaurants with ratings, delivery times & offers
- **Menu System** – 40+ food items across 6 restaurants, grouped by category
- **Cart** – Cross-restaurant cart management with quantity controls
- **Order Placement** – Address input, payment method selection, special instructions
- **Live Order Tracking** – Real-time status updates (Placed → Confirmed → Preparing → Out for Delivery → Delivered)
- **Order History** – Full list of past orders with status
- **Profile Management** – Update name, phone, and default delivery address
- **Veg/Non-Veg Filter** – Filter menu items by dietary preference

---

## 🛠️ Tech Stack

| Layer      | Technology               |
|------------|--------------------------|
| Frontend   | React 18, React Router 6 |
| Styling    | Custom CSS (no UI libs)  |
| Backend    | Node.js, Express.js      |
| Database   | MongoDB, Mongoose        |
| Auth       | JWT + bcrypt             |
| HTTP       | Axios                    |
| Toasts     | react-hot-toast          |

---

## 🚀 Setup & Run

### Prerequisites
- Node.js v16+
- MongoDB running locally on port 27017

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Edit `backend/.env` if needed:
```
MONGO_URI=mongodb://localhost:27017/foodapp
JWT_SECRET=your_super_secret_jwt_key_change_in_production
PORT=5000
```

### 3. Start Backend
```bash
cd backend
npm run dev     # development (with nodemon)
# OR
npm start       # production
```
The backend will automatically seed 6 restaurants and 40+ menu items on first run.

### 4. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 5. Start Frontend
```bash
cd frontend
npm start
```

The app will open at **http://localhost:3000**

---

## 📁 Project Structure

```
foodapp/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Restaurant.js
│   │   ├── MenuItem.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── restaurants.js
│   │   ├── menu.js
│   │   └── orders.js
│   ├── middleware/
│   │   └── auth.js
│   ├── seedData.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── context/
        │   ├── AuthContext.js
        │   └── CartContext.js
        ├── components/
        │   ├── Navbar.js
        │   └── Navbar.css
        ├── pages/
        │   ├── Home.js / Home.css
        │   ├── Login.js / Register.js / Auth.css
        │   ├── Restaurants.js / Restaurants.css
        │   ├── RestaurantDetail.js / RestaurantDetail.css
        │   ├── Cart.js / Cart.css
        │   ├── Orders.js / Orders.css
        │   ├── OrderTracking.js / OrderTracking.css
        │   └── Profile.js / Profile.css
        ├── App.js
        ├── index.js
        └── index.css
```

---

## 🍽️ Restaurants in Thanjavur

1. **Sathars Hotel** – Gandhiji Road (Biryani, South Indian)
2. **Vasantha Bhavan** – Medical College Road (Veg Tiffin, South Indian)
3. **Tanjore Biryani House** – Punnainallur (Biryani, Mughlai)
4. **Sri Murugan Mess** – Nallur (Chettinad, South Indian)
5. **Royal Cafe & Bakery** – Kumbakonam Road (Snacks, Chinese)
6. **Chola Grand Restaurant** – Hospital Road (Multi-cuisine)

---

## 🔑 Demo Account

After starting the app, create an account or use:
- **Email:** demo@tanjore.com
- **Password:** demo1234

> Note: Create the demo account by registering with these credentials on first use.

---

## 📡 API Endpoints

| Method | Endpoint                   | Auth | Description            |
|--------|----------------------------|------|------------------------|
| POST   | /api/auth/register         | ❌   | Register user          |
| POST   | /api/auth/login            | ❌   | Login user             |
| GET    | /api/auth/me               | ✅   | Get current user       |
| PUT    | /api/auth/profile          | ✅   | Update profile         |
| GET    | /api/restaurants           | ❌   | List restaurants       |
| GET    | /api/restaurants/:id       | ❌   | Single restaurant      |
| GET    | /api/menu/:restaurantId    | ❌   | Get menu               |
| POST   | /api/orders                | ✅   | Place order            |
| GET    | /api/orders/my-orders      | ✅   | User's orders          |
| GET    | /api/orders/:id            | ✅   | Single order           |
| PUT    | /api/orders/:id/cancel     | ✅   | Cancel order           |

---

## 🎨 Design Highlights

- **Playfair Display** headings + **DM Sans** body font
- Deep red (`#E8300B`) brand color inspired by Thanjavur's temple architecture
- Floating cart bar on restaurant detail page
- Animated order progress tracker
- Responsive across mobile and desktop

---

Built with ❤️ for Thanjavur food lovers.
