import axios, { AxiosRequestConfig } from "axios";
import { Instruction } from "../interfaces/interfaces";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Create a central Axios instance
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Generic fetcher function using Axios
async function fetcher<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    try {
        const response = await axiosInstance({ url, ...options });
        return response.data;
    } catch (error: unknown) {
        // You can customize error handling here
        if (axios.isAxiosError(error)) {
            throw new Error(`Failed to fetch ${url}: ${error.response?.status || error.message}`);
        } else {
            throw new Error(`Failed to fetch ${url}: ${String(error)}`);
        }
    }
}

// Central API service
export const api = {
    getDashboard: () => fetcher("/dashboard"),
    // Instructions Routes
    getInstructionsByUser: (userId: string) => fetcher(`/instruction/user/${userId}`),
    addInstruction: (data: Instruction) => fetcher(`/instruction/`, { method: "POST", data }),
    deleteInstruction: (instruction_id: string) => fetcher(`/instruction/${instruction_id}`, { method: "DELETE" }),
    getInstructionsById: (instructionId: string) => fetcher(`/instruction/${instructionId}`),

    updateInstructions: (id: string, data: Instruction) => fetcher(`/instruction/${id}`, { method: "PUT", data }),
    saveSteps: (data: Instruction) => fetcher(`/step/`, { method: "POST", data }),
    deleteStep: (id: string) => fetcher(`/step/${id}`, { method: "DELETE" }),


    getAnalytics: () => fetcher("/analytics"),
    postData: (data: { [key: string]: unknown }) => fetcher("/submit", { method: "POST", data }), // Axios uses 'data' instead of 'body'
};
