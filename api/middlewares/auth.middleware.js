import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// 1. The Bouncer: Verifies the user is logged in
export const protect = async (req, res, next) => {
    let token;

    // We configured cookie-parser in index.js, so we can read it directly
    token = req.cookies.jwt;

    if (token) {
        try {
            // Verify token using the secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch the user from the database (excluding the password)
            // and attach it to the request object for the next functions to use
            req.user = await User.findById(decoded.userId).select('-password');

            next(); // Move on to the next middleware or controller
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// 2. The VIP List: Restricts access to specific roles
export const authorize = (...roles) => {
    return (req, res, next) => {
        // req.user was just attached by the `protect` middleware above
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `User role '${req.user.role}' is not authorized to access this route` 
            });
        }
        next();
    };
};