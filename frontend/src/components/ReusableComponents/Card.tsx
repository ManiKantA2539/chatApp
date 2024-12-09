import React from 'react'

interface Card {
    fullName: string | null,
    userStatus: string | null,
    image: string | null
}

const Card: React.FC<Card> = ({ fullName, userStatus, image }) => {
    return (
        <>
            <div className='flex flex-row space-x-2'>
                <img src={image ? image : "src/assets/react.svg"} alt='' className='rounded-full size-12 bg-black object-cover' />
                <div className='flex flex-col'>
                    <h3>{fullName}</h3>
                    <p>{userStatus}</p>
                </div>
            </div>
        </>
    )
}

export default Card