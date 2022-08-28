import styled from 'styled-components'
import {AiOutlineSearch} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'

export const Header = () => {

    const navigate = useNavigate();
    const searchSubmit = (e) => {
        e.preventDefault();
        const searchForm = new FormData(document.forms.searchBar);
        const input = searchForm.get('search');
    };

    return (
        <Wrapper>
            <LogoText to='/'>Muse</LogoText>
            <Content>
                <SearchBar id='searchBar' onSubmit={(e)=>{searchSubmit(e)}}>
                    <SearchInput type='text' placeholder='e.g. Monet' name='search'/>
                    <SearchButton type='submit'><SearchIcon/></SearchButton>
                </SearchBar>
                <div>Browse</div>
                <div>About</div>
                <div>Shop</div>
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
color: #fff;
text-decoration: none;
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
color: #fff;
background: black;
font-size: 1.5rem;


cursor: pointer;
`

const SearchIcon = styled(AiOutlineSearch)`
transition: all .2s ease-in-out;
&:hover {
    transform: scale(1.2)
}
`