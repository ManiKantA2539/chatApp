import { Globe, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { useAuth } from "../store/useAuth"
import { useState } from "react"
import Earth from "./Globe"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

const Login = () => {
    const { formState: { errors }, register, handleSubmit, watch } = useForm()
    const { isLoggingIn, logIn } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const validateData = () => {
        if (!formData.password.trim()) return toast.error("Password is empty");
        if (!formData.email.trim()) return toast.error("Email is empty");

        return true;
    }

    const onSubmit = handleSubmit((data) => {
        if (validateData()) {
            console.log(data)
            logIn(formData)
        }
    })

    return (
        <>
            <div className="flex flex-row justify-center items-center bg-(#98a1)" style={{ height: "90vh" }}>
                <div style={{ width: "100%" }}
                    className="flex justify-center items-center flex-col">
                    <div className="flex flex-col items-center">
                        <Globe />
                        <h3> Login to your Account</h3>
                    </div>
                    <form onSubmit={onSubmit} className="flex flex-col gap-2">

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
                            disabled={isLoggingIn}>
                            {isLoggingIn ? (<Loader2 className="animate-spin mx-auto" />) : ("logIn")}
                        </button>
                        <span className="text-center">Dont have an Account?{" "}
                            <Link to="/signup" className="link-primary link">
                                Create an Account
                            </Link>
                        </span>
                    </form>
                </div>
                <div style={{ width: "100%" }}
                    className="flex justify-center items-center" id="globe">
                    <Earth />
                </div>
            </div >
        </>
    )
}

export default Login