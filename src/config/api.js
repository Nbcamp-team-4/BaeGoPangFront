import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;

export const BACKEND_CONFIRM_URL = "http://localhost:8080/api/payments/confirm"