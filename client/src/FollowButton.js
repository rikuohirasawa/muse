import styled from 'styled-components';
import {BsPersonPlus, BsPersonCheck} from 'react-icons/bs'
import { useContext } from 'react';
import { UserContext } from './UserContext';

export const FollowButton = ({email, followEmail}) => {
    const { dispatch, userInfo } = useContext(UserContext);
    // follow user - updates database and then sets context to reflect new changes
    const clickFollow = (e) => {
        e.stopPropagation();
        fetch('/user/follow-user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                email: email,
                followEmail: followEmail
            })
        }).then(res=>res.json())
        .then(data=>{
            dispatch({type: 'update-user-following', following: data.data.value.following})
        })
    }

    // unfollow user - updates database and then sets context to reflect new changes
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
            dispatch({type: 'update-user-following', following: data.data.value.following})
        })
    }
    
    if (userInfo.following) {
        return (
            <FollowBtn onClick={(e)=>{
                !userInfo.following.includes(followEmail) ?
                clickFollow(e)
                : 
                clickUnfollow(e)}}>
                {!userInfo.following.includes(followEmail) ?
                <BsPersonPlus/>
                :
                <BsPersonCheck/>
                }
            </FollowBtn>
            )
    } else {
        return <></>
    }
 
}

const FollowBtn = styled.button`
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