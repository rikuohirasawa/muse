import styled from "styled-components"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import {MdErrorOutline} from 'react-icons/md'
import { LoadingScreen } from "./LoadingScreen"
import { FollowButton } from "./FollowButton"
import { UserContext } from './UserContext';

export const FindUserProfile = () => {
    const id = useParams().id;
    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);

    // set initial state to favorites, so condition on second useEffect
    // does not break the application - this  does however make the conditional rendering
    // less clean, as I have to now add specific conditions
    const [userProfile, setUserProfile] = useState({favorites: []});
    const [userCollection, setUserCollection] = useState(null);
    
    // fetch user information
    useEffect(()=>{
        fetch(`/userId/${id}`)
        .then(res=>res.json())
        .then(data=>setUserProfile(data.data))
    }, [])

    // fetch user favorites
    useEffect(()=>{
        if (userProfile && userProfile.favorites.length > 0) {
            fetch(`https://api.artic.edu/api/v1/artworks?ids=${userProfile.favorites.join(',')}
            &fields=title,image_id,artist_title,id`)
            .then(res=>res.json())
            .then(data=>setUserCollection(data.data))
            .catch(err=>console.log(err.message))
        }
    }, [userProfile.favorites])

    if (userProfile.nickname && userProfile.bio) {
        return (
            <>
            <FlexContainer>
                <Avatar src={userProfile.avatarSrc}/>
                <div>
                <h1>{userProfile.name} <FollowButton email={userInfo.email} followEmail={userProfile.email}/></h1>
                <div className='user-bio'>{userProfile.bio}</div>
                </div>
            </FlexContainer>
            <TitlesContainer>
                {/* use preferred name if user has set that, otherwise use auth0 nickname */}
                {
                userProfile.name ? 
                <Title>{userProfile.name}'s Collection</Title>
                :
                <Title>{userProfile.nickname}'s Collection</Title>
                }
            </TitlesContainer>
            {userCollection && userProfile.favorites.length > 0 ? 
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
                    userProfile.favorites.length === 0 ? 
                    <div>
                        {userProfile.name ?
                        <Title>{userProfile.name} hasn't added anything to their collection yet</Title>
                        :
                        <Title>{userProfile.nickname} hasn't added anything to their collection yet</Title>
                        }
                 
                    </div>
                    :      
                    <></>
                }
            </>
        )
    } else if (userProfile.nickname && !userProfile.profileSetup) {
        return (
            <div style={{
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.5rem',
                fontWeight: '700'
            }}>
            <div>{userProfile.nickname} hasn't setup their profile yet</div>
            <div style={{fontSize: '2rem'}}><MdErrorOutline/></div>
            </div>
        )
    } else {
        return <LoadingScreen/>
    }

}
const UserCollection = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;

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

const Title = styled.h2`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;`

const TitlesContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-bottom: 1px solid #E3E2E2;
    border-top: 1px solid #E3E2E2;
    `