import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';


export const HomePage = () => {

// arrays of images I liked and had appropriate size to render on the homepage
const smallImageArray = [
  'https://www.artic.edu/iiif/2/37dcc4be-7710-d7e0-f41a-1ba8d07bb6c5/full/843,/0/default.jpg',
  'https://www.artic.edu/iiif/2/7a4b9f82-ff54-4cac-e1e6-36aa87c636b3/full/843,/0/default.jpg',
  'https://www.artic.edu/iiif/2/f95a0a70-90c5-2806-2a66-68f27f8c0735/full/843,/0/default.jpg',
  'https://www.artic.edu/iiif/2/5501b7d6-19ff-8f95-948c-b96625fa4ddc/full/843,/0/default.jpg'
]

const largeImageArray = [
  'https://www.artic.edu/iiif/2/e45e0786-6d04-dd63-e056-e6afacf5a95f/full/843,/0/default.jpg',
  'https://www.artic.edu/iiif/2/e7f4caac-6a16-e332-9a51-34f986d4b451/full/843,/0/default.jpg',
  'https://www.artic.edu/iiif/2/84e2baea-852e-de08-33d5-e0e8ec4cd7a5/full/843,/0/default.jpg',
]
// get random index to select a random image
const getRandomIndex = (length) => {
    return Math.floor(Math.random() * length)
  }
  const navigate = useNavigate();
  
  return (
        <>
            <Content>
              <TextWrapper>
                  <HeadingTextSmall>Art Institute of</HeadingTextSmall>
                  <BgContainer><HeadingTextLarge>Chicago</HeadingTextLarge></BgContainer>
                  <div className='flex-wrapper'>
                  <ImageSmall src={smallImageArray[getRandomIndex(smallImageArray.length)]}/>
                    {/* <ImageSmall src='https://www.artic.edu/iiif/2/f95a0a70-90c5-2806-2a66-68f27f8c0735/full/843,/0/default.jpg'/> */}
                    <div>
                      <div>Browse one of the world's largest collections...</div>
                      <DiscoverButton onClick={()=>{navigate('/muse')}}>Show me something</DiscoverButton>
                    </div>
                  </div>
              </TextWrapper>  
              <ImageLarge src={largeImageArray[getRandomIndex(largeImageArray.length)]}/>  
              {/* <ImageLarge src='https://www.artic.edu/iiif/2/e7f4caac-6a16-e332-9a51-34f986d4b451/full/843,/0/default.jpg'/>       */}
            </Content>
            <StatsContainer>
                <div>300K Artworks</div>
                <div>1.5M Annual Visitors</div>
                <div>EST. 1879</div>
            </StatsContainer>
        </>
    )

}

const ImageLarge = styled.img`
  width: 525px;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  animation: 1s ease-in 0s 1 fadein;
`

const ImageSmall = styled.img`
  object-fit: cover;
  filter: grayscale(100%);
  width: 550px;
  z-index: -1;
  animation: 1s ease-in 0s 1 fadein;
`
const Content = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;`


const TextWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;

.flex-wrapper {
  margin-top: -24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 105%;
}

@keyframes animate {
    from {
        background-position: center 0%;
    }
    to {
        background-position: center 25%;
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
width: 100%;

`

const BgContainer = styled.div`
animation: 3s ease-in 0s 1 fadein;
margin: 0;
padding: 0;
margin: -130px 0 0 0;
width: 100%;


`
const HeadingTextLarge = styled.h1`
filter: grayscale(100%);
background-image: url(https://www.artic.edu/iiif/2/b272df73-a965-ac37-4172-be4e99483637/full/843,/0/default.jpg);
-webkit-text-fill-color: transparent;
-webkit-background-clip: text;
-webkit-text-stroke: 1px #000;
animation: animate 6s forwards;
font-size: 180px;
background-position: center;
`

const StatsContainer = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
border-top: 1px solid #E3E2E2;
padding: 16px 0 8px;
margin: 0 0 8px;
`

const DiscoverButton = styled.button`
  /* margin-left: auto; */
  margin: 16px 0;
  font-family: inherit;
  color: #fff;
  background: black;
  padding: 8px 20px;
  max-height: 40px;

  cursor: pointer;

  transition: all .2s ease-in-out;
&:hover,
&:focus {
transform: scale(1.05)
};
`