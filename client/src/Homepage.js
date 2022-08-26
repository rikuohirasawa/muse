import styled from 'styled-components'

import { SideBar } from './SideBar';
import { Header } from './Header';
import { Footer } from './Footer';

import { useEffect } from 'react';

export const HomePage = () => {
    return (
        <>
        <FlexContainer>
            <SideBar/>
            <Content>
            <Header/>
            <TextWrapper>
                <HeadingTextSmall>Art Institute of</HeadingTextSmall>
                <HeadingTextLarge>Chicago</HeadingTextLarge>
            </TextWrapper>
            </Content>
        </FlexContainer>
        <Footer/>
        </>

    )

}

const FlexContainer = styled.div`
display: flex;
`
const Content = styled.div`
width: 100%;`


const TextWrapper = styled.div``

const HeadingTextSmall = styled.h1`
padding: 0;
margin: 0 6px -16px;
font-size: 60px;
`

const HeadingTextLarge = styled.h1`
background-image: url(https://www.artic.edu/iiif/2/1adf2696-8489-499b-cad2-821d7fde4b33/full/843,/0/default.jpg);
background-clip: text;
background-position: center;
color: transparent;
-webkit-background-clip: text;
font-size: 180px;
margin: 0;
padding: 0;

`