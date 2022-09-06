import styled from "styled-components"
import { LinearProgress } from '@mui/material'

export const LoadingScreen = () => {
    return (
        <Wrapper>
            <h1 style={{fontWeight: '400'}}>Mu</h1>
            <LinearProgress color="inherit" style={{width: '300px'}}/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
width: 100%;
height: 50vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 20px;
`