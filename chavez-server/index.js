require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();

const corsOptions = {
    origin: ["http://localhost:5173", "https://chavez-client.vercel.app"],
    credentials: true,
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

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});