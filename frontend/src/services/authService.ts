import api from "../api/axios";
import type { LoginResponse } from "../types/auth";

export const loginUser = async (
    email: string,
    password: string
): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", {
        email,
        password,
    });

    return response.data;
};