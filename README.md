# Full Stack Portfolio Website

A modern, responsive portfolio website built with React (TypeScript) frontend and Node.js/Express backend. Features beautiful animations, a contact form with email integration, and a clean, professional design.

## 🚀 Features

### Frontend
- **Modern React with TypeScript** - Type-safe development
- **Responsive Design** - Works perfectly on all devices
- **Beautiful Animations** - Smooth Framer Motion animations
- **Tailwind CSS** - Modern utility-first styling
- **Interactive Components** - Engaging user experience
- **Smooth Scrolling** - Seamless navigation between sections

### Backend
- **Express.js API** - RESTful backend services
- **Contact Form** - Email integration with Nodemailer
- **Input Validation** - Secure form processing
- **Rate Limiting** - Protection against spam
- **CORS Support** - Secure cross-origin requests
- **Environment Configuration** - Flexible deployment options

### Sections
- **Hero Section** - Eye-catching introduction with call-to-actions
- **About Me** - Personal information and statistics
- **Skills** - Categorized technical skills with animations
- **Projects** - Filterable project showcase with live links
- **Experience** - Timeline of work experience and education
- **Contact** - Functional contact form with backend integration
- **Footer** - Social links and additional information

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Framer Motion (animations)
- Tailwind CSS (styling)
- React Router (navigation)
- Axios (HTTP client)
- React Icons

### Backend
- Node.js
- Express.js
- Nodemailer (email)
- Express Validator (input validation)
- Express Rate Limit (rate limiting)
- Helmet (security)
- CORS (cross-origin requests)

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1. Clone the repository
```bash
git clone <repository-url>
cd portfolio-website
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Environment Setup

#### Server Configuration
Create a `.env` file in the `server` directory:

```bash
# Copy the example file
cp server/.env.example server/.env
```

Edit `server/.env` with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Email Configuration (Choose one method)

# Method 1: Gmail (recommended for simplicity)
EMAIL_SERVICE=gmail
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your-app-password

# Method 2: Custom SMTP
# EMAIL_SERVICE=smtp
# SMTP_HOST=smtp.your-provider.com
# SMTP_PORT=587
# SMTP_SECURE=false
# EMAIL_USER=your.email@domain.com
# EMAIL_PASS=your-password

# Contact form destination email (defaults to EMAIL_USER if not set)
CONTACT_EMAIL=your.email@gmail.com
```

#### Client Configuration (Optional)
Create a `.env` file in the `client` directory if you need custom API URL:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Gmail Setup (if using Gmail)
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use the generated app password in your `.env` file

## 🚀 Running the Application

### Development Mode
```bash
# Run both frontend and backend concurrently
npm run dev

# Or run them separately:
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

### Production Build
```bash
# Build the frontend
npm run build

# Start the production server
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🎨 Customization

### 1. Personal Information
Edit the portfolio data in `server/server.js` in the `/api/portfolio` endpoint:

```javascript
const portfolioData = {
  personal: {
    name: "Your Name",
    title: "Your Title",
    email: "your.email@example.com",
    // ... other fields
  },
  // ... other sections
};
```

### 2. Styling
- **Colors**: Modify `client/tailwind.config.js` for color schemes
- **Fonts**: Update font imports in `client/src/index.css`
- **Animations**: Customize animations in components using Framer Motion

### 3. Sections
Add or remove sections by:
1. Creating new components in `client/src/components/`
2. Adding them to `client/src/App.tsx`
3. Updating navigation in `client/src/components/Header.tsx`

## 📱 Responsive Design

The portfolio is fully responsive and tested on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔒 Security Features

- Input validation and sanitization
- Rate limiting on API endpoints
- CORS configuration
- Helmet security headers
- Environment variable protection

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the client: `cd client && npm run build`
2. Deploy the `build` folder to your preferred hosting service
3. Set environment variables if needed

### Backend (Heroku/Railway/DigitalOcean)
1. Deploy the `server` directory
2. Set environment variables
3. Update `CLIENT_URL` in production environment

### Full Stack (Railway/Heroku)
Deploy both frontend and backend together with appropriate build scripts.

## 📧 Contact Form

The contact form includes:
- Real-time validation
- Spam protection (rate limiting)
- Email notifications
- Auto-reply functionality
- Success/error feedback

## 🎯 Performance

- Optimized images and assets
- Code splitting with React lazy loading
- Efficient animations with Framer Motion
- Minimal bundle size with tree shaking

## 🧪 Testing

```bash
# Run frontend tests
cd client
npm test

# Run backend tests (if implemented)
cd server
npm test
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

If you need help with setup or customization, please:
1. Check the documentation above
2. Look at the example configuration files
3. Open an issue on GitHub

---

Built with ❤️ using React, Node.js, and modern web technologies.