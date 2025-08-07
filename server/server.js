const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Contact form rate limiting (more restrictive)
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 contact form submissions per hour
  message: 'Too many contact form submissions, please try again later.'
});

// Email transporter setup
const createTransporter = () => {
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } else {
    // Generic SMTP configuration
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Portfolio API is running' });
});

// Portfolio data endpoint
app.get('/api/portfolio', (req, res) => {
  const portfolioData = {
    personal: {
      name: "Your Name",
      title: "Full Stack Developer",
      email: "your.email@example.com",
      phone: "+1 (555) 123-4567",
      location: "City, State",
      bio: "Passionate full stack developer with expertise in modern web technologies. I love creating beautiful, functional, and user-friendly applications.",
      avatar: "/images/avatar.jpg"
    },
    skills: {
      frontend: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Next.js"],
      backend: ["Node.js", "Express", "Python", "Django", "PostgreSQL", "MongoDB"],
      tools: ["Git", "Docker", "AWS", "Vercel", "Figma", "VS Code"]
    },
    projects: [
      {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution with React frontend and Node.js backend",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        image: "/images/project1.jpg",
        github: "https://github.com/yourusername/ecommerce",
        live: "https://your-ecommerce.com",
        featured: true
      },
      {
        id: 2,
        title: "Task Management App",
        description: "Collaborative task management application with real-time updates",
        technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
        image: "/images/project2.jpg",
        github: "https://github.com/yourusername/taskmanager",
        live: "https://your-taskmanager.com",
        featured: true
      },
      {
        id: 3,
        title: "Weather Dashboard",
        description: "Beautiful weather dashboard with location-based forecasts",
        technologies: ["React", "Weather API", "Chart.js", "Tailwind"],
        image: "/images/project3.jpg",
        github: "https://github.com/yourusername/weather",
        live: "https://your-weather.com",
        featured: false
      }
    ],
    experience: [
      {
        id: 1,
        company: "Tech Company Inc.",
        position: "Senior Full Stack Developer",
        duration: "2022 - Present",
        description: "Lead development of web applications using React and Node.js"
      },
      {
        id: 2,
        company: "Startup Co.",
        position: "Full Stack Developer",
        duration: "2020 - 2022",
        description: "Built scalable web applications and APIs for growing startup"
      }
    ],
    education: [
      {
        id: 1,
        institution: "University Name",
        degree: "Bachelor of Science in Computer Science",
        duration: "2016 - 2020",
        gpa: "3.8/4.0"
      }
    ]
  };
  
  res.json(portfolioData);
});

// Contact form endpoint
app.post('/api/contact', 
  contactLimiter,
  [
    body('name').trim().isLength({ min: 2, max: 100 }).escape(),
    body('email').isEmail().normalizeEmail(),
    body('subject').trim().isLength({ min: 5, max: 200 }).escape(),
    body('message').trim().isLength({ min: 10, max: 1000 }).escape()
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Invalid input data',
          errors: errors.array()
        });
      }

      const { name, email, subject, message } = req.body;

      // Create email transporter
      const transporter = createTransporter();

      // Email to you (notification)
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Sent from your portfolio website</small></p>
        `
      };

      // Auto-reply to sender
      const autoReplyOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for contacting me!',
        html: `
          <h2>Thank you for your message!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for reaching out through my portfolio website. I've received your message and will get back to you as soon as possible.</p>
          <p>Best regards,<br>Your Name</p>
        `
      };

      // Send both emails
      await Promise.all([
        transporter.sendMail(mailOptions),
        transporter.sendMail(autoReplyOptions)
      ]);

      res.json({
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });

    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again later.'
      });
    }
  }
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});