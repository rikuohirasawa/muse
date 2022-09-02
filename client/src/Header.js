import styled from 'styled-components';

import {AiOutlineSearch} from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { SignInButton } from './SignInButton';
import { SignOutButton } from './SignOutButton';

import { useAuth0 } from "@auth0/auth0-react";
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useContext } from 'react';

import { UserContext } from './UserContext';

export const Header = () => {


    const { user, isAuthenticated, isLoading } = useAuth0();
    const {dispatch} = useContext(UserContext);


    // post new user data to database when auth0 is authenticated - I would prefer to post data
    // on the form submit but I am not too familiar with auth0 yet, and how I can target the form/form
    // events - I will likely come back in the future and fix this when I become more familiar
    useEffect(()=>{
        if (isAuthenticated) {
            fetch('/user/new-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({
                    email: user.email,
                    nickname: user.nickname,
                })
            }).then(res=>res.json())
            .then((data)=>{
                console.log(data.data)
                dispatch({type: 'set-user-info', userInfo: data.data})
            })
        }
    }, [isAuthenticated])

    const navigate = useNavigate();
    
    const searchSubmit = (e) => {
        e.preventDefault();
        const searchForm = new FormData(document.forms.searchBar);
        const input = searchForm.get('search');
        navigate(`/collection/${input}`)
    };


    return (
        <Wrapper>
            <LogoText to='/'>Muse</LogoText>
            <Content>
                <SearchBar id='searchBar' onSubmit={(e)=>{searchSubmit(e)}}>
                    <SearchInput type='text' placeholder='e.g. Monet' name='search'/>
                    <SearchButton type='submit'><SearchIcon/></SearchButton>
                </SearchBar>
                <HeaderLink to='/profile'>Profile</HeaderLink>
                {isAuthenticated ?
                <SignOutButton/>
                : 
                <SignInButton/>
                }
                <HeaderLink to='/about'>About</HeaderLink>
            </Content>
        </Wrapper>
    )
}

const Wrapper = styled.div`
padding: 1.5rem;
display: flex;
justify-content: space-between;
align-items: center;
border-bottom: 1px solid #E3E2E2;
`

const LogoText = styled(Link)`
font-weight: 700;
font-size: 1.25rem;
color: inherit;
text-decoration: none;
transition: all .1s ease-in-out;

&:hover,
&:focus {
    transform: scale(1.1)
    };
`

const Content = styled.div`
display: flex;
align-items: center;
gap: 1.25rem;`

const SearchBar = styled.form`
display: flex;
`

const SearchInput = styled.input`
font-family: inherit;
&:focus {
    outline: none;
}`

const SearchButton = styled.button`
display: flex;
justify-content: center;
align-items: center;
color: inherit;
background: inherit;
border: none;
font-size: 1.5rem;


cursor: pointer;
`

const SearchIcon = styled(AiOutlineSearch)`
transition: all .2s ease-in-out;
&:hover {
    transform: scale(1.2)
}
`

const HeaderLink = styled(Link)`
color: inherit;
text-decoration: none;
transition: all .1s ease-in-out;
&:hover,
&:focus {
    transform: scale(1.1)
};
`