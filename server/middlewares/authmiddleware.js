import { catchAsyncErrors } from "./catchasyncerrors.js";
import User from "../models/usermodels.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./errorMiddlewares.js";

export const authenticate = catchAsyncErrors(async(req, res, next) => {
    try {
        // Get token from cookies
        const { token } = req.cookies;
        
        // Check if token exists
        if (!token) {
            console.log("No token found in cookies");
            return next(new ErrorHandler("Please login to access this resource", 401));
        }

        try {
            // Verify token
            const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
            
            // Find user
            const user = await User.findById(decodedData.id);
            
            if (!user) {
                console.log("User not found for token");
                return next(new ErrorHandler("User not found", 401));
            }

            // Attach user to request
            req.user = user;
            console.log(`Authenticated user: ${user.email}`);
            next();
        } catch (jwtError) {
            console.error("JWT verification failed:", jwtError.message);
            return next(new ErrorHandler("Invalid or expired token", 401));
        }
    } catch (error) {
        console.error("Authentication error:", error);
        return next(new ErrorHandler("Authentication failed", 500));
    }
});

export const authorized = (...roles) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return next(new ErrorHandler("User not authenticated", 401));
            }

            if (!roles.includes(req.user.roll)) {
                console.log(`Unauthorized access attempt by ${req.user.email} with role ${req.user.roll}`);
                return next(
                    new ErrorHandler(`Role: ${req.user.roll} is not allowed to access this resource`, 403)
                );
            }
            console.log(`Authorized access granted to ${req.user.email} with role ${req.user.roll}`);
            next();
        } catch (error) {
            console.error("Authorization error:", error);
            return next(new ErrorHandler("Authorization failed", 500));
        }
    };
};

