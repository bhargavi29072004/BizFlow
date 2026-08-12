import { Router } from "express";

import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from "../controllers/productController";

import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/authorizeRoles";

const router = Router();


// Get all products
router.get(
    "/",
    authenticateToken,
    getProducts
);


// Get product by ID
router.get(
    "/:id",
    authenticateToken,
    getProductById
);


// Create product
router.post(
    "/",
    authenticateToken,
    authorizeRoles("ADMIN", "WAREHOUSE"),
    createProduct
);


// Update product
router.put(
    "/:id",
    authenticateToken,
    authorizeRoles("ADMIN", "WAREHOUSE"),
    updateProduct
);


// Delete product
router.delete(
    "/:id",
    authenticateToken,
    authorizeRoles("ADMIN"),
    deleteProduct
);


export default router;