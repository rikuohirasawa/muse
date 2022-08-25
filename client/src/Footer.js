import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {AiOutlineGithub, AiOutlineLinkedin} from 'react-icons/ai'
export const Footer = () => {
    return (
        <Wrapper>
            <StyleLink to='https://api.artic.edu/docs/'>API Documentation</StyleLink>
            <IconLinks>
                <AiOutlineLinkedin/>
                <AiOutlineGithub/>
            </IconLinks>


        </Wrapper>
    )
}

const Wrapper = styled.div`
display: flex;
border-top: 1px solid white;
justify-content: center;
align-items: center;
gap: 1rem;
padding-top: 8px;`

const IconLinks = styled.div`
display: flex;
gap: 1rem;
font-size: 1.25rem;
`

const StyleLink = styled(Link)`
color: #fff;
text-decoration: none;
`