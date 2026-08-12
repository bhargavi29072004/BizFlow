import { Router } from "express";
import { register, login, profile } from "../controllers/authController";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/authorizeRoles";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", authenticateToken, profile);

router.get(
    "/sales",
    authenticateToken,
    authorizeRoles("SALES"),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Sales access granted",
            user: req.user
        });
    }
);

export default router;