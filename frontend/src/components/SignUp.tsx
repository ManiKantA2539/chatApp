import { Loader2, MessageSquare } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useAuth } from "../store/useAuth"
import toast from "react-hot-toast"
import Earth from "./Globe"
import { Link } from "react-router-dom"

const SignUp = () => {
    const { register, formState: { errors }, watch, handleSubmit } = useForm()
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        email: ""
    })

    const { isSigningUp, signUp } = useAuth();

    const validateData = () => {
        if (!formData.name.trim()) return toast.error("Name is empty");
        if (!formData.password.trim()) return toast.error("Password is empty");
        if (!formData.email.trim()) return toast.error("Email is empty");

        return true;
    }

    const onSubmit = handleSubmit((data) => {
        if (validateData()) {
            console.log(data);
            signUp(formData)
        }
    })

    return (
        <>
            <div className="flex flex-row justify-center items-center bg-(#98a1)">
                <div style={{ width: "100%", height: "100vh" }}
                    className="flex justify-center items-center flex-col">
                    <div className="flex flex-col items-center">
                        <MessageSquare />
                        <h3> Create Account</h3>
                        <p>Get started</p>
                    </div>
                    <form onSubmit={onSubmit} className="flex flex-col gap-2">
                        <label htmlFor="Name">Name</label>
                        <input
                            className="border bg-transparent rounded border-green-200 px-2 py-1"
                            type="text" {...register("Name", { required: true })}
                            placeholder="Enter Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        {errors.Name && <span className="text-red-400">The Name is required</span>}
                        <label htmlFor="Email">Email</label>
                        <input
                            className="border bg-transparent rounded border-green-200 px-2 py-1"
                            type="email" {...register("Email", { required: true })}
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.Email && <span className="text-red-400">The Email is required</span>}
                        <label htmlFor="Password">Password</label>
                        <input
                            className="border bg-transparent rounded border-green-200 px-2 py-1"
                            type="password" {...register("Password", { required: true, minLength: 6 })}
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        {errors.Password && <span className="text-red-400">The Password is required</span>}

                        <button type="submit"
                            className="text-gray-700 border p-2 rounded-lg bg-blue-400 my-5"
                            disabled={isSigningUp}>
                            {isSigningUp ? (<Loader2 className="animate-spin" />) : ("signUp")}
                        </button>
                    </form>
                    <span className="text-center gap-0">Already have an Account?{" "}
                        <Link to="/login" className="link link-primary">
                            Sign in
                        </Link>
                    </span>
                </div>
                <div style={{ width: "100%", height: "100vh" }}
                    className="flex justify-center items-center">
                    <Earth />
                </div>
            </div >
        </>
    )
}

export default SignUp