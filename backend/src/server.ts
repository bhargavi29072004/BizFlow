import express from "express";
import cors from "cors";
import "dotenv/config";

import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import customerRoutes from "./routes/customerRoutes";
import stockRoutes from "./routes/stockRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/stock", stockRoutes);
app.get("/api/health", (_req, res) => {
    res.json({
        success: true,
        message: "Nexora API is running",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Nexora server running on http://localhost:${PORT}`);
});