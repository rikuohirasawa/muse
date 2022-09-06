import styled from 'styled-components';
import { GlobalStyle } from './GlobalStyles';
import { Header } from './Header';
import { Footer } from './Footer';
import { SideBar } from './SideBar';
import { HomePage } from './Homepage';
import { ViewSampleArt } from './ViewSampleArt';
import { ArtworkDetails } from './ArtworkDetails';
import { ArtistDetails } from './ArtistDetails';
import { About } from './About';
import { Profile } from './Profile';
import { WelcomeScreen } from './WelcomeScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchCollection } from './SearchCollection';
import { FindUserProfile } from './FindUserProfile';


const App = () => {

  return (
    <>
    <BrowserRouter>
      <GlobalStyle/>
      <Header/>
      <FlexRow>
        <SideBar/>
        <FlexColumn>
          <Routes>
            <Route exact path='/' element={<WelcomeScreen/>}/>
            <Route exact path='/home' element={<HomePage/>}/>
            <Route exact path='/muse' element={<ViewSampleArt/>}/>
            <Route exact path='/artwork/:id' element={<ArtworkDetails/>}/>
            <Route exact path='/artist/:name' element={<ArtistDetails/>}/>
            <Route exact path='/about' element={<About/>}/>
            <Route exact path='/collection/:search' element={<SearchCollection/>}/>
            <Route exact path='/profile' element={<Profile/>}/>
            <Route exact path='/user/:id' element={<FindUserProfile/>}/>
          </Routes>
          <Footer/>
        </FlexColumn>
      </FlexRow>
    </BrowserRouter>
    </> 
  );
}


// container to make sidebar stick to the side of page
const FlexRow = styled.div`
  display: flex;
  background: transparent;
  z-index: -1;
  `
// container to make footer stick to the bottom of page
const FlexColumn = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: 100vh;
`

export default App;
