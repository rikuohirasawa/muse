import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <Wrapper>
            <LogoText to='/'>Muse</LogoText>
            <Content>
                <SearchBar>
                    <input type='text'/>
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
gap: 1.25rem;`

const SearchBar = styled.form`
`

const SearchButton = styled.button``