import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressfileupload from "express-fileupload";

import { errorMiddleware } from "./middlewares/errorMiddlewares.js";
import authRouter from "./routs/authrout.js";
import bookRouter from "./routs/bookrouts.js";
import borrowRouter from "./routs/borrowrouts.js";
import borrowRequestRouter from "./routs/borrowrequestsrouts.js";
import userrouts from "./routs/userrouts.js";
import { notifyuser } from "./services/notifyusers.js";
import { removeunverifiedaccounts } from "./services/removeunverifiedaccounts.js";

// Load environment variables first
config({path:"./config/config.env"});

// Create express app
export const app = express();

// CORS
const corsOptions = {
    origin: "https://kishore-library.netlify.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    exposedHeaders: ["Set-Cookie"],
    maxAge: 86400
};
app.use(cors(corsOptions));

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressfileupload({ useTempFiles: true, tempFileDir: "/tmp" }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/borrow", borrowRouter);
app.use("/api/v1/borrow-requests", borrowRequestRouter);
app.use("/api/v1/user", userrouts);

// Health check
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Admin stats
app.get("/api/v1/admin/stats", async (req, res, next) => {
    try {
        const { getAdminStats } = await import('./controllers/usercontroller.js');
        getAdminStats(req, res, next);
    } catch (error) {
        next(error);
    }
});

// Use the global error handler from errorMiddlewares.js
app.use(errorMiddleware);

// Export services to initialize in main file
export { notifyuser, removeunverifiedaccounts };
