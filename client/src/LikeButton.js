import styled from "styled-components"
import {BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs'
import { addToFavorites } from "./utils"
import { useContext } from "react"
import { UserContext } from "./UserContext"

export const LikeButton = ({email, id}) => {
    const {userInfo, dispatch} = useContext(UserContext);
    if (userInfo.profileSetup) {
        // if (userInfo.favorites.includes(id)) {

        // }
        return (
            <Button onClick={()=>{
            if (!userInfo.favorites.includes(id)) {
                addToFavorites(email, id, dispatch)
            } else {
                console.log('already favorited')
            }
            }}>
                {userInfo.favorites.includes(id) 
                ? <BsSuitHeartFill className='icon'/>
                : <BsSuitHeart className='icon'/>}
            </Button>
        )
    }

}

const Button = styled.button`
    background: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
    
    .icon {
    font-size: 1.25rem;
    transition: all .1s ease-in-out;
    &:hover,
    &:focus {
        transform: scale(1.2)
    };
    }

    `