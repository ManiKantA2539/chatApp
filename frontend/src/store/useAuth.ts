import { create } from "zustand"
import instance from "../lib/axios.ts"
import toast from "react-hot-toast"
import axios, { AxiosError } from "axios"
import { io } from "socket.io-client"


interface AuthStore {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    authState: any
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    socket:any
    isCheckingAuth: boolean
    isSigningUp: boolean
    isLoggingIn: boolean
    isUpdatingUser: boolean
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    onlineUsers: any
    checkAuthState: () => Promise<void>
    signUp: (data: data) => Promise<void>
    logIn: (data: data) => Promise<void>
    logOut: () => Promise<void>
    updateProfile: (data: data) => Promise<void>
    connectSocket:()=>Promise<void>
    disconnectSocket:()=>Promise<void>
}

interface data {
    email?: string | null,
    password?: string | null,
    name?: string | null
    image?: string | ArrayBuffer | null | undefined
}

export const useAuth = create<AuthStore>((set,get) => ({
    authState: null,
    isLoggingIn: false,
    isSigningUp: false,
    isCheckingAuth: true,
    isUpdatingUser: false,
    socket:null,
    onlineUsers:null,
    checkAuthState: async () => {
        try {
            const response = await instance.get("/auth/check");
            console.log(response);
            set({ authState: response.data });
            set({ isCheckingAuth: false })
            get().connectSocket()
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
            get().connectSocket();
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
    },
    logIn: async (data: data) => {
        try {
            set({ isLoggingIn: true })
            const response = await instance.post("/auth/login", {
                email: data.email,
                password: data.password
            })
            console.log(response)
            toast.success("LogIn success")
            set({ authState: response.data })
            get().connectSocket();
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                toast.error(`Error in login - ${error?.response?.data?.message}`)
            } else {
                toast.error("Error in login.")
            }
        }
        finally {
            set({ isLoggingIn: false })
        }

    },
    logOut: async () => {
        try {
            await instance.post("/auth/logout");
            set({ authState: null })
            get().disconnectSocket();
            toast.success("Logged out")
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                toast.error(`Error in logout - ${error?.response?.data?.message}`)
            } else {
                toast.error("Error in logout.")
            }
        }
    },
    updateProfile: async (data) => {
        try {
            set({ isUpdatingUser: true })
            const response = await instance.post("/auth/updateProfile", {
                profilePic: data.image
            })
            toast.success("Image updated successfully");
            console.log(response)
            set({ authState: response.data })
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                toast.error(`Error in updating image - ${error?.response?.data?.message}`)
            } else {
                toast.error("Error in image updation.")
            }
        } finally {
            set({ isUpdatingUser: false })
        }
    },
    connectSocket: async () => {
        if(!get().authState || get().socket?.connected) return
        const socket = io("http://192.168.29.167:3000",{
            query:{
                userId : get().authState.id
            }
        })
        socket.connect();
        set({ socket });
        socket.on("onlineUsers",(data)=>{
            set({onlineUsers:data})
        })
    },
    disconnectSocket: async () => {
        if(!get().socket) return
        get().socket?.disconnect();
        set({ socket: null });
        
    }
})) 