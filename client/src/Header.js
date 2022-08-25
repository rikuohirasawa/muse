import styled from "styled-components"
import {AiOutlineGithub, AiOutlineLinkedin} from 'react-icons/ai'
import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <Wrapper>
            <Content>
                <div>Browse</div>
                <div>About</div>
                <div>Shop</div>
            </Content>
            <IconLinks>
                <AiOutlineLinkedin/>
                <AiOutlineGithub/>
            </IconLinks>
        </Wrapper>
    )
}

const Wrapper = styled.div`
padding: 1.5rem;
display: flex;
justify-content: space-between;
align-items: center;
border-bottom: 0.5px solid #E3E2E2;
`
const Content = styled.div`
display: flex;
gap: 1.25rem;`

const IconLinks = styled.div`
display: flex;
gap: 1rem;`