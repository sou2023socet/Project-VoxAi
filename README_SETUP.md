# VoxAi Setup Guide

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (running locally or MongoDB Atlas connection string)
- npm or yarn

### 1. Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in backend directory:
```env
MONGO_URI=mongodb://localhost:27017/voxai
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

4. Start the backend server:
```bash
npm run dev
```

The backend will start on `http://localhost:5000`

### 2. Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173` (or another port if 5173 is busy)

## Troubleshooting

### CSS Not Loading

If Tailwind CSS is not loading:

1. **Restart the Vite dev server**: Stop and restart `npm run dev`
2. **Clear cache**: Delete `node_modules/.vite` folder and restart
3. **Check Tailwind version**: If using Tailwind v4, ensure `@import "tailwindcss"` is in `index.css`
4. **Verify PostCSS**: Ensure `postcss.config.js` exists with Tailwind and Autoprefixer plugins

### API Connection Refused

If you see `ERR_CONNECTION_REFUSED`:

1. **Check if backend is running**: Make sure the backend server is started with `npm run dev` in the backend directory
2. **Verify port**: Ensure backend is running on port 5000 (check console output)
3. **Check MongoDB**: Ensure MongoDB is running if using local MongoDB
4. **Environment variables**: Verify `.env` file exists in backend directory

### MongoDB Connection Issues

1. **Local MongoDB**: Start MongoDB service
2. **MongoDB Atlas**: Update `MONGO_URI` in `.env` with your Atlas connection string
3. **Connection string format**: `mongodb://localhost:27017/voxai` or `mongodb+srv://username:password@cluster.mongodb.net/voxai`

## Running Both Servers

### Option 1: Two Terminal Windows
- Terminal 1: `cd backend && npm run dev`
- Terminal 2: `cd frontend/frontend && npm run dev`

### Option 2: Concurrent (if installed)
```bash
npm install -g concurrently
concurrently "cd backend && npm run dev" "cd frontend/frontend && npm run dev"
```

## Default Credentials

No default users exist. You need to register a new account through the frontend.

## Project Structure

```
voxAi version 1/
├── backend/
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── middleware/
│   │   └── auth.js         # JWT authentication
│   ├── models/
│   │   ├── User.js         # User model
│   │   └── Scheme.js        # Scheme model
│   ├── routes/
│   │   ├── auth.js         # Authentication routes
│   │   ├── schemes.js      # Schemes routes
│   │   └── chat.js         # Chatbot routes
│   ├── server.js           # Express server
│   └── .env                # Environment variables
│
└── frontend/
    └── frontend/
        ├── src/
        │   ├── components/  # React components
        │   ├── pages/       # Page components
        │   ├── services/    # API services
        │   ├── context/     # React context
        │   └── utils/       # Utility functions
        └── vite.config.js   # Vite configuration
```

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/schemes` - Get all schemes (public)
- `POST /api/schemes` - Create scheme (protected)
- `POST /api/chat` - Send chat message (protected)
- `GET /api/chat/history` - Get chat history (protected)

