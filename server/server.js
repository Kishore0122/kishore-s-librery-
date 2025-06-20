import { app, notifyuser, removeunverifiedaccounts } from "./app.js";
import { v2 as cloudinary } from "cloudinary";
import connect from "./database/db.js";

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connect();
        notifyuser();
        removeunverifiedaccounts();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    process.exit(1);
});

startServer();
