import { Tooltip } from '@mui/material'
import { LogOut, MessagesSquare, Settings, User } from 'lucide-react'
import { useAuth } from '../store/useAuth'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const { authState, logOut } = useAuth();
    return (
        <>
            <div className='flex justify-between flex-row h-10vh p-5'>
                <Link to="/">
                    <div className='flex flex-row cursor-pointer'>
                        <MessagesSquare />
                        <span className='mx-2'>ChatApp</span>
                    </div>
                </Link>
                <div className='flex flex-row gap-10'>
                    {authState &&
                        <>
                            <Tooltip title="Logout">
                                <LogOut style={{ cursor: "pointer" }} onClick={logOut} />
                            </Tooltip>
                            <Link to={"/profile"}>
                                <Tooltip title="Profile">
                                    <User style={{ cursor: "pointer" }} />
                                </Tooltip>
                            </Link>
                        </>

                    }
                    <Link to="/settings">
                        <Tooltip title="Settings">
                            <Settings style={{ cursor: "pointer" }} />
                        </Tooltip>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar