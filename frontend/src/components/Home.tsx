import { useEffect, useState } from "react";
import { useChat } from "../store/useChat"
import Card from "./ReusableComponents/Card";
import { Loader2 } from "lucide-react";
import Profile from "./Profile";

interface User {
    fullName: string;
    profilePic: string;

}

const Home = () => {
    const { users, isUsersLoading, getUsers } = useChat();

    useEffect(() => {
        try {
            getUsers();
        } catch (error) {

        }
    }, [])
    console.log(users);
    return (
        <>
            <div className="h-screen bg-base-200">
                <div className="flex flex-col gap-2 mx-4">
                    {isUsersLoading ? <Loader2 className="flex items-center" /> :
                        (
                            users && users.map((user: any, index) => (
                                <div key={index}>
                                    <Card fullName={user.fullName} userStatus={"offline"} image={user.profilePic} />
                                </div>
                            )))}

                </div>
            </div>
        </>
    )
}

export default Home