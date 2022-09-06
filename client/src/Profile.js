import styled from 'styled-components'
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from './UserContext';
import { useEffect, useState, useContext } from 'react'
import { ProfileSetup } from './ProfileSetup';
import { Line } from './GlobalStyles';
import { LoadingScreen } from './LoadingScreen';
import { LikeButton } from './LikeButton';
import { useNavigate } from 'react-router-dom';
import { UserSearch } from './UserSearch';


export const Profile = () => {
    const { isAuthenticated } = useAuth0();
    const {dispatch, userInfo, followingUsers} = useContext(UserContext);
    const [userCollection, setUserCollection] = useState(null);
    const [displayToggle, setDisplayToggle] = useState('collection'); 
    const navigate = useNavigate();

    // fetch accounts that user is following
    useEffect(()=>{
        if (userInfo.email) {
            fetch(`/users/following/${userInfo.email}`)
            .then(res=>res.json())
            .then(data=>{
                dispatch({type: 'user-following', followingUsers: data.data})})
        }
    }, [userInfo.email])


    // fetch information for favorited items
    useEffect(()=>{
        if (userInfo.favorites.length > 0) {
            fetch(`https://api.artic.edu/api/v1/artworks?ids=${userInfo.favorites.join(',')}
            &fields=title,image_id,artist_title,id,thumbnail`)
            .then(res=>res.json())
            .then(data=>{
                setUserCollection(data.data)})
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
            <TitlesContainer>
                <Title style={{background: displayToggle === 'following' && '#E3E2E2'}} onClick={()=>{setDisplayToggle('following')}}>Following</Title>
                <Title style={{background: displayToggle === 'collection' && '#E3E2E2'}} onClick={()=>{setDisplayToggle('collection')}}>Your Collection</Title>
                <Title style={{background: displayToggle === 'search' && '#E3E2E2'}} onClick={()=>{setDisplayToggle('search')}}>Search Users</Title>
            </TitlesContainer>        
            {displayToggle === 'following' ?
            <FollowingContainer>
            {followingUsers && followingUsers.length > 0 ?
                followingUsers.map(e=>{
                return(
                    <FollowedUser>
                    <Avatar style={{cursor: 'pointer'}}src={e.avatarSrc}
                    onClick={()=>{navigate(`/user/${e._id}`)}}/>
                    {e.name ?
                    <div>{e.name}</div>
                    :
                    <div>{e.nickname}</div>
                    }
                    </FollowedUser>
                    )
                    })
                    :
                    <Title>You are not following anyone yet</Title>}
            </FollowingContainer>       
            
            : displayToggle === 'collection' ?
            userCollection && userInfo.favorites.length > 0 ? 
                <UserCollection>
                    {userCollection.map((e, index)=>{
                        return (
                            <ArtContainer key={index}>
                                <LikeButton id={e.id}
                                style={{
                                    position: 'relative',
                                    left: '27%',
                                    top: '8%',
                                    zIndex: '2'}}/>
                                <Artwork src={`https://www.artic.edu/iiif/2/${e.image_id}/full/843,/0/default.jpg`}
                                alt={e.thumbnail ? e.thumbnail.alt_text : 'No alt text provided by API, sorry 🙁'}
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
                :
                <BackgroundImage>
                    <SearchContainer>
                    <div className='searchbar-title'>Search Other Users</div>
                    <UserSearch/>
                    </SearchContainer>
                </BackgroundImage>
                }
                </>
            )
        } else if (isAuthenticated && userInfo.email && !userInfo.profileSetup) {
            return (
                <ProfileSetup/>
            )
        } else {
            return (
                <LoadingScreen/>
            )
        }
}

const Title = styled.h2`
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;`

const FlexWrap = styled.div`
display: flex;
justify-content: space-evenly;
border: 1px solid black;
flex-direction: column;
align-items: center;
`
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
const FollowingContainer = styled.div`
display: flex;
padding: 20px;
gap: 60px;
justify-content: center;
`

const FollowedUser = styled.div`
text-align: center;
`
const TitlesContainer = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
border-bottom: 1px solid #E3E2E2;
border-top: 1px solid #E3E2E2;
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

const BackgroundImage = styled.div`
background-image: url(https://www.artic.edu/iiif/2/d141a769-24af-ff07-d792-183ae73ae765/full/843,/0/default.jpg);
height: 100%;
width: 100%;
filter: grayscale(100%);
height: 100%;
margin: 16px 0;
display: flex;
align-items: center;

margin: 0 auto;
`

const SearchContainer = styled.div`
background: #fff;
display: flex;
flex-direction: column;
align-items: center;
gap: 30px;
width: 400px;
margin: 0 auto;
border: 1px solid white;
padding: 16px 0;
min-height: 300px;

.searchbar-title {
    font-size: 1.5rem;
}`