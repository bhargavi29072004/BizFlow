import { Request, Response } from "express";
import { prisma } from "../config/database";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const {
            name,
            sku,
            category,
            unitPrice,
            currentStock,
            minimumStock,
            warehouseLocation
        } = req.body;

        if (!name || !sku || !category || unitPrice === undefined || !warehouseLocation) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing"
            });
        }

        const existingProduct = await prisma.product.findUnique({
            where: { sku }
        });

        if (existingProduct) {
            return res.status(409).json({
                success: false,
                message: "Product with this SKU already exists"
            });
        }

        const product = await prisma.product.create({
            data: {
                name,
                sku,
                category,
                unitPrice,
                currentStock: currentStock ?? 0,
                minimumStock: minimumStock ?? 0,
                warehouseLocation
            }
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        console.error("Create product error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                id: "desc"
            }
        });

        return res.status(200).json({
            success: true,
            products
        });

    } catch (error) {
        console.error("Get products error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        const product = await prisma.product.findUnique({
            where: { id }
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        console.error("Get product error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


export const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        const existingProduct = await prisma.product.findUnique({
            where: { id }
        });

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const product = await prisma.product.update({
            where: { id },
            data: req.body
        });

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        console.error("Update product error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        const existingProduct = await prisma.product.findUnique({
            where: { id }
        });

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        await prisma.product.delete({
            where: { id }
        });

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.error("Delete product error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
