# 📱 Mini Social Post Application

A full-stack social media application built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) — inspired by the [TaskPlanet App](https://play.google.com/store/apps/details?id=com.taskplanet) Social Page.

## 🚀 Live Demo

| | Link |
|---|---|
| **Frontend** | [social-media-app-five-orpin.vercel.app](https://social-media-app-five-orpin.vercel.app/) |
| **Backend API** | [social-media-app-z1cq.onrender.com](https://social-media-app-z1cq.onrender.com/) |
| **GitHub Repo** | [github.com/Abhi-Trivedi05/social-media-app](https://github.com/Abhi-Trivedi05/social-media-app) |

> **Note:** The backend is hosted on Render's free tier. The first request may take ~30 seconds if the server is sleeping.

## ✨ Features

- **🔐 Authentication** — Sign up and log in with email & password (JWT-based)
- **📝 Create Posts** — Share text, images, or both with the community
- **😀 Emoji Picker** — Add emojis to your posts with a built-in picker
- **📷 Image Upload** — Attach images to posts via file upload
- **❤️ Like Posts** — Like/unlike posts from other users (toggle)
- **💬 Comment** — Add comments on any post with real-time count updates
- **📰 Public Feed** — View all posts from all users in a chronological feed
- **🔄 Filter Tabs** — Switch between All Posts, For You, Most Liked, and Most Commented

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js (Vite) | UI framework |
| Material UI (MUI) | Component library & styling |
| Axios | HTTP client |
| React Router | Client-side routing |
| emoji-picker-react | Emoji selection |
| Moment.js | Date formatting |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB Atlas | Cloud database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |

## 📁 Project Structure

```
social-media-app/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verification
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Post.js            # Post schema (with likes & comments)
│   ├── routes/
│   │   ├── authRoutes.js      # /api/auth (register, login)
│   │   └── postRoutes.js      # /api/posts (CRUD, like, comment)
│   ├── server.js              # Express app entry point
│   ├── package.json
│   └── .env                   # Environment variables (not committed)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreatePost.jsx # Post creation with emoji & image
│   │   │   ├── Navbar.jsx     # Top & bottom navigation bars
│   │   │   └── PostItem.jsx   # Individual post card
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Global auth state management
│   │   ├── pages/
│   │   │   ├── Feed.jsx       # Main feed page
│   │   │   ├── Login.jsx      # Login page
│   │   │   └── Signup.jsx     # Registration page
│   │   ├── utils/
│   │   │   └── api.js         # Centralized Axios instance
│   │   ├── App.jsx            # Route configuration
│   │   └── main.jsx           # App entry with theme & router
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## ⚙️ Local Development Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository
```bash
git clone https://github.com/Abhi-Trivedi05/social-media-app.git
cd social-media-app
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:
```bash
npm start
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173`.

## 🌐 Deployment

| Service | Platform | Root Directory |
|---|---|---|
| Frontend | Vercel | `frontend` |
| Backend | Render | `backend` |

### Environment Variables

**Render (Backend):**
- `MONGO_URI` — MongoDB Atlas connection string
- `JWT_SECRET` — Secret key for JWT tokens

**Vercel (Frontend):**
- `VITE_API_URL` — Deployed backend URL (e.g. `https://social-media-app-z1cq.onrender.com`)

## 📸 Screenshots

### Login Page
Clean login interface with email/password authentication.

### Feed Page
Public feed showing all posts with like, comment, and share actions.

### Post Creation
Create posts with text, image attachments, and emoji picker support.

## 📝 API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create a new account |
| POST | `/api/auth/login` | Login with email & password |

### Posts
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/posts` | Get all posts |
| POST | `/api/posts` | Create a new post |
| PUT | `/api/posts/:id/like` | Like/unlike a post |
| POST | `/api/posts/:id/comment` | Add a comment |

> All post endpoints require a valid JWT token in the `Authorization: Bearer <token>` header.

## 👤 Author

**Abhi Trivedi** — [GitHub](https://github.com/Abhi-Trivedi05)

---

*Built as part of the 3W Full Stack Internship Assignment — Task 1*
