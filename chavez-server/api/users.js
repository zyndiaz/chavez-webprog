require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");
const userRoutes = require("../routes/userRoutes");

const app = express();

let isConnected = false;

const connectToDatabase = async () => {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
    }
};

const corsOptions = {
    origin: ["http://localhost:5173", "https://chavez-client.vercel.app"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use("/api/users", userRoutes);

module.exports = async (req, res) => {
    await connectToDatabase();
    return app(req, res);
};