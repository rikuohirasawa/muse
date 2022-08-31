import styled from "styled-components"
import {BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs'
import { addToFavorites, deleteFavorite } from "./utils"
import { useContext } from "react"
import { UserContext } from "./UserContext"

export const LikeButton = ({id, style}) => {
    const {userInfo, dispatch} = useContext(UserContext);
    if (userInfo.profileSetup) {
        // if (userInfo.favorites.includes(id)) {

        // }
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

    /* @keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes fadeout {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
} */
    
    .icon {
    font-size: 1.25rem;
    transition: all .1s ease-in-out;
    /* animation: 1s ease-in 0s 1 fadein;
    animation: 1s ease-out 0s 1 fadeout; */
    &:hover,
    &:focus {
        transform: scale(1.2)
    };
    }

    `