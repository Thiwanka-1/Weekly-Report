import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.routes.js';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';

import projectRoutes from './routes/project.routes.js';
import reportRoutes from './routes/report.routes.js';
import dns from "node:dns/promises";
import aiRoutes from './routes/ai.routes.js';
dotenv.config();

dns.setServers(["1.1.1.1", "8.8.8.8"]);


const app = express();

// --- Security & Global Middlewares ---
app.use(helmet()); // Secures HTTP headers
app.use(express.json()); // Parses incoming JSON requests
app.use(cookieParser()); // Parses cookies for session management

// CORS Configuration - Allows your React frontend to connect and send cookies
app.use(cors({
    origin: 'http://localhost:5173', // Assuming React runs on port 3000
    credentials: true 
}));

app.use((req, res, next) => {
    Object.defineProperty(req, 'query', {
        value: req.query,
        writable: true,
        configurable: true,
        enumerable: true,
    });
    next();
});

app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Rate Limiting - Prevents brute force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter); 
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/ai', aiRoutes);
// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));


// --- Placeholder for Routes ---
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'Server is running smoothly!' });
});


// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});