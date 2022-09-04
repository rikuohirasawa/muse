import styled from 'styled-components';
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { FollowButton } from './FollowButton';
import { UserContext } from './UserContext';

export const UserSearch = () => {
    const [allUsers, setAllUsers] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const {dispatch, userInfo, followingUsers} = useContext(UserContext);

    const navigate = useNavigate();

    // fetch all users to be used in searchbar
    useEffect(()=> {
        fetch('/users/find-all')
        .then(res=>res.json())
        .then(data=>setAllUsers(data.data))
        .catch(err=>console.log(err.message))
    }, [])

    if (allUsers && followingUsers) {
        const suggestions = allUsers.map(e=>{
                return {name: e.name ? e.name : e.nickname,
                        avatarSrc: e.avatarSrc,
                        id: e._id,
                        email: e.email}
        })
        const filterSuggestions = suggestions.filter(e=>{
            return e.name.toLowerCase().includes(inputValue.toLowerCase())
        })
        return (
            <Wrapper>
                <SearchBar 
                type='text'
                value={inputValue}
                onChange={(e)=>{setInputValue(e.target.value)}}
                />
                {filterSuggestions.length > 0 && inputValue.length > 2
                &&
                <SearchList>
                    {filterSuggestions.map(e=>{
                        let alreadyFollowing = false;
                        let indexOfSuggestedText = e.name.toLowerCase().indexOf(inputValue.toLowerCase());
                        let userText = e.name.slice(0, indexOfSuggestedText + inputValue.length);
                        let suggestedText = e.name.slice(indexOfSuggestedText + inputValue.length);
                        // forEach here as using a .includes was breaking my code (?)
                        followingUsers.forEach(element=>{
                            if (element._id === e.id) {
                                alreadyFollowing = true
                            }
                        });
                        return (
                            <SearchItem onClick={()=>{navigate(`/user/${e.id}`)}}>
                                <Avatar src={e.avatarSrc}/><span className='text-margin'>{userText}<span className='suggested-text'>{suggestedText}</span></span>            
                                <FollowButton email={userInfo.email} followEmail={e.email}/>
                            </SearchItem>
                        )
                    })}
                </SearchList>}
            </Wrapper>
        )
    } else {
        return <LinearProgress color="inherit" style={{width: '280px'}}/>
    }
}


const Avatar = styled.img`
width: 60px;
height: 60px;
border-radius: 50%;
`
const Wrapper = styled.div`
margin: 0 auto;
`

const SearchBar = styled.input`
font-size: 1.5rem;
font-family: inherit;
padding: 8px;`

const SearchList = styled.ul`
padding: 0;
margin: 0;`

const SearchItem = styled.li`
list-style: none;
padding: 8px;
display: flex;
align-items: center;

cursor: pointer;

&:hover {
    background: #E3E2E2;
}

.text-margin {
    margin: 0 auto;
}

.suggested-text {
    font-weight: 700;
}`