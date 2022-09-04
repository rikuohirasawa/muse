import styled from "styled-components"
import { useNavigate } from "react-router-dom"

// page that renders on first load
export const WelcomeScreen = () => {
    const navigate = useNavigate();
    return (
        <BgImageContainer>
        <Wrapper>
            <h1>Muse</h1>
            <ButtonContainer>
                <ButtonLink onClick={()=>{navigate('/home')}}>Home</ButtonLink>
                <ButtonLink onClick={()=>{navigate('/muse')}}>Discover</ButtonLink>
                <ButtonLink onClick={()=>{navigate('/about')}}>About</ButtonLink>
            </ButtonContainer>
        </Wrapper>
        </BgImageContainer>
    )
}

const BgImageContainer = styled.div`
background-image: url(https://www.artic.edu/iiif/2/5b5530b8-8322-5ac4-b9be-ff92f578cdd7/full/843,/0/default.jpg);
height: 100vh;


`
const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
color: #fff;
height: 100%;
@keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
animation: 1.25s ease-in 0s 1 fadein;
`

const ButtonContainer = styled.div`
display: flex;
flex-direction: column;
gap: 20px;
`

const ButtonLink = styled.button`
font-family: inherit;
background: #fff;
cursor: pointer;
font-size: 1rem;
width: 200px;
height: 80px;
border: 1px solid black;
transition: all .1s ease-in-out;
&:hover,
&:focus {
    transform: scale(1.05)
};`