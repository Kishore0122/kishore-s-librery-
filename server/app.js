import express from "express";
import { config } from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import connect from "./database/db.js"
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";
import authRouter from "./routs/authrout.js";
import bookRouter from "./routs/bookrouts.js";
import borrowRouter from "./routs/borrowrouts.js";
import borrowRequestRouter from "./routs/borrowrequestsrouts.js";
import expressfileupload from "express-fileupload";
import userrouts from "./routs/userrouts.js";
import { notifyuser } from "./services/notifyusers.js";
import { removeunverifiedaccounts } from "./services/removeunverifiedaccounts.js";

// Load environment variables first
config({path:"./config/config.env"});

// Create express app
export const app = express();

// Log environment variables (excluding sensitive ones)
console.log("Environment loaded:");
console.log("PORT:", process.env.PORT);
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
console.log("MongoDB URI configured:", !!process.env.MONGO_URI);

// Enhanced CORS configuration
const corsOptions = {
    origin: "https://kishore-library.netlify.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    exposedHeaders: ["Set-Cookie"],
    maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(expressfileupload({
    useTempFiles: true,
    tempFileDir: "/tmp",
}));

// Request logging middleware
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

// Health check endpoint
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Create a direct route for admin stats
app.get("/api/v1/admin/stats", async (req, res, next) => {
    try {
        const { getAdminStats } = await import('./controllers/usercontroller.js');
        getAdminStats(req, res, next);
    } catch (error) {
        next(error);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
});

// Initialize services
notifyuser();
removeunverifiedaccounts();

// Connect to database
connect().catch(err => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
});

// Export error middleware
app.use(errorMiddleware);