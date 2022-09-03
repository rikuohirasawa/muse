import styled from 'styled-components';
import {IoPersonAddOutline} from 'react-icons/io'

export const FollowButton = (email, followEmail) => {

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
            console.log(data)
        })
    }
    return (
        <>
        <FollowBtn onClick={(e)=>{clickFollow(e)}}>
            <IoPersonAddOutline/>
        </FollowBtn>
        </>
    )
}

const FollowBtn = styled.button`
`