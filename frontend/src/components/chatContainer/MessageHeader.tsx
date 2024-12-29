import Card from '../ReusableComponents/Card'
import { X } from 'lucide-react'
import type { User } from '../Sidebar'
import { useChat } from '../../store/useChat'

const MessageHeader = ({ selectedUser,userStatus }: { selectedUser: User,userStatus:string },) => {
    const { fullName, profilePic } = selectedUser
    const { setSelectedUser } = useChat();
    
    return (
        <>
            <Card fullName={fullName} userStatus={userStatus} image={profilePic} sx={{height:"10px"}} />
            <X
                className="w-6 h-6 text-gray-500 cursor-pointer"
                onClick={() => setSelectedUser(null)}
            />
        </>
    )
}

export default MessageHeader
