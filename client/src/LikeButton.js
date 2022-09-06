import styled from "styled-components"
import {BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs'
import { addToFavorites, deleteFavorite } from "./utils"
import { useContext } from "react"
import { UserContext } from "./UserContext"

export const LikeButton = ({id, style}) => {
    const {userInfo, dispatch} = useContext(UserContext);
    // add and delete favorite functions imported from utils
    if (userInfo.profileSetup) {
        return (
            <Button onClick={()=>{
            !userInfo.favorites.includes(id) ?
                addToFavorites(userInfo.email, id, dispatch)
                :
                deleteFavorite(userInfo.email, id, dispatch)
            }}
            style={style}>
                {userInfo.favorites.includes(id) 
                ? <BsSuitHeartFill className='icon'/>
                : <BsSuitHeart className='icon'/>}
            </Button>
        )
    } else {
        return <></>
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