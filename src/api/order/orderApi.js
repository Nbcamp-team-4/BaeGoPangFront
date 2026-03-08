import { api } from "../client";

export const getOrders = async (userId) => {
    const response = await api.get("/orders", {
        params: { userId },
    });
    return response.data;
};