# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm run install-deps
```

### 2. Configure Email (Optional)
```bash
# Copy environment file
cp server/.env.example server/.env

# Edit server/.env with your email settings
# For Gmail:
# - EMAIL_SERVICE=gmail
# - EMAIL_USER=your.email@gmail.com
# - EMAIL_PASS=your-app-password (not your regular password!)
```

### 3. Start Development Server
```bash
# Option 1: Use the convenience script
./start-dev.sh

# Option 2: Use npm
npm run dev

# Option 3: Start manually
npm run server    # Terminal 1
npm run client    # Terminal 2
```

## 📱 Access Your Portfolio

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 🎨 Customization

### Update Personal Information
Edit `server/server.js` around line 60:

```javascript
const portfolioData = {
  personal: {
    name: "Your Name",
    title: "Your Title", 
    email: "your.email@example.com",
    // ... update all fields
  }
  // ... update projects, skills, etc.
};
```

### Change Colors & Styling
Edit `client/tailwind.config.js` to customize the color scheme.

## 📧 Email Setup (Gmail)

1. Enable 2-Factor Authentication on your Gmail
2. Go to Google Account → Security → App passwords
3. Generate an app password for "Mail"
4. Use the app password in your `.env` file (not your regular password)

## 🛠️ Troubleshooting

### Build Errors
```bash
# Clear npm cache and reinstall
rm -rf node_modules client/node_modules server/node_modules
npm run install-deps
```

### Port Already in Use
```bash
# Kill processes on ports 3000 and 5000
npx kill-port 3000 5000
```

### TypeScript Errors
The project uses TypeScript with relaxed settings for better compatibility. If you encounter type errors, they're usually safe to ignore during development.

## 📚 Need Help?

Check the main [README.md](README.md) for detailed documentation, deployment guides, and more customization options.