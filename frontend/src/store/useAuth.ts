import { create } from "zustand"
import instance from "../lib/axios.ts"
import toast from "react-hot-toast"
import axios from "axios"


interface AuthStore {
    authState: boolean | null
    isCheckingAuth: boolean
    isSigningUp: boolean
    isLoggingIn: boolean
    checkAuthState: () => Promise<void>
    signUp: (data: data) => Promise<void>
}

interface data {
    email: string | null,
    password: string | null,
    name: string | null
}

export const useAuth = create<AuthStore>((set) => ({
    authState: null,
    isLoggingIn: false,
    isSigningUp: false,
    isCheckingAuth: true,
    checkAuthState: async () => {
        try {
            const response = await instance.get("/auth/check");
            console.log(response);
            set({ authState: response.data });
            set({ isCheckingAuth: false })
        } catch (error) {
            set({ authState: null })
            console.log(error)
        } finally {
            set({ isCheckingAuth: false })
        }
    },
    signUp: async (data: data) => {
        try {
            set({ isSigningUp: true })
            const response = await instance.post("/auth/signup", {
                email: data.email,
                password: data.password,
                fullName: data.name
            });
            toast.success("Account created")
            set({ authState: response.data })
            console.log(response)
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(`Error in signUp - ${error.response.data.message}`)
            } else {
                toast.error("An unknown error occurred during sign up")
            }
            console.log("error in signUp ", error)
        }
        finally {
            set({ isSigningUp: false })
        }
    }
})) 