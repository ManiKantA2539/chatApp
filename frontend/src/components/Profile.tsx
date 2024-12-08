import { Camera, Loader2 } from "lucide-react";
import { useAuth } from "../store/useAuth"
import { useState } from "react";

const Profile = () => {
    const { authState, isUpdatingUser, updateProfile } = useAuth();
    console.log(authState)
    const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);
    const handleImageUpload = (e: any) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64 = reader.result;
            setSelectedImage(base64)
            await updateProfile({ image: base64 })
        }
    }

    return (
        <>
            <div className="w-1/3 h-auto m-auto bg-gray-950  text-orange-300 opacity-65 gap-1 rounded-lg p-3">
                <div className="flex items-center flex-col">
                    <h4>Profile</h4>
                    <p>Your Profile Information</p>
                </div>
                <div className="flex flex-col items-center gap-4 p-5">
                    <div className="relative">
                        <img
                            src={selectedImage || authState?.profilePic || "src/assets/react.svg"}
                            alt="Profile"
                            className="rounded-full size-32 bg-black object-cover border-4 border-orange-300"
                        />
                        <label htmlFor="img-upload"
                            className={`absolute bottom-0 right-0 
                         bg-base-content hover:scale-105 p-1.5 
                         rounded-full cursor-pointer transition-all 
                         duration-200 
                         ${isUpdatingUser ? "animate-pulse pointer-events-none" : ""}
                         `}
                        >
                            <Camera className="w-5 h-5 text-base-200" />
                            <input
                                type="file"
                                id="img-upload"
                                className="hidden"
                                accept="image/*"
                                disabled={isUpdatingUser}
                                onChange={handleImageUpload}
                            />
                        </label>
                    </div>
                    <p>{isUpdatingUser ? <Loader2 /> : <div className="flex flex-row">{"click the "}<Camera className="mx-1" />{" icon to upload image"}</div>}</p>
                </div>
                <div className="flex items-start flex-col gap-3">
                    {[
                        { label: "Full Name", value: authState?.fullName, id: "fullName" },
                        { label: "Email Address", value: authState?.email, id: "email" }
                    ].map((field) => (
                        <div key={field.id} className="flex flex-col w-full">
                            <label htmlFor={field.id} className="text-sm opacity-90">{field.label}</label>
                            <input
                                type="text"
                                value={field.value}
                                id={field.id}
                                className="border-orange-300 border-2 opacity-60 rounded-md px-2 py-1"
                                readOnly
                            />
                        </div>
                    ))}
                </div>
                <div className="mt-10">
                    <h1 className="text-lg mb-5 text-center">Account Information</h1>
                    <div className="flex flex-row justify-between">
                        <p>Member Since</p>
                        <p>{new Date(authState?.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}
                        </p>
                    </div>
                    <hr className="my-2 mb-3 w-full border-orange-300" />
                    <div className="flex flex-row justify-between">
                        <p>Account Status</p>
                        <p className="text-green-600">Active</p>
                    </div>
                    <hr className="my-2 w-full border-orange-300" />
                </div>
            </div>
        </>
    )
}

export default Profile