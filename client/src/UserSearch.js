import styled from 'styled-components';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const UserSearch = () => {
    const [allUsers, setAllUsers] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const navigate = useNavigate();

    
    useEffect(()=> {
        fetch('/users/find-all')
        .then(res=>res.json())
        .then(data=>setAllUsers(data.data))
        .catch(err=>console.log(err.message))
    }, [])

    if (allUsers) {
        const suggestions = allUsers.map(e=>{
                return {name: e.name ? e.name : e.nickname,
                        avatarSrc: e.avatarSrc,
                        id: e._id}
        })
        console.log(suggestions)
        const filterSuggestions = suggestions.filter(e=>{
            return e.name.toLowerCase().includes(inputValue.toLowerCase())
        })
        console.log(suggestions)
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
                        return (
                            <SearchItem onClick={()=>{navigate(`/user/${e.id}`)}}>
                                {e.name}
                            </SearchItem>
                        )
                    })}
                </SearchList>}
            </Wrapper>
    
        )

    }

}

const Wrapper = styled.div`
`

const SearchBar = styled.input``

const SearchList = styled.ul``

const SearchItem = styled.li``