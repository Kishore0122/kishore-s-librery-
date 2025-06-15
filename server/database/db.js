import mongoose from "mongoose";

const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "library",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Database connected successfully: ${conn.connection.host}`);
    } catch (err) {
        console.error("Database connection error:", err.message);
        process.exit(1); // Exit with failure
    }
};

export default connect;
