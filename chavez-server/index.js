require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();

const corsOptions = {
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Chavez Server is running!" });
});

app.get("/api/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(500).json({ message: "Server Error", error: err.message });
});

app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.method} ${req.url} not found` });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📍 API available at http://localhost:${PORT}/api/users`);
});