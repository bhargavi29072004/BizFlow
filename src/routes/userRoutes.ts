import { Router } from "express";
import { getUsers } from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/authorizeRoles";

const router = Router();

router.get(
    "/",
    authenticateToken,
    authorizeRoles("ADMIN"),
    getUsers
);

export default router;