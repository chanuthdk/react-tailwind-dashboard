# React Tailwind Dashboard

This is a dynamic website built with **React**, **Tailwind CSS**, and powered by a **Node.js** backend. The header, navigation, and footer are all editable through our dashboard interface.

## 🚀 Features

- ⚡ **Vite** for fast builds and hot reloading
- 🎨 **Tailwind CSS** for styling
- 📱 Fully responsive layout
- 🧩 Reusable components (cards, buttons, etc.)
- 🔄 Sample data handling and API integration structure

## 🛠 Tech Stack

- **Frontend**: React, Tailwind CSS
- **Build Tool**: Vite
- **Language**: JavaScript / JSX
- **Backend**: Node.js + Express + MongoDB

## 📸 Screenshots
<img width="1915" height="927" alt="image" src="https://github.com/user-attachments/assets/5f73a348-07c5-4ed9-ab58-94442194cb0e" />
<img width="1913" height="939" alt="image" src="https://github.com/user-attachments/assets/4325a6ef-a97e-497c-af16-51b591fb0408" />


## 📂 Folder Structure
```bash
react-tailwind-dashboard/
├── frontend/
│   ├── public/
│   │   ├── vite.svg
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── context/
│   │   │   └── ComponentContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── .env
├── backend/
│   ├── controllers/
│   │   └── componentController.js
│   ├── routes/
│   │   ├── components.js
│   │   └── upload.js
│   ├── models/
│   │   └── Component.js
│   ├── middleware/
│   │   └── auth.js (optional)
│   ├── config/
│   │   └── cloudinary.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── README.md
└── .gitignore
```
## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chanuthdk/react-tailwind-dashboard.git
   cd react-tailwind-dashboard
2. **Install dependencies**
   - Front end:
   ```bash
   cd frontend
   npm install
   ```
   - Backend:
   ```bash
   cd backend
   npm install
   ```
3. **Run the development server**
   - Front end:
   ```bash
   cd frontend
   npm run dev
   ```
   - Backend:
   ```bash
   cd backend
   npm run dev
   ```
4. **Open in browser**
   ```bash
   http://localhost:5173
   ```
## ⚙️ Configuration
   - Update backend .env file:
     ```bash
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     ```
**Built with React & Tailwind CSS by Chanuth🙃**
