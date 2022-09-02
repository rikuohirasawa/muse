import styled from 'styled-components'
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from './UserContext';
import { useEffect, useState, useContext } from 'react'
import { ProfileSetup } from './ProfileSetup';
import { Line } from './GlobalStyles';
import { LoadingScreen } from './LoadingScreen';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
    const {dispatch, userInfo} = useContext(UserContext);
    const [userCollection, setUserCollection] = useState(null);
    const navigate = useNavigate();


    // fetch information for favorited items
    useEffect(()=>{
        console.log(userInfo.favorites.length)
        if (userInfo.favorites.length > 0) {

            fetch(`https://api.artic.edu/api/v1/artworks?ids=${userInfo.favorites.join(',')}
            &fields=title,image_id,artist_title,id`)
            .then(res=>res.json())
            .then(data=>setUserCollection(data.data))
            .catch(err=>console.log(err.message))
        }
    }, [userInfo.favorites])
    

    if (userInfo.profileSetup) {
        return (
            <>
            <FlexContainer>
            <Avatar src={userInfo.avatarSrc}/>
            <div>
            <h1>{userInfo.name}</h1>
            <div className='user-bio'>{userInfo.bio}</div>
            </div>

            </FlexContainer>

            <Line/>
            <Title>Your Collection</Title>
            {userCollection && userInfo.favorites.length > 0 ? 
            <UserCollection>
                {userCollection.map(e=>{
                    return (
                        <ArtContainer>
                            <Artwork src={`https://www.artic.edu/iiif/2/${e.image_id}/full/843,/0/default.jpg`}
                            onClick={()=>{navigate(`/artwork/${e.id}`)}}/>
                            <div>{e.title}</div>
                            <div>{e.artist_title}</div>
                        </ArtContainer>
                    )
                })}
                </UserCollection>
                : 
                userInfo.favorites.length === 0 ? 
                <div>
                    <Title>You haven't added anything to your collection yet</Title>
                </div>
                :      
                <></>
                }
            </>
        )
    } else {
        return (
            <ProfileSetup/>
        )
    }
}

const Title = styled.h2`
    text-align: center;`

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    width: 95%;
    margin: 0 auto;
    padding: 1.5rem 0;


    .user-bio {
        max-width: 400px;

    }
`
const Avatar = styled.img`
    width: 140px;
    height: 140px;
    object-fit: cover;
    border-radius: 50%;
`
const ArtContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
`

const Artwork = styled.img`
    max-height: 300px;
    max-width: 300px;
    cursor: pointer;
    transition: all .1s ease-in-out;
    &:hover,
    &:focus {
    transform: scale(1.05)
}`

const UserCollection = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;

`