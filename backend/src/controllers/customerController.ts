import { Request, Response } from "express";
import { prisma } from "../config/database";

export const createCustomer = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, address, businessName, customerType } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Customer name is required"
            });
        }

        if (!phone) {
            return res.status(400).json({
                success: false,
                message: "Customer mobile (phone) is required"
            });
        }

        if (!businessName) {
            return res.status(400).json({
                success: false,
                message: "Customer businessName is required"
            });
        }

        if (!customerType) {
            return res.status(400).json({
                success: false,
                message: "Customer customerType is required"
            });
        }

        if (email) {
            const existingCustomer = await prisma.customer.findFirst({
                where: { email }
            });

            if (existingCustomer) {
                return res.status(409).json({
                    success: false,
                    message: "Customer with this email already exists"
                });
            }
        }

        const customer = await prisma.customer.create({
            data: {
                name,
                email: email || null,
                mobile: phone || null,
                businessName,
                customerType,
                address: address || null
            }
        });

        return res.status(201).json({
            success: true,
            message: "Customer created successfully",
            customer
        });

    } catch (error) {
        console.error("Create customer error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const getCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await prisma.customer.findMany({
            orderBy: {
                id: "desc"
            }
        });

        return res.status(200).json({
            success: true,
            customers
        });

    } catch (error) {
        console.error("Get customers error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const getCustomerById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid customer ID"
            });
        }

        const customer = await prisma.customer.findUnique({
            where: { id }
        });

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        return res.status(200).json({
            success: true,
            customer
        });

    } catch (error) {
        console.error("Get customer error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const updateCustomer = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid customer ID"
            });
        }

        const existingCustomer = await prisma.customer.findUnique({
            where: { id }
        });

        if (!existingCustomer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        const { name, email, phone, address, businessName, customerType } = req.body;

        if (email && email !== existingCustomer.email) {
            // Replace findUnique with findFirst:
            const customer = await prisma.customer.findFirst({
                where: { email }
            });

            if (customer) {
                return res.status(409).json({
                    success: false,
                    message: "Another customer already uses this email"
                });
            }
        }

        const customer = await prisma.customer.update({
            where: { id },
            data: {
                ...(name !== undefined && { name }),
                ...(email !== undefined && { email: email || null }),
                ...(phone !== undefined && { mobile: phone || null }),
                ...(businessName !== undefined && { businessName }),
                ...(customerType !== undefined && { customerType }),
                ...(address !== undefined && { address: address || null })
            }
        });

        return res.status(200).json({
            success: true,
            message: "Customer updated successfully",
            customer
        });

    } catch (error) {
        console.error("Update customer error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const deleteCustomer = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid customer ID"
            });
        }

        const existingCustomer = await prisma.customer.findUnique({
            where: { id }
        });

        if (!existingCustomer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        await prisma.customer.delete({
            where: { id }
        });

        return res.status(200).json({
            success: true,
            message: "Customer deleted successfully"
        });

    } catch (error) {
        console.error("Delete customer error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};