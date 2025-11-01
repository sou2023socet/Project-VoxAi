# 🔧 VoxAi Setup Instructions

## Issues Fixed
1. ✅ Added backend start scripts to `package.json`
2. ✅ Fixed CSS loading (Tailwind configuration verified)
3. ✅ Created setup guide

## ⚠️ IMPORTANT: Start Backend Server First!

The error `ERR_CONNECTION_REFUSED` means the backend server is not running.

### Quick Fix Steps:

#### Step 1: Start Backend Server

Open a **new terminal/command prompt** and run:

```bash
cd backend
npm install
npm run dev
```

You should see:
```
🚀 VoxAi backend server running on port 5000
📍 Environment: development
MongoDB Connected: ...
```

#### Step 2: Create Backend `.env` File

In the `backend` folder, create a file named `.env` with:

```env
MONGO_URI=mongodb://localhost:27017/voxai
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
```

**If using MongoDB Atlas**, replace `MONGO_URI` with your Atlas connection string.

#### Step 3: Ensure MongoDB is Running

**Option A: Local MongoDB**
- Make sure MongoDB service is running on your system
- Default connection: `mongodb://localhost:27017/voxai`

**Option B: MongoDB Atlas (Cloud)**
- Get your connection string from MongoDB Atlas dashboard
- Replace `MONGO_URI` in `.env` file

#### Step 4: Restart Frontend (if CSS not loading)

If CSS is still not loading after backend is running:

1. **Stop the frontend dev server** (Ctrl+C)
2. **Clear Vite cache**:
   ```bash
   cd frontend/frontend
   rm -rf node_modules/.vite
   ```
   Or on Windows:
   ```bash
   cd frontend\frontend
   rmdir /s /q node_modules\.vite
   ```
3. **Restart frontend**:
   ```bash
   npm run dev
   ```

## 📋 Complete Setup Checklist

- [ ] Backend dependencies installed (`npm install` in `backend/`)
- [ ] Backend `.env` file created with MongoDB URI
- [ ] MongoDB running (local or Atlas)
- [ ] Backend server started (`npm run dev` in `backend/`)
- [ ] Frontend dependencies installed (`npm install` in `frontend/frontend/`)
- [ ] Frontend dev server started (`npm run dev` in `frontend/frontend/`)

## 🚀 Running the Application

### Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

### Terminal 2 (Frontend):
```bash
cd frontend/frontend
npm run dev
```

## ✅ Verification

Once both servers are running:

1. **Backend**: Should show `Server running on port 5000` and `MongoDB Connected`
2. **Frontend**: Should open at `http://localhost:5173` (or similar port)
3. **CSS**: Should be loaded (styled components visible)
4. **API**: Should work (no more `ERR_CONNECTION_REFUSED`)

## 🐛 Troubleshooting

### "ERR_CONNECTION_REFUSED"
- ✅ Backend server must be running on port 5000
- ✅ Check backend console for errors
- ✅ Verify `.env` file exists in `backend/` folder

### "CSS not loading"
- ✅ Restart Vite dev server
- ✅ Check browser console for CSS errors
- ✅ Verify `index.css` is imported in `main.jsx` (it is)
- ✅ Clear browser cache (Ctrl+Shift+R)

### "MongoDB connection error"
- ✅ Verify MongoDB is running
- ✅ Check `.env` file has correct `MONGO_URI`
- ✅ Test connection string separately

## 📞 Need Help?

Check the `README_SETUP.md` file for more detailed instructions.

