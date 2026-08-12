import { Router } from "express";
import {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} from "../controllers/customerController";

import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/authorizeRoles";

const router = Router();

router.get("/", authenticateToken, getCustomers);
router.get("/:id", authenticateToken, getCustomerById);
router.post("/", authenticateToken, authorizeRoles("SALES", "ADMIN"), createCustomer);
router.put("/:id", authenticateToken, authorizeRoles("SALES", "ADMIN"), updateCustomer);
router.delete("/:id", authenticateToken, authorizeRoles("ADMIN"), deleteCustomer);

export default router;
