import styled from 'styled-components';
import {FiUserCheck} from 'react-icons/fi'
import { useContext } from 'react';
import { UserContext } from './UserContext';

export const UnFollowButton = ({email, followEmail}) => {
    const { dispatch } = useContext(UserContext);

    const clickUnfollow = (e) => {
        e.stopPropagation();
        fetch('/user/unfollow-user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                email: email,
                followEmail: followEmail
            })
        }).then(res=>res.json())
        .then(data=>{
            dispatch({type: 'user-following', followingUsers: data.data.value.following})
        })
    }
    
    return (
        <UnFollowBtn onClick={(e)=>{clickUnfollow(e)}}>
            <FiUserCheck/>
        </UnFollowBtn>
    )

}

const UnFollowBtn = styled.button`
width: 35px;
height: 35px;
margin-right: 4px;
border-radius: 50%;
border: none;
background: #fff;
cursor: pointer;
font-size: 1rem;
&:hover,
&:focus {
    transform: scale(1.2)
}
`