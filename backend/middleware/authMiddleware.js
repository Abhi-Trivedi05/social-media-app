import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
    let token;
    const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev';

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            if (!token || token === 'undefined') {
                console.error("Token is undefined or missing after 'Bearer '");
                return res.status(401).json({ message: 'Not authorized, token missing' });
            }

            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            
            if (!req.user) {
                console.error("Token verified, but user ID not found in database:", decoded.id);
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }
            
            return next();
        } catch (error) {
            console.error("Token verification failed:", error.message);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        console.error("No authorization header present");
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export default protect;
