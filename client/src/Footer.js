import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {AiOutlineGithub, AiOutlineLinkedin} from 'react-icons/ai'
export const Footer = () => {
    return (
        <Wrapper>
            <ApiDoc href='https://api.artic.edu/docs/'>API Documentation</ApiDoc>
            <IconLinks>
                <ExternalLink href='https://www.linkedin.com/in/rikuo-hirasawa-5085b9229/'><AiOutlineLinkedin/></ExternalLink>
                <ExternalLink href='https://github.com/rikuohirasawa?tab=repositories'><AiOutlineGithub/></ExternalLink>
            </IconLinks>
        </Wrapper>
    )
}

const Wrapper = styled.div`
display: flex;
border-top: 1px solid #E3E2E2;
justify-content: center;
align-items: center;
gap: 1rem;
padding-top: 8px;
margin-top: auto;
`

const IconLinks = styled.div`
display: flex;
align-items: center;
gap: 1rem;
font-size: 1.25rem;
`

const ApiDoc = styled.a`
color: inherit;
text-decoration: none;
transition: all .1s ease-in-out;
&:hover,
&:focus {
    transform: scale(1.1)
}
`

const ExternalLink = styled.a`
color: inherit;
text-decoration: none;
transition: all .1s ease-in-out;
&:hover,
&:focus {
    transform: scale(1.2)
}
font-size: 1.5rem;
`

const StyleLink = styled(Link)`
color: inherit;
text-decoration: none;
`