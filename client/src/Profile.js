import styled from 'styled-components'
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from './UserContext';
import { useEffect, useState, useContext } from 'react'
import { ProfileSetup } from './ProfileSetup';

export const Profile = () => {
    const {dispatch, userInfo} = useContext(UserContext);
    

    if (userInfo.profileSetup) {
        return (
            <>
            <FlexContainer>
            <Avatar src={userInfo.avatarSrc}/>
            <h1>{userInfo.name}</h1>
            </FlexContainer>
            <Feed></Feed>
            <UserCollection>
                <h2>Your Collection</h2>

            </UserCollection>
            </>
        )
    } else {
        return (
            <ProfileSetup/>
        )
    }
}

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
`
const Avatar = styled.img`
    width: 140px;
    height: 140px;
    object-fit: cover;
    border-radius: 50%;
`

const Feed = styled.div``

const UserCollection = styled.div`
`