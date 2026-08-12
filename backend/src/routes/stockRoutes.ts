import { Router } from "express";

import {
    createStockMovement,
    getStockMovements,
    getStockMovementById,
    getLowStockProducts
} from "../controllers/stockController";

import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/authorizeRoles";

const router = Router();


// Get all stock movements (optionally ?productId=1)
router.get(
    "/movements",
    authenticateToken,
    getStockMovements
);


// Get low stock products (must come before /:id-style routes)
router.get(
    "/low-stock",
    authenticateToken,
    getLowStockProducts
);


// Get a single stock movement by ID
router.get(
    "/movements/:id",
    authenticateToken,
    getStockMovementById
);


// Record a stock movement (IN or OUT)
router.post(
    "/movements",
    authenticateToken,
    authorizeRoles("ADMIN", "WAREHOUSE"),
    createStockMovement
);


export default router;