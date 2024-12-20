import { Input } from '@mui/material';
import { Mic, Paperclip, Send, X } from 'lucide-react';
import { type FormEvent, useRef, useState } from 'react'
import { useChat } from '../../store/useChat';
import toast from 'react-hot-toast';
import type{ User } from '../Sidebar';

const MessageInput = ({ selectedUser }: { selectedUser: User }) => {
    const [message, setMessage] = useState<string>("");
    const [imagePreview, setImagepreview] = useState<null|string|undefined|ArrayBuffer>(null);
    const fileInputRef = useRef(null);
    const { getUsers, getMessages, isMessagesLoading, isUsersLoading, sendMessages, isSendingMessage } = useChat();
    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
        if(!message.trim() && !imagePreview){
            return
        }
        try {
            await sendMessages({
                text:message.trim(),
                image:imagePreview,
                receiverId:selectedUser._id
                })
            await getMessages({id:selectedUser._id})

            setMessage("");
            setImagepreview(null);
            if(fileInputRef.current){
                fileInputRef.current.value=""
            }
        } catch (error) {
            console.error(error)
        }
    }

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const handleImageChange = async (e:any) => {
        const file = e.target.files[0];
        if(!file.type.startsWith("image/")){
            toast.error("Please select image files !")
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            setImagepreview(reader.result)      //base64
        }
    }

    const handleRemoveImage = () => {
        setImagepreview(null);
        if(fileInputRef.current){
            fileInputRef.current.value=""
        }
    }

    return (
        <>
            {imagePreview && (
                <div className='mb-3 flex items-start gap-2'>
                    <div className='relative'>
                        <img src={`${imagePreview}`} alt="Preview" className='w-20 h-20 object-cover rounded-lg border border-gray-950'/>
                        <button type="button" onClick={handleRemoveImage} className='w-5 h-5 absolute -top-1.5 -right-1.5 rounded-lg flex items-center justify-center bg-slate-300'>
                            <X color='black' className='size-3'/>
                        </button>
                    </div>
                </div>
            )}
            <form onSubmit={handleSubmit} className='"h-[10%] flex flex-row items-center gap-10 p-2"'>
                <Input
                    type="text"
                    placeholder="Enter Message ..."
                    className="w-[80%] bg-transparent border rounded-lg border-gray-500 placeholder-gray-500 text-white px-4 py-1"
                    inputProps={{ style: { color: "white" } }}
                    disableUnderline
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onSubmit={handleSubmit}
                />
                <Mic
                    className="w-6 h-6 text-gray-500 cursor-pointer"
                    onClick={() => {
                        console.log("Starting listening");
                    }}
                />
                <X
                    className="w-6 h-6 text-gray-500 cursor-pointer"
                />
                <input type="file" accept='image/*' className='hidden' ref={fileInputRef} onChange={handleImageChange} />
                <Paperclip onClick={()=>fileInputRef.current?.click()} className="w-6 h-6 text-gray-500 cursor-pointer" />
                <Send  className={`w-6 h-6 text-gray-500 cursor-pointer ${isSendingMessage&&"opacity-20 disabled"}`} onClick={handleSubmit} />
            </form>

        </>
    )
}

export default MessageInput
