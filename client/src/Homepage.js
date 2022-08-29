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
                <BgContainer><HeadingTextLarge>Chicago</HeadingTextLarge></BgContainer>

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


const TextWrapper = styled.div`
@keyframes slideInFromRight {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes animate {
    from {
        background-position: center 0%;
    }
    to {
        background-position: center 60%;
    }
};

@keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
`

const HeadingTextSmall = styled.h1`
padding: 0;
margin: 0 6px -16px;
font-size: 60px;
/* animation: 1s ease-out 0s 1 slideInFromRight; */

`

const BgContainer = styled.div`
/* background-image: url(https://www.artic.edu/iiif/2/1adf2696-8489-499b-cad2-821d7fde4b33/full/843,/0/default.jpg); */
animation: 2s ease-in 0s 1 fadein;
margin: 0;

padding: 0;
margin: -120px 0 0 0;


`
const HeadingTextLarge = styled.h1`
background-image: url(https://www.artic.edu/iiif/2/1adf2696-8489-499b-cad2-821d7fde4b33/full/843,/0/default.jpg);
-webkit-text-fill-color: transparent;
-webkit-background-clip: text;
-webkit-text-stroke: 1px #000;
animation: animate 6s forwards;
font-size: 180px;
background-position: center;



/* background-clip: text;
-webkit-background-clip: text;
font-size: 180px;
margin: 0;
padding: 0;
border: 1px solid red;

color: transparent;
background-clip: text;
-webkit-background-clip: text;
background-position: center; */
`