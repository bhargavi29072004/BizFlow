import { Request, Response } from "express";
import { prisma } from "../config/database";

export const getStockMovements = async (req: Request, res: Response) => {
    try {
        const productId = req.query.productId ? Number(req.query.productId) : undefined;

        const where = productId ? { productId } : undefined;

        const movements = await prisma.stockMovement.findMany({
            ...(productId ? { where: { productId } } : {}),
            orderBy: { createdAt: "desc" }
        });

        return res.status(200).json({ success: true, movements });
    } catch (error) {
        console.error("Get stock movements error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getStockMovementById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid ID" });

        const movement = await prisma.stockMovement.findUnique({ where: { id } });
        if (!movement) return res.status(404).json({ success: false, message: "Not found" });

        return res.status(200).json({ success: true, movement });
    } catch (error) {
        console.error("Get stock movement error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const createStockMovement = async (req: Request, res: Response) => {
    try {
        const { productId, quantity, type, reason } = req.body as {
            productId: number;
            quantity: number;
            type: "IN" | "OUT";
            reason?: string;
        };

        if (!productId || !quantity || !type) {
            return res.status(400).json({ success: false, message: "productId, quantity and type are required" });
        }

        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });

        const newStock = type === "IN" ? product.currentStock + quantity : product.currentStock - quantity;
        if (newStock < 0) return res.status(400).json({ success: false, message: "Insufficient stock" });

        const movement = await prisma.stockMovement.create({
            data: {
                productId,
                quantity,
                type: type as any,
                reason: reason || "",
            }
        });

        await prisma.product.update({ where: { id: productId }, data: { currentStock: newStock } });

        return res.status(201).json({ success: true, message: "Stock movement recorded", movement });
    } catch (error) {
        console.error("Create stock movement error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getLowStockProducts = async (_req: Request, res: Response) => {
    try {
        const all = await prisma.product.findMany();
        const low = all.filter(p => p.currentStock < p.minimumStock);
        return res.status(200).json({ success: true, products: low });
    } catch (error) {
        console.error("Get low stock products error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
